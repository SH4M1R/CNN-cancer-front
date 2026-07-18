import { useState } from "react";
import {
  LayoutDashboard, Download, ScanSearch, Info, Menu, X, } from "lucide-react";
import logo from "../assets/logo.webp";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/", },
    { name: "Descargar", icon: <Download size={20} />, path: "/Descargar", },
    { name: "Predicción", icon: <ScanSearch size={20} />, path: "/prediccion", },
    { name: "Información", icon: <Info size={20} />, path: "/informacion", },
  ];

  return (
    <>
      {/* Navbar móvil */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-teal-900 text-white flex items-center justify-between px-4 py-3 shadow-lg z-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain rounded-xl p-2" />

          <div>
            <h1 className="text-lg font-bold leading-none"> Skin Scan - CNN </h1>
            <p className="text-xs text-teal-200"> Panel de Control </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-teal-800 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 bg-teal-900 text-white z-40 transition-all duration-300

          top-[68px] w-full
          ${
            isOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-full opacity-0 invisible"
          }

          md:top-0 md:h-screen md:w-64
          md:translate-y-0 md:opacity-100 md:visible
          md:flex md:flex-col
        `}
      >
        
        <div className="hidden md:flex items-center gap-3 px-5 py-6 border-b border-teal-800">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain rounded-xl p-2" />

          <div>
            <h2 className="text-lg font-bold text-white"> Skin Cancer - CNN </h2>
            <p className="text-sm text-teal-200"> Panel de Control </p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-teal-800 hover:translate-x-1"
                >
                  <span className="text-teal-300 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>

                  <span className="font-medium">
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;