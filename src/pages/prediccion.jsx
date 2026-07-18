import { useState, useEffect, useRef } from 'react';
import { ImagePlus, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

// Mapeo exacto de las clases
const CLASES = {
  'clase_0': 'Lesión benigna',
  'clase_1': 'Carcinoma basocelular',
  'clase_2': 'Melanoma'
};

const TAMANO_MODELO = 224;

export default function PrediccionPage() {
  const [tfliteRunner, setTfliteRunner] = useState(null);
  const [cargandoModelo, setCargandoModelo] = useState(true);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [analizando, setAnalizando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  // 1. Cargar las librerías oficiales de TensorFlow.js desde CDN e iniciar el modelo .tflite
  useEffect(() => {
    async function cargarBibliotecaTFLite() {
      try {
        if (!window.tf) {
          const scriptTF = document.createElement('script');
          scriptTF.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js";
          document.head.appendChild(scriptTF);
          await new Promise((resolve) => scriptTF.onload = resolve);
        }

        if (!window.tflite) {
          const scriptTFLite = document.createElement('script');
          scriptTFLite.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite/dist/tf-tflite.min.js";
          document.head.appendChild(scriptTFLite);
          await new Promise((resolve) => scriptTFLite.onload = resolve);
        }

        // Cargar el archivo binario desde la carpeta /public
        const modeloCargado = await window.tflite.loadTFLiteModel('/model.tflite');
        setTfliteRunner(modeloCargado);
        setCargandoModelo(false);
      } catch (err) {
        console.error("Error cargando TFLite:", err);
        setError("No se pudo cargar el archivo 'model.tflite'. Asegúrate de que esté dentro de la carpeta /public.");
        setCargandoModelo(false);
      }
    }

    cargarBibliotecaTFLite();
  }, []);

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagenUrl(URL.createObjectURL(file));
    setResultado(null);
    setError(null);
  };

  // 2. Inferencia y preprocesamiento de matrices sin Canvas intermedio
  const analizarImagen = async () => {
    if (!tfliteRunner || !imageRef.current) return;

    setAnalizando(true);
    setError(null);

    setTimeout(async () => {
      try {
        const entradaTensor = window.tf.tidy(() => {
          const pixelesOriginales = window.tf.browser.fromPixels(imageRef.current);

          const redimensionado = window.tf.image.resizeBilinear(
            pixelesOriginales.toFloat(),
            [TAMANO_MODELO, TAMANO_MODELO]
          );

          return redimensionado.expandDims(0);
        });

        const salidaTensor = tfliteRunner.predict(entradaTensor);
        const probabilidades = await salidaTensor.data();

        entradaTensor.dispose();
        salidaTensor.dispose();

        // Encontrar la clase dominante
        const idxMaximo = probabilidades.indexOf(Math.max(...probabilidades));
        const listaClaves = Object.keys(CLASES);

        setResultado({
          clasePredicha: listaClaves[idxMaximo],
          probabilidades: {
            clase_0: probabilidades[0] || 0,
            clase_1: probabilidades[1] || 0,
            clase_2: probabilidades[2] || 0
          }
        });

      } catch (err) {
        console.error("Error en inferencia web:", err);
        setError("Error matemático al procesar la predicción del modelo TFLite.");
      } finally {
        setAnalizando(false);
      }
    }, 250);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-teal-800">Clasificador CNN Inteligente</h1>
        <p className="text-slate-500 mt-1">
          Inferencia local veloz ejecutando tu archivo <strong>model.tflite</strong> mediante WebAssembly.
        </p>
      </div>

      {/* Estados de Alerta */}
      {cargandoModelo && (
        <div className="bg-teal-50 border border-teal-200 text-teal-800 p-4 rounded-xl flex items-center gap-3">
          <RefreshCw className="animate-spin text-teal-600" size={20} />
          <span className="font-medium">Iniciando entorno WebAssembly y cargando model.tflite...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={20} />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Grid de Interfaz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Panel Izquierdo: Control de Imagen */}
        <div className="flex flex-col space-y-4">
          <div 
            onClick={() => !cargandoModelo && fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center p-4 transition-all overflow-hidden ${
              cargandoModelo ? 'bg-slate-50 border-slate-200 cursor-not-allowed' : 'border-slate-300 hover:border-teal-500 bg-white cursor-pointer'
            }`}
          >
            <input type="file" ref={fileInputRef} onChange={manejarImagen} accept="image/*" className="hidden" disabled={cargandoModelo} />

            {imagenUrl ? (
              <img 
                ref={imageRef} 
                src={imagenUrl} 
                alt="Muestra de lesión cutánea" 
                className="h-full w-full object-cover rounded-xl"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="text-center space-y-2 text-slate-400">
                <ImagePlus size={48} className="mx-auto text-slate-300" />
                <p className="font-medium text-sm">Cargar fotografía de la lesión</p>
                <p className="text-xs">Los datos se procesan localmente</p>
              </div>
            )}
          </div>

          {imagenUrl && !cargandoModelo && (
            <button
              onClick={analizarImagen}
              disabled={analizando}
              className="w-full bg-teal-600 text-white font-semibold p-3 rounded-xl hover:bg-teal-700 transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {analizando ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Calculando tensores...
                </>
              ) : (
                'Iniciar Inferencia Local'
              )}
            </button>
          )}
        </div>

        {/* Panel Derecho: Visualización de Resultados */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">Resultados de la Red Neuronal</h2>
            
            {!resultado && !analizando && (
              <div className="h-48 flex items-center justify-center text-center text-slate-400 text-sm">
                Sube una muestra biológica para evaluar probabilidades estadísticas.
              </div>
            )}

            {analizando && (
              <div className="h-48 flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-slate-500 font-medium">Decodificando matrices de color...</p>
              </div>
            )}

            {resultado && (
              <div className="space-y-6">
                {/* Alerta de Ganador */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                  <CheckCircle className="text-teal-600 shrink-0 mt-1" size={24} />
                  <div>
                    <span className="block text-xs font-bold text-teal-600 tracking-wider uppercase">Predicción Máxima</span>
                    <span className="text-2xl font-extrabold text-slate-800">{CLASES[resultado.clasePredicha]}</span>
                  </div>
                </div>

                {/* Barras de Progreso */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Distribución de Confianza</h3>
                  {Object.entries(resultado.probabilidades).map(([clase, probabilidad]) => {
                    const porcentaje = (probabilidad * 100).toFixed(1);
                    const esGanador = resultado.clasePredicha === clase;

                    return (
                      <div key={clase} className="space-y-1">
                        <div className="flex justify-between text-sm font-medium text-slate-700">
                          <span className={esGanador ? "text-slate-900 font-bold" : ""}>{CLASES[clase]}</span>
                          <span>{porcentaje}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${esGanador ? 'bg-teal-600' : 'bg-slate-400'}`} 
                            style={{ width: `${porcentaje}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-[11px] text-slate-400 leading-relaxed border-t border-slate-200 pt-4">
            * <strong>Aviso legal:</strong> Los resultados son puramente estadísticos y de apoyo educativo basados en una Red Neuronal Convolucional. No reemplazan un diagnóstico médico definitivo realizado por un dermatólogo.
          </div>
        </div>

      </div>
    </div>
  );
}