const fs = require('fs');
const svg = fs.readFileSync('Referencias/Assets/Home/SVG/rayones001.svg', 'utf8');
const d = svg.match(/<path[^>]+d="([^"]+)"/)[1];

const coords = [];
const regex = /([0-9.-]+),([0-9.-]+)/g;
let m;
while ((m = regex.exec(d)) !== null) {
  coords.push({ x: parseFloat(m[1]), y: parseFloat(m[2]) });
}
console.log('Total coordinates:', coords.length);
console.log('First 5 coords:', coords.slice(0, 5));
console.log('Middle coords:', coords.slice(Math.floor(coords.length/2) - 2, Math.floor(coords.length/2) + 3));
console.log('Last 5 coords:', coords.slice(-5));


