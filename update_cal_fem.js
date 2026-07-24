const fs = require('fs');

let file = 'frontend/src/components/TablaCalendario.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexFemenino = /const jornadasFemenino = \[[\s\S]*?\];\s*const listaJornadas = /;

const newJornadasFemenino = `const jornadasFemenino = [
    {
      fecha: "01 de Agosto",
      titulo: "Jornada 1 (Inauguración)",
      partidos: [
        { grupo: "Grupo Único", eq1: getEq("Único", 4, "5° Grupo Único"), eq2: getEq("Único", 8, "9° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 1, "2° Grupo Único"), eq2: getEq("Único", 6, "7° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 2, "3° Grupo Único"), eq2: getEq("Único", 5, "6° Grupo Único") }
      ]
    },
    {
      fecha: "15 de Agosto",
      titulo: "Jornada 2",
      partidos: [
        { grupo: "Grupo Único", eq1: getEq("Único", 4, "5° Grupo Único"), eq2: getEq("Único", 7, "8° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 2, "3° Grupo Único"), eq2: getEq("Único", 8, "9° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 0, "1° Grupo Único"), eq2: getEq("Único", 5, "6° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 3, "4° Grupo Único"), eq2: getEq("Único", 6, "7° Grupo Único") }
      ]
    },
    {
      fecha: "22 de Agosto",
      titulo: "Jornada 3",
      partidos: [
        { grupo: "Grupo Único", eq1: getEq("Único", 0, "1° Grupo Único"), eq2: getEq("Único", 7, "8° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 1, "2° Grupo Único"), eq2: getEq("Único", 8, "9° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 2, "3° Grupo Único"), eq2: getEq("Único", 6, "7° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 3, "4° Grupo Único"), eq2: getEq("Único", 5, "6° Grupo Único") }
      ]
    },
    {
      fecha: "29 de Agosto",
      titulo: "Jornada 4",
      partidos: [
        { grupo: "Grupo Único", eq1: getEq("Único", 2, "3° Grupo Único"), eq2: getEq("Único", 7, "8° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 5, "6° Grupo Único"), eq2: getEq("Único", 8, "9° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 0, "1° Grupo Único"), eq2: getEq("Único", 4, "5° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 1, "2° Grupo Único"), eq2: getEq("Único", 3, "4° Grupo Único") }
      ]
    },
    {
      fecha: "05 de Septiembre",
      titulo: "Jornada 5",
      partidos: [
        { grupo: "Grupo Único", eq1: getEq("Único", 1, "2° Grupo Único"), eq2: getEq("Único", 7, "8° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 3, "4° Grupo Único"), eq2: getEq("Único", 8, "9° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 4, "5° Grupo Único"), eq2: getEq("Único", 6, "7° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 0, "1° Grupo Único"), eq2: getEq("Único", 2, "3° Grupo Único") }
      ]
    },
    {
      fecha: "12 de Septiembre",
      titulo: "Jornada 6",
      partidos: [
        { grupo: "Grupo Único", eq1: getEq("Único", 5, "6° Grupo Único"), eq2: getEq("Único", 7, "8° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 1, "2° Grupo Único"), eq2: getEq("Único", 4, "5° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 6, "7° Grupo Único"), eq2: getEq("Único", 8, "9° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 0, "1° Grupo Único"), eq2: getEq("Único", 3, "4° Grupo Único") }
      ]
    },
    {
      fecha: "19 de Septiembre",
      titulo: "Jornada 7 (Cierre de Clasificación)",
      partidos: [
        { grupo: "Grupo Único", eq1: getEq("Único", 0, "1° Grupo Único"), eq2: getEq("Único", 6, "7° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 3, "4° Grupo Único"), eq2: getEq("Único", 7, "8° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 1, "2° Grupo Único"), eq2: getEq("Único", 5, "6° Grupo Único") },
        { grupo: "Grupo Único", eq1: getEq("Único", 2, "3° Grupo Único"), eq2: getEq("Único", 4, "5° Grupo Único") }
      ]
    }
  ];

  const listaJornadas = `;

content = content.replace(regexFemenino, newJornadasFemenino);

fs.writeFileSync(file, content, 'utf8');
console.log("TablaCalendario updated successfully");
