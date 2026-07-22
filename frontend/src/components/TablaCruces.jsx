import { Trophy, Zap, ShieldAlert, Calendar, Swords, Award } from 'lucide-react';

export default function TablaCruces({ cruces = [], categoria = 'masculino', titulo }) {
  const esFemenino = categoria === 'femenino';
  const listaCruces = cruces || [];

  const defaultTitulo = titulo || (esFemenino ? '🌸 FIXTURE FEMENINO (9 Equipos)' : '🏆 FIXTURE MASCULINO (18 Equipos)');

  // Función auxiliar de búsqueda de llaves por id
  const getCruce = (id, defTitulo, defEq1, defEq2, defDesc1, defDesc2, defFecha) => {
    const found = listaCruces.find((c) => c.id === id);
    if (found) return found;
    return {
      titulo: defTitulo,
      equipo1: defEq1,
      equipo2: defEq2,
      desc1: defDesc1,
      desc2: defDesc2,
      fecha: defFecha
    };
  };

  // Llaves masculinas
  const llave1 = getCruce('llave1', 'Llave 1', '1° Grupo A', '2° Mejor Tercero', '1° Grupo A', '2° Mejor Tercero', '19-Sep');
  const llave2 = getCruce('llave2', 'Llave 2', '1° Grupo B', '2° Grupo C', '1° Grupo B', '2° Grupo C', '19-Sep');
  const llave3 = getCruce('llave3', 'Llave 3', '1° Grupo C', 'Mejor Tercero', '1° Grupo C', 'Mejor Tercero', '19-Sep');
  const llave4 = getCruce('llave4', 'Llave 4', '2° Grupo A', '2° Grupo B', '2° Grupo A', '2° Grupo B', '19-Sep');
  const semiM1 = getCruce('semi1', 'Semifinal 1', 'Ganador Llave 1', 'Ganador Llave 2', 'Ganador Llave 1', 'Ganador Llave 2', '26-Sep');
  const semiM2 = getCruce('semi2', 'Semifinal 2', 'Ganador Llave 3', 'Ganador Llave 4', 'Ganador Llave 3', 'Ganador Llave 4', '26-Sep');
  const finalM = getCruce('final', '🏆 GRAN FINAL', 'Ganador Semifinal 1', 'Ganador Semifinal 2', 'Campeón Izquierdo', 'Campeón Derecho', '03-Oct');

  // Llaves femeninas
  const rep1 = getCruce('rep1', 'Repechaje 1', '2° Grupo A', '3° Grupo B', 'Play-In Previo', 'Play-In Previo', '19-Sep');
  const rep2 = getCruce('rep2', 'Repechaje 2', '2° Grupo B', '3° Grupo A', 'Play-In Previo', 'Play-In Previo', '19-Sep');
  const semiF1 = getCruce('semi1', 'Semifinal 1', '1° Grupo A', 'Ganador Repechaje 2', 'Clasificado Directo', 'Ganador Repechaje 2', '26-Sep');
  const semiF2 = getCruce('semi2', 'Semifinal 2', '1° Grupo B', 'Ganador Repechaje 1', 'Clasificado Directo', 'Ganador Repechaje 1', '26-Sep');
  const finalF = getCruce('final', '🏆 GRAN FINAL FEMENINA', 'Ganador Semifinal 1', 'Ganador Semifinal 2', 'Campeón Semifinal 1', 'Campeón Semifinal 2', '03-Oct');

  const PartidoCard = ({ match, color = 'amber', isFinal = false }) => {
    const bgGradient = isFinal
      ? 'from-[#1e3a5f] via-[#1e293b] to-amber-600/40 border-2 border-amber-300 shadow-[0_15px_45px_rgba(245,158,11,0.35)]'
      : color === 'emerald'
      ? 'from-[#1e3a5f] via-[#1e293b] to-emerald-600/30 border-2 border-emerald-400/80 hover:border-emerald-300 shadow-md'
      : 'from-[#1e3a5f] via-[#1e293b] to-amber-600/30 border-2 border-amber-400/80 hover:border-amber-300 shadow-md';

    const tagColor = isFinal
      ? 'bg-amber-500/30 border-2 border-amber-300 text-amber-200'
      : color === 'emerald'
      ? 'bg-[#0d9488]/40 border-2 border-emerald-400/70 text-emerald-200'
      : 'bg-amber-500/30 border-2 border-amber-400/70 text-amber-200';

    return (
      <div className={`relative flex flex-col justify-between rounded-3xl bg-gradient-to-br p-5 transition-all duration-300 text-slate-100 ${bgGradient}`}>
        <div className="flex items-center justify-between border-b border-slate-600 pb-3 mb-4">
          <span className={`rounded-xl px-3 py-1 text-xs font-black uppercase tracking-widest ${tagColor}`}>
            {match.titulo || 'Cruce'}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-black text-white bg-[#334155] px-3 py-1 rounded-xl border border-slate-500 shadow-sm">
            <Calendar size={14} className="text-amber-300" />
            {match.fecha || '19-Sep'}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-2xl bg-[#334155]/95 px-4 py-3 border-2 border-slate-500 shadow-md">
            <div className="flex flex-col">
              <span className="font-black text-white text-base md:text-lg tracking-wide">
                {match.equipo1 || 'TBD'}
              </span>
              {match.desc1 && <span className="text-xs text-slate-300 font-bold mt-0.5">{match.desc1}</span>}
            </div>
            <span className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow-sm"></span>
          </div>

          <div className="flex items-center justify-center -my-2 z-10">
            <span className="rounded-full bg-[#1e3a5f] border-2 border-amber-300 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-300 shadow-md">
              VS
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-[#334155]/95 px-4 py-3 border-2 border-slate-500 shadow-md">
            <div className="flex flex-col">
              <span className="font-black text-white text-base md:text-lg tracking-wide">
                {match.equipo2 || 'TBD'}
              </span>
              {match.desc2 && <span className="text-xs text-slate-300 font-bold mt-0.5">{match.desc2}</span>}
            </div>
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-300 shadow-sm"></span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="rounded-[3rem] border-2 border-amber-400/70 bg-[#1e3a5f]/98 p-7 md:p-10 shadow-[0_28px_90px_rgba(245,158,11,0.4)] backdrop-blur-3xl text-slate-100 mt-4">
      {/* Encabezado Oficial del Fixture */}
      <div className="flex flex-col gap-5 border-b border-slate-600 pb-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-500/30 to-amber-600/15 p-4 text-amber-300 shadow-md">
              <Trophy size={36} />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/25 px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-amber-300 border border-amber-400/50 mb-1.5">
                <Zap size={14} /> Torneo Interfarmacéutico Clarel 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">{defaultTitulo}</h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-black bg-[#334155]/95 border-2 border-slate-400 rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-2 text-amber-300 font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse"></span>
              Cancha Principal Única (Bloques 70 min | 65 min juego)
            </div>
            <span className="text-slate-400">•</span>
            <div className="text-sky-300 font-black">
              {esFemenino ? 'Play-In: 19-Sep' : 'Cuartos: 19-Sep'}
            </div>
            <span className="text-slate-400">•</span>
            <div className="text-emerald-300 font-black">Semifinales: 26-Sep</div>
            <span className="text-slate-400">•</span>
            <div className="text-amber-300 font-black">🏆 Finales: 03-Oct</div>
          </div>
        </div>

        {/* Reglas e Hitos */}
        <div className="rounded-3xl border-2 border-amber-400/60 bg-[#334155]/95 p-5 md:p-6 text-sm md:text-base text-white leading-relaxed grid gap-6 md:grid-cols-2 shadow-lg">
          <div>
            <p className="font-black text-amber-300 uppercase tracking-wider text-sm mb-1.5">📐 Formato, Duración y Cancha Única</p>
            <p className="font-semibold text-slate-100">
              {esFemenino
                ? 'Partidos de 65 min (2 tiempos de 30 min + 5 min de descanso). Los 1° lugares van directo a Semifinales. Los 2° y 3° disputan el Play-In el 19 de septiembre en Cancha Principal Única.'
                : 'Partidos de 65 min (2 tiempos de 30 min + 5 min de descanso). 3 Grupos de 6 equipos. Clasifican a Cuartos los 2 primeros de cada grupo + 2 Mejores Terceros (8 equipos).'}
            </p>
          </div>
          <div>
            <p className="font-black text-emerald-300 uppercase tracking-wider text-sm mb-1.5">🔒 Horarios y Feriado</p>
            <p className="font-semibold text-slate-100">
              {esFemenino
                ? 'Todos los partidos se disputan en bloques de 70 min sin empalmes. Inauguración el 1 de Agosto (desde 12:00 PM). El 8 de agosto hay descanso oficial por Feriado Nacional.'
                : 'Inauguración (1 de Agosto) desde las 12:00 PM. Sábados regulares de 09:00 AM a 04:00 PM en bloques de 70 min. Feriado del 8 de agosto sin actividad.'}
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico Profesional del Bracket */}
      {esFemenino ? (
        /* BRACKET FEMENINO (Play-In y Semifinales) */
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Lado Izquierdo: Repechaje 1 -> Semifinal 1 */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#1e293b]/90 p-5 rounded-3xl border-2 border-amber-400/70 shadow-2xl backdrop-blur-md">
            <div className="text-center border-b border-slate-600 pb-3">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Repechaje y Semifinal 1</span>
              <p className="text-xs font-bold text-slate-300 mt-0.5">Play-In Previo (19-Sep)</p>
            </div>

            <PartidoCard match={rep1} color="amber" />

            <div className="mt-2 pt-4 border-t border-slate-600">
              <div className="text-center mb-3">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Semifinal 1 (26-Sep)</span>
              </div>
              <PartidoCard match={semiF1} color="amber" />
            </div>
          </div>

          {/* Centro: Gran Final Femenina */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center gap-6 my-4 lg:my-0 bg-gradient-to-b from-[#1e3a5f] via-[#1e293b] to-[#1e3a5f] p-6 rounded-3xl border-2 border-amber-300 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-xl animate-pulse"></div>
                <Award size={60} className="relative text-amber-300 drop-shadow-md" />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-amber-300">Corona Femenina 2026</span>
              <p className="text-lg font-black text-white tracking-widest mt-1 drop-shadow-sm">03 DE OCTUBRE</p>
            </div>

            <div className="w-full">
              <PartidoCard match={finalF} isFinal={true} />
            </div>

            <div className="text-center">
              <span className="inline-block rounded-full bg-amber-500/25 border-2 border-amber-300 px-5 py-2 text-xs font-black uppercase tracking-widest text-amber-300 shadow-md">
                🌸 Trofeo Femenino Interfarmacéutico
              </span>
            </div>
          </div>

          {/* Lado Derecho: Repechaje 2 -> Semifinal 2 */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#1e293b]/90 p-5 rounded-3xl border-2 border-emerald-400/70 shadow-2xl backdrop-blur-md">
            <div className="text-center border-b border-slate-600 pb-3">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Repechaje y Semifinal 2</span>
              <p className="text-xs font-bold text-slate-300 mt-0.5">Play-In Previo (19-Sep)</p>
            </div>

            <PartidoCard match={rep2} color="emerald" />

            <div className="mt-2 pt-4 border-t border-slate-600">
              <div className="text-center mb-3">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Semifinal 2 (26-Sep)</span>
              </div>
              <PartidoCard match={semiF2} color="emerald" />
            </div>
          </div>
        </div>
      ) : (
        /* BRACKET MASCULINO (Cuartos y Semifinales) */
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Lado Izquierdo: Llave 1 y 2 -> Semifinal 1 */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#1e293b]/90 p-5 rounded-3xl border-2 border-amber-400/70 shadow-2xl backdrop-blur-md">
            <div className="text-center border-b border-slate-600 pb-3">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Lado Izquierdo del Cuadro</span>
              <p className="text-xs font-bold text-slate-300 mt-0.5">Cuartos de Final (19-Sep)</p>
            </div>

            <PartidoCard match={llave1} color="amber" />
            <PartidoCard match={llave2} color="amber" />

            <div className="mt-2 pt-4 border-t border-slate-600">
              <div className="text-center mb-3">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Semifinal 1 (26-Sep)</span>
              </div>
              <PartidoCard match={semiM1} color="amber" />
            </div>
          </div>

          {/* Centro: Gran Final Masculina */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center gap-6 my-4 lg:my-0 bg-gradient-to-b from-[#1e3a5f] via-[#1e293b] to-[#1e3a5f] p-6 rounded-3xl border-2 border-amber-300 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-xl animate-pulse"></div>
                <Award size={60} className="relative text-amber-300 drop-shadow-md" />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-amber-300">Gran Campeonato</span>
              <p className="text-lg font-black text-white tracking-widest mt-1 drop-shadow-sm">03 DE OCTUBRE</p>
            </div>

            <div className="w-full">
              <PartidoCard match={finalM} isFinal={true} />
            </div>

            <div className="text-center">
              <span className="inline-block rounded-full bg-amber-500/25 border-2 border-amber-300 px-5 py-2 text-xs font-black uppercase tracking-widest text-amber-300 shadow-md">
                🏆 Trofeo Masculino Interfarmacéutico
              </span>
            </div>
          </div>

          {/* Lado Derecho: Llave 3 y 4 -> Semifinal 2 */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#1e293b]/90 p-5 rounded-3xl border-2 border-emerald-400/70 shadow-2xl backdrop-blur-md">
            <div className="text-center border-b border-slate-600 pb-3">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Lado Derecho del Cuadro</span>
              <p className="text-xs font-bold text-slate-300 mt-0.5">Cuartos de Final (19-Sep)</p>
            </div>

            <PartidoCard match={llave3} color="emerald" />
            <PartidoCard match={llave4} color="emerald" />

            <div className="mt-2 pt-4 border-t border-slate-600">
              <div className="text-center mb-3">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Semifinal 2 (26-Sep)</span>
              </div>
              <PartidoCard match={semiM2} color="emerald" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
