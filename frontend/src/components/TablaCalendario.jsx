import { useState } from 'react';
import { Calendar, Clock, Trophy, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TablaCalendario({ grupos, categoria = 'masculino' }) {
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState(0);

  const groupsExist = (g, letra) => g && Array.isArray(g[letra]);

  const getEq = (grupo, index, placeholder) => {
    if (grupos && groupsExist(grupos, grupo) && grupos[grupo][index]) {
      return { nombre: grupos[grupo][index], confirmado: true };
    }
    return { nombre: placeholder, confirmado: false };
  };

  // Generación de calendario oficial predefinido (1 Ago - 3 Oct, Cancha Principal Única, franjas de 70 min, partidos de 65 min)
  const jornadasMasculino = [
    {
      etiqueta: "01-Ago (Inaug.)",
      fecha: "Sábado, 1 de Agosto 2026",
      titulo: "Jornada 1 - Inauguración Oficial (Partidos desde 12:00 PM)",
      partidos: [
        { hora: "12:00 PM", grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A (Clarel)"), eq2: getEq("A", 1, "2° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:10 PM", grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 3, "4° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "02:20 PM", grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B (Life)"), eq2: getEq("B", 1, "2° Grupo B"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "03:30 PM", grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 3, "4° Grupo B"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "08-Ago (Feriado)",
      feriado: true,
      fecha: "Sábado, 8 de Agosto 2026",
      titulo: "PAUSA OFICIAL - FERIADO NACIONAL DEL 8 DE AGOSTO",
      partidos: []
    },
    {
      etiqueta: "15-Ago",
      fecha: "Sábado, 15 de Agosto 2026",
      titulo: "Jornada 2 - Continuación Fase de Grupos",
      partidos: [
        { hora: "09:00 AM", grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 1, "2° Grupo C"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "10:10 AM", grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 3, "4° Grupo C"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "11:20 AM", grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 5, "6° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:40 PM", grupo: "Grupo B", eq1: getEq("B", 4, "5° Grupo B"), eq2: getEq("B", 5, "6° Grupo B"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "02:50 PM", grupo: "Grupo C", eq1: getEq("C", 4, "5° Grupo C"), eq2: getEq("C", 5, "6° Grupo C"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "22-Ago",
      fecha: "Sábado, 22 de Agosto 2026",
      titulo: "Jornada 3 - Fase de Grupos (Fecha 2 Suizo)",
      partidos: [
        { hora: "09:00 AM", grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A (Clarel)"), eq2: getEq("A", 2, "3° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "10:10 AM", grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 4, "5° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "12:30 PM", grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B (Life)"), eq2: getEq("B", 2, "3° Grupo B"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:40 PM", grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 2, "3° Grupo C"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "29-Ago",
      fecha: "Sábado, 29 de Agosto 2026",
      titulo: "Jornada 4 - Ecuador de la Fase de Grupos",
      partidos: [
        { hora: "09:00 AM", grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 4, "5° Grupo B"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "10:10 AM", grupo: "Grupo B", eq1: getEq("B", 3, "4° Grupo B"), eq2: getEq("B", 5, "6° Grupo B"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "11:20 AM", grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 4, "5° Grupo C"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "12:30 PM", grupo: "Grupo C", eq1: getEq("C", 3, "4° Grupo C"), eq2: getEq("C", 5, "6° Grupo C"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:40 PM", grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 5, "6° Grupo A"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "05-Sep",
      fecha: "Sábado, 5 de Septiembre 2026",
      titulo: "Jornada 5 - Fase de Grupos (Definiciones Previas)",
      partidos: [
        { hora: "09:00 AM", grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A (Clarel)"), eq2: getEq("A", 5, "6° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "10:10 AM", grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 3, "4° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:40 PM", grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B (Life)"), eq2: getEq("B", 5, "6° Grupo B"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "02:50 PM", grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 3, "4° Grupo B"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "12-Sep",
      fecha: "Sábado, 12 de Septiembre 2026",
      titulo: "Jornada 6 - Cierre de Grupos y Posiciones",
      partidos: [
        { hora: "09:00 AM", grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 5, "6° Grupo C"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "10:10 AM", grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 3, "4° Grupo C"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "11:20 AM", grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 4, "5° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "12:30 PM", grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 4, "5° Grupo B"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:40 PM", grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 4, "5° Grupo C"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "19-Sep",
      fecha: "Sábado, 19 de Septiembre 2026",
      titulo: "⚡ Jornada 7 - CUARTOS DE FINAL MASCULINOS",
      partidos: [
        { hora: "11:20 AM", grupo: "Llave 1", eq1: { nombre: "1° Grupo A", confirmado: true }, eq2: { nombre: "2° Mejor Tercero", confirmado: true }, cancha: "Cancha Principal Única (65 min)" },
        { hora: "12:30 PM", grupo: "Llave 2", eq1: { nombre: "1° Grupo B", confirmado: true }, eq2: { nombre: "2° Grupo C", confirmado: true }, cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:40 PM", grupo: "Llave 3", eq1: { nombre: "1° Grupo C", confirmado: true }, eq2: { nombre: "1° Mejor Tercero", confirmado: true }, cancha: "Cancha Principal Única (65 min)" },
        { hora: "02:50 PM", grupo: "Llave 4", eq1: { nombre: "2° Grupo A", confirmado: true }, eq2: { nombre: "2° Grupo B", confirmado: true }, cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "26-Sep (Semis)",
      fecha: "Sábado, 26 de Septiembre 2026",
      titulo: "⚡ Jornada 8 - SEMIFINALES OFICIALES MASCULINAS",
      partidos: [
        { hora: "12:30 PM", grupo: "Semifinal 1", eq1: { nombre: "Ganador Llave 1", confirmado: true }, eq2: { nombre: "Ganador Llave 2", confirmado: true }, cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:45 PM", grupo: "Semifinal 2", eq1: { nombre: "Ganador Llave 3", confirmado: true }, eq2: { nombre: "Ganador Llave 4", confirmado: true }, cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "03-Oct (Finales)",
      fecha: "Sábado, 3 de Octubre 2026",
      titulo: "🏆 Jornada 9 - ÚNICAMENTE FINALES Y PREMIACIÓN",
      partidos: [
        { hora: "11:15 AM", grupo: "Disputa Bronce", eq1: { nombre: "Perdedor Semifinal 1", confirmado: true }, eq2: { nombre: "Perdedor Semifinal 2", confirmado: true }, cancha: "Cancha Principal Única (65 min)" },
        { hora: "01:45 PM", grupo: "🏆 GRAN FINAL ORO", eq1: { nombre: "Ganador Semifinal 1", confirmado: true }, eq2: { nombre: "Ganador Semifinal 2", confirmado: true }, cancha: "Cancha Principal Única (65 min)" }
      ]
    }
  ];

  const jornadasFemenino = [
    {
      etiqueta: "01-Ago (Inaug.)",
      fecha: "Sábado, 1 de Agosto 2026",
      titulo: "Jornada 1 - Inauguración Oficial (Apertura de Ceremonia)",
      partidos: []
    },
    {
      etiqueta: "08-Ago (Feriado)",
      feriado: true,
      fecha: "Sábado, 8 de Agosto 2026",
      titulo: "PAUSA OFICIAL - FERIADO NACIONAL DEL 8 DE AGOSTO",
      partidos: []
    },
    {
      etiqueta: "15-Ago",
      fecha: "Sábado, 15 de Agosto 2026",
      titulo: "Jornada 2 - Inicio Fase de Grupos Femenina",
      partidos: [
        { hora: "12:30 PM", grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 1, "2° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "02:50 PM", grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 1, "2° Grupo B"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "22-Ago",
      fecha: "Sábado, 22 de Agosto 2026",
      titulo: "Jornada 3 - Fase de Grupos Femenina",
      partidos: [
        { hora: "11:20 AM", grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 3, "4° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "02:50 PM", grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 3, "4° Grupo B"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "29-Ago",
      fecha: "Sábado, 29 de Agosto 2026",
      titulo: "Jornada 4 - Ecuador de la Fase de Grupos",
      partidos: [
        { hora: "02:50 PM", grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 0, "1° Grupo A"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "05-Sep",
      fecha: "Sábado, 5 de Septiembre 2026",
      titulo: "Jornada 5 - Fase de Grupos Femenina",
      partidos: [
        { hora: "11:20 AM", grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 2, "3° Grupo A"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "12:30 PM", grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 4, "5° Grupo A"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "12-Sep",
      fecha: "Sábado, 12 de Septiembre 2026",
      titulo: "Jornada 6 - Cierre y Clasificación Directa a Semis",
      partidos: [
        { hora: "02:50 PM", grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 3, "4° Grupo B"), cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "19-Sep",
      fecha: "Sábado, 19 de Septiembre 2026",
      titulo: "⚡ Jornada 7 - PLAY-IN / REPECHAJES FEMENINOS",
      partidos: [
        { hora: "09:00 AM", grupo: "Grupo B (Cierre)", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 2, "3° Grupo B"), cancha: "Cancha Principal Única (65 min)" },
        { hora: "10:10 AM", grupo: "Play-In Rep. 1", eq1: { nombre: "2° Grupo A Femenino", confirmado: true }, eq2: { nombre: "3° Grupo B Femenino", confirmado: true }, cancha: "Cancha Principal Única (65 min)" },
        { hora: "11:20 AM", grupo: "Play-In Rep. 2", eq1: { nombre: "2° Grupo B Femenino", confirmado: true }, eq2: { nombre: "3° Grupo A Femenino", confirmado: true }, cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "26-Sep (Semis)",
      fecha: "Sábado, 26 de Septiembre 2026",
      titulo: "⚡ Jornada 8 - SEMIFINALES OFICIALES FEMENINAS",
      partidos: [
        { hora: "10:00 AM", grupo: "Semifinal 1", eq1: { nombre: "1° Grupo A (Directo)", confirmado: true }, eq2: { nombre: "Ganador Repechaje 2", confirmado: true }, cancha: "Cancha Principal Única (65 min)" },
        { hora: "11:15 AM", grupo: "Semifinal 2", eq1: { nombre: "1° Grupo B (Directo)", confirmado: true }, eq2: { nombre: "Ganador Repechaje 1", confirmado: true }, cancha: "Cancha Principal Única (65 min)" }
      ]
    },
    {
      etiqueta: "03-Oct (Finales)",
      fecha: "Sábado, 3 de Octubre 2026",
      titulo: "🏆 Jornada 9 - ÚNICAMENTE FINALES Y PREMIACIÓN",
      partidos: [
        { hora: "10:00 AM", grupo: "Disputa Bronce", eq1: { nombre: "Perdedora Semifinal 1", confirmado: true }, eq2: { nombre: "Perdedora Semifinal 2", confirmado: true }, cancha: "Cancha Principal Única (65 min)" },
        { hora: "12:30 PM", grupo: "🏆 GRAN FINAL ORO", eq1: { nombre: "Ganadora Semifinal 1", confirmado: true }, eq2: { nombre: "Ganadora Semifinal 2", confirmado: true }, cancha: "Cancha Principal Única (65 min)" }
      ]
    }
  ];

  const listaJornadas = categoria === 'femenino' ? jornadasFemenino : jornadasMasculino;
  const jornadaActual = listaJornadas[jornadaSeleccionada] || listaJornadas[0];

  return (
    <div className="mt-4 rounded-[3rem] border-2 border-amber-400/70 bg-[#1e3a5f]/98 p-7 md:p-10 shadow-[0_28px_90px_rgba(245,158,11,0.4)] backdrop-blur-3xl text-slate-100">
      {/* Encabezado Ejecutivo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-600 pb-7 mb-7">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-amber-400 bg-amber-500/25 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-300 shadow-md">
            <Calendar size={15} /> Torneo Interfarmacéutico Clarel 2026
          </div>
          <h2 className="mt-2.5 text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3 drop-shadow-md">
            <span>Programación: Categoría {categoria === 'femenino' ? '🌸 Femenina (9 Equipos)' : '🏆 Masculina (18 Equipos)'}</span>
          </h2>
          <p className="mt-2 text-sm text-slate-200 leading-relaxed font-semibold">
            Franjas en bloques de 70 min (09:00 AM a 04:00 PM). <strong className="text-amber-300 font-black">Duración oficial de partido: 65 min (2 tiempos de 30 min + 5 min de descanso)</strong> + 5 min rotación. 
            <br />
            <span className="text-emerald-300 font-black">1 de Agosto (Inauguración): Partidos a partir de las 12:00 PM.</span>
          </p>
        </div>

        {/* Selector rápido de jornada */}
        <div className="flex flex-wrap items-center gap-2 bg-[#334155]/95 p-2 rounded-2xl border-2 border-slate-400 max-w-full overflow-x-auto shadow-md">
          {listaJornadas.map((j, idx) => (
            <button
              key={idx}
              onClick={() => setJornadaSeleccionada(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap ${
                jornadaSeleccionada === idx
                  ? j.feriado
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg font-black scale-105'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#1e3a5f] shadow-lg font-black scale-105'
                  : 'text-slate-200 hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              J{idx + 1}: {j.etiqueta || j.fecha.split(',')[1].trim().split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Detalle de la jornada seleccionada */}
      <div className="rounded-3xl border-2 border-slate-500 bg-[#334155]/90 p-7 shadow-xl backdrop-blur-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-600 pb-5 mb-7">
          <div>
            <span className="text-sm font-black uppercase tracking-widest text-amber-300">{jornadaActual.fecha}</span>
            <h3 className="text-2xl md:text-3xl font-black text-white mt-1 drop-shadow-md">{jornadaActual.titulo}</h3>
          </div>
          <span className={`rounded-2xl border-2 px-4 py-1.5 text-xs font-black self-start shadow-md ${jornadaActual.feriado ? 'border-red-400 bg-red-500/30 text-red-100 font-black' : 'border-slate-400 bg-[#1e293b] text-white shadow-md'}`}>
            {jornadaActual.feriado ? 'Pausa por Feriado Nacional' : `${jornadaActual.partidos.length} Encuentros en Cancha Única`}
          </span>
        </div>

        {/* Grilla o Tarjeta de Feriado */}
        {jornadaActual.feriado ? (
          <div className="rounded-3xl border-2 border-red-400/70 bg-gradient-to-br from-[#1e293b] via-[#334155] to-red-950/40 p-10 text-center my-4 shadow-2xl text-slate-100">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-500/30 border-2 border-red-400 text-red-300 mb-5 animate-pulse shadow-inner">
              <Calendar size={40} />
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">
              FERIADO NACIONAL DEL 10 DE AGOSTO (TRASLADADO AL SÁBADO 8)
            </h4>
            <p className="mt-3 text-base md:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed font-semibold">
              De acuerdo con las regulaciones de descanso nacional y calendario oficial del torneo, durante el <span className="text-amber-300 font-black">sábado 8 de agosto de 2026</span> no se programarán encuentros deportivos. El complejo deportivo permanecerá cerrado y la actividad competitiva se reanudará con normalidad en la Jornada 3 (15 de Agosto).
            </p>
            <div className="mt-7 inline-flex items-center gap-2.5 rounded-2xl bg-red-500/30 border-2 border-red-400 px-6 py-3 text-sm font-black uppercase tracking-widest text-red-100 shadow-lg">
              ⏸️ Jornada de Descanso para los 27 Equipos
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {jornadaActual.partidos.map((partido, idx) => {
              const ambosConfirmados = partido.eq1.confirmado && partido.eq2.confirmado;
              return (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-3xl border-2 p-6 transition duration-300 shadow-xl ${
                    ambosConfirmados
                      ? 'border-emerald-400/80 bg-gradient-to-br from-[#1e3a5f] via-[#1e293b] to-[#0d9488]/40 hover:border-emerald-300'
                      : 'border-slate-500 bg-[#1e293b]/95 hover:border-amber-400'
                  }`}
                >
                  {/* Cabecera del partido: Hora y Cancha */}
                  <div className="flex items-center justify-between text-xs font-black text-slate-200 mb-4 pb-3 border-b border-slate-600">
                    <span className="flex items-center gap-2 text-amber-300 font-black text-sm">
                      <Clock size={16} className="text-amber-300" /> {partido.hora}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#334155] px-3 py-1 rounded-xl border border-slate-400 text-white font-bold">
                      <MapPin size={13} className="text-sky-300" /> {partido.cancha}
                    </span>
                  </div>

                  {/* Enfrentamiento */}
                  <div className="flex items-center justify-between gap-4 my-4">
                    {/* Equipo 1 */}
                    <div className="flex-1 text-right">
                      <p className={`text-lg font-black truncate ${partido.eq1.confirmado ? 'text-white drop-shadow-md' : 'text-slate-300 italic font-bold'}`}>
                        {partido.eq1.nombre}
                      </p>
                      <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                        {partido.eq1.confirmado ? '✓ Confirmado' : 'Pendiente Sorteo'}
                      </span>
                    </div>

                    {/* VS */}
                    <div className="flex flex-col items-center justify-center px-4 py-1.5 rounded-2xl bg-[#1e3a5f] border-2 border-amber-300 font-black text-amber-300 text-sm shadow-md">
                      VS
                      <span className="text-[10px] font-black text-slate-300">{partido.grupo}</span>
                    </div>

                    {/* Equipo 2 */}
                    <div className="flex-1 text-left">
                      <p className={`text-lg font-black truncate ${partido.eq2.confirmado ? 'text-white drop-shadow-md' : 'text-slate-300 italic font-bold'}`}>
                        {partido.eq2.nombre}
                      </p>
                      <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                        {partido.eq2.confirmado ? '✓ Confirmado' : 'Pendiente Sorteo'}
                      </span>
                    </div>
                  </div>

                  {/* Estado del encuentro */}
                  <div className="mt-4 pt-3 border-t border-slate-600 flex items-center justify-between text-xs font-semibold">
                    {ambosConfirmados ? (
                      <span className="inline-flex items-center gap-1.5 font-black text-emerald-300">
                        <CheckCircle2 size={15} className="text-emerald-400" /> Sorteo Completo - Listo para Jugar
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 font-bold text-slate-300">
                        <AlertCircle size={15} className="text-amber-300" /> A la espera de finalización de fase en ruleta
                      </span>
                    )}
                    <span className="text-slate-300 font-black uppercase text-xs">Torneo 2026</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
