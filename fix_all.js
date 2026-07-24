const fs = require('fs');

const file = './frontend/src/components/TablaCalendario.jsx';
let content = fs.readFileSync(file, 'utf8');

const nuevoMasculino = `const jornadasMasculino = [
  {
    fecha: "01 de Agosto",
    titulo: "Jornada 1 (Inauguración)",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") }
    ]
  },
  {
    fecha: "15 de Agosto",
    titulo: "Jornada 2",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") }
    ]
  },
  {
    fecha: "22 de Agosto",
    titulo: "Jornada 3",
    partidos: [
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 3, "4° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") }
    ]
  },
  {
    fecha: "29 de Agosto",
    titulo: "Jornada 4",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 2, "3° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 1, "2° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 4, "5° Grupo B") }
    ]
  },
  {
    fecha: "05 de Septiembre",
    titulo: "Jornada 5",
    partidos: [
      { grupo: "Grupo C", eq1: getEq("C", 3, "4° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 1, "2° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 3, "4° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 4, "5° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 5, "6° Grupo A") }
    ]
  },
  {
    fecha: "12 de Septiembre",
    titulo: "Jornada 6 - Cierre de Grupos",
    partidos: [
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 4, "5° Grupo B"), eq2: getEq("B", 5, "6° Grupo B") },
      { grupo: "Grupo C", eq1: getEq("C", 0, "1° Grupo C"), eq2: getEq("C", 1, "2° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 2, "3° Grupo C"), eq2: getEq("C", 3, "4° Grupo C") },
      { grupo: "Grupo C", eq1: getEq("C", 4, "5° Grupo C"), eq2: getEq("C", 5, "6° Grupo C") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") }
    ]
  }
];`;

const nuevoFemenino = `const jornadasFemenino = [
  {
    fecha: "01 de Agosto",
    titulo: "Jornada 1 (Inauguración)",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") }
    ]
  },
  {
    fecha: "15 de Agosto",
    titulo: "Jornada 2",
    partidos: [
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 0, "1° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") }
    ]
  },
  {
    fecha: "22 de Agosto",
    titulo: "Jornada 3",
    partidos: [
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 1, "2° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo A", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 1, "2° Grupo A") }
    ]
  },
  {
    fecha: "29 de Agosto",
    titulo: "Jornada 4",
    partidos: [
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Grupo B", eq1: getEq("B", 2, "3° Grupo B"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Grupo A", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("A", 4, "5° Grupo A") }
    ]
  },
  {
    fecha: "05 de Septiembre",
    titulo: "Jornada 5 (Interzonal 1)",
    partidos: [
      { grupo: "Grupo A", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("A", 2, "3° Grupo A") },
      { grupo: "Grupo A", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("A", 3, "4° Grupo A") },
      { grupo: "Grupo B", eq1: getEq("B", 0, "1° Grupo B"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("B", 0, "1° Grupo B") }
    ]
  },
  {
    fecha: "12 de Septiembre",
    titulo: "Jornada 6 (Interzonal 2)",
    partidos: [
      { grupo: "Interzonal", eq1: getEq("A", 1, "2° Grupo A"), eq2: getEq("B", 1, "2° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 2, "3° Grupo A"), eq2: getEq("B", 2, "3° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 3, "4° Grupo A"), eq2: getEq("B", 3, "4° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 4, "5° Grupo A"), eq2: getEq("B", 0, "1° Grupo B") },
      { grupo: "Interzonal", eq1: getEq("A", 0, "1° Grupo A"), eq2: getEq("B", 3, "4° Grupo B") }
    ]
  },
  {
    fecha: "19 de Septiembre",
    titulo: "⚡ Jornada 7 - CUARTOS DE FINAL (REPECHAJE)",
    partidos: [
      { grupo: "Repechaje 1", eq1: { nombre: "2° Grupo A", confirmado: true }, eq2: { nombre: "3° Grupo B", confirmado: true } },
      { grupo: "Repechaje 2", eq1: { nombre: "2° Grupo B", confirmado: true }, eq2: { nombre: "3° Grupo A", confirmado: true } }
    ]
  },
  {
    fecha: "26 de Septiembre",
    titulo: "⚡ Jornada 8 - SEMIFINALES OFICIALES",
    partidos: [
      { grupo: "Semifinal 1", eq1: { nombre: "1° Grupo A (Directo)", confirmado: true }, eq2: { nombre: "Ganador Repechaje 2", confirmado: true } },
      { grupo: "Semifinal 2", eq1: { nombre: "1° Grupo B (Directo)", confirmado: true }, eq2: { nombre: "Ganador Repechaje 1", confirmado: true } }
    ]
  },
  {
    fecha: "03 de Octubre",
    titulo: "🏆 Jornada 9 - FINALES Y TERCER LUGAR",
    partidos: [
      { grupo: "Tercer Puesto", eq1: { nombre: "Perdedor Semifinal 1", confirmado: true }, eq2: { nombre: "Perdedor Semifinal 2", confirmado: true } },
      { grupo: "🏆 GRAN FINAL ORO", eq1: { nombre: "Ganador Semifinal 1", confirmado: true }, eq2: { nombre: "Ganador Semifinal 2", confirmado: true } }
    ]
  }
];`;

