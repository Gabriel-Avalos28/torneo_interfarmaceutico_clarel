const fs = require('fs');

const file = './frontend/src/components/TablaCalendario.jsx';
let content = fs.readFileSync(file, 'utf8');

const nuevoMasculino = `const jornadasMasculino = [
  {
    fecha: "01 de Agosto",
    titulo: "Jornada 1 (Inauguración)",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") }
    ]
  },
  {
    fecha: "15 de Agosto",
    titulo: "Jornada 2",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") }
    ]
  },
  {
    fecha: "22 de Agosto",
    titulo: "Jornada 3",
    partidos: [
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 3, "4° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") }
    ]
  },
  {
    fecha: "29 de Agosto",
    titulo: "Jornada 4",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 2, "3° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") }
    ]
  },
  {
    fecha: "05 de Septiembre",
    titulo: "Jornada 5",
    partidos: [
      { grupo: "Grupo C", eq1: getEq("C", 3, "4° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 1, "2° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 3, "4° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") }
    ]
  },
  {
    fecha: "12 de Septiembre",
    titulo: "Jornada 6 - Cierre de Grupos",
    partidos: [
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 4, "5° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 1, "2° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 4, "5° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") }
    ]
  }
];`;

const nuevoFemenino = `const jornadasFemenino = [
  {
    fecha: "01 de Agosto",
    titulo: "Jornada 1 (Inauguración)",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") }
    ]
  },
  {
    fecha: "15 de Agosto",
    titulo: "Jornada 2",
    partidos: [
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 0, "1° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") }
    ]
  },
  {
    fecha: "22 de Agosto",
    titulo: "Jornada 3",
    partidos: [
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") }
    ]
  },
  {
    fecha: "29 de Agosto",
    titulo: "Jornada 4",
    partidos: [
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") }
    ]
  },
  {
    fecha: "05 de Septiembre",
    titulo: "Jornada 5 (Interzonal 1)",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("B", 0, "1° Grupo B") }
    ]
  },
  {
    fecha: "12 de Septiembre",
    titulo: "Jornada 6 (Interzonal 2)",
    partidos: [
      { grupo: "Interzonal", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("B", 0, "1° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("B", 3, "4° Grupo B") }
    ]
  },
  {
    fecha: "19 de Septiembre",
    titulo: "⚡ Jornada 7 - CUARTOS DE FINAL (REPECHAJE)",
    partidos: [
      { grupo: "Repechaje 1", eq1: { nombre: "2° Grupo A", confirmado: true }, eq2: { nombre: "3° Grupo B", confirmado: true } },
      { grupo: "Repechaje 2", eq1: { nombre: "2° Grupo B", confirmado: true }, eq2: { nombre: "3° Grupo A", confirmado: true } }
    ]
  },
  {
    fecha: "26 de Septiembre",
    titulo: "⚡ Jornada 8 - SEMIFINALES OFICIALES",
    partidos: [
      { grupo: "Semifinal 1", eq1: { nombre: "1° Grupo A (Directo)", confirmado: true }, eq2: { nombre: "Ganador Repechaje 2", confirmado: true } },
      { grupo: "Semifinal 2", eq1: { nombre: "1° Grupo B (Directo)", confirmado: true }, eq2: { nombre: "Ganador Repechaje 1", confirmado: true } }
    ]
  },
  {
    fecha: "03 de Octubre",
    titulo: "🏆 Jornada 9 - FINALES Y TERCER LUGAR",
    partidos: [
      { grupo: "Tercer Puesto", eq1: { nombre: "Perdedor Semifinal 1", confirmado: true }, eq2: { nombre: "Perdedor Semifinal 2", confirmado: true } },
      { grupo: "🏆 GRAN FINAL ORO", eq1: { nombre: "Ganador Semifinal 1", confirmado: true }, eq2: { nombre: "Ganador Semifinal 2", confirmado: true } }
    ]
  }
];`;

content = content.replace(/const jornadasMasculino = \[[\s\S]*?\];\s*(?=(const jornadasFemenino|\/\/))/g, nuevoMasculino + '\n\n');
content = content.replace(/const jornadasFemenino = \[[\s\S]*?\];\s*(?=(const listaJornadas|export default|\/\/))/g, nuevoFemenino + '\n\n');

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated TablaCalendario.jsx');
