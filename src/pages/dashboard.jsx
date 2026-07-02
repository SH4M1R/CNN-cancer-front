import { ShieldCheck, Activity, AlertTriangle, ArrowRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="animate-fadeIn max-w-5xl mx-auto p-4 md:p-6 text-slate-800">
      
      {/* Sección Hero / Bienvenida */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-teal-900/10 mb-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="bg-teal-500/30 text-teal-100 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
            Proyecto Inteligencia Artificial - CNN
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-3">
            Plataforma SKIN-CANCER
          </h1>
          <p className="text-teal-50 mt-4 text-sm md:text-base leading-relaxed opacity-90">
            Una herramienta digital diseñada para la detección temprana y pre-diagnóstico de anomalías en la piel a través de Redes Neuronales Convolucionales (CNN), optimizando los tiempos de respuesta frente al cáncer cutáneo.
          </p>
          <div className="mt-6">
            <a 
              href="/prediccion" 
              className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-5 py-3 rounded-xl shadow-md hover:bg-teal-50 transition-all transform active:scale-95 text-sm"
            >
              Comenzar Análisis Técnico
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
        {/* Decoración geométrica de fondo */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Grid de Tarjetas Informativas / Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-start gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Activity size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">1 de 5</h4>
            <p className="text-xs text-slate-500 mt-1">Personas desarrollará algún tipo de cáncer de piel a lo largo de su vida a nivel global.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-start gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">95%</h4>
            <p className="text-xs text-slate-500 mt-1">De los casos detectados a tiempo tienen un pronóstico de curación total y tratamiento exitoso.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">Análisis CNN</h4>
            <p className="text-xs text-slate-500 mt-1">Evaluación matemática veloz basada en texturas, bordes y asimetrías de la lesión dermo-epidérmica.</p>
          </div>
        </div>
      </div>

      {/* Sección Informativa Primaria: Propósito y Problematica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-3">
            La Problemática
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            El aumento de la radiación ultravioleta y la falta de chequeos periódicos han disparado los casos de afecciones como el <strong>Melanoma</strong> y el <strong>Carcinoma Basocelular</strong>. 
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Lamentablemente, el acceso a citas dermatológicas especializadas puede demorar meses en los sistemas de salud convencionales, un tiempo crítico donde las lesiones malignas pueden evolucionar de forma silenciosa.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-teal-700 border-b border-slate-100 pb-3 mb-3">
            Nuestra Función
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            <strong>SKIN-CANCER</strong> nace para mitigar esta brecha tecnológica. Utilizando una red neuronal profunda, la aplicación clasifica instantáneamente imágenes dermatológicas en tres categorías esenciales.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sirve como un mecanismo de <em>triage</em> o cribado rápido para alertar a los usuarios si una marca cutánea presenta características de urgencia clínica, incentivando la consulta médica inmediata.
          </p>
        </div>
      </div>

    </div>
  );
}