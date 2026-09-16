const fs = require('fs');
const { svgPathProperties } = require('svg-path-properties');

function printBaselines(file, ids) {
  const content = fs.readFileSync(file, 'utf8');
  const list = [];
  ids.forEach(id => {
    const reg = new RegExp('id="' + id + '"[^>]*d="([^"]+)"');
    const m = content.match(reg);
    if (m) {
      const props = new svgPathProperties(m[1]);
      const len = props.getTotalLength();
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (let i = 0; i <= 30; i++) {
        const pt = props.getPointAtLength((i / 30) * len);
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      }
      list.push({ id, centerX: Math.round((minX + maxX) / 2), baselineY: Math.round(maxY), minX: Math.round(minX) });
    }
  });
  list.sort((a, b) => a.minX - b.minX);
  console.log(file, JSON.stringify(list, null, 2));
}

printBaselines('public/assets/home/Grupo 155.svg', ['Trazado_288', 'Trazado_289', 'Trazado_290', 'Trazado_291', 'Trazado_292', 'Trazado_293', 'Trazado_294', 'Trazado_295', 'Trazado_296', 'Trazado_297', 'Trazado_298']);
printBaselines('public/assets/home/Grupo 156.svg', ['Trazado_299', 'Trazado_300', 'Trazado_301', 'Trazado_302', 'Trazado_303', 'Trazado_304', 'Trazado_305', 'Trazado_306', 'Trazado_307', 'Trazado_308', 'Trazado_309', 'Trazado_310']);
