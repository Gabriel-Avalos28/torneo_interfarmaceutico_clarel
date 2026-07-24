const fs = require('fs');

let file = 'backend/server.js';
let content = fs.readFileSync(file, 'utf8');

// The file is corrupted at the top level, let's just replace it completely from "let torneos" to "function construirEstadoActual()"
const start = content.indexOf('let torneos = {');
const end = content.indexOf('function construirEstadoActual() {');

if (start !== -1 && end !== -1) {
  const newHeader = `let torneos = {
  masculino: {
    grupos: { A: ["CLAREL"], B: ["LIFE"], C: [] },
    equiposDisponibles: [...empresasRestantesMasculino],
    ultimoSorteado: null,
    cruces: [],
    sorteoEnProceso: false,
    maxPorGrupo: { A: 6, B: 6, C: 6 }
  },
  femenino: {
    grupos: { A: ["FARMAENLACE"], B: ["LIFE"], C: [] },
    equiposDisponibles: [...empresasRestantesFemenino],
    ultimoSorteado: null,
    cruces: [],
    sorteoEnProceso: false,
    maxPorGrupo: { A: 3, B: 3, C: 3 }
  }
};

let mensajes = [];

`;
  
  content = content.substring(0, start) + newHeader + content.substring(end);
  fs.writeFileSync(file, content, 'utf8');
  console.log("server.js repaired and updated.");
} else {
  console.log("Could not find start/end.");
}
