import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import TablaGrupos from './TablaGrupos';
import TablaCruces from './TablaCruces';
import TablaCalendario from './TablaCalendario';
import { ArrowLeft, Trophy, LayoutGrid, Calendar, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';



const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
const Estadio3D = lazy(() => import('./Estadio3D'));



export default function VistaOrganizador() {
  const [autenticado, setAutenticado] = useState(sessionStorage.getItem('adminAuth') === 'true');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ClarelAdmin2026*') {
      setAutenticado(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      setErrorLogin('Contraseña incorrecta');
      setPassword('');
    }
  };

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



  if (!autenticado) {
    return (
      <div className="min-h-screen bg-[#1e3a5f] flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#2563eb] to-[#334155] -z-10"></div>
        <form onSubmit={handleLogin} className="bg-[#1e293b]/90 border-2 border-amber-400 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-black text-white mb-2 drop-shadow-md">Acceso Restringido</h2>
          <p className="text-amber-300 font-bold text-sm uppercase tracking-widest mb-8">Panel de Organización Oficial</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce la contraseña"
            className="w-full bg-[#334155] border-2 border-slate-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors mb-4 text-center font-bold"
          />

          {errorLogin && <p className="text-red-400 font-bold mb-4 text-sm animate-pulse">{errorLogin}</p>}

          <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#1e3a5f] font-black py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
            Desbloquear Panel
          </button>
        </form>
      </div>
    );
  }



  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#1e3a5f] font-sans text-slate-100">
      <Suspense fallback={<div className="absolute inset-0 bg-[#1e3a5f] flex items-center justify-center font-bold text-slate-200">Cargando consola...</div>}>
        <Estadio3D grupos={grupos} ultimoSorteado={ultimoSorteado} reacciones={reacciones} cruces={cruces} mensajes={mensajes} categoria={categoria} />
      </Suspense>



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

                </span>
              </div>
            </div>



            {pantallaCompleta === 'grupos' && <TablaGrupos grupos={grupos} categoria={categoria} resultados={estadoGlobal?.[categoria]?.resultados || {}} />}
            {pantallaCompleta === 'calendario' && <TablaCalendario grupos={grupos} categoria={categoria} resultados={estadoGlobal?.[categoria]?.resultados || {}} esOrganizador={true} onGuardarResultado={(matchId, res1, res2, hora, cancha) => socketRef.current && socketRef.current.emit('actualizar_marcador', { categoria, matchId, res1, res2, hora, cancha })} />}
            {pantallaCompleta === 'cruces' && <TablaCruces cruces={cruces} categoria={categoria} grupos={grupos} resultados={estadoGlobal?.[categoria]?.resultados || {}} />}
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



        {/* Mascot Image - Floating Left */}
        <img
          src="/mascota.png"
          alt="Mascota"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-[25vw] max-w-[120px] md:max-w-[180px] lg:max-w-[200px] object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-110 pointer-events-auto z-20 opacity-95"
        />

        {/* Sponsor Logo - Floating Right */}
        <div className="hidden md:flex absolute right-6 top-[60%] -translate-y-1/2 flex-col items-center gap-2 pointer-events-auto z-20 opacity-90 hover:opacity-100 transition-opacity">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#fbbf24] drop-shadow-md bg-[#1e293b]/80 px-2 rounded-full backdrop-blur-md border border-amber-400/30">Organizado por</span>
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