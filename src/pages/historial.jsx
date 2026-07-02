import { useState, useEffect } from "react";

const HISTORY_URL = `${import.meta.env.VITE_API_URL}/history`;

const MAPEO_CLASES = {
  "clase_0": "lesión benigna",
  "clase_1": "carcinoma basocelular",
  "clase_2": "melanoma"
};

const Historial = () => {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const res = await fetch(HISTORY_URL);
        const data = await res.json();
        setRegistros(data);
      } catch (err) {
        console.error("Error al obtener el historial:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerHistorial();
  }, []);

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto p-4 md:p-6 text-slate-800">
      {/* Encabezado de la página */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-teal-600">Historial Clínico</h1>
        <p className="text-slate-500 mt-2">
          Registro de imágenes analizadas previamente por el sistema de Inteligencia Artificial.
        </p>
      </div>

      {/* Tabla / Contenedor de Registros */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
        {cargando ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-3">
            <svg className="animate-spin h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-sm font-medium">Cargando registros...</p>
          </div>
        ) : registros.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-base font-medium">No se han realizado análisis en esta sesión aún.</p>
            <p className="text-xs text-slate-400 mt-1">Los nuevos análisis del Dashboard aparecerán listados aquí automáticamente.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-4 pl-6">ID</th>
                  <th className="p-4">Fecha / Hora</th>
                  <th className="p-4">Archivo</th>
                  <th className="p-4">Resultado de la IA</th>
                  <th className="p-4 pr-6 text-right">Certeza Máxima</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {registros.map((reg) => {
                  const nombreClinico = MAPEO_CLASES[reg.clase_predicha] || reg.clase_predicha;
                  // Obtiene el porcentaje más alto
                  const porcentajeMaximo = (reg.probabilidades[reg.clase_predicha] * 100).toFixed(1);

                  return (
                    <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-slate-400">#{reg.id}</td>
                      <td className="p-4 text-slate-600 font-medium">{reg.fecha}</td>
                      <td className="p-4 text-slate-500 truncate" title={reg.nombre_archivo}>
                        {reg.nombre_archivo}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                          reg.clase_predicha === "clase_0" ? "bg-teal-100 text-teal-700" :
                          reg.clase_predicha === "clase_1" ? "bg-amber-100 text-amber-700" :
                          "bg-rose-100 text-rose-700"
                        }`}>
                          {nombreClinico}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right font-bold text-slate-700">
                        {porcentajeMaximo}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historial;