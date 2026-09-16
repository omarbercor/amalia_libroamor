const fs = require('fs');

// We will load scripts/parse_titulo_exact.cjs output
const { execSync } = require('child_process');

const content = fs.readFileSync('Referencias/Assets/Home/titulo.svg', 'utf8');

// Use the parser logic to classify each stroke
// We'll write a clean generator that produces groups sorted by X
const parserCode = fs.readFileSync('scripts/parse_titulo_exact.cjs', 'utf8');

// Let's create an organized classification script
const script = `
const fs = require('fs');
${parserCode.substring(parserCode.indexOf('function parseSvgPath'))}

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
    return \`<path id="\${id}" class="title-stroke" d="\${it.d}" />\`;
  } else if (it.tag === 'line') {
    return \`<line id="\${id}" class="title-stroke" x1="\${it.x1}" y1="\${it.y1}" x2="\${it.x2}" y2="\${it.y2}" />\`;
  }
}

const gLine1 = line1.map((it, i) => '      ' + toSvgElement(it, \`title-l1-\${i+1}\`)).join('\\n');
const gLine2 = line2.map((it, i) => '      ' + toSvgElement(it, \`title-l2-\${i+1}\`)).join('\\n');
const gLine3 = line3.map((it, i) => '      ' + toSvgElement(it, \`title-l3-\${i+1}\`)).join('\\n');
const gSub1 = '      ' + toSvgElement(sub1, 'title-sub-1');
const gSub2 = '      ' + toSvgElement(sub2, 'title-sub-2');

const finalSvg = \`
    <g id="title-line-1" class="title-line-group">
\${gLine1}
    </g>
    <g id="title-line-2" class="title-line-group">
\${gLine2}
    </g>
    <g id="title-line-3" class="title-line-group">
\${gLine3}
    </g>
    <g id="title-underlines" class="title-underlines-group">
\${gSub1}
\${gSub2}
    </g>
\`;

fs.writeFileSync('scripts/generated_title_markup.html', finalSvg);
console.log('Markup generated successfully!');
`;

fs.writeFileSync('scripts/generate_title_groups.cjs', script);
