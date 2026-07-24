const fs = require('fs');

let file = 'frontend/src/components/TablaCalendario.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const jornadasMasculino = \[[\s\S]*?\];/;

const newJornadas = `const jornadasMasculino = [
  {
    fecha: "15 de Agosto",
    titulo: "Fecha 1",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") }
    ]
  },
  {
    fecha: "22 de Agosto",
    titulo: "Fecha 2",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 5, "6° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 5, "6° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 5, "6° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 2, "3° Grupo C") }
    ]
  },
  {
    fecha: "29 de Agosto",
    titulo: "Fecha 3",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 5, "6° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 4, "5° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 5, "6° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 4, "5° Grupo C"), eq2: getEq("C", 2, "3° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 5, "6° Grupo C"), eq2: getEq("C", 1, "2° Grupo C") }
    ]
  },
  {
    fecha: "05 de Septiembre",
    titulo: "Fecha 4",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 3, "4° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 4, "5° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 2, "3° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 3, "4° Grupo C"), eq2: getEq("C", 1, "2° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 4, "5° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") }
    ]
  },
  {
    fecha: "12 de Septiembre",
    titulo: "Fecha 5",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 3, "4° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 1, "2° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 3, "4° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") }
    ]
  }
];`;

content = content.replace(regex, newJornadas);
fs.writeFileSync(file, content, 'utf8');
console.log("Updated jornadasMasculino successfully.");
