# Marco & Steph

Base de página web construida con [React](https://react.dev/) y [Vite](https://vite.dev/).

## Estructura

```
src/
├── components/
│   ├── Header.jsx   # Navegación superior sticky
│   ├── Hero.jsx     # Sección de bienvenida
│   ├── Services.jsx # Tarjetas de servicios
│   ├── About.jsx    # Sección "Nosotros"
│   ├── Contact.jsx  # Formulario de contacto
│   └── Footer.jsx   # Pie de página
├── App.jsx          # Componente raíz
├── App.css          # Estilos del layout principal
├── index.css        # Variables y estilos globales
└── main.jsx         # Punto de entrada
```

## Comenzar

### Requisitos

- [Node.js](https://nodejs.org/) v18 o superior

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Producción

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```
