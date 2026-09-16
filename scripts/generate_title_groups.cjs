const fs = require('fs');

const svg = fs.readFileSync('Referencias/Assets/Home/titulo.svg', 'utf8');

function parseSvgPath(d) {
  const cmdRegex = /([a-df-z])([^a-df-z]*)/gi;
  let match;
  let currX = 0, currY = 0;
  let startX = 0, startY = 0;
  const points = [];

  while ((match = cmdRegex.exec(d)) !== null) {
    const cmd = match[1];
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
      items.push({ tag, d, ...b });
    }
  } else if (tag === 'line') {
    const x1 = parseFloat(attrs.match(/x1="([^"]+)"/)[1]);
    const y1 = parseFloat(attrs.match(/y1="([^"]+)"/)[1]);
    const x2 = parseFloat(attrs.match(/x2="([^"]+)"/)[1]);
    const y2 = parseFloat(attrs.match(/y2="([^"]+)"/)[1]);
    const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    items.push({ tag, x1, y1, x2, y2, minX, maxX, minY, maxY, cx: (x1+x2)/2, cy: (y1+y2)/2, w: maxX - minX, h: maxY - minY });
  }
}

const line1 = items.filter(it => it.cy < 105 && it.w < 300).sort((a,b) => a.minX - b.minX);
const line2 = items.filter(it => it.cy >= 105 && it.cy < 215 && it.w < 300).sort((a,b) => a.minX - b.minX);
const line3 = items.filter(it => it.cy >= 215 && it.w < 300).sort((a,b) => a.minX - b.minX);
const sub1 = items.find(it => it.w > 300 && it.cy < 260);
const sub2 = items.find(it => it.w > 300 && it.cy >= 260);

console.log('Line 1 count:', line1.length);
console.log('Line 2 count:', line2.length);
console.log('Line 3 count:', line3.length);
console.log('Subrayado 1:', !!sub1);
console.log('Subrayado 2:', !!sub2);

function toSvgElement(it, id) {
  if (it.tag === 'path') {
    return `      <path id="${id}" class="title-stroke" d="${it.d}" />`;
  } else if (it.tag === 'line') {
    return `      <line id="${id}" class="title-stroke" x1="${it.x1}" y1="${it.y1}" x2="${it.x2}" y2="${it.y2}" />`;
  }
}

const gLine1 = line1.map((it, i) => toSvgElement(it, `title-l1-${i+1}`)).join('\n');
const gLine2 = line2.map((it, i) => toSvgElement(it, `title-l2-${i+1}`)).join('\n');
const gLine3 = line3.map((it, i) => toSvgElement(it, `title-l3-${i+1}`)).join('\n');
const gSub1 = toSvgElement(sub1, 'title-sub-1');
const gSub2 = toSvgElement(sub2, 'title-sub-2');

const finalSvg = `    <!-- LÍNEA 1: UNO SIEMPRE -->
    <g id="title-line-1" class="title-line-group">
${gLine1}
    </g>

    <!-- LÍNEA 2: CAMBIA AL AMOR -->
    <g id="title-line-2" class="title-line-group">
${gLine2}
    </g>

    <!-- SUBRAYADO 1: Bajo CAMBIA AL AMOR -->
    <g id="title-subrayado-1" class="title-sub-group">
${gSub1}
    </g>

    <!-- LÍNEA 3: DE SU VIDA -->
    <g id="title-line-3" class="title-line-group">
${gLine3}
    </g>

    <!-- SUBRAYADO 2: Bajo DE SU VIDA -->
    <g id="title-subrayado-2" class="title-sub-group">
${gSub2}
    </g>`;

fs.writeFileSync('scripts/generated_title_markup.html', finalSvg);
console.log('Done generating scripts/generated_title_markup.html');
