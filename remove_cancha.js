const fs = require('fs');

let file = 'frontend/src/components/TablaCalendario.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove partido.cancha badge from the match cards
const oldBadge = `<span className="flex items-center gap-1.5 bg-[#334155] px-3 py-1 rounded-xl border border-slate-400 text-white font-bold">
                      <MapPin size={13} className="text-sky-300" /> {partido.cancha}
                    </span>`;

content = content.replace(oldBadge, '');

// Also remove `Cancha Única` text
const oldText = `{jornadaActual.feriado ? 'Pausa por Feriado Nacional' : \`\${jornadaActual.partidos.length} Encuentros en Cancha Única\`}`;
const newText = `{jornadaActual.feriado ? 'Pausa por Feriado Nacional' : \`\${jornadaActual.partidos.length} Encuentros Programados\`}`;
content = content.replace(oldText, newText);

fs.writeFileSync(file, content, 'utf8');
console.log("TablaCalendario updated successfully");
