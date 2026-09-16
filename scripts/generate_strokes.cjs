// generate_strokes.cjs
// Script to generate high-fidelity stroke mask paths for DrawSVG across the 3 lines and 2 underlines
const fs = require('fs');

// Line 1: UNO SIEMPRE (Y ~ 2 to 85, X: 105 to 600)
// Line 2: CAMBIA AL AMOR (Y ~ 100 to 195, X: 15 to 770)
// Line 3: DE SU VIDA (Y ~ 225 to 315, X: 155 to 595)
// Underline 1: (Y ~ 212, X: 10 to 820)
// Underline 2: (Y ~ 332, X: 145 to 625)

console.log("Ready to compute stroke guide paths");
