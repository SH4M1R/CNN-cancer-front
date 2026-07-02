import { useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/predict`;

const MAPEO_CLASES = {
  "clase_0": "lesión benigna",
  "clase_1": "carcinoma basocelular",
  "clase_2": "melanoma"
};

export default function Dashboard() {
  const [imagen, setImagen] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarCambioImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setVistaPrevia(URL.createObjectURL(file));
      setResultado(null);
    }
  };

  const analizarImagen = async () => {
    if (!imagen) return;
    setCargando(true);
    const formData = new FormData();
    formData.append("file", imagen);

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      const data = await res.json();
      setResultado(data);
    } catch (err) {
      console.error("Error al predecir:", err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-6 antialiased">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8">
        
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-teal-600">
            Clasificador CNN Inteligente
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Sube una imagen para analizarla con la red neuronal en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Columna Izquierda: Carga y Vista Previa */}
          <div className="flex flex-col justify-between space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-teal-50/50 hover:border-teal-400 transition-all group overflow-hidden relative">
              {vistaPrevia ? (
                <img 
                  src={vistaPrevia} 
                  alt="Vista previa" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <svg className="w-10 h-10 mb-3 text-slate-400 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-slate-600 font-semibold">Haz clic para subir una imagen</p>
                  <p className="text-xs text-slate-400">Formatos soportados: PNG, JPG o JPEG</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={manejarCambioImagen}
              />
            </label>

            <button
              onClick={analizarImagen}
              disabled={!imagen || cargando}
              className={`w-full py-3 px-4 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                !imagen || cargando
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20 active:scale-[0.98]"
              }`}
            >
              {cargando ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Procesando...</span>
                </>
              ) : (
                "Analizar Imagen"
              )}
            </button>
          </div>

          {/* Columna Derecha: Resultados */}
          <div className="flex flex-col justify-center bg-slate-50 rounded-xl p-5 border border-slate-100">
            {resultado ? (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Predicción Principal</span>
                  {/* 2. Traduce la clase principal. Si no está en el mapa, muestra el nombre original */}
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 capitalize">
                    {MAPEO_CLASES[resultado.cl6ase_predicha] || resultado.clase_predicha}
                  </h3>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">Probabilidades</span>
                  <div className="space-y-3">
                    {Object.entries(resultado.probabilidades).map(([clase, prob]) => {
                      const porcentaje = (prob * 100).toFixed(1);
                      const esGanador = clase === resultado.clase_predicha;
                      // 3. Traduce el nombre de la clase para la lista
                      const nombreLegible = MAPEO_CLASES[clase] || clase;
                      
                      return (
                        <div key={clase} className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className={`capitalize ${esGanador ? 'text-teal-600 font-bold' : 'text-slate-600'}`}>
                              {nombreLegible}
                            </span>
                            <span className={esGanador ? 'text-teal-600 font-bold' : 'text-slate-500'}>
                              {porcentaje}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ease-out rounded-full ${esGanador ? 'bg-teal-500' : 'bg-slate-400'}`}
                              style={{ width: `${porcentaje}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-sm text-slate-400">
                  {cargando ? "Extrayendo características..." : "Ningún análisis realizado aún. Sube una foto y presiona Analizar."}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}