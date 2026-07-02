import { useState } from "react";

// Datos de guía para cada diagnóstico
const GUIAS_DIAGNOSTICO = {
  lesion_benigna: {
    titulo: "Lesión Benigna",
    subtitulo: "Ej. Lunares comunes, queratosis seborreicas, efélides.",
    descripcion: "Indica que las características visuales analizadas corresponden a estructuras normales o acumulaciones de pigmento sin signos de malignidad activa.",
    pasos: [
      "Monitoreo continuo: Realiza un autoexamen mensual siguiendo la regla ABCDE (Asimetría, Borde, Color, Diámetro, Evolución).",
      "Protección solar: Utiliza protector solar diario SPF 50+, sombrero y evita la exposición directa en horas pico.",
      "Evita la manipulación: No intentes raspar, cortar ni aplicar remedios caseros sobre la lesión."
    ],
    color: "teal"
  },
  carcinoma_basocelular: {
    titulo: "Carcinoma Basocelular",
    subtitulo: "El tipo de cáncer de piel más común, generalmente de crecimiento lento.",
    descripcion: "Suele presentarse como un bulto perlado, una llaga que no sana o un parche rosado. Aunque raramente se extiende a otras partes del cuerpo (metástasis), requiere atención médica para evitar daños locales en la piel.",
    pasos: [
      "Agenda una cita dermatológica: Es necesario confirmar mediante una biopsia física.",
      "Protege la zona: Evita la fricción o que la lesión sufra traumatismos directos.",
      "Mantén la calma: Su tasa de curación es sumamente alta cuando se detecta y trata a tiempo mediante cirugías menores."
    ],
    color: "amber"
  },
  melanoma: {
    titulo: "Melanoma",
    subtitulo: "El tipo más serio de cáncer de piel, desarrollado en los melanocitos.",
    descripcion: "Puede manifestarse como un cambio en un lunar existente o la aparición de una mancha nueva, asimétrica y de bordes irregulares. La intervención médica temprana es el factor más crítico para un pronóstico exitoso.",
    pasos: [
      "Atención médica prioritaria: Solicita una consulta dermatológica de urgencia lo antes posible.",
      "Recopila el historial: Registra cuándo notaste la lesión por primera vez y si ha cambiado de tamaño, forma o ha sangrado.",
      "Evita la automedicación: No apliques cremas dermatológicas ni cosméticos sobre la zona afectada."
    ],
    color: "rose"
  }
};

const Informacion = () => {
  const [tabActiva, setTabActiva] = useState("lesion_benigna");

  const infoActual = GUIAS_DIAGNOSTICO[tabActiva];

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto p-4 md:p-6 text-slate-800">
      
      {/* Encabezado de la página */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-teal-600">
          Guía de Información y Respuestas
        </h1>
        <p className="text-slate-500 mt-2">
          Infórmate sobre las características de cada diagnóstico emitido por el modelo CNN y los protocolos recomendados.
        </p>
      </div>

      {/* CLÁUSULA DE ADVERTENCIA GLOBAL MÁXIMA (Siempre visible) */}
      <div className="mb-8 bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl shadow-sm">
        <div className="flex gap-3">
          <svg className="w-6 h-6 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-bold text-amber-950 text-base">Aviso Médico Obligatorio</h4>
            <p className="text-sm text-amber-900 mt-1 leading-relaxed">
              Este sistema es una herramienta de orientación preliminar basada en inteligencia artificial y **no constituye un diagnóstico médico bajo ninguna circunstancia**. Sin importar el porcentaje de probabilidad o el tipo de resultado obtenido, es **estrictamente indispensable que acuda con un dermatólogo colegiado** para una evaluación clínica formal y un estudio histopatológico.
            </p>
          </div>
        </div>
      </div>

      {/* Navegación por pestañas (Tabs) */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto gap-2">
        {Object.entries(GUIAS_DIAGNOSTICO).map(([clave, datos]) => (
          <button
            key={clave}
            onClick={() => setTabActiva(clave)}
            className={`py-3 px-4 font-semibold text-sm border-b-2 transition-all whitespace-nowrap rounded-t-lg ${
              tabActiva === clave
                ? "border-teal-600 text-teal-600 bg-teal-50/40"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {datos.titulo}
          </button>
        ))}
      </div>

      {/* Contenedor de Información Dinámica */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-100 transition-all">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">{infoActual.titulo}</h2>
            
            {/* Badge indicador de tipo */}
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              tabActiva === "lesion_benigna" ? "bg-teal-100 text-teal-700" :
              tabActiva === "carcinoma_basocelular" ? "bg-amber-100 text-amber-700" :
              "bg-rose-100 text-rose-700"
            }`}>
              {tabActiva === "lesion_benigna" ? "Bajo Riesgo" : "Requiere Atención"}
            </span>
          </div>
          <p className="text-sm text-slate-500 italic mt-1">{infoActual.subtitulo}</p>
        </div>

        <p className="text-slate-600 leading-relaxed mb-6">
          {infoActual.descripcion}
        </p>

        {/* Sección de acciones */}
        <div className="border-t border-slate-100 pt-4">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Acciones Recomendadas:
          </h3>
          <ul className="space-y-3">
            {infoActual.pasos.map((paso, index) => (
              <li key={index} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                <span className="flex items-center justify-center bg-slate-100 font-bold text-slate-700 w-5 h-5 rounded-full text-xs shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{paso}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default Informacion;