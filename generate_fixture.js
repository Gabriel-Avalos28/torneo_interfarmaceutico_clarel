const fs = require('fs');

const matches = [];
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    matches.push({ g1: 'A', i1: i, g2: 'B', i2: j, group: 'A vs B' });
    matches.push({ g1: 'A', i1: i, g2: 'C', i2: j, group: 'A vs C' });
    matches.push({ g1: 'B', i1: i, g2: 'C', i2: j, group: 'B vs C' });
  }
}

// We need 7 jornadas: J4 = 3 matches, others = 4 matches.
const jornadasCount = [4, 4, 4, 3, 4, 4, 4];
let bestFixture = null;

function solve(matchIdx, currentJornadas) {
  if (matchIdx === 27) {
    bestFixture = currentJornadas.map(j => [...j]);
    return true;
  }
  
  const m = matches[matchIdx];
  const team1 = m.g1 + m.i1;
  const team2 = m.g2 + m.i2;
  
  for (let j = 0; j < 7; j++) {
    if (currentJornadas[j].length >= jornadasCount[j]) continue;
    
    // We want A0 and B0 to rest in J4 (index 3).
    // So A0 and B0 CANNOT play in J4.
    if (j === 3 && (team1 === 'A0' || team2 === 'A0' || team1 === 'B0' || team2 === 'B0')) {
      continue;
    }
    
    let canPlay = true;
    for (const played of currentJornadas[j]) {
      if (played.g1 + played.i1 === team1 || played.g2 + played.i2 === team1 ||
          played.g1 + played.i1 === team2 || played.g2 + played.i2 === team2) {
        canPlay = false;
        break;
      }
    }
    
    if (canPlay) {
      currentJornadas[j].push(m);
      if (solve(matchIdx + 1, currentJornadas)) return true;
      currentJornadas[j].pop();
    }
  }
  return false;
}

const emptyJornadas = Array.from({length: 7}, () => []);
if (solve(0, emptyJornadas)) {
  console.log("Found valid fixture!");
  
  let newJornadasFemenino = `const jornadasFemenino = [\n`;
  const fechas = ["01 de Agosto", "15 de Agosto", "22 de Agosto", "29 de Agosto", "05 de Septiembre", "12 de Septiembre", "19 de Septiembre"];
  const titulos = ["Jornada 1 (Inauguración)", "Jornada 2", "Jornada 3", "Jornada 4", "Jornada 5", "Jornada 6", "Jornada 7 (Cierre de Clasificación)"];
  
  bestFixture.forEach((jornada, jIdx) => {
    newJornadasFemenino += `    {\n      fecha: "${fechas[jIdx]}",\n      titulo: "${titulos[jIdx]}",\n      partidos: [\n`;
    const lines = jornada.map(m => {
      return `        { grupo: "${m.group}", eq1: getEq("${m.g1}", ${m.i1}, "${m.i1+1}° Grupo ${m.g1}"), eq2: getEq("${m.g2}", ${m.i2}, "${m.i2+1}° Grupo ${m.g2}") }`;
    });
    newJornadasFemenino += lines.join(",\n");
    newJornadasFemenino += `\n      ]\n    }${jIdx < 6 ? ',' : ''}\n`;
  });
  newJornadasFemenino += `  ];\n\n  const listaJornadas = `;

  let file = 'frontend/src/components/TablaCalendario.jsx';
  let content = fs.readFileSync(file, 'utf8');
  const regexFemenino = /const jornadasFemenino = \[[\s\S]*?\];\s*const listaJornadas = /;
  content = content.replace(regexFemenino, newJornadasFemenino);
  fs.writeFileSync(file, content, 'utf8');
  console.log("TablaCalendario.jsx updated successfully.");
} else {
  console.log("Could not find fixture.");
}
