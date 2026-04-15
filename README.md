# Movilidad Urbana - Frontend (Mockups DCU)

Este proyecto es la aplicación frontend para el sistema **"Movilidad Urbana"**, diseñada para ofrecer una interfaz moderna y fluida para la solicitud de transporte, enfocada en viajes seguros y con tarifas fijas.

El proyecto ha sido inicializado y configurado con tecnologías modernas de desarrollo web, asegurando rendimiento y facilidad de mantenimiento.

## 🛠 Stack Tecnológico

Tras el análisis del proyecto, estas son las herramientas principales utilizadas:

- **Framework**: [Next.js](https://nextjs.org/) (utilizando el App Router)
- **Librería de UI**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes Base**: Radix UI Primitives (para accesibilidad y modales/dropdowns)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Formularios y Validación**: React Hook Form + Zod
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/)
- **Tipado**: TypeScript

---

## 🚀 Cómo ejecutar el proyecto paso a paso

Para correr esta aplicación en tu máquina local, sigue estas instrucciones:

### 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:
- **Node.js** (versión 18 o superior recomendada).
- **pnpm** (El gestor de dependencias utilizado en el proyecto. Puedes instalarlo globalmente ejecutando `npm install -g pnpm`).

### 2. Abrir la terminal en la carpeta del proyecto

Asegúrate de estar ubicado en la raíz del proyecto (`mockups-dcu`). Si estás en otra ruta, navega usando:

```bash
cd mockups-dcu
```

### 3. Instalar las dependencias

Debido a que el proyecto usa `pnpm` (evidenciado por el archivo `pnpm-lock.yaml`), debes instalar todas las librerías necesarias con el siguiente comando:

```bash
pnpm install
```
*(No se recomienda usar `npm install` para evitar conflictos con las versiones bloqueadas)*

### 4. Iniciar el servidor de desarrollo

Una vez completada la instalación, levanta el entorno local de desarrollo ejecutando:

```bash
pnpm run dev
```

### 5. Visualizar la App

Abre tu navegador web de preferencia e ingresa a: **[http://localhost:3000](http://localhost:3000)**. 
Verás la *Landing Page* principal de la aplicación. Cualquier cambio que guardes en los archivos se reflejará instantáneamente en el navegador.

---

## 📦 Otros Scripts de Utilidad

Dentro del archivo `package.json` también se encuentran disponibles otros comandos importantes para el ciclo de vida del frontend:

- **Construir para producción** (Genera una versión optimizada de la App):
  ```bash
  pnpm run build
  ```
- **Iniciar en modo producción** (Requiere haber corrido el build previamente):
  ```bash
  pnpm run start
  ```
- **Analizar el código (Linting)** (Busca errores de código o problemas de legibilidad):
  ```bash
  pnpm run lint
  ```

## 📁 Estructura Principal de Carpetas

- `/app`: Sistema de rutas de Next.js. Aquí se encuentra la página principal (`page.tsx`) y demás pantallas.
- `/components`: Colección de componentes de interfaz reutilizables, incluyendo interactivos como acordeones, popovers, entre otros.
- `/lib`: Utilidades generales (como funciones de merge de clases usando `clsx` y `tailwind-merge`).
- `/public`: Archivos estáticos accesibles públicamente (ej. íconos, imágenes base).
- `/styles`: Globales de estilos para la aplicación CSS / PostCSS.
