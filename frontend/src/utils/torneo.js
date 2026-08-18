const groupsExist = (g, letra) => g && Array.isArray(g[letra]);

const getEq = (grupos, grupo, index, placeholder) => {
  if (grupos && groupsExist(grupos, grupo) && grupos[grupo][index]) {
    return { nombre: grupos[grupo][index], confirmado: true };
  }
  return { nombre: placeholder, confirmado: false };
};

export function getJornadas(grupos, categoria) {
  const jornadasMasculino = [
    {
      fecha: "15 de Agosto",
      titulo: "Fecha 1",
      partidos: [
        { id: 'J0-P0', grupo: "Grupo B", eq1: getEq(grupos, "B", 0, "1° Grupo B"), eq2: getEq(grupos, "B", 5, "6° Grupo B"), hora: "10:20", cancha: "Cancha 1" },
        { id: 'J0-P1', grupo: "Grupo A", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "A", 5, "6° Grupo A"), hora: "10:20", cancha: "Cancha 2" },
        { id: 'J0-P2', grupo: "Grupo C", eq1: getEq(grupos, "C", 4, "5° Grupo C"), eq2: getEq(grupos, "C", 1, "2° Grupo C"), hora: "11:30", cancha: "Cancha 1" },
        { id: 'J0-P3', grupo: "Grupo B", eq1: getEq(grupos, "B", 4, "5° Grupo B"), eq2: getEq(grupos, "B", 1, "2° Grupo B"), hora: "11:30", cancha: "Cancha 2" },
        { id: 'J0-P4', grupo: "Grupo A", eq1: getEq(grupos, "A", 4, "5° Grupo A"), eq2: getEq(grupos, "A", 1, "2° Grupo A"), hora: "12:40", cancha: "Cancha 1" },
        { id: 'J0-P5', grupo: "Grupo A", eq1: getEq(grupos, "A", 2, "3° Grupo A"), eq2: getEq(grupos, "A", 3, "4° Grupo A"), hora: "12:40", cancha: "Cancha 2" },
        { id: 'J0-P6', grupo: "Grupo C", eq1: getEq(grupos, "C", 2, "3° Grupo C"), eq2: getEq(grupos, "C", 3, "4° Grupo C"), hora: "13:50", cancha: "Cancha 1" },
        { id: 'J0-P7', grupo: "Grupo C", eq1: getEq(grupos, "C", 0, "1° Grupo C"), eq2: getEq(grupos, "C", 5, "6° Grupo C"), hora: "13:50", cancha: "Cancha 2" },
        { id: 'J0-P8', grupo: "Grupo B", eq1: getEq(grupos, "B", 2, "3° Grupo B"), eq2: getEq(grupos, "B", 3, "4° Grupo B"), hora: "15:00", cancha: "Cancha 2" }
      ]
    },
    {
      fecha: "22 de Agosto",
      titulo: "Fecha 2",
      partidos: [
        { id: 'J1-P0', grupo: "Grupo A", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "A", 4, "5° Grupo A") },
        { id: 'J1-P1', grupo: "Grupo A", eq1: getEq(grupos, "A", 5, "6° Grupo A"), eq2: getEq(grupos, "A", 3, "4° Grupo A") },
        { id: 'J1-P2', grupo: "Grupo A", eq1: getEq(grupos, "A", 1, "2° Grupo A"), eq2: getEq(grupos, "A", 2, "3° Grupo A") },
        { id: 'J1-P3', grupo: "Grupo B", eq1: getEq(grupos, "B", 0, "1° Grupo B"), eq2: getEq(grupos, "B", 4, "5° Grupo B") },
        { id: 'J1-P4', grupo: "Grupo B", eq1: getEq(grupos, "B", 5, "6° Grupo B"), eq2: getEq(grupos, "B", 3, "4° Grupo B") },
        { id: 'J1-P5', grupo: "Grupo B", eq1: getEq(grupos, "B", 1, "2° Grupo B"), eq2: getEq(grupos, "B", 2, "3° Grupo B") },
        { id: 'J1-P6', grupo: "Grupo C", eq1: getEq(grupos, "C", 0, "1° Grupo C"), eq2: getEq(grupos, "C", 4, "5° Grupo C") },
        { id: 'J1-P7', grupo: "Grupo C", eq1: getEq(grupos, "C", 5, "6° Grupo C"), eq2: getEq(grupos, "C", 3, "4° Grupo C") },
        { id: 'J1-P8', grupo: "Grupo C", eq1: getEq(grupos, "C", 1, "2° Grupo C"), eq2: getEq(grupos, "C", 2, "3° Grupo C") }
      ]
    },
    {
      fecha: "29 de Agosto",
      titulo: "Fecha 3",
      partidos: [
        { id: 'J2-P0', grupo: "Grupo A", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "A", 3, "4° Grupo A") },
        { id: 'J2-P1', grupo: "Grupo A", eq1: getEq(grupos, "A", 4, "5° Grupo A"), eq2: getEq(grupos, "A", 2, "3° Grupo A") },
        { id: 'J2-P2', grupo: "Grupo A", eq1: getEq(grupos, "A", 5, "6° Grupo A"), eq2: getEq(grupos, "A", 1, "2° Grupo A") },
        { id: 'J2-P3', grupo: "Grupo B", eq1: getEq(grupos, "B", 0, "1° Grupo B"), eq2: getEq(grupos, "B", 3, "4° Grupo B") },
        { id: 'J2-P4', grupo: "Grupo B", eq1: getEq(grupos, "B", 4, "5° Grupo B"), eq2: getEq(grupos, "B", 2, "3° Grupo B") },
        { id: 'J2-P5', grupo: "Grupo B", eq1: getEq(grupos, "B", 5, "6° Grupo B"), eq2: getEq(grupos, "B", 1, "2° Grupo B") },
        { id: 'J2-P6', grupo: "Grupo C", eq1: getEq(grupos, "C", 0, "1° Grupo C"), eq2: getEq(grupos, "C", 3, "4° Grupo C") },
        { id: 'J2-P7', grupo: "Grupo C", eq1: getEq(grupos, "C", 4, "5° Grupo C"), eq2: getEq(grupos, "C", 2, "3° Grupo C") },
        { id: 'J2-P8', grupo: "Grupo C", eq1: getEq(grupos, "C", 5, "6° Grupo C"), eq2: getEq(grupos, "C", 1, "2° Grupo C") }
      ]
    },
    {
      fecha: "05 de Septiembre",
      titulo: "Fecha 4",
      partidos: [
        { id: 'J3-P0', grupo: "Grupo A", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "A", 2, "3° Grupo A") },
        { id: 'J3-P1', grupo: "Grupo A", eq1: getEq(grupos, "A", 3, "4° Grupo A"), eq2: getEq(grupos, "A", 1, "2° Grupo A") },
        { id: 'J3-P2', grupo: "Grupo A", eq1: getEq(grupos, "A", 4, "5° Grupo A"), eq2: getEq(grupos, "A", 5, "6° Grupo A") },
        { id: 'J3-P3', grupo: "Grupo B", eq1: getEq(grupos, "B", 0, "1° Grupo B"), eq2: getEq(grupos, "B", 2, "3° Grupo B") },
        { id: 'J3-P4', grupo: "Grupo B", eq1: getEq(grupos, "B", 3, "4° Grupo B"), eq2: getEq(grupos, "B", 1, "2° Grupo B") },
        { id: 'J3-P5', grupo: "Grupo B", eq1: getEq(grupos, "B", 4, "5° Grupo B"), eq2: getEq(grupos, "B", 5, "6° Grupo B") },
        { id: 'J3-P6', grupo: "Grupo C", eq1: getEq(grupos, "C", 0, "1° Grupo C"), eq2: getEq(grupos, "C", 2, "3° Grupo C") },
        { id: 'J3-P7', grupo: "Grupo C", eq1: getEq(grupos, "C", 3, "4° Grupo C"), eq2: getEq(grupos, "C", 1, "2° Grupo C") },
        { id: 'J3-P8', grupo: "Grupo C", eq1: getEq(grupos, "C", 4, "5° Grupo C"), eq2: getEq(grupos, "C", 5, "6° Grupo C") }
      ]
    },
    {
      fecha: "12 de Septiembre",
      titulo: "Fecha 5",
      partidos: [
        { id: 'J4-P0', grupo: "Grupo A", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "A", 1, "2° Grupo A") },
        { id: 'J4-P1', grupo: "Grupo A", eq1: getEq(grupos, "A", 2, "3° Grupo A"), eq2: getEq(grupos, "A", 5, "6° Grupo A") },
        { id: 'J4-P2', grupo: "Grupo A", eq1: getEq(grupos, "A", 3, "4° Grupo A"), eq2: getEq(grupos, "A", 4, "5° Grupo A") },
        { id: 'J4-P3', grupo: "Grupo B", eq1: getEq(grupos, "B", 0, "1° Grupo B"), eq2: getEq(grupos, "B", 1, "2° Grupo B") },
        { id: 'J4-P4', grupo: "Grupo B", eq1: getEq(grupos, "B", 2, "3° Grupo B"), eq2: getEq(grupos, "B", 5, "6° Grupo B") },
        { id: 'J4-P5', grupo: "Grupo B", eq1: getEq(grupos, "B", 3, "4° Grupo B"), eq2: getEq(grupos, "B", 4, "5° Grupo B") },
        { id: 'J4-P6', grupo: "Grupo C", eq1: getEq(grupos, "C", 0, "1° Grupo C"), eq2: getEq(grupos, "C", 1, "2° Grupo C") },
        { id: 'J4-P7', grupo: "Grupo C", eq1: getEq(grupos, "C", 2, "3° Grupo C"), eq2: getEq(grupos, "C", 5, "6° Grupo C") },
        { id: 'J4-P8', grupo: "Grupo C", eq1: getEq(grupos, "C", 3, "4° Grupo C"), eq2: getEq(grupos, "C", 4, "5° Grupo C") }
      ]
    }
  ];

  const jornadasFemenino = [
    {
      fecha: "01 de Agosto",
      titulo: "Jornada 1 (Inauguración)",
      partidos: [
        { id: 'J0-P0', grupo: "A vs B", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "B", 0, "1° Grupo B") },
        { id: 'J0-P1', grupo: "A vs C", eq1: getEq(grupos, "A", 1, "2° Grupo A"), eq2: getEq(grupos, "C", 0, "1° Grupo C") },
        { id: 'J0-P2', grupo: "A vs B", eq1: getEq(grupos, "A", 2, "3° Grupo A"), eq2: getEq(grupos, "B", 1, "2° Grupo B") },
        { id: 'J0-P3', grupo: "B vs C", eq1: getEq(grupos, "B", 2, "3° Grupo B"), eq2: getEq(grupos, "C", 1, "2° Grupo C") }
      ]
    },
    {
      fecha: "15 de Agosto",
      titulo: "Jornada 2",
      partidos: [
        { id: 'J1-P0', grupo: "1A vs 1C", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "C", 0, "1° Grupo C"), hora: "10:20", cancha: "Sintética" },
        { id: 'J1-P1', grupo: "1B vs 2C", eq1: getEq(grupos, "B", 0, "1° Grupo B"), eq2: getEq(grupos, "C", 1, "2° Grupo C"), hora: "11:30", cancha: "Sintética" },
        { id: 'J1-P2', grupo: "3A vs 3C", eq1: getEq(grupos, "A", 2, "3° Grupo A"), eq2: getEq(grupos, "C", 2, "3° Grupo C"), hora: "12:40", cancha: "Sintética" },
        { id: 'J1-P3', grupo: "2A vs 2B", eq1: getEq(grupos, "A", 1, "2° Grupo A"), eq2: getEq(grupos, "B", 1, "2° Grupo B"), hora: "13:50", cancha: "Sintética" }
      ]
    },
    {
      fecha: "22 de Agosto",
      titulo: "Jornada 3",
      partidos: [
        { id: 'J2-P0', grupo: "B vs C", eq1: getEq(grupos, "B", 0, "1° Grupo B"), eq2: getEq(grupos, "C", 0, "1° Grupo C") },
        { id: 'J2-P1', grupo: "A vs B", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "B", 1, "2° Grupo B") },
        { id: 'J2-P2', grupo: "A vs C", eq1: getEq(grupos, "A", 1, "2° Grupo A"), eq2: getEq(grupos, "C", 1, "2° Grupo C") },
        { id: 'J2-P3', grupo: "B vs C", eq1: getEq(grupos, "B", 2, "3° Grupo B"), eq2: getEq(grupos, "C", 2, "3° Grupo C") }
      ]
    },
    {
      fecha: "29 de Agosto",
      titulo: "Jornada 4",
      partidos: [
        { id: 'J3-P0', grupo: "B vs C", eq1: getEq(grupos, "B", 1, "2° Grupo B"), eq2: getEq(grupos, "C", 0, "1° Grupo C") },
        { id: 'J3-P1', grupo: "A vs C", eq1: getEq(grupos, "A", 1, "2° Grupo A"), eq2: getEq(grupos, "C", 2, "3° Grupo C") },
        { id: 'J3-P2', grupo: "A vs B", eq1: getEq(grupos, "A", 2, "3° Grupo A"), eq2: getEq(grupos, "B", 2, "3° Grupo B") }
      ]
    },
    {
      fecha: "05 de Septiembre",
      titulo: "Jornada 5",
      partidos: [
        { id: 'J4-P0', grupo: "A vs C", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "C", 1, "2° Grupo C") },
        { id: 'J4-P1', grupo: "B vs C", eq1: getEq(grupos, "B", 0, "1° Grupo B"), eq2: getEq(grupos, "C", 2, "3° Grupo C") },
        { id: 'J4-P2', grupo: "A vs B", eq1: getEq(grupos, "A", 1, "2° Grupo A"), eq2: getEq(grupos, "B", 2, "3° Grupo B") },
        { id: 'J4-P3', grupo: "A vs C", eq1: getEq(grupos, "A", 2, "3° Grupo A"), eq2: getEq(grupos, "C", 0, "1° Grupo C") }
      ]
    },
    {
      fecha: "12 de Septiembre",
      titulo: "Jornada 6",
      partidos: [
        { id: 'J5-P0', grupo: "A vs B", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "B", 2, "3° Grupo B") },
        { id: 'J5-P1', grupo: "A vs B", eq1: getEq(grupos, "A", 1, "2° Grupo A"), eq2: getEq(grupos, "B", 0, "1° Grupo B") },
        { id: 'J5-P2', grupo: "B vs C", eq1: getEq(grupos, "B", 1, "2° Grupo B"), eq2: getEq(grupos, "C", 2, "3° Grupo C") },
        { id: 'J5-P3', grupo: "A vs C", eq1: getEq(grupos, "A", 2, "3° Grupo A"), eq2: getEq(grupos, "C", 1, "2° Grupo C") }
      ]
    },
    {
      fecha: "19 de Septiembre",
      titulo: "Jornada 7 (Cierre de Clasificación)",
      partidos: [
        { id: 'J6-P0', grupo: "A vs C", eq1: getEq(grupos, "A", 0, "1° Grupo A"), eq2: getEq(grupos, "C", 2, "3° Grupo C") },
        { id: 'J6-P1', grupo: "B vs C", eq1: getEq(grupos, "B", 1, "2° Grupo B"), eq2: getEq(grupos, "C", 1, "2° Grupo C") },
        { id: 'J6-P2', grupo: "A vs B", eq1: getEq(grupos, "A", 2, "3° Grupo A"), eq2: getEq(grupos, "B", 0, "1° Grupo B") },
        { id: 'J6-P3', grupo: "B vs C", eq1: getEq(grupos, "B", 2, "3° Grupo B"), eq2: getEq(grupos, "C", 0, "1° Grupo C") }
      ]
    }
  ];

  return categoria === 'femenino' ? jornadasFemenino : jornadasMasculino;
}

