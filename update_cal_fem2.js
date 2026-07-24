const fs = require('fs');

let file = 'frontend/src/components/TablaCalendario.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexFemenino = /const jornadasFemenino = \[[\s\S]*?\];\s*const listaJornadas = /;

const newJornadasFemenino = `const jornadasFemenino = [
    {
      fecha: "01 de Agosto",
      titulo: "Jornada 1 (Inauguración)",
      partidos: [
        { grupo: "A vs B", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("B", 0, "1° Grupo B") },
        { grupo: "A vs C", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("C", 1, "2° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("C", 2, "3° Grupo C") }
      ]
    },
    {
      fecha: "15 de Agosto",
      titulo: "Jornada 2",
      partidos: [
        { grupo: "A vs B", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("B", 1, "2° Grupo B") },
        { grupo: "A vs C", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("C", 0, "1° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("C", 1, "2° Grupo C") },
        { grupo: "A vs C", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("C", 2, "3° Grupo C") }
      ]
    },
    {
      fecha: "22 de Agosto",
      titulo: "Jornada 3",
      partidos: [
        { grupo: "A vs B", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("B", 0, "1° Grupo B") },
        { grupo: "A vs C", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("C", 0, "1° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("C", 2, "3° Grupo C") },
        { grupo: "A vs B", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("B", 2, "3° Grupo B") }
      ]
    },
    {
      fecha: "29 de Agosto",
      titulo: "Jornada 4",
      partidos: [
        { grupo: "A vs B", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("B", 2, "3° Grupo B") },
        { grupo: "A vs C", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("C", 1, "2° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("C", 2, "3° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("C", 0, "1° Grupo C") }
      ]
    },
    {
      fecha: "05 de Septiembre",
      titulo: "Jornada 5",
      partidos: [
        { grupo: "A vs B", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("B", 2, "3° Grupo B") },
        { grupo: "A vs C", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("C", 1, "2° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("C", 0, "1° Grupo C") },
        { grupo: "A vs C", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("C", 2, "3° Grupo C") }
      ]
    },
    {
      fecha: "12 de Septiembre",
      titulo: "Jornada 6",
      partidos: [
        { grupo: "A vs B", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("B", 1, "2° Grupo B") },
        { grupo: "A vs C", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("C", 0, "1° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("C", 0, "1° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("C", 1, "2° Grupo C") }
      ]
    },
    {
      fecha: "19 de Septiembre",
      titulo: "Jornada 7 (Cierre de Clasificación)",
      partidos: [
        { grupo: "A vs B", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("B", 1, "2° Grupo B") },
        { grupo: "A vs C", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("C", 2, "3° Grupo C") },
        { grupo: "B vs C", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("C", 1, "2° Grupo C") },
        { grupo: "A vs B", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("B", 0, "1° Grupo B") }
      ]
    }
  ];

  const listaJornadas = `;

content = content.replace(regexFemenino, newJornadasFemenino);

fs.writeFileSync(file, content, 'utf8');
console.log("TablaCalendario updated for Femenino Cruces Cruzados");