content = content.replace(/const jornadasMasculino = \[[\s\S]*?\];\s*(?=(const jornadasFemenino|\/\/))/g, nuevoMasculino + '\n\n');
content = content.replace(/const jornadasFemenino = \[[\s\S]*?\];\s*(?=(const listaJornadas|export default|\/\/))/g, nuevoFemenino + '\n\n');

// Fix 1: The UI crash split error
content = content.replace(
  /{j\.etiqueta\s*\|\|\s*j\.fecha\.split\('\,'\)\[1\]\.trim\(\)\.split\(' '\)\[0\]}/g,
  `{j.etiqueta || (j.fecha.includes(',') ? j.fecha.split(',')[1].trim().split(' ')[0] : j.fecha.split(' ')[0])}`
);

// Fix 2: Remove hours and cancha principal from render
const renderViejoHoras = `{/* Cabecera del partido: Hora y Cancha */}
                  <div className="flex items-center justify-between text-xs font-black text-slate-200 mb-4 pb-3 border-b border-slate-600">
                    <span className="flex items-center gap-2 text-amber-300 font-black text-sm">
                      <Clock size={16} className="text-amber-300" /> {partido.hora}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#334155] px-3 py-1 rounded-xl border border-slate-400 text-white font-bold">
                      <MapPin size={13} className="text-sky-300" /> {partido.cancha}
                    </span>
                  </div>`;
                  
const renderNuevoHoras = `{/* Cabecera del partido: Día Programado */}
                  <div className="flex items-center justify-center text-xs font-black text-slate-200 mb-4 pb-3 border-b border-slate-600">
                    <span className="flex items-center gap-2 text-amber-300 font-black text-sm uppercase tracking-widest">
                      <Calendar size={16} className="text-amber-300" /> Partido programado para este día
                    </span>
                  </div>`;
                  
content = content.replace(renderViejoHoras, renderNuevoHoras);

// Fix 3: Remove specific hours mention in the paragraph
const parrafoViejo = `<p className="mt-2 text-sm text-slate-200 leading-relaxed font-semibold">
            Franjas en bloques de 70 min (09:00 AM a 04:00 PM). <strong className="text-amber-300 font-black">Duración oficial de partido: 65 min (2 tiempos de 30 min + 5 min de descanso)</strong> + 5 min rotación. 
            <br />
            <span className="text-emerald-300 font-black">1 de Agosto (Inauguración): Partidos a partir de las 12:00 PM.</span>
          </p>`;

const parrafoNuevo = `<p className="mt-2 text-sm text-slate-200 leading-relaxed font-semibold">
            <strong className="text-amber-300 font-black">Los horarios específicos de cada encuentro y las canchas asignadas serán notificados próximamente por la directiva.</strong>
          </p>`;

content = content.replace(parrafoViejo, parrafoNuevo);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated TablaCalendario.jsx with full fixes.');
