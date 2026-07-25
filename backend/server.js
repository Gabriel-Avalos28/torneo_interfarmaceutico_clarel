const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  perMessageDeflate: false
});

const empresasRestantesMasculino = [
  "ADIUM", "B BRAUN", "BAGO", "BOEHRINGER INGELHEIM", "FARBIOPHARMA",
  "FARMAENLACE", "GRUPO FARMA", "GRUNENTHAL", "JAMES BROWN", "MEGALABS",
  "NAOS", "PHYTOCHEMIE", "QUALIPHARM", "ROCHE", "SIEGFRIED", "ASO. QUIMICOS"
];

const empresasRestantesFemenino = [
  "BOEHRINGER INGELHEIM", "Inpel Quality", "FARBIOPHARMA",
  "JAMES BROWN", "MEGALABS", "QUALIPHARM", "ROCHE"
];

let torneos = {
  masculino: {
    grupos: {
      A: ["CLAREL", "BOEHRINGER INGELHEIM", "MEGALABS", "ADIUM", "ROCHE", "BAGO"],
      B: ["LIFE", "FARBIOPHARMA", "ASO. QUIMICOS", "GRUNENTHAL", "FARMAENLACE", "SIEGFRIED"],
      C: ["QUALIPHARM", "GRUPO FARMA", "B BRAUN", "NAOS", "JAMES BROWN", "PHYTOCHEMIE"]
    },
    equiposDisponibles: [...empresasRestantesMasculino],
    ultimoSorteado: null,
    cruces: [],
    sorteoEnProceso: false,
    maxPorGrupo: { A: 6, B: 6, C: 6 }
  },
  femenino: {
    grupos: {
      A: ["FARMAENLACE", "ROCHE", "JAMES BROWN"],
      B: ["LIFE", "MEGALABS", "QUALIPHARM"],
      C: ["BOEHRINGER INGELHEIM", "Inpel Quality", "FARBIOPHARMA"]
    },
    equiposDisponibles: [...empresasRestantesFemenino],
    ultimoSorteado: null,
    cruces: [],
    sorteoEnProceso: false,
    maxPorGrupo: { A: 3, B: 3, C: 3 }
  }
};

let mensajes = [];

function construirEstadoActual() {
  return {
    masculino: {
      grupos: torneos.masculino.grupos,
      disponibles: torneos.masculino.equiposDisponibles.length,
      ultimoSorteado: torneos.masculino.ultimoSorteado,
      cruces: torneos.masculino.cruces,
      sorteoEnProceso: torneos.masculino.sorteoEnProceso,
      completado: torneos.masculino.equiposDisponibles.length === 0
    },
    femenino: {
      grupos: torneos.femenino.grupos,
      disponibles: torneos.femenino.equiposDisponibles.length,
      ultimoSorteado: torneos.femenino.ultimoSorteado,
      cruces: torneos.femenino.cruces,
      sorteoEnProceso: torneos.femenino.sorteoEnProceso,
      completado: torneos.femenino.equiposDisponibles.length === 0
    },
    // Compatibilidad en nivel raíz (apunta por defecto a masculino)
    grupos: torneos.masculino.grupos,
    disponibles: torneos.masculino.equiposDisponibles.length,
    ultimoSorteado: torneos.masculino.ultimoSorteado,
    cruces: torneos.masculino.cruces,
    sorteoEnProceso: torneos.masculino.sorteoEnProceso,
    mensajes
  };
}

