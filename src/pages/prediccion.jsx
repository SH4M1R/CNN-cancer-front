import { useState, useEffect } from "react";

// Diccionario para traducir las clases técnicas de la CNN a lenguaje humano
const MAPEO_CLASES = {
  "clase_0": "lesión benigna",
  "clase_1": "carcinoma basocelular",
  "clase_2": "melanoma"
};

export default function Prediccion() {
  const [imagen, setImagen] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [modelo, setModelo] = useState(null);
  const [errorModelo, setErrorModelo] = useState(false);

  // 1. Cargar el modelo TFLite de forma genérica (más permisivo con los metadatos)
  useEffect(() => {
    async function cargarModelo() {
      try {
        if (window.tflite) {
          // Cargamos el archivo directo desde la raíz pública
          const modelLoaded = await window.tflite.loadTFLiteModel("/model.tflite");
          setModelo(modelLoaded);
          setErrorModelo(false);
        } else {
          // Si la CDN aún no se ha montado en el objeto window, reintentamos en medio segundo
          setTimeout(cargarModelo, 500);
        }
      } catch (err) {
        console.error("Error crítico al inicializar el modelo TFLite:", err);
        setErrorModelo(true);
      }
    }
    cargarModelo();
  }, []);

  const manejarCambioImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setVistaPrevia(URL.createObjectURL(file));
      setResultado(null); // Limpiar predicciones anteriores
    }
  };

  // 2. Procesar la imagen mediante tensores de TFJS y ejecutar la predicción
  const analizarImagenLocal = async () => {
    if (!imagen || !modelo || !window.tf) return;
    setCargando(true);

    try {
      // Creamos un elemento de imagen HTML temporal para alimentar a TensorFlow.js
      const imgElement = document.createElement("img");
      imgElement.src = vistaPrevia;

      imgElement.onload = async () => {
        // tf.tidy limpia automáticamente la memoria de los tensores intermedios
        const tensor = window.tf.tidy(() => {
          return window.tf.browser.fromPixels(imgElement)
            .resizeNearestNeighbor([224, 224]) // 👈 Cambia a [128, 128] si tu CNN usa ese tamaño
            .toFloat()
            .div(window.tf.scalar(255.0))             // Normalizar píxeles de [0, 255] a [0, 1]
            .expandDims(0);                    // Cambiar el shape a formato Batch: [1, 224, 224, 3]
        });

        // Ejecutar inferencia local usando el modelo cargado de la CDN
        const predictionsTensor = modelo.predict(tensor);
        const probabilidadesArray = await predictionsTensor.data(); // Convertir tensor a Array de JS

        // Encontrar la clase con mayor nivel de confianza (probabilidad más alta)
        const indiceMaximo = probabilidadesArray.indexOf(Math.max(...probabilidadesArray));
        const clasePredicha = `clase_${indiceMaximo}`;

        // Guardar la respuesta con la misma estructura exacta que usaba tu backend
        setResultado({
          clase_predicha: clasePredicha,
          probabilidades: {
            "clase_0": probabilidadesArray[0] || 0,
            "clase_1": probabilidadesArray[1] || 0,
            "clase_2": probabilidadesArray[2] || 0
          }
        });

        // Liberar manualmente los tensores principales para no congelar el navegador
        tensor.dispose();
        predictionsTensor.dispose();
        setCargando(false);
      };
    } catch (err) {
      console.error("Error durante la inferencia local:", err);
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-6 antialiased">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8">
        
        {/* Encabezado con el estado en tiempo real del modelo */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-teal-600">
            Clasificador TFLite Local
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            {modelo 
              ? "Red Neuronal cargada con éxito. Listo para procesar de forma local." 
              : errorModelo 
                ? "Error de inicialización. Verifica el formato del archivo 'model.tflite'"
                : "Descargando e inyectando estructura de la Red Neuronal..."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bloque Izquierdo: Input y Botón de Acción */}
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
                  <p className="text-xs text-slate-400">Formatos válidos: PNG, JPG o JPEG</p>
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
              onClick={analizarImagenLocal}
              disabled={!imagen || cargando || !modelo}
              className={`w-full py-3 px-4 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                !imagen || cargando || !modelo
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
                  <span>Calculando inferencia...</span>
                </>
              ) : (
                "Analizar Imagen"
              )}
            </button>
          </div>

          {/* Bloque Derecho: Visualización de resultados */}
          <div className="flex flex-col justify-center bg-slate-50 rounded-xl p-5 border border-slate-100">
            {resultado ? (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Diagnóstico Detectado</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 capitalize">
                    {MAPEO_CLASES[resultado.clase_predicha] || resultado.clase_predicha}
                  </h3>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">Distribución de Confianza</span>
                  <div className="space-y-3">
                    {Object.entries(resultado.probabilidades).map(([clase, prob]) => {
                      const porcentaje = (prob * 100).toFixed(1);
                      const esGanador = clase === resultado.clase_predicha;
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
                              className={`h-full transition-all duration-500 ease-out rounded-full ${esGanador ? 'bg-teal-500' : 'bg-slate-400'}`}
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
                  {cargando ? "Evaluando capas densas del modelo..." : "Sube una captura de la lesión cutánea para iniciar el análisis local."}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}