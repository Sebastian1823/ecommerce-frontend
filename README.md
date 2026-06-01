# EcomStore - Frontend de Tienda Online de Tecnología

Este es el frontend de un ecommerce desarrollado con **Next.js 14** (usando el App Router) y **Tailwind CSS**. La aplicación es completamente responsiva, tiene un diseño elegante en modo oscuro con acentos en azul eléctrico y está optimizada para ser desplegada como sitio estático (Static Site) en Render.

## Características

- **Diseño Premium**: Fondo oscuro (`slate-900`), acentos azul eléctrico (`blue-500`), tipografía moderna (`Inter`), sombras elegantes y animaciones fluidas al pasar el cursor (hover effect).
- **Lista de Productos**: Grid responsivo con imágenes, stock badges de colores dinámicos, descripción truncada, precios en soles (S/.) y botones de acción rápida.
- **Detalle de Producto**: Página dedicada para cada producto con imagen grande, descripción completa, stock, ID y acciones de edición.
- **Creación de Productos**: Formulario con validación en frontend para registrar nuevos productos.
- **Edición de Productos**: Carga de datos existentes y envío de actualizaciones al backend.
- **Gestión de Carga y Errores**: Skeleton loaders para transiciones suaves y mensajes de error amigables en caso de fallos de API.

## Estructura del Proyecto

```text
ecommerce-frontend/
├── app/
│   ├── layout.js              → Layout principal con Navbar fijo y fondo oscuro
│   ├── page.js                → Lista de productos (grid responsivo y skeletons)
│   ├── products/
│   │   ├── new/
│   │   │   └── page.js        → Formulario para crear producto
│   │   └── [id]/
│   │       ├── page.js        → Detalle del producto
│   │       └── edit/
│   │           └── page.js    → Formulario para editar producto
│   └── globals.css            → Estilos CSS globales, scrollbar y skeleton animations
├── components/
│   ├── Navbar.js              → Navbar persistente con logo y botón para agregar
│   ├── ProductCard.js         → Tarjeta de producto individual con confirmación de borrado
│   └── ProductForm.js         → Formulario modular y reutilizable con validación
├── .env.local                 → Variable de entorno para desarrollo local
├── .env.example               → Plantilla de variables de entorno
├── .gitignore                 → Archivos omitidos en Git
├── next.config.js             → Configuración con output: 'export'
├── tailwind.config.js         → Configuración de Tailwind CSS
├── package.json               → Dependencias y scripts npm
└── README.md                  → Documentación del proyecto
```

## Requisitos Previos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- npm

## Instalación y Configuración

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Crea el archivo de variables de entorno `.env.local` y define la URL del backend:
   ```env
   NEXT_PUBLIC_API_URL=https://ecommerce-api-smle.onrender.com
   ```

## Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo en `http://localhost:3000`.
- **`npm run build`**: Compila la aplicación y genera la exportación estática en la carpeta `out/` gracias a `output: 'export'`.
- **`npm run start`**: Inicia la aplicación compilada localmente (no soportada bajo modo exportación directa sin servidor local).
- **`npm run lint`**: Ejecuta ESLint para analizar la calidad del código.

## Despliegue en Render como Static Site

Este proyecto está preconfigurado para compilarse como un sitio estático. Durante el despliegue en Render, configura lo siguiente:
- **Build Command**: `npm run build`
- **Publish Directory**: `out`

## Tecnologías Utilizadas

- **Core**: Next.js 14 (App Router)
- **Lenguaje**: JavaScript Puro (ES6+)
- **Estilos**: Tailwind CSS
- **API**: Fetch nativo (con manejo try/catch)
