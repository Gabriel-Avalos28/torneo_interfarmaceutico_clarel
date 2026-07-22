import { useEffect, useState, useRef } from 'react';
import { Sparkles, Trophy, Zap, Award } from 'lucide-react';

const EQUIPOS_MASCULINO = [
  "ADIUM", "B BRAUN", "BAGO", "BOEHRINGER INGELHEIM", "FARBIOPHARMA",
  "FARMAENLACE", "GRUPO FARMA", "GRUNENTHAL", "JAMES BROWN", "MEGALABS",
  "NAOS", "PHYTOCHEMIE", "QUALIPHARM", "ROCHE", "SIEGFRIED", "ASO. QUIMICOS"
];

const EQUIPOS_FEMENINO = [
  "BOEHRINGER INGELHEIM", "CLAREL", "FARBIOPHARMA", "FARMAENLACE",
  "JAMES BROWN", "LIFE", "MEGALABS", "QUALIPHARM", "ROCHE"
];

export default function ModalSorteo({ sorteando, ultimoSorteado, categoria = 'masculino', confirmadoRemoto = 0, onConfirmar, esOrganizador = true }) {
  const [rotacion, setRotacion] = useState(0);
  const [rotacionGrupo, setRotacionGrupo] = useState(0);
  const [equipoBajoPuntero, setEquipoBajoPuntero] = useState('');
  const [grupoBajoPuntero, setGrupoBajoPuntero] = useState('A');
  const [mostrarGanador, setMostrarGanador] = useState(false);
  const [ganadorActual, setGanadorActual] = useState(null);

  const ruletaRef = useRef(null);

  const listaEquipos = (ultimoSorteado?.categoria === 'femenino' || categoria === 'femenino')
    ? EQUIPOS_FEMENINO
    : EQUIPOS_MASCULINO;

  const listaGrupos = (ultimoSorteado?.categoria === 'femenino' || categoria === 'femenino')
    ? ['A', 'B']
    : ['A', 'B', 'C'];

  const sorteosConfirmadosRef = useRef(new Set());

  // Cierre sincronizado en ambas vistas (Organizador y Público) al recibir confirmación del servidor
  useEffect(() => {
    if (confirmadoRemoto > 0) {
      if (ultimoSorteado?.id) {
        sorteosConfirmadosRef.current.add(ultimoSorteado.id);
      }
      setMostrarGanador(false);
      setGanadorActual(null);
    }
  }, [confirmadoRemoto, ultimoSorteado?.id]);

  // Efecto de rotación con física de desaceleración (Casino Wheel)
  useEffect(() => {
    let intervalTick = null;
    let resetTimer = null;
    let spinTimer = null;
    let animFrame = null;

    if (sorteando) {
      resetTimer = setTimeout(() => {
        setMostrarGanador(false);
        setGanadorActual(null);
      }, 0);

      // Aseguramos que la rotación inicie en 0 grados físicamente para la transición
      setRotacion(0);
      setRotacionGrupo(0);

      // Gira la ruleta múltiples vueltas completas más un ángulo aleatorio inicial
      const targetRotacion = 360 * 10 + Math.floor(Math.random() * 360);
      const targetRotacionGrupo = 360 * 8 + Math.floor(Math.random() * 360);

      // Garantizar con reflow que el navegador haya pintado la ruleta en 0deg antes de aplicar transición en cualquier vista
      animFrame = requestAnimationFrame(() => {
        if (ruletaRef.current) {
          ruletaRef.current.getBoundingClientRect(); // Reflow físico para que el navegador registre 0deg en VistaPublico
        }
        spinTimer = setTimeout(() => {
          setRotacion(targetRotacion);
          setRotacionGrupo(targetRotacionGrupo);
        }, 60);
      });

      // Simulación de paso bajo el puntero (sonido visual de tic-tic)
      intervalTick = setInterval(() => {
        const randEq = listaEquipos[Math.floor(Math.random() * listaEquipos.length)];
        const randGr = listaGrupos[Math.floor(Math.random() * listaGrupos.length)];
        setEquipoBajoPuntero(randEq);
        setGrupoBajoPuntero(randGr);
      }, 70);
    }

    return () => {
      if (resetTimer) clearTimeout(resetTimer);
      if (spinTimer) clearTimeout(spinTimer);
      if (intervalTick) clearInterval(intervalTick);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [sorteando]);

  // Detección de resultado del sorteo del backend para fijar la ruleta en el ganador exacto
  useEffect(() => {
    let inicioTimer = null;
    let finTimer = null;

    if (!sorteando && ultimoSorteado && ultimoSorteado.id && (!ganadorActual || ganadorActual.id !== ultimoSorteado.id)) {
      // Verificamos que este sorteo no haya sido ya confirmado para evitar el bucle infinito de reapertura en el público
      if (!sorteosConfirmadosRef.current.has(ultimoSorteado.id) && Date.now() - ultimoSorteado.id < 6000) {
        inicioTimer = setTimeout(() => {
          setGanadorActual(ultimoSorteado);
          setMostrarGanador(true);

          // Calcular ángulo exacto para que el puntero señale al equipo y grupo ganador
          const indexEq = listaEquipos.indexOf(ultimoSorteado.equipo);
          if (indexEq !== -1) {
            const anglePerItem = 360 / listaEquipos.length;
            const finalAngle = 360 * Math.ceil(Math.max(rotacion, 360 * 10) / 360) + (360 - indexEq * anglePerItem);
            setRotacion(finalAngle);
          }
          setEquipoBajoPuntero(ultimoSorteado.equipo);
          setGrupoBajoPuntero(ultimoSorteado.grupo);
        }, 0);

        // Mantiene la vista abierta el tiempo necesario para que el organizador confirme sincronizadamente
        finTimer = setTimeout(() => {
          setMostrarGanador(false);
          setGanadorActual(null);
        }, 45000);
      }
    }

    return () => {
      if (inicioTimer) clearTimeout(inicioTimer);
      if (finTimer) clearTimeout(finTimer);
    };
  }, [sorteando, ultimoSorteado, ganadorActual]);

  const handleConfirmarClick = () => {
    if (ultimoSorteado?.id) {
      sorteosConfirmadosRef.current.add(ultimoSorteado.id);
    }
    setMostrarGanador(false);
    setGanadorActual(null);
    if (onConfirmar) {
      onConfirmar();
    }
  };

  if (!sorteando && !mostrarGanador) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070d18]/95 p-4 backdrop-blur-3xl transition-all duration-300 animate-fade-in text-white">
      {/* Luz ambiental dorada y resplandeciente */}
      <div className="absolute -z-10 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-amber-500/40 via-sky-400/30 to-amber-300/40 blur-[130px] animate-pulse" />

      {sorteando && (
        <div className="relative w-full max-w-xl overflow-hidden rounded-[3rem] border-2 border-amber-400/80 bg-gradient-to-b from-[#0e1726] via-[#111e33] to-[#1e293b] p-8 sm:p-10 shadow-[0_24px_90px_rgba(245,158,11,0.4)] text-center text-slate-100">
          {/* Cabecera Ejecutiva de Ruleta */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-500/20 px-5 py-1.5 text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-amber-300 animate-pulse">
              🎰 Ruleta Giratoria Oficial de Sorteo
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
            Sorteando Empresa y Grupo en Vivo...
          </h3>
          <p className="text-sm text-slate-300 mt-1 font-semibold">
            Categoría: <strong className="text-amber-300 uppercase">{ultimoSorteado?.categoria || categoria}</strong>
          </p>

          {/* Rueda de Casino Giratoria (Canvas/CSS Circular) */}
          <div className="relative my-8 mx-auto flex h-64 w-64 items-center justify-center">
            {/* Puntero Superior Dorado */}
            <div className="absolute -top-4 z-20 flex flex-col items-center drop-shadow-[0_4px_10px_rgba(245,158,11,0.9)]">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-amber-400" />
            </div>

            {/* Anillo exterior decorativo con luces */}
            <div className="absolute inset-0 rounded-full border-[8px] border-amber-600 shadow-[0_0_40px_rgba(0,0,0,0.15)_inset] bg-slate-100 overflow-hidden">
              {/* Rueda Giratoria con los segmentos de equipos */}
              <div
                ref={ruletaRef}
                className="w-full h-full rounded-full transition-transform ease-out"
                style={{
                  transform: `rotate(${rotacion}deg)`,
                  transitionDuration: '3.5s',
                  background: 'conic-gradient(from 0deg, #f8fafc 0deg 45deg, #e2e8f0 45deg 90deg, #cbd5e1 90deg 135deg, #e2e8f0 135deg 180deg, #f8fafc 180deg 225deg, #e2e8f0 225deg 270deg, #cbd5e1 270deg 315deg, #e2e8f0 315deg 360deg)'
                }}
              >
                {/* Líneas divisorias de segmentos */}
                {listaEquipos.map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-amber-500/60 origin-bottom"
                    style={{ transform: `rotate(${(360 / listaEquipos.length) * i}deg)` }}
                  />
                ))}
              </div>
            </div>

            {/* Centro del Buje del Casino */}
            <div className="absolute z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-amber-500/80 bg-gradient-to-br from-white to-amber-100 shadow-[0_5px_20px_rgba(245,158,11,0.4)] text-center p-2">
              <Trophy className="h-7 w-7 text-amber-600 animate-pulse" />
              <span className="text-[9px] font-black uppercase text-slate-700 mt-0.5">2026</span>
            </div>
          </div>

          {/* Ticker en tiempo real bajo la rueda */}
          <div className="rounded-3xl border border-slate-600 bg-[#1e293b]/95 p-5 shadow-inner">
            <span className="text-[11px] uppercase font-bold tracking-widest text-amber-300">Pasando bajo el puntero:</span>
            <p className="text-2xl sm:text-3xl font-black text-white tracking-wide truncate mt-1">
              {equipoBajoPuntero || listaEquipos[0]}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-xs font-semibold text-slate-300">Destino de Grupo:</span>
              <span className="rounded-xl border border-amber-400/60 bg-amber-500/25 px-3 py-1 text-sm font-black text-amber-300 shadow-sm">
                GRUPO {grupoBajoPuntero}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-300 italic">La física de desaceleración fijará la posición oficial del torneo en segundos...</p>
        </div>
      )}

      {!sorteando && mostrarGanador && ganadorActual && (
        <div className="relative w-full max-w-xl overflow-hidden rounded-[3rem] border-2 border-amber-400/80 bg-gradient-to-b from-[#0a1122] via-[#0f1d3a] to-[#1e293b] p-8 sm:p-10 shadow-[0_24px_90px_rgba(245,158,11,0.5)] text-center text-slate-100 transition-all duration-500 scale-105">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/25 shadow-lg animate-bounce">
            <Award className="h-10 w-10 text-amber-300" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-amber-500/25 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-300 shadow-sm">
            <Sparkles size={14} /> ¡Sorteo Exitoso - Posición Oficial Asignada!
          </div>

          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.3em] text-slate-300">Empresa / Equipo Ganador:</p>
          <h2 className="mt-1 text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
            {ganadorActual.equipo}
          </h2>

          <div className="my-6 rounded-3xl border border-emerald-400/60 bg-gradient-to-br from-[#065f46]/70 to-[#047857]/40 p-6 shadow-xl backdrop-blur-md">
            <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Se incorpora oficialmente al</p>
            <p className="mt-1 text-4xl sm:text-5xl font-black text-emerald-300 drop-shadow-sm">
              ➡ GRUPO {ganadorActual.grupo}
            </p>
            <span className="inline-block mt-2 text-[11px] font-semibold text-slate-200 uppercase">
              Categoría {ganadorActual.categoria === 'femenino' ? '🌸 Femenina (9 Equipos)' : '🏆 Masculina (18 Equipos)'}
            </span>
          </div>

          <button
            onClick={handleConfirmarClick}
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 px-6 py-4 text-sm font-black uppercase tracking-[0.25em] text-[#0a1122] shadow-xl hover:brightness-110 transition duration-300 border-2 border-amber-300 active:scale-[0.98]"
          >
            Confirmar y Ver Ubicación en Tabla
          </button>
        </div>
      )}
    </div>
  );
}
