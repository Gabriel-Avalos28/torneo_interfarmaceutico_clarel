const fs = require('fs');

let file = 'frontend/src/components/ModalSorteo.jsx';
let content = fs.readFileSync(file, 'utf8');

let oldGroups = `const listaGrupos = (ultimoSorteado?.categoria === 'femenino' || categoria === 'femenino')
    ? ['A', 'B']
    : ['A', 'B', 'C'];`;

let newGroups = `const listaGrupos = (ultimoSorteado?.categoria === 'femenino' || categoria === 'femenino')
    ? ['Único']
    : ['A', 'B', 'C'];`;

content = content.replace(oldGroups, newGroups);
fs.writeFileSync(file, content, 'utf8');
console.log("ModalSorteo updated successfully");
