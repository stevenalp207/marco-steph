# Marco & Steph

Base de página web construida con [React](https://react.dev/) y [Vite](https://vite.dev/).

## Registro de confirmaciones (RSVP)

La seccion Confirmar Asistencia ahora guarda respuestas en Supabase para llevar control de:

- Quien si asistira
- Quien no podra asistir
- Cuantos acompanantes asistiran
- Telefono y comentario opcional

### 1. Crear tabla y politicas

En Supabase SQL Editor ejecuta el script [supabase/rsvp_schema.sql](supabase/rsvp_schema.sql).

### 2. Variables de entorno

Copia [\.env.example](.env.example) a `.env` y completa:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 3. Ver el registro

En Supabase, entra a `Table Editor` -> `rsvp_responses` para ver en tiempo real quien confirmo y quien no.

Tambien puedes exportar a CSV desde esa tabla para compartir el listado.

### 4. Dashboard web

Con la app corriendo, abre `/dashboard` para ver todas las reservaciones con su estado:

- `Acepto`
- `No asiste`
- `Pendiente`

Ejemplo local: `http://localhost:5173/dashboard`

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
