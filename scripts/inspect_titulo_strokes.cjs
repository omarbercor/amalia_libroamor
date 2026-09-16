const fs = require('fs');

const content = fs.readFileSync('Referencias/Assets/Home/titulo.svg', 'utf8');

// Match all elements (path or line)
const elements = [];
const elRegex = /<(path|line)([^>]+)\/?>/g;
let m;
while ((m = elRegex.exec(content)) !== null) {
  const tag = m[1];
  const attrs = m[2];
  if (tag === 'path') {
    const dMatch = attrs.match(/d="([^"]+)"/);
    if (dMatch && dMatch[1].trim()) {
      elements.push({ tag: 'path', d: dMatch[1] });
    }
  } else if (tag === 'line') {
    const x1 = attrs.match(/x1="([^"]+)"/)[1];
    const y1 = attrs.match(/y1="([^"]+)"/)[1];
    const x2 = attrs.match(/x2="([^"]+)"/)[1];
    const y2 = attrs.match(/y2="([^"]+)"/)[1];
    elements.push({ tag: 'line', x1, y1, x2, y2, d: `M${x1},${y1}L${x2},${y2}` });
  }
}

console.log('Total strokes found:', elements.length);

// Let's compute approx center Y and X for each stroke
function getBounds(d) {
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i+1];
    if (!isNaN(x)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
    if (!isNaN(y)) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return { minX, maxX, minY, maxY, cx: (minX+maxX)/2, cy: (minY+maxY)/2, width: maxX - minX, height: maxY - minY };
}

const classified = elements.map((el, i) => {
  const b = getBounds(el.d);
  return { index: i, ...el, ...b };
});

classified.forEach(c => {
  let line = '?';
  if (c.width > 300) {
    line = c.cy > 250 ? 'SUBRAYADO_2' : 'SUBRAYADO_1';
  } else if (c.cy < 100) {
    line = 'LINEA_1 (UNO SIEMPRE)';
  } else if (c.cy < 210) {
    line = 'LINEA_2 (CAMBIA AL AMOR)';
  } else {
    line = 'LINEA_3 (DE SU VIDA)';
  }
  console.log(`[#${c.index}] Line: ${line.padEnd(24)} | cx: ${c.cx.toFixed(1).padStart(5)}, cy: ${c.cy.toFixed(1).padStart(5)}, w: ${c.width.toFixed(1).padStart(5)}, h: ${c.height.toFixed(1).padStart(5)} | ${c.tag} d: ${c.d.substring(0, 30)}...`);
});
