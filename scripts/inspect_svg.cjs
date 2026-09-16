const fs = require('fs');
const { svgPathProperties } = require('svg-path-properties');

const content = fs.readFileSync('public/assets/home/Grupo 115.svg', 'utf8');
const regex = /id="([^"]+)"[^>]*d="([^"]+)"/g;
let m;
const paths = [];

while ((m = regex.exec(content)) !== null) {
  const id = m[1];
  const d = m[2];
  const props = new svgPathProperties(d);
  const len = props.getTotalLength();
  
  // sample points to get true bounding box
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const pt = props.getPointAtLength((i / steps) * len);
    if (pt.x < minX) minX = pt.x;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.y > maxY) maxY = pt.y;
  }
  paths.push({ id, minX: Math.round(minX), maxX: Math.round(maxX), minY: Math.round(minY), maxY: Math.round(maxY), width: Math.round(maxX - minX), height: Math.round(maxY - minY) });
}

console.log(JSON.stringify(paths, null, 2));
