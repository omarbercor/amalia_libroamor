// calculate_bounds.js
const fs = require('fs');

const content = fs.readFileSync('public/assets/home/Grupo 115.svg', 'utf8');

// Simple regex to parse commands and points from path d
function getApproxBounds(d) {
  const coords = [];
  // Match numbers like 137.1, -55.7 etc.
  const regex = /[-+]?[0-9]*\.?[0-9]+/g;
  let m;
  const nums = [];
  while ((m = regex.exec(d)) !== null) {
    nums.push(parseFloat(m[0]));
  }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  // Usually numbers come in (x, y) pairs in SVG path data
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i+1];
    if (x !== undefined && y !== undefined && !isNaN(x) && !isNaN(y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return { minX, maxX, minY, maxY };
}

const lines = content.split('\n');
lines.forEach(line => {
  const idMatch = line.match(/id="([^"]+)"/);
  const dMatch = line.match(/d="([^"]+)"/);
  if (idMatch && dMatch) {
    const id = idMatch[1];
    const bounds = getApproxBounds(dMatch[1]);
    console.log(id, JSON.stringify(bounds));
  }
});
