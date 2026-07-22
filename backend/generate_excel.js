const ExcelJS = require('exceljs');
const path = require('path');

async function generarExcelTorneo() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Comité Organizador - Torneo Interfarmacéutico 2026';
  workbook.lastModifiedBy = 'Sistema Ejecutivo de Sorteo 3D - Cancha Única';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Estilos y paleta de colores oficiales
  const colorHeaderBg = '081225'; // Azul noche corporativo
  const colorSubHeaderBg = '1E293B'; // Pizarra oscuro
  const fontMain = { name: 'Segoe UI', size: 11 };
  const fontHeader = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFF59E0B' } };
  const fontSection = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };

  const borderThin = {
    top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
    left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
    bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
    right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
  };

  // ==========================================
  // HOJA 1: RESUMEN Y SISTEMA DE COMPETICIÓN
  // ==========================================
  const sheet1 = workbook.addWorksheet('Resumen y Sistema', { views: [{ showGridLines: true }] });
  sheet1.columns = [
    { key: 'campo', width: 30 },
    { key: 'detalle', width: 65 },
    { key: 'obs', width: 38 }
  ];

  sheet1.mergeCells('A1:C1');
  const title1 = sheet1.getCell('A1');
  title1.value = '🏆 TORNEO INTERFARMACÉUTICO 2026 - SISTEMA DE COMPETICIÓN (CANCHA ÚNICA)';
  title1.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  title1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHeaderBg } };
  title1.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet1.getRow(1).height = 42;

  const filasResumen = [
    ['Periodo del Torneo', '1 de Agosto de 2026 al 3 de Octubre de 2026 (9 Sábados efectivos de juego)', 'Complejo Deportivo Interfarmacéutico'],
    ['Feriado Oficial (Descanso)', 'Sábado 8 de Agosto de 2026 (Feriado Nacional - Sin Partidos)', 'Jornada de pausa para todos los equipos'],
    ['Duración de los Partidos', '65 minutos exactos (2 tiempos de 30 minutos + 5 minutos de descanso)', 'Tiempos oficiales aplicables a todas las categorías'],
    ['Bloques / Horarios', 'Slots de 70 minutos (65 min partido + 5 min rotación de equipos)', 'Garantiza puntualidad extrema sin retrasar la jornada'],
    ['Jornada Inaugural (1 Ago)', 'Ceremonia en la mañana y partidos a partir de las 12:00 PM (4 encuentros)', 'Apertura oficial del torneo con desfile y sorteo'],
    ['Sábados Regulares (9 a 4)', 'Franjas continuas: 09:00 AM, 10:10 AM, 11:20 AM, 12:30 PM, 01:40 PM y 02:50 PM', '6 partidos por sábado regular en Cancha Única'],
    ['Infraestructura', 'Cancha Principal Única (Encuentros en formato secuencial)', 'Todos los equipos comparten el escenario principal'],
    ['Total de Empresas', '27 Empresas del Sector Farmacéutico Ecuatoriano', '18 Categoría Masculina | 9 Categoría Femenina'],
    ['Sistemas de Puntuación', 'Victoria: 3 pts | Empate: 1 pt | Derrota: 0 pts', 'Criterio de desempate: Diferencia de Goles > Goles a Favor > Fair Play'],
    ['', '', ''],
    ['🏆 CATEGORÍA MASCULINA (18 EQUIPOS)', 'FORMATO SUIZO DE GRUPOS Y ELIMINATORIAS DIRECTAS', ''],
    ['Estructura de Grupos', '3 Grupos de 6 equipos (Grupo A, Grupo B y Grupo C)', 'Sistema Suizo / 3 Fechas Oficiales por equipo (24 partidos de grupo)'],
    ['Clasificados a Cuartos', 'Top 2 de cada grupo (6 equipos) + 2 Mejores Terceros de la tabla general', 'Total de 8 equipos clasificados a Cuartos de Final'],
    ['Criterio Mejores Terceros', 'Se ordenan los 3ros de cada grupo por Puntos > Diferencia de Goles > Goles a Favor', 'Los 2 primeros avanzan a Cuartos de Final (19 de Septiembre)'],
    ['Fechas de Eliminatoria', 'Cuartos: 19 de Sep | Semifinales: 26 de Sep | Gran Final y 3er Puesto: 3 de Oct', 'Partidos a eliminación directa en Cancha Única (con penales directos en empate)'],
    ['', '', ''],
    ['🌸 CATEGORÍA FEMENINA (9 EQUIPOS)', 'FORMATO ROUND-ROBIN, PLAY-IN Y ELIMINATORIAS DIRECTAS', ''],
    ['Estructura de Grupos', 'Grupo A (5 equipos, 6 pdos) | Grupo B (4 equipos, 4 pdos)', 'Total de 10 partidos de fase de grupos perfectamente distribuidos'],
    ['Clasificados Directos', 'Los 1° lugares del Grupo A y Grupo B clasifican DIRECTAMENTE a Semifinales', 'Premio a la excelencia y liderazgo en la fase de grupos'],
    ['Fase Previa (Play-In)', 'Los 2° y 3° lugares de cada grupo disputan un partido de Repechaje / Play-In', '19 de Septiembre (2° Grupo A vs 3° Grupo B / 2° Grupo B vs 3° Grupo A)'],
    ['Fechas de Eliminatoria', 'Play-In: 19 de Sep | Semifinales: 26 de Sep | Gran Final y 3er Puesto: 3 de Oct', 'Partidos de alta intensidad definitorios por el título en Cancha Única']
  ];

  filasResumen.forEach((row, idx) => {
    const r = sheet1.addRow(row);
    r.font = fontMain;
    r.height = 24;
    r.eachCell(c => { c.border = borderThin; c.alignment = { vertical: 'middle' }; });
    if (row[0].includes('CATEGORÍA')) {
      sheet1.mergeCells(`A${r.number}:C${r.number}`);
      const c = sheet1.getCell(`A${r.number}`);
      c.font = fontSection;
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorSubHeaderBg } };
      c.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    } else if (idx % 2 === 0 && row[0] !== '') {
      r.eachCell(c => c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } });
    }
  });

  // ==========================================
  // HOJA 2: CRUCES MASCULINO (18 EQUIPOS)
  // ==========================================
  const sheet2 = workbook.addWorksheet('Cruces Masculino', { views: [{ showGridLines: true }] });
  sheet2.columns = [
    { key: 'llave', width: 22 },
    { key: 'fase', width: 20 },
    { key: 'fecha', width: 16 },
    { key: 'hora', width: 14 },
    { key: 'cancha', width: 22 },
    { key: 'eq1', width: 28 },
    { key: 'vs', width: 8 },
    { key: 'eq2', width: 28 },
    { key: 'obs', width: 38 }
  ];

  sheet2.mergeCells('A1:I1');
  const title2 = sheet2.getCell('A1');
  title2.value = '🏆 FIXTURE Y CUADRO DE ELIMINATORIAS MASCULINO (TOP 8 EN CANCHA ÚNICA)';
  title2.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFFFF' } };
  title2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHeaderBg } };
  title2.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet2.getRow(1).height = 38;

  const headers2 = ['Identificador / Llave', 'Fase del Torneo', 'Fecha Oficial', 'Horario', 'Cancha', 'Equipo Local (Condición)', 'VS', 'Equipo Visitante (Condición)', 'Observaciones / Reglas'];
  const rHeader2 = sheet2.addRow(headers2);
  rHeader2.height = 26;
  rHeader2.eachCell(c => {
    c.font = fontHeader;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorSubHeaderBg } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
    c.border = borderThin;
  });

  const crucesMasculino = [
    ['Llave 1 (Cuartos 1)', 'Cuartos de Final', 'Sáb 19-Sep-2026', '12:00 PM', 'Cancha Principal Única', '1° Grupo A', 'VS', '2° Mejor Tercero', 'Eliminación directa. En empate penales directos'],
    ['Llave 2 (Cuartos 2)', 'Cuartos de Final', 'Sáb 19-Sep-2026', '13:00 PM', 'Cancha Principal Única', '1° Grupo B', 'VS', '2° Grupo C', 'Eliminación directa. En empate penales directos'],
    ['Llave 3 (Cuartos 3)', 'Cuartos de Final', 'Sáb 19-Sep-2026', '14:00 PM', 'Cancha Principal Única', '1° Grupo C', 'VS', '1° Mejor Tercero', 'Eliminación directa. En empate penales directos'],
    ['Llave 4 (Cuartos 4)', 'Cuartos de Final', 'Sáb 19-Sep-2026', '15:00 PM', 'Cancha Principal Única', '2° Grupo A', 'VS', '2° Grupo B', 'Eliminación directa. En empate penales directos'],
    ['', '', '', '', '', '', '', '', ''],
    ['Semifinal 1', 'Semifinales', 'Sáb 26-Sep-2026', '13:00 PM', 'Cancha Principal Única', 'Ganador Llave 1', 'VS', 'Ganador Llave 2', 'Avanza a la Gran Final del Torneo (26 de Septiembre)'],
    ['Semifinal 2', 'Semifinales', 'Sáb 26-Sep-2026', '14:30 PM', 'Cancha Principal Única', 'Ganador Llave 3', 'VS', 'Ganador Llave 4', 'Avanza a la Gran Final del Torneo (26 de Septiembre)'],
    ['', '', '', '', '', '', '', '', ''],
    ['3er Puesto (Bronce)', 'Disputa 3er Puesto', 'Sáb 03-Oct-2026', '11:30 AM', 'Cancha Principal Única', 'Perdedor Semifinal 1', 'VS', 'Perdedor Semifinal 2', 'Medalla de Bronce - Torneo Interfarmacéutico'],
    ['🏆 GRAN FINAL', 'Gran Final Oro', 'Sáb 03-Oct-2026', '14:30 PM', 'Cancha Principal Única', 'Ganador Semifinal 1', 'VS', 'Ganador Semifinal 2', 'Campeón Absoluto Masculino 2026 - Trofeo y Honor']
  ];

  crucesMasculino.forEach((row) => {
    const r = sheet2.addRow(row);
    r.height = 24;
    r.font = fontMain;
    r.eachCell((c, colNumber) => {
      c.border = borderThin;
      c.alignment = { vertical: 'middle', horizontal: [1, 2, 3, 4, 5, 7].includes(colNumber) ? 'center' : 'left' };
      if (row[0].includes('GRAN FINAL')) {
        c.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FF92400E' } };
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
      } else if (row[0].includes('Semifinal')) {
        c.font = { name: 'Segoe UI', size: 11, bold: true };
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
      }
    });
  });

  // ==========================================
  // HOJA 3: CRUCES FEMENINO (9 EQUIPOS)
  // ==========================================
  const sheet3 = workbook.addWorksheet('Cruces Femenino', { views: [{ showGridLines: true }] });
  sheet3.columns = [
    { key: 'llave', width: 24 },
    { key: 'fase', width: 22 },
    { key: 'fecha', width: 16 },
    { key: 'hora', width: 14 },
    { key: 'cancha', width: 22 },
    { key: 'eq1', width: 28 },
    { key: 'vs', width: 8 },
    { key: 'eq2', width: 28 },
    { key: 'obs', width: 38 }
  ];

  sheet3.mergeCells('A1:I1');
  const title3 = sheet3.getCell('A1');
  title3.value = '🌸 FIXTURE Y CUADRO DE ELIMINATORIAS FEMENINO (PLAY-IN & SEMIFINALES)';
  title3.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFFFF' } };
  title3.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHeaderBg } };
  title3.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet3.getRow(1).height = 38;

  const rHeader3 = sheet3.addRow(headers2);
  rHeader3.height = 26;
  rHeader3.eachCell(c => {
    c.font = fontHeader;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorSubHeaderBg } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
    c.border = borderThin;
  });

  const crucesFemenino = [
    ['Repechaje 1 (Play-In)', 'Play-In (Repechaje)', 'Sáb 19-Sep-2026', '10:00 AM', 'Cancha Principal Única', '2° Grupo A', 'VS', '3° Grupo B', 'Definición por el cupo a Semifinal 2 (19 de Septiembre)'],
    ['Repechaje 2 (Play-In)', 'Play-In (Repechaje)', 'Sáb 19-Sep-2026', '11:00 AM', 'Cancha Principal Única', '2° Grupo B', 'VS', '3° Grupo A', 'Definición por el cupo a Semifinal 1 (19 de Septiembre)'],
    ['* Clasificados Directos *', 'Paso Directo a Semis', 'Sáb 19-Sep-2026', 'Descanso', 'Cancha Principal Única', '1° Grupo A y 1° Grupo B', '-', 'Clasifican directo por ser líderes de grupo', 'Premio al liderazgo en Fase de Grupos'],
    ['', '', '', '', '', '', '', '', ''],
    ['Semifinal 1', 'Semifinales', 'Sáb 26-Sep-2026', '10:00 AM', 'Cancha Principal Única', '1° Grupo A (Directo)', 'VS', 'Ganador Repechaje 2', 'Avanza a la Gran Final Femenina (26 de Septiembre)'],
    ['Semifinal 2', 'Semifinales', 'Sáb 26-Sep-2026', '11:30 AM', 'Cancha Principal Única', '1° Grupo B (Directo)', 'VS', 'Ganador Repechaje 1', 'Avanza a la Gran Final Femenina (26 de Septiembre)'],
    ['', '', '', '', '', '', '', '', ''],
    ['3er Puesto (Bronce)', 'Disputa 3er Puesto', 'Sáb 03-Oct-2026', '10:00 AM', 'Cancha Principal Única', 'Perdedor Semifinal 1', 'VS', 'Perdedor Semifinal 2', 'Medalla de Bronce Femenina 2026'],
    ['🏆 GRAN FINAL', 'Gran Final Oro', 'Sáb 03-Oct-2026', '13:00 PM', 'Cancha Principal Única', 'Ganadora Semifinal 1', 'VS', 'Ganadora Semifinal 2', 'Campeona Absoluta Femenina 2026 - Coronación']
  ];

  crucesFemenino.forEach((row) => {
    const r = sheet3.addRow(row);
    r.height = 24;
    r.font = fontMain;
    r.eachCell((c, colNumber) => {
      c.border = borderThin;
      c.alignment = { vertical: 'middle', horizontal: [1, 2, 3, 4, 5, 7].includes(colNumber) ? 'center' : 'left' };
      if (row[0].includes('GRAN FINAL')) {
        c.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FF92400E' } };
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
      } else if (row[0].includes('Semifinal') || row[0].includes('Clasificados')) {
        c.font = { name: 'Segoe UI', size: 11, bold: true };
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
      }
    });
  });

  // ==========================================
  // HOJA 4: CALENDARIO GENERAL CANCHA ÚNICA
  // ==========================================
  const sheet4 = workbook.addWorksheet('Calendario General', { views: [{ showGridLines: true }] });
  sheet4.columns = [
    { key: 'jornada', width: 18 },
    { key: 'fecha', width: 18 },
    { key: 'cat', width: 16 },
    { key: 'grupo', width: 16 },
    { key: 'hora', width: 14 },
    { key: 'cancha', width: 24 },
    { key: 'local', width: 28 },
    { key: 'vs', width: 8 },
    { key: 'visita', width: 28 }
  ];

  sheet4.mergeCells('A1:I1');
  const title4 = sheet4.getCell('A1');
  title4.value = '📅 CALENDARIO GENERAL DE PARTIDOS - CANCHA PRINCIPAL ÚNICA (09:00 AM - 16:00 PM)';
  title4.font = { name: 'Segoe UI', size: 15, bold: true, color: { argb: 'FFFFFFFF' } };
  title4.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHeaderBg } };
  title4.alignment = { vertical: 'middle', horizontal: 'center' };
  sheet4.getRow(1).height = 38;

  const headers4 = ['Jornada / Sem.', 'Fecha Oficial', 'Categoría', 'División / Fase', 'Horario', 'Escenario', 'Equipo Local', 'VS', 'Equipo Visitante'];
  const rHeader4 = sheet4.addRow(headers4);
  rHeader4.height = 26;
  rHeader4.eachCell(c => {
    c.font = fontHeader;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorSubHeaderBg } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
    c.border = borderThin;
  });

  const jornadasGeneral = [
    {
      num: 1,
      fecha: 'Sáb 01-Ago-2026',
      titulo: 'JORNADA 1 - INAUGURACIÓN OFICIAL (PARTIDOS DESDE LAS 12:00 PM)',
      partidos: [
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '12:00 PM', eq1: 'Masculino Gr. A - Eq. 1 (Clarel)', eq2: 'Masculino Gr. A - Eq. 2' },
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '01:10 PM', eq1: 'Masculino Gr. A - Eq. 3', eq2: 'Masculino Gr. A - Eq. 4' },
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '02:20 PM', eq1: 'Masculino Gr. B - Eq. 1 (Life)', eq2: 'Masculino Gr. B - Eq. 2' },
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '03:30 PM', eq1: 'Masculino Gr. B - Eq. 3', eq2: 'Masculino Gr. B - Eq. 4' }
      ]
    },
    {
      num: 'DESCANSO',
      fecha: 'Sáb 08-Ago-2026',
      titulo: 'FERIADO NACIONAL DEL 8 DE AGOSTO - SIN ACTIVIDAD OFICIAL',
      feriado: true
    },
    {
      num: 2,
      fecha: 'Sáb 15-Ago-2026',
      titulo: 'JORNADA 2 - CONTINUACIÓN FASE DE GRUPOS',
      partidos: [
        { cat: '🏆 Masculino', div: 'Grupo C', hora: '09:00 AM', eq1: 'Masculino Gr. C - Eq. 1', eq2: 'Masculino Gr. C - Eq. 2' },
        { cat: '🏆 Masculino', div: 'Grupo C', hora: '10:10 AM', eq1: 'Masculino Gr. C - Eq. 3', eq2: 'Masculino Gr. C - Eq. 4' },
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '11:20 AM', eq1: 'Masculino Gr. A - Eq. 5', eq2: 'Masculino Gr. A - Eq. 6' },
        { cat: '🌸 Femenino', div: 'Grupo A', hora: '12:30 PM', eq1: 'Femenino Gr. A - Eq. 1', eq2: 'Femenino Gr. A - Eq. 2' },
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '01:40 PM', eq1: 'Masculino Gr. B - Eq. 5', eq2: 'Masculino Gr. B - Eq. 6' },
        { cat: '🌸 Femenino', div: 'Grupo B', hora: '02:50 PM', eq1: 'Femenino Gr. B - Eq. 1', eq2: 'Femenino Gr. B - Eq. 2' }
      ]
    },
    {
      num: 3,
      fecha: 'Sáb 22-Ago-2026',
      titulo: 'JORNADA 3 - FASE DE GRUPOS (FECHA 2 SUIZO)',
      partidos: [
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '09:00 AM', eq1: 'Masculino Gr. A - Eq. 1 (Clarel)', eq2: 'Masculino Gr. A - Eq. 3' },
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '10:10 AM', eq1: 'Masculino Gr. A - Eq. 2', eq2: 'Masculino Gr. A - Eq. 5' },
        { cat: '🌸 Femenino', div: 'Grupo A', hora: '11:20 AM', eq1: 'Femenino Gr. A - Eq. 3', eq2: 'Femenino Gr. A - Eq. 4' },
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '12:30 PM', eq1: 'Masculino Gr. B - Eq. 1 (Life)', eq2: 'Masculino Gr. B - Eq. 3' },
        { cat: '🏆 Masculino', div: 'Grupo C', hora: '01:40 PM', eq1: 'Masculino Gr. C - Eq. 1', eq2: 'Masculino Gr. C - Eq. 3' },
        { cat: '🌸 Femenino', div: 'Grupo B', hora: '02:50 PM', eq1: 'Femenino Gr. B - Eq. 3', eq2: 'Femenino Gr. B - Eq. 4' }
      ]
    },
    {
      num: 4,
      fecha: 'Sáb 29-Ago-2026',
      titulo: 'JORNADA 4 - ECUADOR DE LA FASE DE GRUPOS',
      partidos: [
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '09:00 AM', eq1: 'Masculino Gr. B - Eq. 2', eq2: 'Masculino Gr. B - Eq. 5' },
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '10:10 AM', eq1: 'Masculino Gr. B - Eq. 4', eq2: 'Masculino Gr. B - Eq. 6' },
        { cat: '🏆 Masculino', div: 'Grupo C', hora: '11:20 AM', eq1: 'Masculino Gr. C - Eq. 2', eq2: 'Masculino Gr. C - Eq. 5' },
        { cat: '🏆 Masculino', div: 'Grupo C', hora: '12:30 PM', eq1: 'Masculino Gr. C - Eq. 4', eq2: 'Masculino Gr. C - Eq. 6' },
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '01:40 PM', eq1: 'Masculino Gr. A - Eq. 4', eq2: 'Masculino Gr. A - Eq. 6' },
        { cat: '🌸 Femenino', div: 'Grupo A', hora: '02:50 PM', eq1: 'Femenino Gr. A - Eq. 5', eq2: 'Femenino Gr. A - Eq. 1' }
      ]
    },
    {
      num: 5,
      fecha: 'Sáb 05-Sep-2026',
      titulo: 'JORNADA 5 - FASE DE GRUPOS (DEFINICIONES PREVIAS)',
      partidos: [
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '09:00 AM', eq1: 'Masculino Gr. A - Eq. 1 (Clarel)', eq2: 'Masculino Gr. A - Eq. 6' },
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '10:10 AM', eq1: 'Masculino Gr. A - Eq. 2', eq2: 'Masculino Gr. A - Eq. 4' },
        { cat: '🌸 Femenino', div: 'Grupo A', hora: '11:20 AM', eq1: 'Femenino Gr. A - Eq. 2', eq2: 'Femenino Gr. A - Eq. 3' },
        { cat: '🌸 Femenino', div: 'Grupo A', hora: '12:30 PM', eq1: 'Femenino Gr. A - Eq. 4', eq2: 'Femenino Gr. A - Eq. 5' },
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '01:40 PM', eq1: 'Masculino Gr. B - Eq. 1 (Life)', eq2: 'Masculino Gr. B - Eq. 6' },
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '02:50 PM', eq1: 'Masculino Gr. B - Eq. 2', eq2: 'Masculino Gr. B - Eq. 4' }
      ]
    },
    {
      num: 6,
      fecha: 'Sáb 12-Sep-2026',
      titulo: 'JORNADA 6 - CIERRE Y CLASIFICACIÓN DIRECTA GRUPOS',
      partidos: [
        { cat: '🏆 Masculino', div: 'Grupo C', hora: '09:00 AM', eq1: 'Masculino Gr. C - Eq. 1', eq2: 'Masculino Gr. C - Eq. 6' },
        { cat: '🏆 Masculino', div: 'Grupo C', hora: '10:10 AM', eq1: 'Masculino Gr. C - Eq. 2', eq2: 'Masculino Gr. C - Eq. 4' },
        { cat: '🏆 Masculino', div: 'Grupo A', hora: '11:20 AM', eq1: 'Masculino Gr. A - Eq. 3', eq2: 'Masculino Gr. A - Eq. 5' },
        { cat: '🏆 Masculino', div: 'Grupo B', hora: '12:30 PM', eq1: 'Masculino Gr. B - Eq. 3', eq2: 'Masculino Gr. B - Eq. 5' },
        { cat: '🏆 Masculino', div: 'Grupo C', hora: '01:40 PM', eq1: 'Masculino Gr. C - Eq. 3', eq2: 'Masculino Gr. C - Eq. 5' },
        { cat: '🌸 Femenino', div: 'Grupo B', hora: '02:50 PM', eq1: 'Femenino Gr. B - Eq. 1', eq2: 'Femenino Gr. B - Eq. 4' }
      ]
    },
    {
      num: 7,
      fecha: 'Sáb 19-Sep-2026',
      titulo: 'JORNADA 7 - CUARTOS MASCULINOS Y REPECHAJES FEMENINOS',
      partidos: [
        { cat: '🌸 Femenino', div: 'Play-In Rep. 1', hora: '09:00 AM', eq1: '2° Grupo A Femenino', eq2: '3° Grupo B Femenino' },
        { cat: '🌸 Femenino', div: 'Play-In Rep. 2', hora: '10:10 AM', eq1: '2° Grupo B Femenino', eq2: '3° Grupo A Femenino' },
        { cat: '🏆 Masculino', div: 'Cuartos Llave 1', hora: '11:20 AM', eq1: '1° Grupo A Masculino', eq2: '2° Mejor Tercero' },
        { cat: '🏆 Masculino', div: 'Cuartos Llave 2', hora: '12:30 PM', eq1: '1° Grupo B Masculino', eq2: '2° Grupo C Masculino' },
        { cat: '🏆 Masculino', div: 'Cuartos Llave 3', hora: '01:40 PM', eq1: '1° Grupo C Masculino', eq2: '1° Mejor Tercero' },
        { cat: '🏆 Masculino', div: 'Cuartos Llave 4', hora: '02:50 PM', eq1: '2° Grupo A Masculino', eq2: '2° Grupo B Masculino' }
      ]
    },
    {
      num: 8,
      fecha: 'Sáb 26-Sep-2026',
      titulo: '⚡ JORNADA 8 - SEMIFINALES OFICIALES (MASCULINO Y FEMENINO)',
      partidos: [
        { cat: '🌸 Femenino', div: 'Semifinal 1', hora: '10:00 AM', eq1: '1° Grupo A (Directo)', eq2: 'Ganador Repechaje 2' },
        { cat: '🌸 Femenino', div: 'Semifinal 2', hora: '11:15 AM', eq1: '1° Grupo B (Directo)', eq2: 'Ganador Repechaje 1' },
        { cat: '🏆 Masculino', div: 'Semifinal 1', hora: '12:30 PM', eq1: 'Ganador Llave 1', eq2: 'Ganador Llave 2' },
        { cat: '🏆 Masculino', div: 'Semifinal 2', hora: '01:45 PM', eq1: 'Ganador Llave 3', eq2: 'Ganador Llave 4' }
      ]
    },
    {
      num: 9,
      fecha: 'Sáb 03-Oct-2026',
      titulo: '🏆 JORNADA 9 - ÚNICAMENTE FINALES Y PREMIACIÓN OFICIAL',
      partidos: [
        { cat: '🌸 Femenino', div: 'Disputa Bronce', hora: '10:00 AM', eq1: 'Perdedora Semifinal 1', eq2: 'Perdedora Semifinal 2' },
        { cat: '🏆 Masculino', div: 'Disputa Bronce', hora: '11:15 AM', eq1: 'Perdedor Semifinal 1', eq2: 'Perdedor Semifinal 2' },
        { cat: '🌸 Femenino', div: '🏆 GRAN FINAL ORO', hora: '12:30 PM', eq1: 'Ganadora Semifinal 1', eq2: 'Ganadora Semifinal 2' },
        { cat: '🏆 Masculino', div: '🏆 GRAN FINAL ORO', hora: '01:45 PM', eq1: 'Ganador Semifinal 1', eq2: 'Ganador Semifinal 2' }
      ]
    }
  ];

  jornadasGeneral.forEach((j) => {
    const rJornada = sheet4.addRow([
      typeof j.num === 'number' ? `JORNADA ${j.num}` : j.num,
      j.fecha,
      j.titulo,
      '', '', '', '', '', ''
    ]);
    sheet4.mergeCells(`A${rJornada.number}:I${rJornada.number}`);
    const cJ = sheet4.getCell(`A${rJornada.number}`);
    cJ.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
    cJ.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: j.feriado ? 'FF991B1B' : (typeof j.num === 'number' && j.num >= 8 ? 'FFB45309' : 'FF334155') }
    };
    cJ.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    rJornada.height = 28;

    if (j.feriado) {
      const rDesc = sheet4.addRow(['-', j.fecha, 'TODAS LAS CATEGORÍAS', 'PAUSA NACIONAL', 'TODO EL DÍA', 'COMPLEJO CERRADO', 'SIN ENCUENTROS', '-', 'FERIADO 10 DE AGOSTO (TRASLADADO AL 8)']);
      rDesc.font = { name: 'Segoe UI', size: 11, italic: true, color: { argb: 'FF94A3B8' } };
      rDesc.height = 24;
      rDesc.eachCell(c => { c.border = borderThin; c.alignment = { vertical: 'middle', horizontal: 'center' }; });
    } else if (j.partidos) {
      j.partidos.forEach((p) => {
        const r = sheet4.addRow([
          `Semana ${j.num}`,
          j.fecha,
          p.cat,
          p.div,
          p.hora,
          'Cancha Principal Única',
          p.eq1,
          'VS',
          p.eq2
        ]);
        r.font = fontMain;
        r.height = 23;
        r.eachCell((c, colIdx) => {
          c.border = borderThin;
          c.alignment = { vertical: 'middle', horizontal: [1, 2, 3, 4, 5, 6, 8].includes(colIdx) ? 'center' : 'left' };
          if (p.div.includes('GRAN FINAL')) {
            c.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF92400E' } };
            c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
          } else if (p.div.includes('Semifinal')) {
            c.font = { name: 'Segoe UI', size: 11, bold: true };
            c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
          }
        });
      });
    }
  });

  const targetPathRoot = path.join(__dirname, '..', 'Fixtures_y_Cruces_Torneo_Interfarmaceutico_2026.xlsx');
  const targetPathBackend = path.join(__dirname, 'Fixtures_y_Cruces_Torneo_Interfarmaceutico_2026.xlsx');
  const targetPathBackup = path.join(__dirname, '..', 'Fixtures_y_Cruces_Torneo_2026_Actualizado.xlsx');
  
  try {
    await workbook.xlsx.writeFile(targetPathBackend);
    console.log('✅ Archivo Excel generado exitosamente en:', targetPathBackend);
  } catch (err) {
    console.warn('⚠️ No se pudo escribir en backend:', err.message);
  }

  try {
    await workbook.xlsx.writeFile(targetPathRoot);
    console.log('✅ Archivo Excel generado exitosamente en:', targetPathRoot);
  } catch (err) {
    if (err.code === 'EBUSY') {
      console.warn('⚠️ El archivo en la raíz está abierto en Excel. Guardando como Fixtures_y_Cruces_Torneo_2026_Actualizado.xlsx...');
      await workbook.xlsx.writeFile(targetPathBackup);
      console.log('✅ Archivo Excel alternativo generado en:', targetPathBackup);
    } else {
      console.error('❌ Error al guardar en raíz:', err.message);
    }
  }
}

generarExcelTorneo().catch(console.error);
