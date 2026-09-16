const fs = require('fs');

function parseElements(content) {
  const elRegex = /<(path|line)([^>]+)\/?>/g;
  let m;
  const items = [];
  while ((m = elRegex.exec(content)) !== null) {
    const tag = m[1];
    const attrs = m[2];
    if (attrs.includes('st0') || attrs.includes('Trazado_286') || attrs.includes('Trazado_287')) continue;
    if (tag === 'path') {
      const d = attrs.match(/d="([^"]+)"/)[1];
      const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
      const xs = nums.filter((_, i) => i % 2 === 0);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      items.push({ tag, d, minX, maxX, cx: (minX+maxX)/2, raw: m[0] });
    } else if (tag === 'line') {
      const x1 = parseFloat(attrs.match(/x1="([^"]+)"/)[1]);
      const x2 = parseFloat(attrs.match(/x2="([^"]+)"/)[1]);
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const y1 = parseFloat(attrs.match(/y1="([^"]+)"/)[1]);
      const y2 = parseFloat(attrs.match(/y2="([^"]+)"/)[1]);
      items.push({ tag, x1, y1, x2, y2, minX, maxX, cx: (x1+x2)/2, raw: m[0] });
    }
  }
  return items.sort((a,b) => a.cx - b.cx);
}

const s155 = fs.readFileSync('Referencias/Assets/Home/Grupo 155.svg', 'utf8');
const s156 = fs.readFileSync('Referencias/Assets/Home/Grupo 156.svg', 'utf8');

console.log('--- 155 (POR OTRO AMOR) ---');
parseElements(s155).forEach((it, i) => console.log(i, 'cx:', it.cx.toFixed(1), it.raw));

console.log('--- 156 (O POR OTRA VIDA) ---');
parseElements(s156).forEach((it, i) => console.log(i, 'cx:', it.cx.toFixed(1), it.raw));
