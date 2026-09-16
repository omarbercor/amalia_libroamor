const fs = require('fs');

const svg = fs.readFileSync('Referencias/Assets/Home/titulo.svg', 'utf8');

function parseSvgPath(d) {
  // Regex to match SVG command letters and their arguments
  const cmdRegex = /([a-df-z])([^a-df-z]*)/gi;
  let match;
  let currX = 0, currY = 0;
  let startX = 0, startY = 0;
  const points = [];

  while ((match = cmdRegex.exec(d)) !== null) {
    const cmd = match[1];
    const args = match[2].trim().split(/[\s,]+|-/).filter(Boolean);
    // simpler numeric parser
    const nums = match[2].match(/[-+]?[0-9]*\.?[0-9]+(?:e[-+]?[0-9]+)?/gi);
    const n = nums ? nums.map(Number) : [];

    switch (cmd) {
      case 'M':
        currX = n[0]; currY = n[1];
        startX = currX; startY = currY;
        points.push({x: currX, y: currY});
        for (let i = 2; i < n.length; i += 2) {
          currX = n[i]; currY = n[i+1];
          points.push({x: currX, y: currY});
        }
        break;
      case 'm':
        currX += n[0]; currY += n[1];
        startX = currX; startY = currY;
        points.push({x: currX, y: currY});
        for (let i = 2; i < n.length; i += 2) {
          currX += n[i]; currY += n[i+1];
          points.push({x: currX, y: currY});
        }
        break;
      case 'L':
        for (let i = 0; i < n.length; i += 2) {
          currX = n[i]; currY = n[i+1];
          points.push({x: currX, y: currY});
        }
        break;
      case 'l':
        for (let i = 0; i < n.length; i += 2) {
          currX += n[i]; currY += n[i+1];
          points.push({x: currX, y: currY});
        }
        break;
      case 'H':
        for (let i = 0; i < n.length; i++) {
          currX = n[i]; points.push({x: currX, y: currY});
        }
        break;
      case 'h':
        for (let i = 0; i < n.length; i++) {
          currX += n[i]; points.push({x: currX, y: currY});
        }
        break;
      case 'V':
        for (let i = 0; i < n.length; i++) {
          currY = n[i]; points.push({x: currX, y: currY});
        }
        break;
      case 'v':
        for (let i = 0; i < n.length; i++) {
          currY += n[i]; points.push({x: currX, y: currY});
        }
        break;
      case 'C':
        for (let i = 0; i < n.length; i += 6) {
          currX = n[i+4]; currY = n[i+5];
          points.push({x: currX, y: currY});
        }
        break;
      case 'c':
        for (let i = 0; i < n.length; i += 6) {
          currX += n[i+4]; currY += n[i+5];
          points.push({x: currX, y: currY});
        }
        break;
      case 'S':
        for (let i = 0; i < n.length; i += 4) {
          currX = n[i+2]; currY = n[i+3];
          points.push({x: currX, y: currY});
        }
        break;
      case 's':
        for (let i = 0; i < n.length; i += 4) {
          currX += n[i+2]; currY += n[i+3];
          points.push({x: currX, y: currY});
        }
        break;
      case 'Z':
      case 'z':
        currX = startX; currY = startY;
        points.push({x: currX, y: currY});
        break;
    }
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  points.forEach(p => {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  });

  return { minX, maxX, minY, maxY, cx: (minX+maxX)/2, cy: (minY+maxY)/2, w: maxX - minX, h: maxY - minY };
}

const elRegex = /<(path|line)([^>]+)\/?>/g;
let m;
const items = [];
while ((m = elRegex.exec(svg)) !== null) {
  const tag = m[1];
  const attrs = m[2];
  if (tag === 'path') {
    const d = attrs.match(/d="([^"]+)"/)[1];
    if (d.trim().length > 3) {
      const b = parseSvgPath(d);
      items.push({ tag, d, ...b, raw: m[0] });
    }
  } else if (tag === 'line') {
    const x1 = parseFloat(attrs.match(/x1="([^"]+)"/)[1]);
    const y1 = parseFloat(attrs.match(/y1="([^"]+)"/)[1]);
    const x2 = parseFloat(attrs.match(/x2="([^"]+)"/)[1]);
    const y2 = parseFloat(attrs.match(/y2="([^"]+)"/)[1]);
    const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    items.push({ tag, x1, y1, x2, y2, minX, maxX, minY, maxY, cx: (x1+x2)/2, cy: (y1+y2)/2, w: maxX - minX, h: maxY - minY, raw: m[0] });
  }
}

console.log('Items parsed correctly:', items.length);

items.forEach((item, idx) => {
  let group = 'UNKNOWN';
  if (item.w > 300) {
    group = item.cy > 250 ? 'SUBRAYADO_2' : 'SUBRAYADO_1';
  } else if (item.cy < 105) {
    group = 'LINEA_1';
  } else if (item.cy < 215) {
    group = 'LINEA_2';
  } else {
    group = 'LINEA_3';
  }
  console.log(`Item #${String(idx).padStart(2)}: ${group.padEnd(12)} | cy: ${item.cy.toFixed(1).padStart(5)}, cx: ${item.cx.toFixed(1).padStart(5)}, minX: ${item.minX.toFixed(1).padStart(5)}, maxX: ${item.maxX.toFixed(1).padStart(5)} | ${item.raw.substring(0, 45)}...`);
});
