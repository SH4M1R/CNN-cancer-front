import { useState } from 'react';
import { Home, History, Info, User, LogIn, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Descargar', icon: <History size={20} />, path: '/Descargar' },
    { name: 'Predicción', icon: <Info size={20} />, path: '/prediccion' },
    { name: 'Información', icon: <Info size={20} />, path: '/informacion' },
  ];

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-teal-900 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md">
        <div>
          <h1 className="text-lg font-bold text-teal-100">Skin Cancer - CNN</h1>
          <p className="text-[10px] text-slate-300">Panel de Control</p>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 rounded-lg hover:bg-teal-800 transition-colors focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`
        fixed left-0 bg-teal-900 text-white p-4 flex flex-col z-40 transition-all duration-300 ease-in-out
        
        top-[68px] w-full border-t border-teal-800 shadow-xl
        ${isOpen ? 'translate-y-0 opacity-100 visibility-visible' : '-translate-y-full opacity-0 invisible'}
        
        md:top-0 md:h-screen md:w-64 md:translate-y-0 md:opacity-100 md:visible md:border-t-0 md:shadow-none
      `}>
        
        <div className="hidden md:block mb-10 mt-4 px-2">
          <h1 className="text-xl font-bold text-teal-100">Skin Cancer - CNN</h1>
          <p className="text-xs text-slate-400">Panel de Control</p>
        </div>

        {/* Enlaces del Menú */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-800 md:hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-teal-300 md:text-slate-400 md:group-hover:text-teal-400">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;