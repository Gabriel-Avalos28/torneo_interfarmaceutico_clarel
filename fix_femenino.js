const fs = require('fs');

// 1. Fix server.js
let serverFile = 'backend/server.js';
let serverContent = fs.readFileSync(serverFile, 'utf8');

serverContent = serverContent.replace(
  /const empresasRestantesFemenino = \[[\s\S]*?\];/,
  `const empresasRestantesFemenino = [
  "BOEHRINGER INGELHEIM", "Inpel Quality", "FARBIOPHARMA",
  "JAMES BROWN", "MEGALABS", "QUALIPHARM", "ROCHE"
];`
);

serverContent = serverContent.replace(
  /femenino: {\s*grupos: { A: \[\], B: \[\] },/g,
  `femenino: {\n    grupos: { A: ["FARMAENLACE"], B: ["LIFE"] },`
);

fs.writeFileSync(serverFile, serverContent, 'utf8');

// 2. Fix ModalSorteo.jsx
let modalFile = 'frontend/src/components/ModalSorteo.jsx';
let modalContent = fs.readFileSync(modalFile, 'utf8');

modalContent = modalContent.replace(
  /const EQUIPOS_FEMENINO = \[[\s\S]*?\];/,
  `const EQUIPOS_FEMENINO = [
  "BOEHRINGER INGELHEIM", "Inpel Quality", "FARBIOPHARMA",
  "JAMES BROWN", "MEGALABS", "QUALIPHARM", "ROCHE"
];`
);

fs.writeFileSync(modalFile, modalContent, 'utf8');

console.log("Successfully updated server.js and ModalSorteo.jsx");
