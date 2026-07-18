const DescargarApp = () => {
  return (
    <div className="animate-fadeIn max-w-3xl mx-auto p-4 md:p-6 text-slate-800">
      {/* Encabezado de la página */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-teal-600">Aplicación Móvil</h1>
        <p className="text-slate-500 mt-2">
          Lleva el poder del análisis dermatológico con Inteligencia Artificial directamente en tu bolsillo.
        </p>
      </div>

      {/* Tarjeta Principal de Descarga */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        
        {/* Icono Ilustrativo */}
        <div className="bg-teal-50 text-teal-600 p-5 rounded-2xl border border-teal-100 shadow-inner">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
        </div>

        {/* Detalles y Acción */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Versión Android (APK)
            </span>
            <h2 className="text-2xl font-bold text-slate-800 mt-2">SkinScan Mobile v1.0</h2>
            <p className="text-sm text-slate-500 mt-1">
              Escanea lesiones en la piel en tiempo real utilizando la cámara de tu smartphone.
            </p>
          </div>

          {/* Características clave */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 pt-2">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-teal-500 font-bold">✓</span> Análisis instantáneo offline
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-teal-500 font-bold">✓</span> Interfaz optimizada para fotos
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-teal-500 font-bold">✓</span> Historial local protegido
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-teal-500 font-bold">✓</span> El mismo modelo TFLite portátil
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            {/* Botón de descarga directa */}
            <a
              href="/SkinScan.apk"
              download="SkinScan.apk"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-teal-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Descargar APK gratis
            </a>
            
            <span className="text-xs text-slate-400 font-medium">
              Tamaño aprox: 70 MB
            </span>
          </div>
        </div>
      </div>

      {/* Nota aclaratoria sobre la instalación de APKs */}
      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 leading-relaxed flex gap-3 items-start">
        <svg className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <p>
          <strong>Nota de instalación:</strong> Al no provenir directamente de la Google Play Store, tu dispositivo Android podría solicitarte activar el permiso de <em>"Instalar aplicaciones de fuentes desconocidas"</em>. Esta aplicación es completamente segura y ha sido compilada con fines médicos y de desarrollo.
        </p>
      </div>
    </div>
  );
};

export default DescargarApp;