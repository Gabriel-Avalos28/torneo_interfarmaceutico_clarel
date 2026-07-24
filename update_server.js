const fs = require('fs');
let file = 'backend/server.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Update inicialization logic for Femenino
let oldInitFemenino = `torneos.femenino = {
      grupos: { A: [], B: [] },
      equiposDisponibles: [...empresasRestantesFemenino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { A: 5, B: 4 }
    };`;

let newInitFemenino = `torneos.femenino = {
      grupos: { 'Único': [] },
      equiposDisponibles: [...empresasRestantesFemenino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { 'Único': 9 }
    };`;

content = content.replace(oldInitFemenino, newInitFemenino);

// 2. Update bracket generation for Femenino
let oldCrucesFemenino = `  if (cat === 'femenino') {
    const eqA = torneos.femenino.grupos.A.slice();
    const eqB = torneos.femenino.grupos.B.slice();

    const gA1 = eqA[0] || "1° Grupo A";
    const gA2 = eqA[1] || "2° Grupo A";
    const gA3 = eqA[2] || "3° Grupo A";
    const gB1 = eqB[0] || "1° Grupo B";
    const gB2 = eqB[1] || "2° Grupo B";
    const gB3 = eqB[2] || "3° Grupo B";

    torneos.femenino.cruces = [
      // Play-In / Repechaje (19 de Septiembre - Cancha Asnica)
      { id: 'rep1', fase: 'Play-In (Repechaje)', lado: 'izquierdo', fecha: '19-Sep', titulo: 'Repechaje 1', equipo1: gA2, equipo2: gB3, desc1: '2° Grupo A', desc2: '3° Grupo B' },
      { id: 'rep2', fase: 'Play-In (Repechaje)', lado: 'derecho', fecha: '19-Sep', titulo: 'Repechaje 2', equipo1: gB2, equipo2: gA3, desc1: '2° Grupo B', desc2: '3° Grupo A' },
      // Semifinales (26 de Septiembre - Cancha Asnica)
      { id: 'semi1', fase: 'Semifinal', lado: 'izquierdo', fecha: '26-Sep', titulo: 'Semifinal 1', equipo1: gA1, equipo2: 'Ganador Repechaje 2', desc1: '1° Grupo A (Directo)', desc2: 'Ganador Repechaje 2' },
      { id: 'semi2', fase: 'Semifinal', lado: 'derecho', fecha: '26-Sep', titulo: 'Semifinal 2', equipo1: gB1, equipo2: 'Ganador Repechaje 1', desc1: '1° Grupo B (Directo)', desc2: 'Ganador Repechaje 1' },
      // Final (03 de Octubre - Cancha Asnica)
      { id: 'final', fase: 'Final', lado: 'centro', fecha: '03-Oct', titulo: '🏆 GRAN FINAL', equipo1: 'Ganador Semifinal 1', equipo2: 'Ganador Semifinal 2', desc1: 'Ganadora Semifinal 1', desc2: 'Ganadora Semifinal 2' }
    ];
    return torneos.femenino.cruces;
  }`;

let newCrucesFemenino = `  if (cat === 'femenino') {
    const eqU = torneos.femenino.grupos['Único'].slice();

    const g1 = eqU[0] || "1° Grupo Único";
    const g2 = eqU[1] || "2° Grupo Único";
    const g3 = eqU[2] || "3° Grupo Único";
    const g4 = eqU[3] || "4° Grupo Único";

    torneos.femenino.cruces = [
      // Semifinales (26 de Septiembre)
      { id: 'semi1', fase: 'Semifinal', lado: 'izquierdo', fecha: '26-Sep', titulo: 'Semifinal 1', equipo1: g1, equipo2: g4, desc1: '1° de la Tabla', desc2: '4° de la Tabla' },
      { id: 'semi2', fase: 'Semifinal', lado: 'derecho', fecha: '26-Sep', titulo: 'Semifinal 2', equipo1: g2, equipo2: g3, desc1: '2° de la Tabla', desc2: '3° de la Tabla' },
      // Tercer Lugar y Final (03 de Octubre)
      { id: 'tercer', fase: 'Tercer Puesto', lado: 'centro', fecha: '03-Oct', titulo: '🥉 TERCER LUGAR', equipo1: 'Perdedor Semifinal 1', equipo2: 'Perdedor Semifinal 2', desc1: 'Perdedor Semifinal 1', desc2: 'Perdedor Semifinal 2' },
      { id: 'final', fase: 'Final', lado: 'centro', fecha: '03-Oct', titulo: '🏆 GRAN FINAL ORO', equipo1: 'Ganador Semifinal 1', equipo2: 'Ganador Semifinal 2', desc1: 'Ganador Semifinal 1', desc2: 'Ganador Semifinal 2' }
    ];
    return torneos.femenino.cruces;
  }`;

// Notice: In the previous version, there were encoding issues () in the backend/server.js file based on the cat output.
// Let's use a regex to ensure we match it correctly.

const regexCrucesFemenino = /if \(cat === 'femenino'\) \{[\s\S]*?return torneos\.femenino\.cruces;\s*\}/;

content = content.replace(regexCrucesFemenino, newCrucesFemenino);

fs.writeFileSync(file, content, 'utf8');
console.log("server.js updated successfully");
