# Skin Cancer - CNN

Aplicativo web para el sistema de análisis y detección de cáncer de piel mediante inteligencia artificial. Esta versión ejecuta la red neuronal directamente en el cliente, eliminando la necesidad de un servidor backend externo para realizar las predicciones.


## Características
* **Análisis en tiempo real:** Carga de imágenes e inferencia instantánea.
* **Arquitectura Serverless (Edge AI):** Integración directa con TensorFlow.js y TFLite.
* **Interfaz Moderna:** Construido con componentes limpios y diseño responsivo usando Tailwind CSS.
* **Mapeo Humano:** Traduce automáticamente las salidas del modelo (`clase_0`, `clase_1`, `clase_2`) a términos médicos comprensibles (*lesión benigna*, *carcinoma basocelular*, *melanoma*).

---

## Tecnologías Utilizadas
* **Frontend:** React, Vite, Tailwind CSS
* **Inteligencia Artificial:** TensorFlow.js, TFLite (WebAssembly execution environment)

---

##  Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/cnn-front.git](https://github.com/tu-usuario/cnn-front.git)
cd cnn-front
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar el proyecto en desarrollo
```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador para interactuar con la aplicación.

### Notas de Despliegue (Producción)

Al estar basado enteramente en archivos estáticos y procesamiento en el lado del cliente (Client-Side Inference), este proyecto puede ser desplegado de forma gratuita y en segundos en plataformas como Vercel, Netlify o GitHub Pages sin necesidad de configurar servidores de Node.js o Python.