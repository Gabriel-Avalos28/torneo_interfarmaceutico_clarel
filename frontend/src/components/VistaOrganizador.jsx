import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import TablaGrupos from './TablaGrupos';
import TablaCruces from './TablaCruces';
import TablaCalendario from './TablaCalendario';
import ModalSorteo from './ModalSorteo';
import { ArrowLeft, RotateCcw, Trophy, Users, TriangleAlert, Waves, Zap, Swords, LayoutGrid, MessageSquare, Building2, Shield, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const EMPRESAS_MASCULINO = [
  "ADIUM", "ASO. QUIMICOS", "B BRAUN", "BAGO", "BOEHRINGER INGELHEIM", 
  "CLAREL", "FARBIOPHARMA", "FARMAENLACE", "GRUPO FARMA", "GRUNENTHAL", 
  "JAMES BROWN", "LIFE", "MEGALABS", "NAOS", "PHYTOCHEMIE", 
  "QUALIPHARM", "ROCHE", "SIEGFRIED"
].sort();

const EMPRESAS_FEMENINO = [
  "BOEHRINGER INGELHEIM", "Inpel Quality", "FARBIOPHARMA", "FARMAENLACE",
  "JAMES BROWN", "LIFE", "MEGALABS", "QUALIPHARM", "ROCHE"
].sort();

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
const Estadio3D = lazy(() => import('./Estadio3D'));

function StatCard({ icon, label, value, hint, tone = 'slate' }) {
  const toneClass =
    tone === 'green' ? 'from-[#0d9488]/40 to-[#059669]/20 border-emerald-400/80 text-emerald-300'
      : tone === 'amber' ? 'from-amber-500/40 to-amber-600/20 border-amber-400/80 text-amber-300'
        : tone === 'blue' ? 'from-blue-600/40 to-indigo-600/20 border-blue-400/80 text-blue-300'
          : 'from-[#1e293b]/80 to-[#172554]/80 border-amber-400/60 text-slate-200';

  return (
    <div className={`rounded-3xl border-2 bg-[#1e293b]/95 bg-gradient-to-br ${toneClass} p-4 shadow-2xl backdrop-blur-2xl flex flex-col justify-between text-slate-100`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-amber-300 leading-tight">{label}</p>
          <p className="mt-1 text-3xl font-black text-[#fffbeb] drop-shadow-md">{value}</p>
        </div>
        <div className="rounded-2xl border-2 border-amber-400/50 bg-[#172554]/90 p-2.5 text-amber-300 shrink-0 shadow-inner">{icon}</div>
      </div>
      {hint ? <p className="mt-1.5 text-xs text-[#fffbeb]/80 font-semibold leading-tight truncate">{hint}</p> : null}
    </div>
  );
}

export default function VistaOrganizador() {
  const socketRef = useRef(null);
  const [conectado, setConectado] = useState(false);
  const [categoria, setCategoria] = useState('masculino');
  const [estadoGlobal, setEstadoGlobal] = useState(null);
  const [grupos, setGrupos] = useState({ A: [], B: [], C: [] });
  const [ultimoSorteado, setUltimoSorteado] = useState(null);
  const [restantes, setRestantes] = useState(18);
  const [sorteando, setSorteando] = useState(false);
  const [mensajeError, setMensajeError] = useState(null);
  const [pantallaCompleta, setPantallaCompleta] = useState(null);
  const [reacciones, setReacciones] = useState([]);
  const [cruces, setCruces] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [sorteoConfirmadoTs, setSorteoConfirmadoTs] = useState(0);

  const sincronizarConCategoria = (data, cat) => {
    if (!data) return;
    setEstadoGlobal(data);
    const sub = data[cat] || data;
    if (sub.sorteoEnProceso !== undefined) setSorteando(sub.sorteoEnProceso);
    else if (sub.ultimoSorteado) setSorteando(false);
    if (sub.grupos) setGrupos(sub.grupos);
    if (sub.disponibles !== undefined) setRestantes(sub.disponibles);
    if (sub.ultimoSorteado !== undefined) setUltimoSorteado(sub.ultimoSorteado);
    if (sub.cruces !== undefined) setCruces(sub.cruces);
    if (data.mensajes) setMensajes(data.mensajes);
  };

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      timeout: 10000,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConectado(true);
      setMensajeError(null);
    });

    socket.on('connect_error', () => {
      setConectado(false);
      setMensajeError('Sin conexión al servidor de sorteo');
    });

    socket.on('disconnect', () => {
      setConectado(false);
    });

    socket.on('estado_actual', (data) => {
      sincronizarConCategoria(data, categoria);
    });

    socket.on('iniciando_sorteo', (data) => {
      if (data && data.categoria === categoria) {
        setSorteando(true);
        setUltimoSorteado(null);
      } else if (!data?.categoria) {
        setSorteando(true);
        setUltimoSorteado(null);
      }
    });

    socket.on('nuevo_sorteo', (data) => {
      sincronizarConCategoria(data, categoria);
      setSorteando(false);
    });

    socket.on('sorteo_confirmado', (data) => {
      if (!data?.categoria || data.categoria === categoria) {
        setSorteoConfirmadoTs(Date.now());
      }
    });

    socket.on('cruces_generados', (data) => {
      sincronizarConCategoria(data, data.categoria || categoria);
    });

    socket.on('mostrar_reaccion', (reaccion) => {
      setReacciones((prev) => [...prev.slice(-39), reaccion]);
    });

    socket.on('nuevo_mensaje', (msg) => {
      setMensajes((prev) => [...prev.slice(-39), msg]);
    });

    socket.on('error_sorteo', (err) => {
      setSorteando(false);
      setMensajeError(err);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [categoria]);

  const handleCambioCategoria = (nuevaCat) => {
    if (nuevaCat !== categoria) {
      setCategoria(nuevaCat);
      setUltimoSorteado(null);
      if (estadoGlobal) {
        sincronizarConCategoria(estadoGlobal, nuevaCat);
      }
    }
  };

  const cambiarPantallaYSync = (pantalla) => {
    setPantallaCompleta(pantalla);
    if (socketRef.current && conectado) {
      socketRef.current.emit('sync_pantalla', { pantalla, categoria });
    }
  };

  const handleSorteo = () => {
    if (socketRef.current && conectado && restantes > 0 && !sorteando) {
      setSorteando(true);
      setUltimoSorteado(null);
      socketRef.current.emit('sortear_equipo', { categoria });
    }
  };

  const handleConfirmarSorteo = () => {
    if (socketRef.current && conectado) {
      socketRef.current.emit('confirmar_sorteo', { categoria });
    }
  };

  const handleReset = () => {
    if (window.confirm(`¿Estás seguro de reiniciar el torneo ${categoria.toUpperCase()}? Se borrarán todos los grupos asignados.`)) {
      if (socketRef.current && conectado) {
        socketRef.current.emit('reset_torneo', { categoria });
      }
    }
  };

  const handleGenerarCruces = () => {
    if (socketRef.current && conectado) {
      socketRef.current.emit('generar_cruces', { categoria });
    }
  };

  const enviarApoyo = (tipo) => {
    if (socketRef.current && conectado) {
      socketRef.current.emit('enviar_reaccion', tipo);
    }
  };

  const cuposRestantes = estadoGlobal?.[categoria]?.disponibles ?? restantes;
  const puedeSortear = cuposRestantes > 0 && conectado && !sorteando;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#1e3a5f] font-sans text-slate-100">
      <Suspense fallback={<div className="absolute inset-0 bg-[#1e3a5f] flex items-center justify-center font-bold text-slate-200">Cargando consola...</div>}>
        <Estadio3D grupos={grupos} ultimoSorteado={ultimoSorteado} reacciones={reacciones} cruces={cruces} mensajes={mensajes} categoria={categoria} />
      </Suspense>

      <ModalSorteo
        sorteando={sorteando}
        ultimoSorteado={ultimoSorteado}
        categoria={categoria}
        confirmadoRemoto={sorteoConfirmadoTs}
        onConfirmar={handleConfirmarSorteo}
        esOrganizador={true}
      />

      {pantallaCompleta && (
        <div className="fixed inset-0 z-50 bg-[#1e3a5f]/96 backdrop-blur-3xl overflow-y-auto p-4 sm:p-6 md:p-10 text-slate-100 animate-fade-in">
          <div className="max-w-[1550px] mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-5">
              <button
                onClick={() => cambiarPantallaYSync(null)}
                className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-amber-300 bg-amber-500/25 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-amber-300 hover:bg-amber-500/40 hover:border-amber-200 transition shadow-lg w-fit"
              >
                <ArrowLeft size={20} /> Volver a Panel de Control
              </button>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#334155] border-2 border-slate-400 px-5 py-2 text-sm font-black text-white uppercase tracking-widest shadow-md">
                  {pantallaCompleta === 'grupos' && '📊 Consola Oficial: Fase de Grupos'}
                  {pantallaCompleta === 'calendario' && '📅 Consola Oficial: Calendario de Partidos'}
                  {pantallaCompleta === 'cruces' && '🏆 Consola Oficial: Cuadro de Eliminación'}
                  {pantallaCompleta === 'participantes' && '🏢 Empresas Participantes: Estado del Sorteo'}
                </span>
              </div>
            </div>

            {pantallaCompleta === 'participantes' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {(categoria === 'masculino' ? EMPRESAS_MASCULINO : EMPRESAS_FEMENINO).map(emp => {
                  const sorteado = grupos ? Object.values(grupos).flat().includes(emp) : false;
                  return (
                    <div key={emp} className={`p-6 rounded-3xl border-4 transition-all flex items-center justify-center text-center h-28 ${
                      sorteado 
                        ? 'bg-slate-800/80 border-slate-600/50 opacity-50 shadow-inner scale-95' 
                        : 'bg-emerald-900/60 border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-105'
                    }`}>
                      <span className={`font-black text-xl lg:text-2xl uppercase tracking-widest ${
                        sorteado ? 'line-through text-slate-400 decoration-rose-500/70 decoration-[3px]' : 'text-emerald-50 drop-shadow-md'
                      }`}>
                        {emp}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {pantallaCompleta === 'grupos' && <TablaGrupos grupos={grupos} categoria={categoria} />}
            {pantallaCompleta === 'calendario' && <TablaCalendario grupos={grupos} categoria={categoria} />}
            {pantallaCompleta === 'cruces' && <TablaCruces cruces={cruces} categoria={categoria} />}
          </div>
        </div>
      )}

      <div className="absolute inset-0 z-10 pointer-events-none overflow-y-auto">
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <div className="flex items-center gap-2.5 rounded-full border-2 border-[#fbbf24] bg-gradient-to-r from-[#5c3a21] via-[#78350f] to-[#5c3a21] px-7 md:px-10 py-3 shadow-[0_12px_45px_rgba(180,83,9,0.65)] backdrop-blur-2xl">
            <span className="text-sm md:text-xl font-black tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fef3c7] to-[#fbbf24] uppercase drop-shadow-md text-center">
              🏆 TORNEO INTERFARMACÉUTICO CLAREL 2026 🏆
            </span>
          </div>
        </div>

        <div className="p-3 md:p-4 flex items-start justify-between gap-3 pointer-events-auto">
          <div className="flex flex-col gap-3 self-start">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border-2 border-amber-400/80 bg-[#1e293b]/95 px-5 py-2.5 text-sm font-black text-[#fffbeb] backdrop-blur-xl transition hover:border-[#fbbf24] hover:bg-[#172554] shadow-lg">
              <ArrowLeft size={16} className="text-[#fbbf24]" /> Salir
            </Link>
            <button
              onClick={() => cambiarPantallaYSync('participantes')}
              className={`inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-xs font-black text-[#fffbeb] uppercase tracking-widest backdrop-blur-xl transition shadow-lg ${
                pantallaCompleta === 'participantes' 
                  ? 'bg-gradient-to-r from-[#1e3a8a] to-[#0f172a] border-[#fbbf24]' 
                  : 'bg-[#1e293b]/95 border-emerald-400/60 hover:border-emerald-300 hover:bg-[#172554]'
              }`}
            >
              <Building2 size={16} className="text-emerald-400" /> Empresas Restantes
            </button>
          </div>

          <div className="flex flex-col items-end gap-2.5 ml-auto pointer-events-auto">
            <div className="flex items-center gap-1.5 rounded-full border-2 border-[#fbbf24] bg-[#172554]/95 p-1.5 backdrop-blur-2xl shadow-xl">
              <button
                onClick={() => handleCambioCategoria('masculino')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition ${categoria === 'masculino'
                    ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black'
                    : 'text-[#fffbeb]/80 hover:text-[#fffbeb] hover:bg-[#1e293b]'
                  }`}
              >
                🏆 Masculino
              </button>
              <button
                onClick={() => handleCambioCategoria('femenino')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition ${categoria === 'femenino'
                    ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black'
                    : 'text-[#fffbeb]/80 hover:text-[#fffbeb] hover:bg-[#1e293b]'
                  }`}
              >
                🥇 Femenino
              </button>
            </div>



            {/* Menú vertical elegante compactado a la derecha sin cruzarse con ningún texto */}
            <div className="flex flex-col items-stretch gap-2 rounded-2xl bg-[#1e293b]/95 p-2 border-2 border-[#fbbf24] shadow-2xl backdrop-blur-2xl w-[220px]">
              <button
                onClick={() => cambiarPantallaYSync('grupos')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition ${pantallaCompleta === 'grupos' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}`}
              >
                <LayoutGrid size={16} className="text-[#fbbf24] shrink-0" /> Fase de Grupos
              </button>
              <button
                onClick={() => cambiarPantallaYSync('calendario')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition ${pantallaCompleta === 'calendario' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#0f172a] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}`}
              >
                <Calendar size={16} className="text-[#fbbf24] shrink-0" /> Calendario Oficial
              </button>
              <button
                onClick={() => cambiarPantallaYSync('cruces')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition ${pantallaCompleta === 'cruces' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#0f172a] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}`}
              >
                <Swords size={16} className="text-[#fbbf24] shrink-0" /> Eliminatorias ({cruces.length})
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex flex-col md:flex-row gap-3 items-stretch justify-between pointer-events-auto">
          <div className="rounded-3xl border-2 border-[#fbbf24] bg-[#1e3a8a]/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-2xl flex flex-col justify-between md:w-[440px] text-slate-100">
            <div>
              <div className="flex items-center justify-between border-b border-amber-400/40 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[#fbbf24]" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#fbbf24]">Panel Sorteo</span>
                </div>
                <span className={`rounded-xl border-2 px-3 py-1 text-xs font-black uppercase tracking-widest ${conectado ? 'border-emerald-400/80 bg-[#064e3b]/80 text-emerald-300' : 'border-rose-400/80 bg-rose-900/60 text-rose-300'
                  }`}>
                  {conectado ? '• En Línea' : 'Desconectado'}
                </span>
              </div>

              {mensajeError && (
                <div className="mb-2.5 flex items-center gap-2 rounded-2xl border-2 border-rose-400/60 bg-rose-900/80 p-2.5 text-xs text-rose-200 font-bold">
                  <TriangleAlert size={16} className="shrink-0 text-rose-300" />
                  <span>{mensajeError}</span>
                </div>
              )}

              <button
                onClick={handleSorteo}
                disabled={!puedeSortear}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#fbbf24] via-[#d97706] to-[#fbbf24] p-[2px] transition hover:scale-[1.01] active:scale-98 disabled:opacity-45 disabled:pointer-events-none shadow-[0_12px_30px_rgba(245,158,11,0.4)]"
              >
                <div className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#172554] px-5 py-3 text-center font-black transition group-hover:bg-[#1e293b]">
                  <span className="text-2xl animate-spin shrink-0">🎰</span>
                  <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-extrabold leading-tight">
                      Activar Ruleta Giratoria
                    </span>
                    <span className="block text-base font-black text-[#fffbeb] leading-tight">
                      Sortear Equipo al Azar
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 pt-2.5 border-t border-amber-400/40">
              <button
                onClick={handleReset}
                disabled={!conectado}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#fbbf24] bg-[#172554] px-3.5 py-2.5 text-xs font-black uppercase tracking-widest text-[#fffbeb] hover:bg-[#1e3a8a] transition disabled:opacity-40"
              >
                <RotateCcw size={15} className="text-[#fbbf24]" /> Reiniciar Todo
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:w-[440px] self-end">
            <StatCard
              icon={<Users className="h-5 w-5 text-[#fbbf24]" />}
              label="Empresas en Ruleta"
              value={restantes}
              hint={`Por asignar (${categoria})`}
              tone="amber"
            />
            <StatCard
              icon={<Zap className="h-5 w-5 text-[#fbbf24]" />}
              label="Empresas Confirmadas"
              value={grupos ? Object.values(grupos).flat().length : 0}
              hint="Con posición oficial"
              tone="green"
            />
          </div>
        </div>

        {/* Mascot Image - Floating Left */}
        <img
          src="/mascota.png"
          alt="Mascota"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-[25vw] max-w-[120px] md:max-w-[180px] lg:max-w-[200px] object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-110 pointer-events-auto z-20 opacity-95"
        />

        {/* Sponsor Logo - Floating Right */}
        <div className="hidden md:flex absolute right-6 top-[60%] -translate-y-1/2 flex-col items-center gap-2 pointer-events-auto z-20 opacity-90 hover:opacity-100 transition-opacity">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#fbbf24] drop-shadow-md bg-[#1e293b]/80 px-2 rounded-full backdrop-blur-md border border-amber-400/30">Auspicia</span>
          <img
            src="/logo-mp.png"
            alt="M&P Eventos y Servicios"
            className="w-[20vw] max-w-[120px] lg:max-w-[160px] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-300 bg-white/10 rounded-2xl p-2 backdrop-blur-md border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}