const fs = require('fs');

const file = 'frontend/src/components/VistaPublico.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the whole UI layout section from `<div className="absolute inset-0 z-10 pointer-events-none overflow-y-auto">`
// to the end of the file.

const oldSection = `<div className="absolute inset-0 z-10 pointer-events-none overflow-y-auto">
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
                className={\`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition \${categoria === 'masculino'
                    ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black'
                    : 'text-[#fffbeb]/80 hover:text-[#fffbeb] hover:bg-[#1e293b]'
                  }\`}
              >
                🏆 Masculino
              </button>
              <button
                onClick={() => handleCambioCategoria('femenino')}
                className={\`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition \${categoria === 'femenino'
                    ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black'
                    : 'text-[#fffbeb]/80 hover:text-[#fffbeb] hover:bg-[#1e293b]'
                  }\`}
              >
                🥇 Femenino
              </button>
            </div>



            {/* Menú vertical elegante compactado a la derecha sin cruzarse con ningún texto */}
            <div className="flex flex-col items-stretch gap-2 rounded-2xl bg-[#1e293b]/95 p-2 border-2 border-[#fbbf24] shadow-2xl backdrop-blur-2xl w-[220px]">
              <button
                onClick={() => setPantallaCompleta('grupos')}
                className={\`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition \${pantallaCompleta === 'grupos' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}\`}
              >
                <LayoutGrid size={16} className="text-[#fbbf24] shrink-0" /> Fase de Grupos
              </button>
              <button
                onClick={() => setPantallaCompleta('calendario')}
                className={\`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition \${pantallaCompleta === 'calendario' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}\`}
              >
                <Calendar size={16} className="text-[#fbbf24] shrink-0" /> Calendario Oficial
              </button>
              <button
                onClick={() => setPantallaCompleta('cruces')}
                className={\`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition \${pantallaCompleta === 'cruces' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md font-black' : 'text-amber-300 hover:bg-[#1e293b]'}\`}
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
            <div className="rounded-3xl border-2 border-[#fbbf24] bg-[#1e3a8a]/95 p-3.5 shadow-2xl backdrop-blur-2xl flex flex-col justify-between text-slate-100">`;

const newSection = `<div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between overflow-hidden">
        {/* Superior: Título y Controles (Categoría + Salir) */}
        <div className="flex-none p-3 md:p-4 flex flex-col items-center gap-3 pointer-events-auto mt-2 w-full">
          {/* Título Oficial en Móvil */}
          <div className="w-full md:hidden flex justify-center mb-1">
            <div className="rounded-full border-2 border-[#fbbf24] bg-gradient-to-r from-[#5c3a21] via-[#78350f] to-[#5c3a21] px-5 py-2 shadow-lg backdrop-blur-2xl">
              <span className="text-[10px] font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fef3c7] to-[#fbbf24] uppercase text-center whitespace-nowrap">
                🏆 TORNEO CLAREL 2026 🏆
              </span>
            </div>
          </div>
          
          {/* Título Oficial en Desktop (Centro Fijo) */}
          <div className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <div className="flex items-center gap-2.5 rounded-full border-2 border-[#fbbf24] bg-gradient-to-r from-[#5c3a21] via-[#78350f] to-[#5c3a21] px-10 py-3 shadow-2xl backdrop-blur-2xl">
              <span className="text-xl font-black tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fef3c7] to-[#fbbf24] uppercase drop-shadow-md text-center">
                🏆 TORNEO INTERFARMACÉUTICO CLAREL 2026 🏆
              </span>
            </div>
          </div>

          {/* Botones de Control Top */}
          <div className="flex w-full items-center justify-between gap-2 max-w-[840px] mx-auto md:mt-14">
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-full border-2 border-amber-400/80 bg-[#1e293b]/95 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm font-black text-[#fffbeb] backdrop-blur-xl transition hover:border-[#fbbf24] hover:bg-[#172554] shadow-lg shrink-0">
              <ArrowLeft size={14} className="text-[#fbbf24]" /> Salir
            </Link>

            {/* Selector Ejecutivo de Categorías */}
            <div className="flex items-center gap-1 rounded-full border-2 border-[#fbbf24] bg-[#172554]/95 p-1 backdrop-blur-2xl shadow-xl shrink-0">
              <button
                onClick={() => handleCambioCategoria('masculino')}
                className={\`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition \${categoria === 'masculino'
                    ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md'
                    : 'text-[#fffbeb]/80 hover:text-[#fffbeb] hover:bg-[#1e293b]'
                  }\`}
              >
                🏆 Masc.
              </button>
              <button
                onClick={() => handleCambioCategoria('femenino')}
                className={\`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition \${categoria === 'femenino'
                    ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md'
                    : 'text-[#fffbeb]/80 hover:text-[#fffbeb] hover:bg-[#1e293b]'
                  }\`}
              >
                🥇 Fem.
              </button>
            </div>
          </div>
        </div>

        {/* Medio: Espacio vacío para que el estadio se vea bien en el fondo */}
        <div className="flex-1 pointer-events-none min-h-[10px]"></div>

        {/* Inferior: Paneles de Contenido (Menú, Mensajes, Reacciones) */}
        <div className="flex-none flex flex-col gap-2 p-2 md:p-4 pointer-events-auto w-full max-w-[840px] mx-auto pb-safe">
          
          {/* Menú de Vistas (Horizontal scrollable en móvil) */}
          <div className="flex overflow-x-auto gap-2 rounded-2xl bg-[#1e293b]/95 p-1.5 border-2 border-[#fbbf24] shadow-2xl backdrop-blur-2xl w-full scrollbar-hide">
            <button
              onClick={() => setPantallaCompleta('grupos')}
              className={\`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition whitespace-nowrap \${pantallaCompleta === 'grupos' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md' : 'text-amber-300 hover:bg-[#1e293b]'}\`}
            >
              <LayoutGrid size={14} className="text-[#fbbf24]" /> Grupos
            </button>
            <button
              onClick={() => setPantallaCompleta('calendario')}
              className={\`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition whitespace-nowrap \${pantallaCompleta === 'calendario' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md' : 'text-amber-300 hover:bg-[#1e293b]'}\`}
            >
              <Calendar size={14} className="text-[#fbbf24]" /> Calendario
            </button>
            <button
              onClick={() => setPantallaCompleta('cruces')}
              className={\`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition whitespace-nowrap \${pantallaCompleta === 'cruces' ? 'bg-gradient-to-r from-[#1e3a8a] to-[#1e293b] border border-[#fbbf24] text-[#fffbeb] shadow-md' : 'text-amber-300 hover:bg-[#1e293b]'}\`}
            >
              <Trophy size={14} className="text-[#fbbf24]" /> Eliminatorias
            </button>
          </div>

          {/* Panel de Mensajes y Reacciones */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-3 w-full">
            {/* Mensajes en Vivo Compacto */}
            <div className="rounded-3xl border-2 border-[#fbbf24] bg-[#1e3a8a]/95 p-3.5 shadow-2xl backdrop-blur-2xl flex flex-col justify-between text-slate-100 flex-1 max-h-[35vh] md:max-h-auto overflow-hidden">`;

let c2 = content.replace(oldSection, newSection);
if(c2 === content) {
    console.error("Replacement failed: string not found");
} else {
    fs.writeFileSync(file, c2, 'utf8');
    console.log("Successfully updated VistaPublico.jsx layout");
}
