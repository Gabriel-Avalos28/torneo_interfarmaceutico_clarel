import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sky, Float } from '@react-three/drei';

const STRIPE_COUNT = 10;

// Megapantalla central con animaciones para el sorteo
const PantallaCentral = ({ ultimoSorteado, cruces }) => {
  const [fase, setFase] = useState(0); // 0: Esperando, 1: Animación, 2: Revelado
  const timerRef = useRef(null);
  const timerInitialRef = useRef(null);
  const meshRef = useRef();
  const prevSorteadoIdRef = useRef(null);

  useEffect(() => {
    if (timerInitialRef.current) clearTimeout(timerInitialRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    const currentId = ultimoSorteado?.id || (ultimoSorteado?.equipo ? `${ultimoSorteado.equipo}-${ultimoSorteado.grupo}` : null);

    if (ultimoSorteado) {
      if (prevSorteadoIdRef.current === currentId) {
        // Ya es el mismo sorteado anterior (ej. al recibir un mensaje en vivo o re-render de estado_actual),
        // no repetir la animación "¡SORTEANDO EQUIPO!" ni reiniciar timer. Mantener en fase 2.
        setFase(2);
      } else {
        prevSorteadoIdRef.current = currentId;
        timerInitialRef.current = setTimeout(() => {
          setFase(1); // Inicia animación dramática
        }, 0);
        timerRef.current = setTimeout(() => {
          setFase(2); // Revela resultado
        }, 1800);
      }
    } else {
      prevSorteadoIdRef.current = null;
      timerInitialRef.current = setTimeout(() => {
        setFase(0);
      }, 0);
    }
    return () => {
      if (timerInitialRef.current) clearTimeout(timerInitialRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [ultimoSorteado?.id, ultimoSorteado?.equipo, ultimoSorteado?.grupo]);

  useFrame((state) => {
    if (fase === 1 && meshRef.current) {
      // Efecto de parpadeo/latido durante el sorteo
      const scale = 1.4 + Math.sin(state.clock.elapsedTime * 20) * 0.05;
      meshRef.current.scale.setScalar(scale);
    } else if (meshRef.current) {
      // Suaviza escala a normal
      meshRef.current.scale.lerp({ x: 1.4, y: 1.4, z: 1.4 }, 0.1);
    }
  });

  const colorGrupo = ultimoSorteado?.grupo === 'A' ? '#c2410c' : ultimoSorteado?.grupo === 'B' ? '#38bdf8' : '#10b981';

  return (
    <group ref={meshRef} position={[0, 17.5, -18]} scale={[1.5, 1.5, 1.5]}>
      {/* Marco de Bronce Metálico Cálido y Dorado (Metallic Bronze Band) */}
      <mesh>
        <boxGeometry args={[23.6, 11.4, 0.6]} />
        <meshStandardMaterial color="#5c3a21" emissive="#451a03" emissiveIntensity={0.35} metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[24.0, 11.8, 0.4]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.85} />
      </mesh>
      
      {/* Fondo central: Bronce-Marrón Cálido y Profundo (Warm Bronze-Brown) */}
      <mesh position={[0, 0, 0.31]}>
        <planeGeometry args={[22.6, 10.4]} />
        <meshStandardMaterial color="#3b1f0b" roughness={0.25} metalness={0.7} emissive="#451a03" emissiveIntensity={0.3} />
      </mesh>

      {fase === 0 && (
        <Text position={[0, -0.2, 0.38]} fontSize={1.45} color={cruces && cruces.length > 0 ? '#38bdf8' : '#fffbeb'} anchorX="center" anchorY="middle" fontStyle={cruces && cruces.length > 0 ? 'italic' : 'normal'}>
          {cruces && cruces.length > 0 ? '⚡ FASE ELIMINATORIA ACTIVADA ⚡' : 'ESPERANDO SORTEO...'}
        </Text>
      )}

      {fase === 1 && (
        <Text position={[0, -0.2, 0.38]} fontSize={2.3} color="#fde047" anchorX="center" anchorY="middle">
          ¡SORTEANDO EQUIPO!
        </Text>
      )}

      {fase === 2 && ultimoSorteado && (
        <group position={[0, -0.3, 0.38]}>
          <Text position={[0, 2.2, 0]} fontSize={1.4} color="#fffbeb" anchorX="center" anchorY="middle" maxWidth={19} textAlign="center">
            {ultimoSorteado.equipo}
          </Text>
          <Text position={[0, -0.3, 0]} fontSize={1.05} color="#fbbf24" anchorX="center" anchorY="middle" fontStyle="italic">
            SE UNE AL
          </Text>
          {/* Panel de Contraste detrás del texto del grupo */}
          <mesh position={[0, -2.4, -0.04]}>
            <planeGeometry args={[14.5, 3.1]} />
            <meshBasicMaterial color={ultimoSorteado?.grupo === 'A' ? '#991b1b' : ultimoSorteado?.grupo === 'B' ? '#0369a1' : '#047857'} transparent opacity={0.8} />
          </mesh>
          <Text position={[0, -2.4, 0]} fontSize={2.7} color={colorGrupo} anchorX="center" anchorY="middle" fontStyle="italic">
            GRUPO {ultimoSorteado.grupo}
          </Text>
        </group>
      )}
    </group>
  );
};

// Paneles de Grupo: Deep navy blue con textura y bordes terracota/azul hielo/verde
const PantallaGrupo = ({ titulo, equipos, position, rotation, colorBase }) => {
  const listaEquipos = equipos || [];
  return (
    <group position={position} rotation={rotation}>
      {/* Marco Deep Navy Blue con textura y bordes dorados softened */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[11.2, 12.6, 0.35]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.65} transparent opacity={0.96} />
      </mesh>
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[11.5, 12.9, 0.2]} />
        <meshBasicMaterial color={colorBase} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[10.6, 12.0]} />
        <meshStandardMaterial color="#172554" roughness={0.3} metalness={0.7} />
      </mesh>

      <Text position={[0, 4.9, 0.22]} fontSize={1.38} color="#fffbeb" anchorX="center" anchorY="middle">
        GRUPO {titulo}
      </Text>
      <mesh position={[0, 4.0, 0.22]}>
        <planeGeometry args={[9.2, 0.1]} />
        <meshBasicMaterial color={colorBase} />
      </mesh>

      {/* Lista de equipos con tipografía clara en crema y oro */}
      {Array.from({ length: 6 }).map((_, i) => {
        const equipo = listaEquipos[i] || "---";
        const isHead = i === 0 && listaEquipos[i];
        return (
          <Text key={i} position={[0, 2.7 - i * 1.45, 0.22]} fontSize={isHead ? 1.05 : 0.88} color={listaEquipos[i] ? (isHead ? "#fbbf24" : "#fffbeb") : "#94a3b8"} anchorX="center" anchorY="middle" maxWidth={10.0} textAlign="center">
            {equipo}
          </Text>
        );
      })}
    </group>
  );
};

const ParticulaReaccion = ({ x, z, tipo }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y += 0.12;
      meshRef.current.rotation.y += 0.04;
      meshRef.current.rotation.z += 0.02;
      const scale = Math.max(0, 1 - (meshRef.current.position.y + 5) / 18);
      meshRef.current.scale.setScalar(scale);
    }
  });

  const isBalon = tipo === 'balon';
  const isTrofeo = tipo === 'trofeo';
  const colorAura = isBalon ? '#10b981' : isTrofeo ? '#f59e0b' : '#0284c7';
  const emoji = isBalon ? '⚽' : isTrofeo ? '🏆' : '✨';
  
  return (
    <group ref={meshRef} position={[x, -5, z]}>
      {/* Anillo de aura resplandeciente */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.12, 8, 24]} />
        <meshStandardMaterial color={colorAura} emissive={colorAura} emissiveIntensity={2.5} transparent opacity={0.7} />
      </mesh>
      {/* Ícono 3D */}
      <Text position={[0, 0.1, 0]} fontSize={1.6} anchorX="center" anchorY="middle">
        {emoji}
      </Text>
    </group>
  );
};



