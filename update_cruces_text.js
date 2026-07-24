const fs = require('fs');

let file = 'frontend/src/components/TablaCruces.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove Cancha Principal Unica from the header banner
let oldHeader = `<div className="flex flex-wrap items-center gap-3 text-sm font-black bg-[#334155]/95 border-2 border-slate-400 rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-2 text-amber-300 font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse"></span>
              Cancha Principal Única (Bloques 70 min | 65 min juego)
            </div>
            <span className="text-slate-400">•</span>
            <div className="text-sky-300 font-black">
              {esFemenino ? 'Play-In: 19-Sep' : 'Cuartos: 19-Sep'}
            </div>`;

let newHeader = `<div className="flex flex-wrap items-center gap-3 text-sm font-black bg-[#334155]/95 border-2 border-slate-400 rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-2 text-sky-300 font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse"></span>
              {esFemenino ? 'Play-In: 19-Sep' : 'Cuartos: 19-Sep'}
            </div>`;

content = content.replace(oldHeader, newHeader);

// 2. Formato text
let oldFormato = `<p className="font-semibold text-slate-100">
              {esFemenino
                ? 'Partidos de 65 min (2 tiempos de 30 min + 5 min de descanso). Los 1° lugares van directo a Semifinales. Los 2° y 3° disputan el Play-In el 19 de septiembre en Cancha Principal Única.'
                : 'Partidos de 65 min (2 tiempos de 30 min + 5 min de descanso). 3 Grupos de 6 equipos. Clasifican a Cuartos los 2 primeros de cada grupo + 2 Mejores Terceros (8 equipos).'}
            </p>`;

let newFormato = `<p className="font-semibold text-slate-100">
              {esFemenino
                ? 'Partidos de 65 min (2 tiempos de 30 min + 5 min de descanso). Los 1° lugares van directo a Semifinales. Los 2° y 3° disputan el Play-In el 19 de septiembre.'
                : '3 Grupos de 6 equipos. Clasifican a Cuartos los 2 primeros de cada grupo + 2 Mejores Terceros (8 equipos).'}
            </p>`;

content = content.replace(oldFormato, newFormato);

// 3. Horarios y Feriado text
let oldHorarios = `<p className="font-semibold text-slate-100">
              {esFemenino
                ? 'Todos los partidos se disputan en bloques de 70 min sin empalmes. Inauguración el 1 de Agosto (desde 12:00 PM). El 8 de agosto hay descanso oficial por Feriado Nacional.'
                : 'Inauguración (1 de Agosto) desde las 12:00 PM. Sábados regulares de 09:00 AM a 04:00 PM en bloques de 70 min. Feriado del 8 de agosto sin actividad.'}
            </p>`;

let newHorarios = `<p className="font-semibold text-slate-100">
              Inauguración (1 de Agosto) desde las 9:30 PM. Se jugarán todos los días sábados, horario por confirmar. Feriado del 8 de agosto sin actividad. Condiciones climáticas a tener en consideración.
            </p>`;

content = content.replace(oldHorarios, newHorarios);

fs.writeFileSync(file, content, 'utf8');
console.log("TablaCruces updated successfully");
