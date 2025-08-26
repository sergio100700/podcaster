# 🎧 Podcaster App

Aplicación web desarrollada con **React + Vite + TailwindCSS** que permite buscar y explorar podcasts de forma sencilla.  

---

## 📦 Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- npm (incluido con Node.js) o [yarn](https://yarnpkg.com/)

---

## 🛠️ Modos de ejecución

### 🔹 Development
En este modo los assets **no se minimizan** y se sirven sin optimización, lo que facilita la depuración.

```bash
npm run dev
```

Esto arrancará un servidor local (por defecto en `http://localhost:5173/`) donde podrás desarrollar la aplicación.

---

### 🔹 Production
En este modo se generan los assets **concatenados y minimizados** para mejor rendimiento.

1. Generar el build de producción:

```bash
npm run build
```

Esto crea la carpeta `dist/` con los archivos optimizados.

2. Probar el build localmente:

```bash
npm run preview
```

Esto levanta un servidor que sirve los archivos ya minimizados, simulando un entorno productivo.

---

## 🎨 Características principales

- **Modo claro/oscuro** gestionado mediante contexto y `localStorage`.
- **Búsqueda en tiempo real** para filtrar podcasts.
- **Estilos modernos** con TailwindCSS.
- Arquitectura pensada para escalabilidad y mantenibilidad.

---

## 📂 Estructura del proyecto

```bash
src/
├── components/     # Componentes reutilizables (PodcastCard, etc.)
├── context/        # Contextos globales (DarkMode, Loading, etc.)
├── pages/          # Páginas principales de la aplicación
├── App.jsx         # Configuración de rutas y layout principal
├── index.css       # Estilos globales + configuración de Tailwind
└── main.jsx        # Punto de entrada principal
```

---

## 🚀 Despliegue

El contenido de `dist/` puede ser desplegado en cualquier servicio de hosting estático como:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- GitHub Pages
- o un servidor propio con Nginx/Apache

---

## 📜 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.  
Eres libre de usarlo, modificarlo y compartirlo.
