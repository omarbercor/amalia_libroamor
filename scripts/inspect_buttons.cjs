const fs = require('fs');
const { svgPathProperties } = require('svg-path-properties');

function getSortedLetters(file, ids) {
  const content = fs.readFileSync(file, 'utf8');
  const list = [];
  ids.forEach(id => {
    const reg = new RegExp('id="' + id + '"[^>]*d="([^"]+)"');
    const m = content.match(reg);
    if (m) {
      const props = new svgPathProperties(m[1]);
      const len = props.getTotalLength();
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (let i = 0; i <= 20; i++) {
        const pt = props.getPointAtLength((i / 20) * len);
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      }
      list.push({ id, minX: Math.round(minX), maxX: Math.round(maxX), minY: Math.round(minY), maxY: Math.round(maxY), centerX: Math.round((minX + maxX) / 2), centerY: Math.round((minY + maxY) / 2) });
    }
  });
  list.sort((a, b) => a.minX - b.minX);
  return list;
}

const g155 = ['Trazado_288', 'Trazado_289', 'Trazado_290', 'Trazado_291', 'Trazado_292', 'Trazado_293', 'Trazado_294', 'Trazado_295', 'Trazado_296', 'Trazado_297', 'Trazado_298'];
console.log('G155 (POR OTRO AMOR):', JSON.stringify(getSortedLetters('public/assets/home/Grupo 155.svg', g155), null, 2));

const g156 = ['Trazado_299', 'Trazado_300', 'Trazado_301', 'Trazado_302', 'Trazado_303', 'Trazado_304', 'Trazado_305', 'Trazado_306', 'Trazado_307', 'Trazado_308', 'Trazado_309', 'Trazado_310'];
console.log('G156 (O POR OTRA VIDA):', JSON.stringify(getSortedLetters('public/assets/home/Grupo 156.svg', g156), null, 2));
