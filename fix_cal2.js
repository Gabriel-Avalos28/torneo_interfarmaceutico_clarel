const fs = require('fs');
let f = 'frontend/src/components/TablaCalendario.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/Grupo Asnico/g, 'Grupo Único');
c = c.replace(/A/g, '°');
fs.writeFileSync(f, c, 'utf8');
console.log('Fixed Asnico to Único');