function reiniciarTorneo(cat = null) {
  if (!cat || cat === 'masculino') {
    torneos.masculino = {
      grupos: {
        A: ["CLAREL", "BOEHRINGER INGELHEIM", "MEGALABS", "ADIUM", "ROCHE", "BAGO"],
        B: ["LIFE", "FARBIOPHARMA", "ASO. QUIMICOS", "GRUNENTHAL", "FARMAENLACE", "SIEGFRIED"],
        C: ["QUALIPHARM", "GRUPO FARMA", "B BRAUN", "NAOS", "JAMES BROWN", "PHYTOCHEMIE"]
      },
      equiposDisponibles: [...empresasRestantesMasculino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { A: 6, B: 6, C: 6 }
    };
  }
  if (!cat || cat === 'femenino') {
    torneos.femenino = {
      grupos: {
        A: ["FARMAENLACE", "ROCHE", "JAMES BROWN"],
        B: ["LIFE", "MEGALABS", "QUALIPHARM"],
        C: ["BOEHRINGER INGELHEIM", "Inpel Quality", "FARBIOPHARMA"]
      },
      equiposDisponibles: [...empresasRestantesFemenino],
      ultimoSorteado: null,
      cruces: [],
      sorteoEnProceso: false,
      maxPorGrupo: { A: 3, B: 3, C: 3 }
    };
  }
  if (!cat) mensajes = [];
}

function generarCruces(cat = 'masculino') {
    if (cat === 'femenino') {
      const eqA = torneos.femenino.grupos.A.slice();
      const eqB = torneos.femenino.grupos.B.slice();
      const eqC = torneos.femenino.grupos.C.slice();
  
      const gA1 = eqA[0] || "1° Grupo A";
      const gB1 = eqB[0] || "1° Grupo B";
      const gC1 = eqC[0] || "1° Grupo C";
      const mejor2 = "Mejor Segundo";
  
      torneos.femenino.cruces = [
        // Semifinales (26 de Septiembre)
        { id: 'semi1', fase: 'Semifinal', lado: 'izquierdo', fecha: '26-Sep', titulo: 'Semifinal 1', equipo1: gA1, equipo2: mejor2, desc1: '1° Grupo A', desc2: 'Mejor Segundo' },
        { id: 'semi2', fase: 'Semifinal', lado: 'derecho', fecha: '26-Sep', titulo: 'Semifinal 2', equipo1: gB1, equipo2: gC1, desc1: '1° Grupo B', desc2: '1° Grupo C' },
        // Tercer Lugar y Final (03 de Octubre)
        { id: 'tercer', fase: 'Tercer Puesto', lado: 'centro', fecha: '03-Oct', titulo: '🥉 TERCER LUGAR', equipo1: 'Perdedor Semifinal 1', equipo2: 'Perdedor Semifinal 2', desc1: 'Perdedor Semifinal 1', desc2: 'Perdedor Semifinal 2' },
        { id: 'final', fase: 'Final', lado: 'centro', fecha: '03-Oct', titulo: '🏆 GRAN FINAL ORO', equipo1: 'Ganador Semifinal 1', equipo2: 'Ganador Semifinal 2', desc1: 'Ganador Semifinal 1', desc2: 'Ganador Semifinal 2' }
      ];
      return torneos.femenino.cruces;
    } else {
    const eqA = torneos.masculino.grupos.A.slice();
    const eqB = torneos.masculino.grupos.B.slice();
    const eqC = torneos.masculino.grupos.C.slice();

    const gA1 = eqA[0] || "1° Grupo A";
    const gA2 = eqA[1] || "2° Grupo A";
    const gB1 = eqB[0] || "1° Grupo B";
    const gB2 = eqB[1] || "2° Grupo B";
    const gC1 = eqC[0] || "1° Grupo C";
    const gC2 = eqC[1] || "2° Grupo C";
    const mejor3_1 = "1° Mejor Tercero";
    const mejor3_2 = "2° Mejor Tercero";

    torneos.masculino.cruces = [
      // Cuartos de Final (19 de Septiembre - Cancha Única)
      { id: 'llave1', fase: 'Cuartos de Final', lado: 'izquierdo', fecha: '19-Sep', titulo: 'Llave 1', equipo1: gA1, equipo2: mejor3_2, desc1: '1° Grupo A', desc2: '2° Mejor Tercero' },
      { id: 'llave2', fase: 'Cuartos de Final', lado: 'izquierdo', fecha: '19-Sep', titulo: 'Llave 2', equipo1: gB1, equipo2: gC2, desc1: '1° Grupo B', desc2: '2° Grupo C' },
      { id: 'llave3', fase: 'Cuartos de Final', lado: 'derecho', fecha: '19-Sep', titulo: 'Llave 3', equipo1: gC1, equipo2: mejor3_1, desc1: '1° Grupo C', desc2: '1° Mejor Tercero' },
      { id: 'llave4', fase: 'Cuartos de Final', lado: 'derecho', fecha: '19-Sep', titulo: 'Llave 4', equipo1: gA2, equipo2: gB2, desc1: '2° Grupo A', desc2: '2° Grupo B' },
      // Semifinales (26 de Septiembre - Cancha Única)
      { id: 'semi1', fase: 'Semifinal', lado: 'izquierdo', fecha: '26-Sep', titulo: 'Semifinal 1', equipo1: 'Ganador Llave 1', equipo2: 'Ganador Llave 2', desc1: 'Ganador Llave 1', desc2: 'Ganador Llave 2' },
      { id: 'semi2', fase: 'Semifinal', lado: 'derecho', fecha: '26-Sep', titulo: 'Semifinal 2', equipo1: 'Ganador Llave 3', equipo2: 'Ganador Llave 4', desc1: 'Ganador Llave 3', desc2: 'Ganador Llave 4' },
      // Final (03 de Octubre - Cancha Única)
      { id: 'final', fase: 'Final', lado: 'centro', fecha: '03-Oct', titulo: '🏆 GRAN FINAL', equipo1: 'Ganador Semifinal 1', equipo2: 'Ganador Semifinal 2', desc1: 'Ganador Semifinal 1', desc2: 'Ganador Semifinal 2' }
    ];
    return torneos.masculino.cruces;
  }
}

function emitirEstadoActualATodos() {
  io.emit('estado_actual', construirEstadoActual());
}

app.post('/reset', (req, res) => {
  reiniciarTorneo();
  emitirEstadoActualATodos();
  res.json({ ok: true, message: 'Torneo reiniciado', estado: construirEstadoActual() });
});

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);
  socket.emit('estado_actual', construirEstadoActual());

  socket.on('sortear_equipo', (data) => {
    const cat = (data && data.categoria === 'femenino') ? 'femenino' : 'masculino';
    const t = torneos[cat];

    if (t.sorteoEnProceso) {
      socket.emit('error_sorteo', 'Hay un sorteo en proceso en esta categoría. ¡Espera el resultado!');
      return;
    }
    if (t.equiposDisponibles.length === 0) {
      socket.emit('error_sorteo', 'Todos los equipos ya han sido sorteados para esta categoría.');
      return;
    }

    const gruposDisponibles = Object.keys(t.maxPorGrupo).filter(g => t.grupos[g].length < t.maxPorGrupo[g]);
    if (gruposDisponibles.length === 0) {
      socket.emit('error_sorteo', 'Todos los grupos están llenos para esta categoría.');
      return;
    }

    t.sorteoEnProceso = true;
    io.emit('iniciando_sorteo', { timestamp: Date.now(), categoria: cat });

    setTimeout(() => {
      t.sorteoEnProceso = false;
      if (t.equiposDisponibles.length === 0) return;

      // 1. Elegir equipo al azar
      const indexEquipo = Math.floor(Math.random() * t.equiposDisponibles.length);
      const equipo = t.equiposDisponibles.splice(indexEquipo, 1)[0];

      // 2. Elegir grupo disponible
      const gruposDisp = Object.keys(t.maxPorGrupo).filter(g => t.grupos[g].length < t.maxPorGrupo[g]);
      if (gruposDisp.length === 0) return;

      const indexGrupo = Math.floor(Math.random() * gruposDisp.length);
      const grupoAsignado = gruposDisp[indexGrupo];

      // 3. Asignar
      t.grupos[grupoAsignado].push(equipo);
      t.ultimoSorteado = { equipo, grupo: grupoAsignado, id: Date.now(), categoria: cat };

      // 4. Emitir
      io.emit('nuevo_sorteo', construirEstadoActual());
    }, 3600);
  });

  socket.on('reset_torneo', (data) => {
    const cat = data?.categoria || null;
    reiniciarTorneo(cat);
    emitirEstadoActualATodos();
  });

  socket.on('confirmar_sorteo', (data) => {
    const cat = data?.categoria || 'masculino';
    io.emit('sorteo_confirmado', { timestamp: Date.now(), categoria: cat });
  });

  socket.on('sync_pantalla', (data) => {
    io.emit('cambio_pantalla', data);
  });

  socket.on('generar_cruces', (data) => {
    const cat = (data && data.categoria === 'femenino') ? 'femenino' : 'masculino';
    generarCruces(cat);
    io.emit('cruces_generados', { ...construirEstadoActual(), categoria: cat });
    emitirEstadoActualATodos();
  });

  socket.on('enviar_reaccion', (tipoReaccion) => {
    io.emit('mostrar_reaccion', {
      id: Date.now() + Math.random(),
      tipo: tipoReaccion,
      x: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 30
    });
  });

  socket.on('enviar_mensaje', (data) => {
    const texto = (typeof data === 'string' ? data : (data?.texto || '')).trim().slice(0, 160);
    const autor = (typeof data === 'object' && data?.autor ? data.autor.trim().slice(0, 30) : 'Representante');
    if (!texto) return;
    const nuevoMensaje = {
      id: Date.now() + Math.random(),
      autor: autor || 'Representante',
      texto,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    mensajes.push(nuevoMensaje);
    if (mensajes.length > 40) mensajes.shift();
    io.emit('nuevo_mensaje', nuevoMensaje);
    emitirEstadoActualATodos();
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = Number(process.env.PORT) || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor Backend corriendo en http://localhost:${PORT}`);
});