export function calcularEstadisticas(grupos, resultados, categoria) {
  const stats = {};

  if (grupos) {
    Object.values(grupos).flat().forEach(equipo => {
      stats[equipo.toUpperCase()] = { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 };
    });
  }

  const jornadas = getJornadas(grupos, categoria);

  jornadas.forEach(j => {
    if (j.feriado) return;
    j.partidos.forEach(p => {
      const result = resultados && resultados[p.id];
      if (result && p.eq1.confirmado && p.eq2.confirmado) {
        const eq1 = p.eq1.nombre.toUpperCase();
        const eq2 = p.eq2.nombre.toUpperCase();

        if (!stats[eq1]) stats[eq1] = { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 };
        if (!stats[eq2]) stats[eq2] = { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 };

        stats[eq1].pj += 1;
        stats[eq2].pj += 1;
        stats[eq1].gf += result.res1;
        stats[eq1].gc += result.res2;
        stats[eq2].gf += result.res2;
        stats[eq2].gc += result.res1;

        if (result.res1 > result.res2) {
          stats[eq1].pg += 1;
          stats[eq1].pts += 3;
          stats[eq2].pp += 1;
        } else if (result.res1 < result.res2) {
          stats[eq2].pg += 1;
          stats[eq2].pts += 3;
          stats[eq1].pp += 1;
        } else {
          stats[eq1].pe += 1;
          stats[eq1].pts += 1;
          stats[eq2].pe += 1;
          stats[eq2].pts += 1;
        }
      }
    });
  });

  return stats;
}
