const fs = require('fs');

let file = 'frontend/src/components/TablaGrupos.jsx';
let content = fs.readFileSync(file, 'utf8');

// The groups array for femenino is hardcoded to ['A', 'B'] in the render
let oldGroupsArray = `const gruposAMostrar = esFemenino ? ['A', 'B'] : ['A', 'B', 'C'];`;
let newGroupsArray = `const gruposAMostrar = esFemenino ? ['Único'] : ['A', 'B', 'C'];`;
content = content.replace(oldGroupsArray, newGroupsArray);

// For the visual separator after the 4th row for Femenino
// Search for how the list items are rendered: `grupos[g].map((emp, i) => (`
const regexListItem = /\{grupos\[g\]\.map\(\(emp, i\) => \([\s\S]*?className="font-black text-slate-100 uppercase tracking-widest"\>\{emp\}<\/span\>\s*<\/li\>\s*\)\)\}/;

// Wait, if I replace that I can add a fragment and check if `esFemenino && i === 3`.
let newListItem = `{grupos[g].map((emp, i) => (
                <React.Fragment key={i}>
                  <li className="flex items-center gap-4 border-b border-slate-600/50 pb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 font-bold text-amber-400 border border-slate-500 shadow-inner">
                      {i + 1}
                    </span>
                    <span className="font-black text-slate-100 uppercase tracking-widest">{emp}</span>
                  </li>
                  {esFemenino && i === 3 && (
                    <div className="w-full flex items-center justify-center my-3 relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-dashed border-amber-400/60"></div>
                      </div>
                      <div className="relative bg-[#1e293b] px-3">
                        <span className="text-[10px] font-black uppercase text-amber-300 tracking-widest">Línea de Clasificación</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}`;

// I need to import React.Fragment or just use <></> if React is in scope, or Fragment.
// Let's use <div key={i}> to wrap if needed, or <> if I use the array key on the wrapper.
let safeListItem = `{grupos[g].map((emp, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 border-b border-slate-600/50 pb-3 pt-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 font-bold text-amber-400 border border-slate-500 shadow-inner">
                      {i + 1}
                    </span>
                    <span className="font-black text-slate-100 uppercase tracking-widest">{emp}</span>
                  </div>
                  {esFemenino && i === 3 && (
                    <div className="w-full flex items-center justify-center my-1 relative opacity-80">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-dashed border-amber-400/60"></div>
                      </div>
                      <div className="relative bg-[#1e293b] px-3">
                        <span className="text-[10px] font-black uppercase text-amber-300 tracking-[0.2em] drop-shadow-md">↑ Clasifican a Semifinal ↑</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}`;

content = content.replace(regexListItem, safeListItem);

fs.writeFileSync(file, content, 'utf8');
console.log("TablaGrupos updated successfully");
