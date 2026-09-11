import { calcularEstadisticas } from '../utils/torneo';

export default function TablaGrupos({ grupos, categoria = 'masculino', resultados }) {
  if (!grupos) return null;

  const esFemenino = categoria === 'femenino';
  const letras = ['A', 'B', 'C'];
  const maxCupos = esFemenino ? { A: 3, B: 3, C: 3 } : { A: 6, B: 6, C: 6 };

  const statsCalculadas = calcularEstadisticas(grupos, resultados, categoria);

  const getStats = (equipo) => {
    if (statsCalculadas[equipo.toUpperCase()]) {
      return statsCalculadas[equipo.toUpperCase()];
    }
    return { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 };
  };

  const coloresGrupo = {
    'Unico': 'from-[#1e3a5f]/98 via-[#1e293b]/95 to-amber-600/30 border-amber-400/80 text-amber-200 shadow-[0_15px_40px_rgba(245,158,11,0.3)]',
    A: 'from-[#1e3a5f]/98 via-[#1e293b]/95 to-amber-600/30 border-amber-400/80 text-amber-200 shadow-[0_15px_40px_rgba(245,158,11,0.3)]',
    B: 'from-[#1e3a5f]/98 via-[#1e293b]/95 to-sky-600/30 border-sky-400/80 text-sky-200 shadow-[0_15px_40px_rgba(59,130,246,0.3)]',
    C: 'from-[#1e3a5f]/98 via-[#1e293b]/95 to-emerald-600/30 border-emerald-400/80 text-emerald-200 shadow-[0_15px_40px_rgba(16,185,129,0.3)]',
  };

  // CALCULO DE CLASIFICADOS
  const gruposOrdenados = {};
  letras.forEach(letra => {
    let lista = (grupos[letra] || []).slice().sort((a, b) => {
      const statsA = getStats(a);
      const statsB = getStats(b);
      if (statsB.pts !== statsA.pts) return statsB.pts - statsA.pts;
      const gdA = statsA.gf - statsA.gc;
      const gdB = statsB.gf - statsB.gc;
      if (gdB !== gdA) return gdB - gdA;
      return statsB.gf - statsA.gf;
    });
    gruposOrdenados[letra] = lista;
  });

  const clasificados = new Set();
  
  if (esFemenino) {
    // 3 Primeros + 1 Mejor Segundo
    const segundos = [];
    letras.forEach(letra => {
      const lista = gruposOrdenados[letra];
      if (lista.length > 0) clasificados.add(lista[0]);
      if (lista.length > 1) segundos.push(lista[1]);
    });
    segundos.sort((a, b) => {
      const statsA = getStats(a);
      const statsB = getStats(b);
      if (statsB.pts !== statsA.pts) return statsB.pts - statsA.pts;
      const gdA = statsA.gf - statsA.gc;
      const gdB = statsB.gf - statsB.gc;
      if (gdB !== gdA) return gdB - gdA;
      return statsB.gf - statsA.gf;
    });
    if (segundos.length > 0) clasificados.add(segundos[0]);
  } else {
    // Top 2 + 2 Mejores Terceros
    const terceros = [];
    letras.forEach(letra => {
      const lista = gruposOrdenados[letra];
      if (lista.length > 0) clasificados.add(lista[0]);
      if (lista.length > 1) clasificados.add(lista[1]);
      if (lista.length > 2) terceros.push(lista[2]);
    });
    terceros.sort((a, b) => {
      const statsA = getStats(a);
      const statsB = getStats(b);
      if (statsB.pts !== statsA.pts) return statsB.pts - statsA.pts;
      const gdA = statsA.gf - statsA.gc;
      const gdB = statsB.gf - statsB.gc;
      if (gdB !== gdA) return gdB - gdA;
      return statsB.gf - statsA.gf;
    });
    if (terceros.length > 0) clasificados.add(terceros[0]);
    if (terceros.length > 1) clasificados.add(terceros[1]);
  }

  return (
    <section className="rounded-[2rem] md:rounded-[3rem] border-2 border-amber-400/70 bg-[#1e3a5f]/98 p-4 md:p-10 shadow-[0_28px_90px_rgba(245,158,11,0.4)] backdrop-blur-3xl mt-4 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-600 pb-6 text-center md:text-left">
        <div>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-amber-300">Torneo Interfarmacéutico Clarel 2026</p>
          <h3 className="mt-1.5 text-2xl md:text-4xl font-black text-white drop-shadow-md leading-tight">
            {esFemenino ? '🏆 Fase de Grupos: Categoría Femenina (9 Equipos)' : '🏆 Fase de Grupos: Categoría Masculina (18 Equipos)'}
          </h3>
        </div>
        <div className="rounded-2xl bg-[#334155]/95 border-2 border-slate-400 px-4 md:px-5 py-2 md:py-3 text-xs md:text-sm font-black text-white self-center md:self-start shadow-md text-center">
          {esFemenino ? '3 Grupos de 3 equipos | Cruces Cruzados' : '3 Grupos de 6 equipos | Clasifican Top 2 + 2 Mejores Terceros'}
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {letras.map((letra) => {
          let listaEquipos = grupos[letra] || [];
          listaEquipos = listaEquipos.slice().sort((a, b) => {
            const statsA = getStats(a);
            const statsB = getStats(b);
            if (statsB.pts !== statsA.pts) return statsB.pts - statsA.pts;
            const gdA = statsA.gf - statsA.gc;
            const gdB = statsB.gf - statsB.gc;
            if (gdB !== gdA) return gdB - gdA;
            return statsB.gf - statsA.gf;
          });
          const cupoMax = maxCupos[letra] || 6;
          return (
            <div key={letra} className={`rounded-[2rem] md:rounded-[2.5rem] border-2 bg-gradient-to-br ${coloresGrupo[letra]} p-4 md:p-7 transition duration-300 hover:scale-[1.02] shadow-2xl`}>
              <div className="mb-5 flex items-center justify-between border-b border-slate-600 pb-4">
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-sm">Grupo {letra}</h4>
                  <p className="text-xs text-slate-300 mt-1 font-bold">
                    {esFemenino ? '6 Partidos por equipo (1° Clasifica)' : '5 Partidos por equipo'}
                  </p>
                </div>
                <span className="rounded-2xl bg-[#334155] px-4 py-1.5 text-sm font-black tracking-widest text-amber-300 border-2 border-amber-400/60 shadow-md">
                  {listaEquipos.length}/{cupoMax}
                </span>
              </div>

              <div className="overflow-x-hidden rounded-xl border border-slate-600 bg-[#1e293b]/50">
                <table className="w-full text-[9px] sm:text-xs md:text-sm text-left">
                  <thead className="text-[8px] sm:text-[10px] md:text-xs uppercase bg-[#1e293b] text-slate-300 border-b border-slate-600">
                    <tr>
                      <th className="px-1 md:px-2 py-2 md:py-3 text-center w-4 md:w-8">#</th>
                      <th className="px-1 md:px-2 py-2 md:py-3">Equipo</th>
                      <th className="px-0.5 md:px-2 py-2 md:py-3 text-center text-amber-400">Pts</th>
                      <th className="px-0.5 md:px-2 py-2 md:py-3 text-center">PJ</th>
                      <th className="px-0.5 md:px-2 py-2 md:py-3 text-center">PG</th>
                      <th className="px-0.5 md:px-2 py-2 md:py-3 text-center">PE</th>
                      <th className="px-0.5 md:px-2 py-2 md:py-3 text-center">PP</th>
                      <th className="px-0.5 md:px-2 py-2 md:py-3 text-center">GF</th>
                      <th className="px-0.5 md:px-2 py-2 md:py-3 text-center">GC</th>
                      <th className="px-0.5 md:px-2 py-2 md:py-3 text-center">DG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaEquipos.map((equipo, idx) => {
                       const stats = getStats(equipo);
                       const isClasificado = clasificados.has(equipo);
                       return (
                         <tr key={idx} className={`border-b border-slate-600/50 hover:bg-[#334155]/80 transition-all duration-300 ${isClasificado ? 'bg-emerald-900/40 shadow-[inset_4px_0_0_0_#34d399,inset_0_0_15px_rgba(52,211,153,0.2)]' : ''}`}>
                           <td className={`px-1 md:px-2 py-1.5 md:py-3 font-black text-center ${isClasificado ? 'text-emerald-300' : 'text-amber-300'}`}>{idx + 1}</td>
                           <td className="px-1 md:px-2 py-1.5 md:py-3 font-bold text-white whitespace-normal break-words leading-tight max-w-[70px] sm:max-w-none">{equipo}</td>
                           <td className="px-0.5 md:px-2 py-1.5 md:py-3 text-center font-black text-emerald-400">{stats.pts}</td>
                           <td className="px-0.5 md:px-2 py-1.5 md:py-3 text-center text-slate-300">{stats.pj}</td>
                           <td className="px-0.5 md:px-2 py-1.5 md:py-3 text-center text-slate-300">{stats.pg}</td>
                           <td className="px-0.5 md:px-2 py-1.5 md:py-3 text-center text-slate-300">{stats.pe}</td>
                           <td className="px-0.5 md:px-2 py-1.5 md:py-3 text-center text-slate-300">{stats.pp}</td>
                           <td className="px-0.5 md:px-2 py-1.5 md:py-3 text-center text-slate-300">{stats.gf}</td>
                           <td className="px-0.5 md:px-2 py-1.5 md:py-3 text-center text-slate-300">{stats.gc}</td>
                           <td className="px-0.5 md:px-2 py-1.5 md:py-3 text-center text-slate-300 font-bold">{stats.gf - stats.gc > 0 ? `+${stats.gf - stats.gc}` : stats.gf - stats.gc}</td>
                         </tr>
                       );
                    })}
                    {Array.from({ length: Math.max(0, cupoMax - listaEquipos.length) }).map((_, idx) => (
                      <tr key={`empty-${idx}`} className="border-b border-slate-600/50 bg-[#1e293b]/70">
                         <td className="px-2 py-3 font-black text-slate-500 text-center">{listaEquipos.length + idx + 1}</td>
                         <td className="px-2 py-3 font-bold text-slate-400 italic">Vacante</td>
                         <td className="px-1 md:px-2 py-3 text-center text-slate-500">-</td>
                         <td className="px-1 md:px-2 py-3 text-center text-slate-500">-</td>
                         <td className="px-1 md:px-2 py-3 text-center text-slate-500">-</td>
                         <td className="px-1 md:px-2 py-3 text-center text-slate-500">-</td>
                         <td className="px-1 md:px-2 py-3 text-center text-slate-500">-</td>
                         <td className="px-1 md:px-2 py-3 text-center text-slate-500">-</td>
                         <td className="px-1 md:px-2 py-3 text-center text-slate-500">-</td>
                         <td className="px-1 md:px-2 py-3 text-center text-slate-500">-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {listaEquipos.length > 0 && (
                <div className="mt-4 w-full flex items-center justify-center relative opacity-90">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-[3px] border-dashed border-emerald-400/50"></div>
                  </div>
                  <div className="relative bg-[#1e293b] px-4 rounded-full border-2 border-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                    <span className="text-[10px] font-black uppercase text-emerald-300 tracking-[0.2em] drop-shadow-md">
                      {esFemenino ? '✨ Pasan Top 1 + 1 Mejor Segundo ✨' : '✨ Pasan Top 2 + 2 Mejores Terceros ✨'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}