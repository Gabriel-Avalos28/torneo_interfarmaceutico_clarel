import { useState, useMemo } from 'react';
import { Calendar, Clock, Trophy, MapPin, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { getJornadas } from '../utils/torneo';

export default function TablaCalendario({ grupos, categoria = 'masculino', resultados, esOrganizador, onGuardarResultado }) {
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState(0);
  const [editando, setEditando] = useState({});

  const listaJornadas = getJornadas(grupos, categoria, resultados);
  const jornadaActual = listaJornadas[jornadaSeleccionada] || listaJornadas[0];

  const handleInputChange = (partidoId, campo, valor) => {
    setEditando(prev => ({
      ...prev,
      [partidoId]: {
        ...(prev[partidoId] || {}),
        [campo]: valor
      }
    }));
  };

  const guardarCambios = (partidoId, originalCancha) => {
    if (onGuardarResultado) {
      const data = editando[partidoId] || {};
      const res1 = data.res1 !== undefined ? data.res1 : (resultados?.[partidoId]?.res1 ?? '');
      const res2 = data.res2 !== undefined ? data.res2 : (resultados?.[partidoId]?.res2 ?? '');
      const hora = data.hora !== undefined ? data.hora : (resultados?.[partidoId]?.hora ?? undefined);
      const cancha = data.cancha !== undefined ? data.cancha : (resultados?.[partidoId]?.cancha ?? originalCancha);
      
      const tipoResolucion = data.tipoResolucion !== undefined ? data.tipoResolucion : (resultados?.[partidoId]?.tipoResolucion ?? 'normal');
      const pen1 = data.pen1 !== undefined ? data.pen1 : (resultados?.[partidoId]?.pen1 ?? '');
      const pen2 = data.pen2 !== undefined ? data.pen2 : (resultados?.[partidoId]?.pen2 ?? '');

      onGuardarResultado(partidoId, res1, res2, hora, cancha, tipoResolucion, pen1, pen2);
      
      const newEditando = { ...editando };
      delete newEditando[partidoId];
      setEditando(newEditando);
    }
  };

  const partidosOrdenados = useMemo(() => {
    if (!jornadaActual?.partidos) return [];
    return [...jornadaActual.partidos].sort((a, b) => {
      const horaA = resultados?.[a.id]?.hora || a.hora || "23:59";
      const horaB = resultados?.[b.id]?.hora || b.hora || "23:59";
      return horaA.localeCompare(horaB);
    });
  }, [jornadaActual, resultados]);

  return (
    <div className="mt-4 rounded-[2rem] md:rounded-[3rem] border-2 border-amber-400/70 bg-[#1e3a5f]/98 p-4 md:p-10 shadow-[0_28px_90px_rgba(245,158,11,0.4)] backdrop-blur-3xl text-slate-100">
      {/* Encabezado Ejecutivo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-600 pb-7 mb-7">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-amber-400 bg-amber-500/25 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-300 shadow-md">
            <Calendar size={15} /> Torneo Interfarmacéutico Clarel 2026
          </div>
          <h2 className="mt-2.5 text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3 drop-shadow-md">
            <span>Programación: Categoría {categoria === 'femenino' ? '🥇 Femenina (9 Equipos)' : '🏆 Masculina (18 Equipos)'}</span>
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
            {partidosOrdenados.map((partido, idx) => {
              const ambosConfirmados = partido.eq1.confirmado && partido.eq2.confirmado;
              return (
                <div
                  key={partido.id || idx}
                  className={`relative overflow-hidden rounded-3xl border-2 p-6 transition duration-300 shadow-xl ${ambosConfirmados
                    ? 'border-emerald-400/80 bg-gradient-to-br from-[#1e3a5f] via-[#1e293b] to-[#0d9488]/40 hover:border-emerald-300'
                    : 'border-slate-500 bg-[#1e293b]/95 hover:border-amber-400'
                    }`}
                >
                  {/* Cabecera del partido: Hora y Cancha (Editable si es organizador) */}
                  <div className="flex flex-col gap-2 mb-4 pb-3 border-b border-slate-600">
                    {esOrganizador ? (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#1e293b]/50 p-2 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-amber-300" />
                          <input 
                            type="time" 
                            className="bg-slate-700 text-amber-300 font-black text-xs px-2 py-1 rounded outline-none border border-slate-500 focus:border-amber-400 w-[100px]"
                            value={editando[partido.id]?.hora ?? (resultados?.[partido.id]?.hora ?? (partido.hora || ''))}
                            onChange={(e) => handleInputChange(partido.id, 'hora', e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-sky-400" />
                          <select 
                            className="bg-slate-700 text-sky-300 font-bold text-xs px-2 py-1 rounded outline-none border border-slate-500 focus:border-sky-400 w-full sm:w-auto"
                            value={editando[partido.id]?.cancha ?? (resultados?.[partido.id]?.cancha ?? (partido.cancha || ''))}
                            onChange={(e) => handleInputChange(partido.id, 'cancha', e.target.value)}
                          >
                            <option value="">Por definir</option>
                            <option value="Cancha 1">Cancha 1</option>
                            <option value="Cancha 2">Cancha 2</option>
                            <option value="Sintética">Sintética</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs font-black text-slate-200">
                        <span className="flex items-center gap-2 text-amber-300 font-black text-sm">
                          <Clock size={16} className="text-amber-300" /> {resultados?.[partido.id]?.hora || partido.hora || 'Por definir'}
                        </span>
                        {(resultados?.[partido.id]?.cancha || partido.cancha) && (
                          <span className="flex items-center gap-1 text-sky-300 font-bold bg-sky-900/40 px-2.5 py-1 rounded-md border border-sky-400/30">
                            <MapPin size={14} className="text-sky-400" /> {resultados?.[partido.id]?.cancha || partido.cancha}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Enfrentamiento */}
                  <div className="flex items-center justify-between gap-2 sm:gap-4 my-4">
                    {/* Equipo 1 */}
                    <div className="flex-1 text-right min-w-0">
                      <p className={`text-sm sm:text-lg font-black leading-tight break-words whitespace-normal line-clamp-2 ${partido.eq1.confirmado ? 'text-white drop-shadow-md' : 'text-slate-300 italic font-bold'}`}>
                        {partido.eq1.nombre}
                      </p>
                      <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-amber-300 block truncate">
                        {partido.eq1.confirmado ? '✓ Conf.' : 'Pendiente'}
                      </span>
                    </div>

                    {/* VS */}
                    <div className="flex flex-col items-center justify-center px-2 sm:px-4 py-2 rounded-2xl bg-[#1e3a5f] border-2 border-amber-300 shadow-md min-w-[70px] sm:min-w-[120px]">
                      {esOrganizador && partido.eq1.confirmado && partido.eq2.confirmado ? (
                        <div className="flex flex-col items-center gap-2 w-full">
                          <div className="flex items-center justify-center gap-2 w-full">
                            <input 
                              type="number" 
                              min="0"
                              className="w-10 h-8 text-center font-black text-lg text-slate-900 bg-amber-100 rounded-md outline-none focus:ring-2 focus:ring-amber-500" 
                              value={editando[partido.id]?.res1 ?? (resultados?.[partido.id]?.res1 ?? '')} 
                              onChange={(e) => handleInputChange(partido.id, 'res1', e.target.value)} 
                            />
                            <span className="text-amber-300 font-black">-</span>
                            <input 
                              type="number" 
                              min="0"
                              className="w-10 h-8 text-center font-black text-lg text-slate-900 bg-amber-100 rounded-md outline-none focus:ring-2 focus:ring-amber-500" 
                              value={editando[partido.id]?.res2 ?? (resultados?.[partido.id]?.res2 ?? '')} 
                              onChange={(e) => handleInputChange(partido.id, 'res2', e.target.value)} 
                            />
                          </div>
                          {jornadaActual.isEliminatoria && (
                            <div className="flex flex-col items-center gap-1 mt-1 w-full text-xs">
                               <select 
                                  className="bg-slate-700 text-amber-300 font-bold px-2 py-1 rounded outline-none border border-slate-500 focus:border-amber-400 w-full text-center"
                                  value={editando[partido.id]?.tipoResolucion ?? (resultados?.[partido.id]?.tipoResolucion ?? 'normal')}
                                  onChange={(e) => handleInputChange(partido.id, 'tipoResolucion', e.target.value)}
                               >
                                  <option value="normal">Tiempo Reg.</option>
                                  <option value="extra">T. Extra</option>
                                  <option value="penales">Penales</option>
                               </select>
                               {(editando[partido.id]?.tipoResolucion ?? (resultados?.[partido.id]?.tipoResolucion ?? 'normal')) === 'penales' && (
                                  <div className="flex items-center gap-1 mt-1 w-full justify-center">
                                    <span className="text-slate-300 font-bold text-[10px]">PEN:</span>
                                    <input type="number" min="0" className="w-7 h-6 text-center font-bold text-slate-900 bg-emerald-100 rounded outline-none" value={editando[partido.id]?.pen1 ?? (resultados?.[partido.id]?.pen1 ?? '')} onChange={(e) => handleInputChange(partido.id, 'pen1', e.target.value)} />
                                    <span className="text-slate-300">-</span>
                                    <input type="number" min="0" className="w-7 h-6 text-center font-bold text-slate-900 bg-emerald-100 rounded outline-none" value={editando[partido.id]?.pen2 ?? (resultados?.[partido.id]?.pen2 ?? '')} onChange={(e) => handleInputChange(partido.id, 'pen2', e.target.value)} />
                                  </div>
                               )}
                            </div>
                          )}
                          <button 
                            onClick={() => guardarCambios(partido.id, partido.cancha)} 
                            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black px-3 py-1 rounded-md text-[10px] flex items-center gap-1 transition w-full justify-center mt-1"
                          >
                            <Save size={12} /> Guardar
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center font-black text-amber-300 text-sm">
                          {resultados?.[partido.id] && resultados[partido.id].res1 !== null && resultados[partido.id].res1 !== undefined ? (
                            <>
                              <span className="text-2xl text-white drop-shadow-md">
                                {resultados[partido.id].res1} - {resultados[partido.id].res2}
                              </span>
                              {resultados[partido.id].tipoResolucion === 'penales' && (
                                <span className="text-[10px] text-emerald-300 font-bold bg-[#1e293b] px-2 py-0.5 rounded-full border border-emerald-400 mt-1 whitespace-nowrap">
                                  (P) {resultados[partido.id].pen1} - {resultados[partido.id].pen2}
                                </span>
                              )}
                              {resultados[partido.id].tipoResolucion === 'extra' && (
                                <span className="text-[10px] text-amber-200 font-bold bg-[#1e293b] px-2 py-0.5 rounded-full border border-amber-400 mt-1">
                                  (T.E.)
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-lg">VS</span>
                          )}
                          <span className="text-[10px] font-black text-slate-300 mt-1">{partido.grupo}</span>
                        </div>
                      )}
                    </div>

                    {/* Equipo 2 */}
                    <div className="flex-1 text-left min-w-0">
                      <p className={`text-sm sm:text-lg font-black leading-tight break-words whitespace-normal line-clamp-2 ${partido.eq2.confirmado ? 'text-white drop-shadow-md' : 'text-slate-300 italic font-bold'}`}>
                        {partido.eq2.nombre}
                      </p>
                      <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-amber-300 block truncate">
                        {partido.eq2.confirmado ? '✓ Conf.' : 'Pendiente'}
                      </span>
                    </div>
                  </div>

                  {/* Estado del encuentro */}
                  <div className="mt-4 pt-3 border-t border-slate-600 flex items-center justify-between text-[10px] sm:text-xs font-semibold gap-2">
                    {ambosConfirmados ? (
                      <span className="inline-flex items-center gap-1.5 font-black text-emerald-300 truncate">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" /> <span className="truncate">Sorteo Completo</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 font-bold text-slate-300 truncate">
                        <AlertCircle size={14} className="text-amber-300 shrink-0" /> <span className="truncate">Esperando sorteo</span>
                      </span>
                    )}
                    <span className="text-slate-300 font-black uppercase shrink-0">Torneo 2026</span>
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
