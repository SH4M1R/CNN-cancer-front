import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx"; 
import Dashboard from "./pages/dashboard.jsx";
import DescargarApp from "./pages/descargar";
import Informacion from "./pages/informacion.jsx";
import Prediccion from "./pages/prediccion.jsx";

function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 antialiased">
      
      <Sidebar />
      
      <main className=" flex-1  w-full transition-all duration-300
        pt-[76px]      /* Deja espacio libre abajo de la barra superior móvil (aprox 68px + respiro) */
        p-4            /* Padding reducido en pantallas chicas para aprovechar el espacio */
        md:pt-0        /* Ya no requiere espacio arriba porque el sidebar estará a la izquierda */
        md:ml-64       /* Empuja el contenido exactamente después de los 256px del Sidebar estático */
        md:p-8         /* Recupera el espaciado amplio y elegante de escritorio */
      ">
        {/* Contenedor interno con límite de ancho opcional para que las vistas no se estiren infinitamente */}
        <div className="max-w-7xl mx-auto h-full">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prediccion" element={<Prediccion />} />
            <Route path="/descargar" element={<DescargarApp />} />
            <Route path="/informacion" element={<Informacion />} />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;