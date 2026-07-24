const fs = require('fs');

let file = 'backend/server.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /function construirEstadoActual\(\) \{[\s\S]*?function generarCruces\(cat = 'masculino'\) \{/;
const replacement = `function construirEstadoActual() {
  return {
    masculino: {
      grupos: torneos.masculino.grupos,
      disponibles: torneos.masculino.equiposDisponibles.length,
      ultimoSorteado: torneos.masculino.ultimoSorteado,
      cruces: torneos.masculino.cruces,
      sorteoEnProceso: torneos.masculino.sorteoEnProceso,
      completado: torneos.masculino.equiposDisponibles.length === 0
    },
    femenino: {
      grupos: torneos.femenino.grupos,
      disponibles: torneos.femenino.equiposDisponibles.length,
      ultimoSorteado: torneos.femenino.ultimoSorteado,
      cruces: torneos.femenino.cruces,
      sorteoEnProceso: torneos.femenino.sorteoEnProceso,
      completado: torneos.femenino.equiposDisponibles.length === 0
    },
    // Compatibilidad en nivel raíz (apunta por defecto a masculino)
    grupos: torneos.masculino.grupos,
    disponibles: torneos.masculino.equiposDisponibles.length,
    ultimoSorteado: torneos.masculino.ultimoSorteado,
    cruces: torneos.masculino.cruces,
    sorteoEnProceso: torneos.masculino.sorteoEnProceso,
    mensajes
  };
}

function reiniciarTorneo(cat = null) {
  if (!cat || cat === 'masculino') {
    torneos.masculino = {
      grupos: { A: ["CLAREL"], B: ["LIFE"], C: [] },
      equiposDisponibles: [...empresasRestantesMasculino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { A: 6, B: 6, C: 6 }
    };
  }
  if (!cat || cat === 'femenino') {
    torneos.femenino = {
      grupos: { A: ["FARMAENLACE"], B: ["LIFE"], C: [] },
      equiposDisponibles: [...empresasRestantesFemenino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { A: 3, B: 3, C: 3 }
    };
  }
  if (!cat) mensajes = [];
}

function generarCruces(cat = 'masculino') {`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content, 'utf8');
console.log("server.js deduplicated successfully.");