const CintaMensajes3D = ({ mensajes = [] }) => {
  const ultimoMensaje = mensajes && mensajes.length > 0 ? mensajes[mensajes.length - 1] : null;
  const [confetiActivo, setConfetiActivo] = useState(false);
  const prevIdRef = useRef(null);

  useEffect(() => {
    if (ultimoMensaje && ultimoMensaje.id !== prevIdRef.current) {
      prevIdRef.current = ultimoMensaje.id;
      setConfetiActivo(true);
      const timer = setTimeout(() => setConfetiActivo(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [ultimoMensaje]);

  if (!ultimoMensaje) return null;

  return (
    <Float speed={2} rotationIntensity={0.02} floatIntensity={0.1}>
      <group position={[0, 26.5, -17]}>

        <mesh>
          <boxGeometry args={[25.5, 3.0, 0.4]} />
          <meshStandardMaterial color="#1e293b" emissive="#1e3a8a" emissiveIntensity={0.3} metalness={0.7} roughness={0.3} transparent opacity={0.96} />
        </mesh>
        <mesh position={[0, 0, 0.21]}>
          <planeGeometry args={[24.8, 2.6]} />
          <meshStandardMaterial color="#172554" roughness={0.25} metalness={0.75} />
        </mesh>
        <Text position={[0, 0.65, 0.25]} fontSize={0.82} color="#fbbf24" anchorX="center" anchorY="middle" fontStyle="italic">
          💬 MENSAJE EN VIVO DE REPRESENTANTE: {ultimoMensaje.autor}
        </Text>
        <Text position={[0, -0.45, 0.25]} fontSize={1.1} color="#fffbeb" anchorX="center" anchorY="middle" maxWidth={23.5} textAlign="center">
          "{ultimoMensaje.texto}"
        </Text>
      </group>
    </Float>
  );
};

// Reflectores majestuosos del estadio girando sobre el cielo nocturno
const ReflectoresEstadioAnimados = () => {
  const haz1Ref = useRef();
  const haz2Ref = useRef();
  const haz3Ref = useRef();
  const haz4Ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (haz1Ref.current) haz1Ref.current.rotation.z = Math.sin(t * 0.4) * 0.3 - 0.2;
    if (haz2Ref.current) haz2Ref.current.rotation.z = -Math.sin(t * 0.45 + 1) * 0.3 + 0.2;
    if (haz3Ref.current) haz3Ref.current.rotation.z = Math.cos(t * 0.38 + 2) * 0.28;
    if (haz4Ref.current) haz4Ref.current.rotation.z = -Math.cos(t * 0.42 + 3) * 0.28;
  });

  return (
    <group>
      {/* Reflector Noroeste */}
      <group position={[-36, 25, -28]}>
        <mesh ref={haz1Ref} position={[0, -15, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[9, 45, 16, 1, true]} />
          <meshBasicMaterial color="#fef08a" transparent opacity={0.08} side={2} />
        </mesh>
      </group>
      {/* Reflector Noreste */}
      <group position={[36, 25, -28]}>
        <mesh ref={haz2Ref} position={[0, -15, 0]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[9, 45, 16, 1, true]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.07} side={2} />
        </mesh>
      </group>
      {/* Reflector Suroeste */}
      <group position={[-36, 25, 15]}>
        <mesh ref={haz3Ref} position={[0, -15, 0]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[8, 40, 16, 1, true]} />
          <meshBasicMaterial color="#fde047" transparent opacity={0.06} side={2} />
        </mesh>
      </group>
      {/* Reflector Sureste */}
      <group position={[36, 25, 15]}>
        <mesh ref={haz4Ref} position={[0, -15, 0]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[8, 40, 16, 1, true]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.06} side={2} />
        </mesh>
      </group>
    </group>
  );
};

// Gradas circulares con público y destellos / flashes de cámaras fotográficas
const GradasYPublico3D = () => {
  const puntosRef = useRef();
  const anilloRef = useRef();

  const [posiciones, colores, basesY] = useMemo(() => {
    const pos = [];
    const col = [];
    const baseY = [];
    const numPuntos = 1500; // Incrementado para un estadio lleno
    const colorOpciones = [
      [1.0, 0.95, 0.8],   // Blanco cálido flash
      [0.98, 0.75, 0.15], // Oro resplandeciente
      [0.22, 0.74, 0.98], // Azul estadio
      [1.0, 1.0, 1.0],    // Flash brillante
      [0.95, 0.25, 0.35], // Rojo festivo
      [0.2, 0.85, 0.5]    // Verde festivo
    ];

    for (let i = 0; i < numPuntos; i++) {
      const angulo = Math.random() * Math.PI * 2;
      const radio = 37 + Math.random() * 15;
      const x = Math.cos(angulo) * radio;
      const z = Math.sin(angulo) * radio;
      const y = -4 + (radio - 37) * 1.2 + Math.random() * 2.5;
      
      pos.push(x, y, z);
      baseY.push(y);
      const colorSeleccionado = colorOpciones[Math.floor(Math.random() * colorOpciones.length)];
      col.push(colorSeleccionado[0], colorSeleccionado[1], colorSeleccionado[2]);
    }

    return [new Float32Array(pos), new Float32Array(col), new Float32Array(baseY)];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (puntosRef.current) {
      puntosRef.current.rotation.y = t * 0.08; // Rotación general más rápida
      
      // Ola del público saltando y festejando rápido
      const posAttr = puntosRef.current.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);
        const base = basesY[i];
        
        // Ola y saltos
        const ola = Math.sin(t * 6 + Math.atan2(z, x) * 10) * 1.5;
        const salto = Math.max(0, ola) + Math.max(0, Math.sin(t * 18 + i) * 1.2);
        
        posAttr.setY(i, base + salto);
      }
      posAttr.needsUpdate = true;
    }
    if (anilloRef.current && anilloRef.current.material) {
      anilloRef.current.material.emissiveIntensity = 1.2 + Math.sin(t * 8) * 0.8;
    }
  });

  return (
    <group>
      {/* Estructura exterior oscura de gradas softened */}
      <mesh position={[0, 4, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[54, 37, 20, 48, 1, true]} />
        <meshStandardMaterial color="#131f37" roughness={0.9} metalness={0.2} side={2} />
      </mesh>

      {/* NUEVO: Estructura de soporte y columnas para rellenar el hueco blanco */}
      <mesh position={[0, 17.5, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[60, 54, 7, 48, 1, true]} />
        <meshStandardMaterial color="#090e17" roughness={0.9} metalness={0.4} side={2} />
      </mesh>
      
      {/* Columnas estructurales robustas oscuras en punta */}
      <group position={[0, 17.5, 0]}>
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * Math.PI) / 12;
          const radius = 57; // Punto medio entre 54 y 60
          return (
            <mesh key={`col-${i}`} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} rotation={[0, -angle, 0.15]}>
              <boxGeometry args={[1.5, 9, 2.0]} />
              <meshStandardMaterial color="#020617" roughness={0.6} metalness={0.8} />
            </mesh>
          );
        })}
      </group>

      {/* NUEVO: Techo del estadio (Borde superior estilo toldo/alerón que deja pasar la luz natural) */}
      <mesh position={[0, 26, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[68, 60, 10, 48, 1, true]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.5} side={2} />
      </mesh>
      
      {/* Borde iluminado del techo para darle un toque premium y moderno */}
      <mesh position={[0, 21, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[60, 0.5, 16, 64]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Anillo LED publicitario perimetral brillante en el borde de la cancha */}
      <mesh ref={anilloRef} position={[0, -4.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[36, 0.35, 16, 64]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.5} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Luces y flashes parpadeantes de la multitud en las gradas */}
      <points ref={puntosRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={posiciones.length / 3} array={posiciones} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colores.length / 3} array={colores} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={1.2} vertexColors transparent opacity={0.9} sizeAttenuation />
      </points>
    </group>
  );
};

