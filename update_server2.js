const fs = require('fs');

let file = 'backend/server.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace top level torneos.femenino
const oldTop = `femenino: {
      grupos: { A: ["FARMAENLACE"], B: ["LIFE"] },
      equiposDisponibles: [...empresasRestantesFemenino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { A: 5, B: 4 }
    }`;
const newTop = `femenino: {
      grupos: { A: [], B: [], C: [] },
      equiposDisponibles: [...empresasRestantesFemenino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { A: 3, B: 3, C: 3 }
    }`;
content = content.replace(oldTop, newTop);
// If it was the Unico version:
const oldTopUnico = `femenino: {
      grupos: { 'Unico': [] },
      equiposDisponibles: [...empresasRestantesFemenino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { 'Unico': 9 }
    }`;
content = content.replace(oldTopUnico, newTop);

// 2. Replace in reiniciarTorneo
const oldReset = `if (!cat || cat === 'femenino') {
      torneos.femenino = {
        grupos: { 'Unico': [] },
        equiposDisponibles: [...empresasRestantesFemenino],
        ultimoSorteado: null,
        cruces: [],
        sorteoEnProceso: false,
        maxPorGrupo: { 'Unico': 9 }
      };
    }`;
const newReset = `if (!cat || cat === 'femenino') {
      torneos.femenino = {
        grupos: { A: [], B: [], C: [] },
        equiposDisponibles: [...empresasRestantesFemenino],
        ultimoSorteado: null,
        cruces: [],
        sorteoEnProceso: false,
        maxPorGrupo: { A: 3, B: 3, C: 3 }
      };
    }`;
content = content.replace(oldReset, newReset);

// Also try the Asnico version
const oldResetAsnico = `if (!cat || cat === 'femenino') {
      torneos.femenino = {
        grupos: { 'Asnico': [] },
        equiposDisponibles: [...empresasRestantesFemenino],
        ultimoSorteado: null,
        cruces: [],
        sorteoEnProceso: false,
        maxPorGrupo: { 'Asnico': 9 }
      };
    }`;
content = content.replace(oldResetAsnico, newReset);

// Also try the original version from git commit
const oldResetOrig = `if (!cat || cat === 'femenino') {
      torneos.femenino = {
        grupos: { A: [], B: [] },
        equiposDisponibles: [...empresasRestantesFemenino],
        ultimoSorteado: null,
        cruces: [],
        sorteoEnProceso: false,
        maxPorGrupo: { A: 5, B: 4 }
      };
    }`;
content = content.replace(oldResetOrig, newReset);


// 3. Replace generarCruces
const oldCrucesRegex = /if \(cat === 'femenino'\) \{[\s\S]*?return torneos.femenino.cruces;\s*\}/;
const newCruces = `if (cat === 'femenino') {
      const eqA = torneos.femenino.grupos.A.slice();
      const eqB = torneos.femenino.grupos.B.slice();
      const eqC = torneos.femenino.grupos.C.slice();
  
      const gA1 = eqA[0] || "1° Grupo A";
      const gB1 = eqB[0] || "1° Grupo B";
      const gC1 = eqC[0] || "1° Grupo C";
      const mejor2 = "Mejor Segundo";
  
      torneos.femenino.cruces = [
        // Semifinales (26 de Septiembre)
        { id: 'semi1', fase: 'Semifinal', lado: 'izquierdo', fecha: '26-Sep', titulo: 'Semifinal 1', equipo1: gA1, equipo2: mejor2, desc1: '1° Grupo A', desc2: 'Mejor Segundo' },
        { id: 'semi2', fase: 'Semifinal', lado: 'derecho', fecha: '26-Sep', titulo: 'Semifinal 2', equipo1: gB1, equipo2: gC1, desc1: '1° Grupo B', desc2: '1° Grupo C' },
        // Tercer Lugar y Final (03 de Octubre)
        { id: 'tercer', fase: 'Tercer Puesto', lado: 'centro', fecha: '03-Oct', titulo: '🥉 TERCER LUGAR', equipo1: 'Perdedor Semifinal 1', equipo2: 'Perdedor Semifinal 2', desc1: 'Perdedor Semifinal 1', desc2: 'Perdedor Semifinal 2' },
        { id: 'final', fase: 'Final', lado: 'centro', fecha: '03-Oct', titulo: '🏆 GRAN FINAL ORO', equipo1: 'Ganador Semifinal 1', equipo2: 'Ganador Semifinal 2', desc1: 'Ganador Semifinal 1', desc2: 'Ganador Semifinal 2' }
      ];
      return torneos.femenino.cruces;
    }`;
content = content.replace(oldCrucesRegex, newCruces);

fs.writeFileSync(file, content, 'utf8');
console.log("server.js updated successfully");
