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
  ];

  const jornadasFemenino = [
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
            <strong className="text-amber-300 font-black">Duración oficial de partido: 65 min (2 tiempos de 30 min + 5 min de descanso)</strong>
            <br />
            <span className="text-emerald-300 font-black">1 de Agosto (Inauguración)</span>
          </p>
        </div>

        {/* Selector rápido de jornada */}
        <div className="flex flex-wrap items-center gap-2 bg-[#334155]/95 p-2 rounded-2xl border-2 border-slate-400 max-w-full overflow-x-auto shadow-md">
          {listaJornadas.map((j, idx) => (
            <button
              key={idx}
              onClick={() => setJornadaSeleccionada(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap ${jornadaSeleccionada === idx
                ? j.feriado
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg font-black scale-105'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#1e3a5f] shadow-lg font-black scale-105'
                : 'text-slate-200 hover:text-white hover:bg-[#1e293b]'
                }`}
            >
              J{idx + 1}: {j.etiqueta || (j.fecha.includes(',') ? j.fecha.split(',')[1].trim().split(' ')[0] : j.fecha.split(' ')[0])}
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
                  className={`relative overflow-hidden rounded-3xl border-2 p-6 transition duration-300 shadow-xl ${ambosConfirmados
                    ? 'border-emerald-400/80 bg-gradient-to-br from-[#1e3a5f] via-[#1e293b] to-[#0d9488]/40 hover:border-emerald-300'
                    : 'border-slate-500 bg-[#1e293b]/95 hover:border-amber-400'
                    }`}
                >
                  {/* Cabecera del partido: Hora y Cancha */}
                  <div className="flex items-center justify-between text-xs font-black text-slate-200 mb-4 pb-3 border-b border-slate-600">
                    <span className="flex items-center gap-2 text-amber-300 font-black text-sm">
                      <Clock size={16} className="text-amber-300" /> {partido.hora}
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
