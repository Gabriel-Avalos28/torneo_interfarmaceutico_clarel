const fs = require('fs');

// 1. App.jsx modification
let appFile = 'frontend/src/App.jsx';
let appContent = fs.readFileSync(appFile, 'utf8');

// Remove the Organizador button
const botonViejo = `<Link to="/organizador" className="px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#1e3a5f] hover:scale-105 rounded-3xl font-black text-2xl transition-all shadow-[0_12px_35px_rgba(245,158,11,0.45)] hover:shadow-[0_18px_45px_rgba(245,158,11,0.65)] text-center border-2 border-amber-300">
          Entrar como Organizador
        </Link>`;

appContent = appContent.replace(botonViejo, '');

// Change route
appContent = appContent.replace(
  '<Route path="/organizador" element={<VistaOrganizador />} />',
  '<Route path="/admin-clarel-2026" element={<VistaOrganizador />} />'
);

fs.writeFileSync(appFile, appContent, 'utf8');


// 2. VistaOrganizador.jsx modification
let orgFile = 'frontend/src/components/VistaOrganizador.jsx';
let orgContent = fs.readFileSync(orgFile, 'utf8');

if (!orgContent.includes('const [autenticado, setAutenticado] = useState(false);')) {
  // Add authentication state and screen
  
  // Replace the component signature
  const sigOld = 'export default function VistaOrganizador() {';
  const sigNew = `export default function VistaOrganizador() {
  const [autenticado, setAutenticado] = useState(sessionStorage.getItem('adminAuth') === 'true');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ClarelAdmin2026*') {
      setAutenticado(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      setErrorLogin('Contraseña incorrecta');
      setPassword('');
    }
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-[#1e3a5f] flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#2563eb] to-[#334155] -z-10"></div>
        <form onSubmit={handleLogin} className="bg-[#1e293b]/90 border-2 border-amber-400 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-black text-white mb-2 drop-shadow-md">Acceso Restringido</h2>
          <p className="text-amber-300 font-bold text-sm uppercase tracking-widest mb-8">Panel de Organización Oficial</p>
          
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce la contraseña"
            className="w-full bg-[#334155] border-2 border-slate-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors mb-4 text-center font-bold"
          />
          
          {errorLogin && <p className="text-red-400 font-bold mb-4 text-sm animate-pulse">{errorLogin}</p>}
          
          <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#1e3a5f] font-black py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
            Desbloquear Panel
          </button>
        </form>
      </div>
    );
  }
`;

  orgContent = orgContent.replace(sigOld, sigNew);
  fs.writeFileSync(orgFile, orgContent, 'utf8');
}

console.log("Auth changes applied successfully");