// Balón 3D animado rebotando en el centro de la cancha y decoración central
const BalonAnimado = () => {
  const balonRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (balonRef.current) {
      balonRef.current.position.y = -4.2 + Math.abs(Math.sin(t * 4)) * 2.5; // Rebote dinámico
      balonRef.current.rotation.x = t * 2.5;
      balonRef.current.rotation.y = t * 2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Balón 3D con textura simulada por wireframe */}
      <mesh ref={balonRef} position={[0, -4, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
        <mesh>
          <icosahedronGeometry args={[1.51, 1]} />
          <meshBasicMaterial color="#0f172a" wireframe wireframeLinewidth={2} />
        </mesh>
      </mesh>
      
      {/* Círculo central oficial iluminado en la cancha */}
      <mesh position={[0, -4.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7, 7.3, 64]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} transparent opacity={0.8} />
      </mesh>
      
      {/* Punto de saque inicial */}
      <mesh position={[0, -4.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

const EscenaEstadio = ({ grupos, ultimoSorteado, reacciones, cruces, mensajes, categoria = 'masculino' }) => {
  const stripes = useMemo(() => Array.from({ length: STRIPE_COUNT }, (_, index) => ({
    x: -22 + index * 4.4, width: 4.2, color: index % 2 === 0 ? '#064e3b' : '#047857',
  })), []);

  // Tope estricto de rendimiento para que no se haga lento con muchas reacciones
  const reaccionesActivas = useMemo(() => (reacciones || []).slice(-25), [reacciones]);

  const esFemenino = categoria === 'femenino';

  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[25, 45, 20]} intensity={3.8} color="#fffbeb" castShadow />
      <hemisphereLight intensity={1.6} skyColor="#1e3a8a" groundColor="#064e3b" />
      
      {/* Ambiente de Estadio Animado y Celebración */}
      <ReflectoresEstadioAnimados />
      <GradasYPublico3D />
      <BalonAnimado />

      {/* Cancha: Deep Forest Green hyper-realistic pitch */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[35, 64]} />
        <meshStandardMaterial color="#064e3b" roughness={0.85} metalness={0.05} />
      </mesh>

      {stripes.map((stripe, index) => (
        <mesh key={index} position={[stripe.x, -4.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[stripe.width, 48]} />
          <meshStandardMaterial color={stripe.color === '#064e3b' ? '#047857' : '#065f46'} roughness={0.85} metalness={0} />
        </mesh>
      ))}

      {/* Pantalla Principal (El Sorteo / Fase) - UBICADA ARRIBA Y ATRÁS SIN SUPERPOSICIONES */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <PantallaCentral ultimoSorteado={ultimoSorteado} cruces={cruces} />
      </Float>

      {/* Cinta holográfica de Mensajes en Vivo */}
      <CintaMensajes3D mensajes={mensajes} />

      {/* Paneles de los Grupos según Categoría - MÁS GRANDES Y A ALTURA Y=5.0 PARA QUE SE VEAN COMPLETOS SIN TAPAR NADA */}
      {grupos && (
        <>
          {esFemenino ? (
            /* 2 Paneles de Grupo para Femenina */
            <>
              <Float speed={2} rotationIntensity={0.02} floatIntensity={0.1}>
                <PantallaGrupo titulo="A (5 Eq)" equipos={grupos.A || []} position={[-15.5, 5.0, -5]} rotation={[0, Math.PI / 7, 0]} colorBase="#c2410c" />
              </Float>
              <Float speed={2} rotationIntensity={0.02} floatIntensity={0.1}>
                <PantallaGrupo titulo="B (4 Eq)" equipos={grupos.B || []} position={[15.5, 5.0, -5]} rotation={[0, -Math.PI / 7, 0]} colorBase="#10b981" />
              </Float>
            </>
          ) : (
            /* 3 Paneles de Grupo para Masculina: Terracotta-red, clear ice-blue, polished green */
            <>
              <Float speed={2} rotationIntensity={0.02} floatIntensity={0.1}>
                <PantallaGrupo titulo="A" equipos={grupos.A || []} position={[-20.0, 5.0, -6.5]} rotation={[0, Math.PI / 6.5, 0]} colorBase="#c2410c" />
              </Float>
              <Float speed={2} rotationIntensity={0.02} floatIntensity={0.1} floatingRange={[-0.1, 0.1]}>
                <PantallaGrupo titulo="B" equipos={grupos.B || []} position={[0, 5.0, -5.0]} rotation={[0, 0, 0]} colorBase="#38bdf8" />
              </Float>
              <Float speed={2} rotationIntensity={0.02} floatIntensity={0.1}>
                <PantallaGrupo titulo="C" equipos={grupos.C || []} position={[20.0, 5.0, -6.5]} rotation={[0, -Math.PI / 6.5, 0]} colorBase="#10b981" />
              </Float>
            </>
          )}
        </>
      )}

      {reaccionesActivas.map((reaccion, i) => (
        <ParticulaReaccion key={reaccion.id || i} x={reaccion.x} z={reaccion.z} tipo={reaccion.tipo} />
      ))}

      <Sky distance={450000} sunPosition={[100, 45, 100]} inclination={0.1} Rayleigh={0.5} />
      <OrbitControls target={[0, 7, -10]} maxPolarAngle={Math.PI / 2 - 0.05} minPolarAngle={Math.PI / 4} enableZoom={false} enablePan={false} />
    </>
  );
};

export default function Estadio3D({ grupos, ultimoSorteado, reacciones = [], cruces = [], mensajes = [], categoria = 'masculino' }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 9, 30], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#111c38']} />
        <fog attach="fog" args={['#16284c', 28, 85]} />
        <EscenaEstadio grupos={grupos} ultimoSorteado={ultimoSorteado} reacciones={reacciones} cruces={cruces} mensajes={mensajes} categoria={categoria} />
      </Canvas>
    </div>
  );
}