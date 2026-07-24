export default function TablaGrupos({ grupos, categoria = 'masculino' }) {
  if (!grupos) return null;

  const esFemenino = categoria === 'femenino';
  const letras = ['A', 'B', 'C'];
  const maxCupos = esFemenino ? { A: 3, B: 3, C: 3 } : { A: 6, B: 6, C: 6 };

  const coloresGrupo = {
    'Unico': 'from-[#1e3a5f]/98 via-[#1e293b]/95 to-amber-600/30 border-amber-400/80 text-amber-200 shadow-[0_15px_40px_rgba(245,158,11,0.3)]',
    A: 'from-[#1e3a5f]/98 via-[#1e293b]/95 to-amber-600/30 border-amber-400/80 text-amber-200 shadow-[0_15px_40px_rgba(245,158,11,0.3)]',
    B: 'from-[#1e3a5f]/98 via-[#1e293b]/95 to-sky-600/30 border-sky-400/80 text-sky-200 shadow-[0_15px_40px_rgba(59,130,246,0.3)]',
    C: 'from-[#1e3a5f]/98 via-[#1e293b]/95 to-emerald-600/30 border-emerald-400/80 text-emerald-200 shadow-[0_15px_40px_rgba(16,185,129,0.3)]',
  };

  return (
    <section className="rounded-[3rem] border-2 border-amber-400/70 bg-[#1e3a5f]/98 p-7 shadow-[0_28px_90px_rgba(245,158,11,0.4)] backdrop-blur-3xl md:p-10 mt-4 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-600 pb-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-amber-300">Torneo Interfarmacéutico Clarel 2026</p>
          <h3 className="mt-1.5 text-3xl md:text-4xl font-black text-white drop-shadow-md">
            {esFemenino ? '🏆 Fase de Grupos: Categoría Femenina (9 Equipos)' : '🏆 Fase de Grupos: Categoría Masculina (18 Equipos)'}
          </h3>
        </div>
        <div className="rounded-2xl bg-[#334155]/95 border-2 border-slate-400 px-5 py-3 text-sm font-black text-white self-start shadow-md">
          {esFemenino ? '3 Grupos de 3 equipos | Cruces Cruzados' : '3 Grupos de 6 equipos | Clasifican Top 2 + 2 Mejores Terceros'}
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {letras.map((letra) => {
          const listaEquipos = grupos[letra] || [];
          const cupoMax = maxCupos[letra] || 6;
          return (
            <div key={letra} className={`rounded-[2.5rem] border-2 bg-gradient-to-br ${coloresGrupo[letra]} p-7 transition duration-300 hover:scale-[1.02] shadow-2xl`}>
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

              <ul className="flex flex-col gap-3">
                {listaEquipos.map((equipo, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-2xl bg-[#334155]/95 border-2 border-slate-500 px-5 py-3.5 text-base font-black text-white shadow-md">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/30 text-amber-300 border-2 border-amber-400/60 text-sm font-black shadow-inner">
                          {idx + 1}
                        </span>
                        <span className="tracking-wide text-white text-base font-black">{equipo}</span>
                      </div>
                      <span className="text-xs uppercase font-black text-emerald-300 bg-[#0d9488]/40 border-2 border-emerald-400/60 px-3 py-1 rounded-xl shadow-sm">
                        Sorteado
                      </span>
                    </div>
                    {esFemenino && idx === 0 && (
                      <div className="w-full flex items-center justify-center my-1 relative opacity-90">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t-[3px] border-dashed border-amber-400/70"></div>
                        </div>
                        <div className="relative bg-[#1e293b] px-4 rounded-full border-2 border-amber-400/30">
                          <span className="text-xs font-black uppercase text-amber-300 tracking-[0.2em] drop-shadow-md">✨ 1° a Semifinales ✨</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {Array.from({ length: Math.max(0, cupoMax - listaEquipos.length) }).map((_, idx) => (
                  <li key={`empty-${idx}`} className="flex items-center gap-3.5 rounded-2xl border-2 border-dashed border-slate-500 bg-[#1e293b]/70 px-5 py-3.5 text-sm font-bold text-slate-300">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-dashed border-slate-500 text-xs font-bold">
                      {listaEquipos.length + idx + 1}
                    </span>
                    <span>Vacante (Disponible en ruleta)</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}