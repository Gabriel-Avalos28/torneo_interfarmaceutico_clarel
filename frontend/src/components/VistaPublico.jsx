import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import TablaGrupos from './TablaGrupos';
import TablaCruces from './TablaCruces';
import TablaCalendario from './TablaCalendario';
import ModalSorteo from './ModalSorteo';
import { ArrowLeft, Shield, Sparkles, Swords, LayoutGrid, Send, MessageSquare, Building2, Calendar, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
const Estadio3D = lazy(() => import('./Estadio3D'));

export default function VistaPublico() {
  const socketRef = useRef(null);
  const [categoria, setCategoria] = useState('masculino'); // 'masculino' | 'femenino'
  const [estadoGlobal, setEstadoGlobal] = useState(null);
  const [grupos, setGrupos] = useState(null);
  const [ultimoSorteado, setUltimoSorteado] = useState(null);
  const [cruces, setCruces] = useState([]);
  const [reacciones, setReacciones] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [conectado, setConectado] = useState(false);
  const [pantallaCompleta, setPantallaCompleta] = useState(null); // null | 'grupos' | 'cruces' | 'calendario'
  const [autor, setAutor] = useState('');
  const [texto, setTexto] = useState('');
  const [sorteando, setSorteando] = useState(false);
  const [sorteoConfirmadoTs, setSorteoConfirmadoTs] = useState(0);

  // Actualiza los estados visibles según la categoría seleccionada
  const sincronizarConCategoria = (data, cat) => {
    if (!data) return;
    setEstadoGlobal(data);
    const sub = data[cat] || data;
    if (sub.sorteoEnProceso !== undefined) setSorteando(sub.sorteoEnProceso);
    else if (sub.ultimoSorteado) setSorteando(false);
    if (sub.grupos) setGrupos(sub.grupos);
    if (sub.ultimoSorteado !== undefined) setUltimoSorteado(sub.ultimoSorteado);
    if (sub.cruces !== undefined) setCruces(sub.cruces);
    if (data.mensajes) setMensajes(data.mensajes);
  };

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on('connect', () => setConectado(true));
    socket.on('disconnect', () => setConectado(false));

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
        setPantallaCompleta(null); // Vuelve a pantalla principal al confirmar
      }
    });

    socket.on('cambio_pantalla', (data) => {
      if (data && (data.categoria === undefined || data.categoria === categoria)) {
        setPantallaCompleta(data.pantalla || null);
      }
    });

    socket.on('cruces_generados', (data) => {
      sincronizarConCategoria(data, categoria);
      setPantallaCompleta('cruces');
    });

    socket.on('mostrar_reaccion', (reaccion) => setReacciones((prev) => [...prev.slice(-39), reaccion]));
    socket.on('nuevo_mensaje', (msg) => setMensajes((prev) => [...prev.slice(-39), msg]));

    return () => socket.disconnect();
  }, [categoria]);

  const handleCambioCategoria = (nuevaCat) => {
    setCategoria(nuevaCat);
    if (estadoGlobal) sincronizarConCategoria(estadoGlobal, nuevaCat);
  };

  const handleConfirmarSorteo = () => {
    if (socketRef.current && conectado) {
      socketRef.current.emit('confirmar_sorteo', { categoria });
    }
  };

  const enviarApoyo = (tipo) => {
    if (conectado && socketRef.current) socketRef.current.emit('enviar_reaccion', tipo);
  };

  const handleEnviarMensaje = (e) => {
    e.preventDefault();
    if (!texto.trim() || !conectado || !socketRef.current) return;
    socketRef.current.emit('enviar_mensaje', {
      autor: autor.trim() || 'Representante',
      texto: texto.trim()
    });
    setTexto('');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-sky-50 font-sans text-slate-900">
      <Suspense fallback={<div className="absolute inset-0 bg-sky-50 flex items-center justify-center font-bold text-slate-700">Cargando estadio ejecutivo...</div>}>
        <Estadio3D grupos={grupos} ultimoSorteado={ultimoSorteado} reacciones={reacciones} cruces={cruces} mensajes={mensajes} categoria={categoria} />
      </Suspense>

      {/* Ruleta de Casino de Sorteo en Vivo */}
      <ModalSorteo
        sorteando={sorteando}
        ultimoSorteado={ultimoSorteado}
        categoria={categoria}
        confirmadoRemoto={sorteoConfirmadoTs}
        onConfirmar={handleConfirmarSorteo}
        esOrganizador={false}
      />

      {/* Vista A PANTALLA COMPLETA (Fase de Grupos, Calendario o Fixture) */}
      {pantallaCompleta && (
        <div className="fixed inset-0 z-50 bg-[#1e3a5f]/96 backdrop-blur-3xl overflow-y-auto p-4 sm:p-6 md:p-10 text-slate-100 animate-fade-in">
          <div className="max-w-[1550px] mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-5">
              <button
                onClick={() => setPantallaCompleta(null)}
                className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-amber-300 bg-amber-500/25 px-7 py-3.5 text-sm font-black uppercase tracking-widest text-amber-300 hover:bg-amber-500/40 hover:border-amber-200 transition shadow-lg w-fit"
              >
                <ArrowLeft size={20} /> Volver al Estadio Principal (Transmisión 3D)
              </button>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#334155] border-2 border-slate-400 px-5 py-2 text-sm font-black text-white uppercase tracking-widest shadow-md">
                  {pantallaCompleta === 'grupos' && '📊 Vista Oficial: Fase de Grupos'}
                  {pantallaCompleta === 'calendario' && '📅 Vista Oficial: Calendario de Partidos'}
                  {pantallaCompleta === 'cruces' && '🏆 Vista Oficial: Cuadro de Eliminatorias'}
                </span>
              </div>
            </div>

            {pantallaCompleta === 'grupos' && <TablaGrupos grupos={grupos} categoria={categoria} />}
            {pantallaCompleta === 'calendario' && <TablaCalendario grupos={grupos} categoria={categoria} />}
            {pantallaCompleta === 'cruces' && <TablaCruces cruces={cruces} categoria={categoria} />}
          </div>
        </div>
      )}

      <div className="absolute inset-0 z-10 pointer-events-none overflow-y-auto">
        {/* Título Oficial en la mitad en la parte superior: Solid metallic bronze band with cream-gold font and detailed bronze trophies */}
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <div className="flex items-center gap-2.5 rounded-full border-2 border-[#fbbf24] bg-gradient-to-r from-[#5c3a21] via-[#78350f] to-[#5c3a21] px-7 md:px-10 py-3 shadow-[0_12px_45px_rgba(180,83,9,0.65)] backdrop-blur-2xl">
            <span className="text-sm md:text-xl font-black tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fef3c7] to-[#fbbf24] uppercase drop-shadow-md text-center">
              🏆 TORNEO INTERFARMACÉUTICO CLAREL 2026 🏆
            </span>
          </div>
        </div>

        <div className="p-3 md:p-4 flex items-start justify-between gap-3 pointer-events-auto">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border-2 border-amber-400/80 bg-[#1e293b]/95 px-5 py-2.5 text-sm font-black text-[#fffbeb] backdrop-blur-xl transition hover:border-[#fbbf24] hover:bg-[#172554] shadow-lg self-start">
            <ArrowLeft size={16} className="text-[#fbbf24]" /> Salir
          </Link>

          {/* Controles de Pestaña (Masculino / Femenino) y Botones de Menú compactos */}
          <div className="flex flex-col items-end gap-2.5 ml-auto pointer-events-auto">
            {/* Selector Ejecutivo de Categorías compactado exactamente como en VistaOrganizador */}
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
                onClick={() => setPantallaCompleta('grupos')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition ${pantallaCompleta === 'grupos' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}`}
              >
                <LayoutGrid size={16} className="text-[#fbbf24] shrink-0" /> Fase de Grupos
              </button>
              <button
                onClick={() => setPantallaCompleta('calendario')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition ${pantallaCompleta === 'calendario' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}`}
              >
                <Calendar size={16} className="text-[#fbbf24] shrink-0" /> Calendario Oficial
              </button>
              <button
                onClick={() => setPantallaCompleta('cruces')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition ${pantallaCompleta === 'cruces' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}`}
              >
                <Trophy size={16} className="text-[#fbbf24] shrink-0" /> Cuadro Eliminatorias
              </button>
            </div>
          </div>
        </div>



        {/* Panel inferior compacto de Mensajes y Reacciones, prominente en móvil */}
        <div className="absolute inset-x-2 top-[35%] bottom-2 md:top-auto md:bottom-3 md:left-1/2 md:-translate-x-1/2 md:w-[min(96vw,840px)] pointer-events-auto z-40">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 items-stretch h-full md:h-auto">
            {/* Mensajes en Vivo Compacto */}
            <div className="rounded-3xl border-2 border-[#fbbf24] bg-[#1e3a8a]/95 p-3.5 shadow-2xl backdrop-blur-2xl flex flex-col justify-between text-slate-100">
              <div className="flex items-center gap-2 border-b border-amber-400/40 pb-2 mb-1.5">
                <MessageSquare size={15} className="text-[#fbbf24] shrink-0" />
                <span className="text-xs font-black uppercase tracking-widest text-[#fbbf24]">Mensajes de Representantes</span>
              </div>

              <div className="flex-1 max-h-[45vh] md:max-h-24 overflow-y-auto pr-1 flex flex-col gap-1.5 my-0.5">
                {mensajes && mensajes.length > 0 ? (
                  mensajes.slice(-5).map((msg) => (
                    <div key={msg.id} className="rounded-xl bg-[#172554]/90 border border-amber-400/40 px-2.5 py-1 text-xs">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-black text-[#fbbf24] tracking-wide flex items-center gap-1 text-[11px]">
                          <Building2 size={11} className="text-[#fbbf24]" /> {msg.autor}
                        </span>
                        <span className="text-[9px] text-[#fffbeb]/80">{msg.timestamp}</span>
                      </div>
                      <p className="mt-0.5 text-[#fffbeb] font-semibold leading-tight text-[11px]">{msg.texto}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#fffbeb]/80 italic text-center py-2">Sé el primer representante en proyectar un mensaje...</p>
                )}
              </div>

              <form onSubmit={handleEnviarMensaje} className="mt-1.5 pt-2 border-t border-amber-400/40 flex gap-2">
                <input
                  type="text"
                  placeholder="Empresa"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  maxLength={30}
                  className="rounded-xl border border-amber-400/50 bg-[#172554] px-2.5 py-1 text-xs font-bold text-[#fffbeb] placeholder-slate-400 focus:border-[#fbbf24] focus:outline-none w-24 shadow-inner"
                />
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  maxLength={160}
                  className="rounded-xl border border-amber-400/50 bg-[#172554] px-2.5 py-1 text-xs font-bold text-[#fffbeb] placeholder-slate-400 focus:border-[#fbbf24] focus:outline-none flex-1 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!texto.trim() || !conectado}
                  className="rounded-xl bg-gradient-to-r from-[#fbbf24] via-[#d97706] to-[#fbbf24] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#172554] shadow hover:brightness-110 disabled:opacity-40 transition flex items-center justify-center gap-1 shrink-0 border border-[#fbbf24]"
                >
                  <Send size={12} /> Enviar
                </button>
              </form>
            </div>

            {/* Reacciones en Vivo Compacto */}
            <div className="rounded-3xl border-2 border-[#fbbf24] bg-[#1e3a8a]/95 p-3.5 shadow-2xl backdrop-blur-2xl flex flex-col justify-between text-slate-100">
              <div className="flex items-center gap-2 border-b border-amber-400/40 pb-2 mb-1.5">
                <Shield size={16} className="text-[#fbbf24] shrink-0" />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#fffbeb] leading-tight">Reacciones 3D Oficiales</p>
                  <p className="text-[10px] text-[#fffbeb]/80">Lanza animaciones en vivo</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 my-auto py-1">
                <button
                  onClick={() => enviarApoyo('balon')}
                  disabled={!conectado}
                  className="h-10 px-3 flex items-center justify-center gap-2 rounded-2xl bg-[#172554] text-[#fffbeb] border-2 border-[#fbbf24] hover:bg-[#1e293b] hover:scale-[1.02] active:scale-95 transition shadow-md font-black uppercase tracking-wider text-xs"
                >
                  <span className="text-base">⚽</span> Balón
                </button>
                <button
                  onClick={() => enviarApoyo('trofeo')}
                  disabled={!conectado}
                  className="h-10 px-3 flex items-center justify-center gap-2 rounded-2xl bg-[#172554] text-[#fbbf24] border-2 border-[#fbbf24] hover:bg-[#1e293b] hover:scale-[1.02] active:scale-95 transition shadow-md font-black uppercase tracking-wider text-xs"
                >
                  <span className="text-base">🏆</span> Trofeo
                </button>
              </div>

              <div className="mt-1.5 pt-1.5 border-t border-amber-400/40 flex items-center justify-between text-[11px] text-[#fffbeb]/80 font-semibold">
                <span>Partículas en tiempo real</span>
                <span className="font-black text-[#fbbf24]">{reacciones.length} proyectadas</span>
              </div>
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