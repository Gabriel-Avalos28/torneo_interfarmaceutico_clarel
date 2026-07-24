const fs = require('fs');
let f = 'frontend/src/components/TablaCalendario.jsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/getEq\("Único"/g, 'getEq("Unico"');
fs.writeFileSync(f, c, 'utf8');
console.log('Fixed keys to Unico');
