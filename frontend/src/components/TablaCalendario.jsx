import { useState } from 'react';
import { Calendar, Clock, Trophy, MapPin, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { getJornadas } from '../utils/torneo';

export default function TablaCalendario({ grupos, categoria = 'masculino', resultados, esOrganizador, onGuardarResultado }) {
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState(0);
  const [editando, setEditando] = useState({});

  const listaJornadas = getJornadas(grupos, categoria);
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

  const guardarCambios = (partidoId) => {
    if (onGuardarResultado) {
      const data = editando[partidoId] || {};
      const res1 = data.res1 !== undefined ? data.res1 : (resultados?.[partidoId]?.res1 ?? '');
      const res2 = data.res2 !== undefined ? data.res2 : (resultados?.[partidoId]?.res2 ?? '');
      onGuardarResultado(partidoId, res1, res2);
      
      const newEditando = { ...editando };
      delete newEditando[partidoId];
      setEditando(newEditando);
    }
  };

  return (
    <div className="mt-4 rounded-[3rem] border-2 border-amber-400/70 bg-[#1e3a5f]/98 p-7 md:p-10 shadow-[0_28px_90px_rgba(245,158,11,0.4)] backdrop-blur-3xl text-slate-100">
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
                      <Clock size={16} className="text-amber-300" /> {partido.hora || 'Por definir'}
                    </span>
                    {partido.cancha && (
                      <span className="flex items-center gap-1 text-sky-300 font-bold bg-sky-900/40 px-2.5 py-1 rounded-md border border-sky-400/30">
                        <MapPin size={14} className="text-sky-400" /> {partido.cancha}
                      </span>
                    )}
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
                    <div className="flex flex-col items-center justify-center px-4 py-2 rounded-2xl bg-[#1e3a5f] border-2 border-amber-300 shadow-md min-w-[120px]">
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
                          <button 
                            onClick={() => guardarCambios(partido.id)} 
                            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black px-3 py-1 rounded-md text-[10px] flex items-center gap-1 transition w-full justify-center"
                          >
                            <Save size={12} /> Guardar
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center font-black text-amber-300 text-sm">
                          {resultados?.[partido.id] && resultados[partido.id].res1 !== null && resultados[partido.id].res1 !== undefined ? (
                            <span className="text-2xl text-white drop-shadow-md">
                              {resultados[partido.id].res1} - {resultados[partido.id].res2}
                            </span>
                          ) : (
                            <span className="text-lg">VS</span>
                          )}
                          <span className="text-[10px] font-black text-slate-300">{partido.grupo}</span>
                        </div>
                      )}
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
