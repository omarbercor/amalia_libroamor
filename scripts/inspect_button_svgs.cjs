const fs = require('fs');

const svg155 = fs.readFileSync('Referencias/Assets/Home/Grupo 155.svg', 'utf8');
const svg156 = fs.readFileSync('Referencias/Assets/Home/Grupo 156.svg', 'utf8');

function inspectLayers(svg, name) {
  console.log('=== ' + name + ' ===');
  const layer2 = svg.match(/<g id="Layer_2">([\s\S]*?)<\/g>/);
  if (layer2) {
    const paths = layer2[1].match(/<(path|line)[^>]+>/g);
    console.log('Found', paths.length, 'strokes in Layer_2');
    paths.forEach((p, i) => console.log(i, p.substring(0, 60)));
  }
}

inspectLayers(svg155, 'Grupo 155 (Por otro amor)');
inspectLayers(svg156, 'Grupo 156 (O por otra vida)');
