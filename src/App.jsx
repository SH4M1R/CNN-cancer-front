import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx"; 
import Dashboard from "./pages/dashboard.jsx";
import Historial from "./pages/historial.jsx";
import Perfil from "./pages/perfil.jsx";
import Informacion from "./pages/informacion.jsx";

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/informacion" element={<Informacion />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;