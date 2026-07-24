import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

const VistaOrganizador = lazy(() => import('./components/VistaOrganizador'));
const VistaPublico = lazy(() => import('./components/VistaPublico'));

function MenuPrincipal() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1e3a5f] text-slate-100 relative z-10 overflow-hidden">
      {/* Fondo Mate Profundo con Contraste Increíble (Sin Negro) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#2563eb] to-[#334155] -z-10"></div>
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-amber-400/30 via-orange-400/20 to-transparent blur-3xl -z-10 animate-pulse"></div>

      <h1 className="text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-200 drop-shadow-md text-center px-4 relative z-10">
        Torneo Interfarmacéutico 2026
      </h1>
      <p className="text-xl md:text-2xl text-sky-200 font-bold mb-12 tracking-widest uppercase text-center px-4 relative z-10">Gran Sorteo Inaugural • Edición Especial Mate</p>

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        <Link to="/organizador" className="px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#1e3a5f] hover:scale-105 rounded-3xl font-black text-2xl transition-all shadow-[0_12px_35px_rgba(245,158,11,0.45)] hover:shadow-[0_18px_45px_rgba(245,158,11,0.65)] text-center border-2 border-amber-300">
          Entrar como Organizador
        </Link>
        <Link to="/publico" className="px-10 py-5 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white hover:scale-105 rounded-3xl font-black text-2xl transition-all shadow-[0_12px_35px_rgba(37,99,235,0.45)] hover:shadow-[0_18px_45px_rgba(37,99,235,0.65)] text-center border-2 border-sky-300">
          Entrar como Representante
        </Link>
      </div>

      {/* Mascot Image - Bottom Left */}
      <img
        src="/mascota.png"
        alt="Mascota del Torneo Clarel"
        className="absolute bottom-0 left-0 w-48 md:w-72 lg:w-96 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105 origin-bottom-left z-0 opacity-95"
      />

      {/* Sponsor Logo - Bottom Right */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-center gap-2 z-0 opacity-90 hover:opacity-100 transition-opacity">
        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#fbbf24] drop-shadow-md">Auspicia</span>
        <img
          src="/logo-mp.png"
          alt="M&P Eventos y Servicios"
          className="w-32 md:w-48 lg:w-56 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-sky-50 text-sm font-bold text-slate-700">
            Cargando aplicación...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<MenuPrincipal />} />
          <Route path="/organizador" element={<VistaOrganizador />} />
          <Route path="/publico" element={<VistaPublico />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}