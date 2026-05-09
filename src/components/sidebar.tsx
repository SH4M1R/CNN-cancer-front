import { Home, History, Info, User, LogOut, LogIn } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Historial', icon: <History size={20} />, path: '/historial' },
    { name: 'Información', icon: <Info size={20} />, path: '/informacion' },
    { name: 'Perfil', icon: <User size={20} />, path: '/perfil' },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-teal-900 text-white p-4 fixed left-0 top-0">
      <div className="mb-10 mt-4 px-2">
        <h1 className="text-xl font-bold text-teal-100">Skin Cancer - CNN</h1>
        <p className="text-xs text-slate-400">Panel de Control</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors group"
              >
                <span className="text-slate-400 group-hover:text-teal-400">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-800 pt-4">
        <button className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-slate-800 text-green-400 transition-colors">
          <LogIn size={20} />
          <span className="font-medium">Iniciar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;