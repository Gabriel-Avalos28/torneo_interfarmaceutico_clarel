const fs = require('fs');

let file = 'frontend/src/components/TablaCruces.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update text for Femenino Formato
let oldFormato = `? 'Partidos de 65 min (2 tiempos de 30 min + 5 min de descanso). Los 1° lugares van directo a Semifinales. Los 2° y 3° disputan el Play-In el 19 de septiembre.'`;
let newFormato = `? 'Grupo Único de 9 equipos. Clasifican directamente a Semifinales los 4 primeros de la tabla general.'`;
content = content.replace(oldFormato, newFormato);

// 2. Extract Tercer lugar match
// The top of the file has:
// const rep1 = getCruce('rep1', 'Repechaje 1', '2° Grupo A', '3° Grupo B', '', '', '19-Sep');
// We will replace rep1 and rep2 with tercerF, and update defaults for semiF1 and semiF2.
let oldExtracts = `  const rep1 = getCruce('rep1', 'Repechaje 1', '2° Grupo A', '3° Grupo B', '', '', '19-Sep');
  const rep2 = getCruce('rep2', 'Repechaje 2', '2° Grupo B', '3° Grupo A', '', '', '19-Sep');
  const semiF1 = getCruce('semi1', 'Semifinal 1', '1° Grupo A (Directo)', 'Ganador Repechaje 2', '', '', '26-Sep');
  const semiF2 = getCruce('semi2', 'Semifinal 2', '1° Grupo B (Directo)', 'Ganador Repechaje 1', '', '', '26-Sep');
  const finalF = getCruce('final', '🏆 GRAN FINAL', 'Ganador Semifinal 1', 'Ganador Semifinal 2', '', '', '03-Oct');`;

let newExtracts = `  const semiF1 = getCruce('semi1', 'Semifinal 1', '1° de la Tabla', '4° de la Tabla', '', '', '26-Sep');
  const semiF2 = getCruce('semi2', 'Semifinal 2', '2° de la Tabla', '3° de la Tabla', '', '', '26-Sep');
  const tercerF = getCruce('tercer', 'Tercer Puesto', 'Perdedor Semifinal 1', 'Perdedor Semifinal 2', '', '', '03-Oct');
  const finalF = getCruce('final', '🏆 GRAN FINAL', 'Ganador Semifinal 1', 'Ganador Semifinal 2', '', '', '03-Oct');`;

content = content.replace(oldExtracts, newExtracts);

// 3. Update the bracket rendering for esFemenino
let oldBracket = `{esFemenino ? (
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
                🥇 Trofeo Femenino Interfarmacéutico
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
      ) : (`;

let newBracket = `{esFemenino ? (
        /* BRACKET FEMENINO (Semifinales y Finales) */
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lado Izquierdo: Semifinal 1 */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#1e293b]/90 p-5 rounded-3xl border-2 border-amber-400/70 shadow-2xl backdrop-blur-md">
            <div className="text-center border-b border-slate-600 pb-3">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Semifinal 1 (26-Sep)</span>
            </div>
            <PartidoCard match={semiF1} color="amber" />
          </div>

          {/* Centro: Gran Final y Tercer Lugar */}
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

            <div className="w-full border-t border-slate-600 pt-4 mt-2">
               <div className="text-center mb-3">
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">Tercer Lugar</span>
               </div>
               <PartidoCard match={tercerF} color="slate" />
            </div>

            <div className="text-center">
              <span className="inline-block rounded-full bg-amber-500/25 border-2 border-amber-300 px-5 py-2 text-xs font-black uppercase tracking-widest text-amber-300 shadow-md">
                🥇 Trofeo Femenino Interfarmacéutico
              </span>
            </div>
          </div>

          {/* Lado Derecho: Semifinal 2 */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-[#1e293b]/90 p-5 rounded-3xl border-2 border-emerald-400/70 shadow-2xl backdrop-blur-md">
            <div className="text-center border-b border-slate-600 pb-3">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">Semifinal 2 (26-Sep)</span>
            </div>
            <PartidoCard match={semiF2} color="emerald" />
          </div>
        </div>
      ) : (`;

content = content.replace(oldBracket, newBracket);

// 4. Update the header "Play-In: 19-Sep" for Femenino to "Semis: 26-Sep"
let oldHeader = `{esFemenino ? 'Play-In: 19-Sep' : 'Cuartos: 19-Sep'}`;
let newHeader = `{esFemenino ? 'Semifinales: 26-Sep' : 'Cuartos: 19-Sep'}`;
content = content.replace(oldHeader, newHeader);

let oldHeader2 = `<div className="text-emerald-300 font-black">Semifinales: 26-Sep</div>`;
let newHeader2 = `<div className="text-emerald-300 font-black">{esFemenino ? 'Finales: 03-Oct' : 'Semifinales: 26-Sep'}</div>`;
content = content.replace(oldHeader2, newHeader2);

let oldHeader3 = `<div className="text-amber-300 font-black">🏆 Finales: 03-Oct</div>`;
let newHeader3 = `{esFemenino ? null : <><span className="text-slate-400">•</span><div className="text-amber-300 font-black">🏆 Finales: 03-Oct</div></>}`;
content = content.replace(oldHeader3, newHeader3);

fs.writeFileSync(file, content, 'utf8');
console.log("TablaCruces updated successfully");
