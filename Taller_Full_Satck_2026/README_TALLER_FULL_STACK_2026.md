# Taller Full Stack 2026 — Guía del equipo

Proyecto académico SENA. Tienda online de tecnología construida con HTML/CSS/JS + Node.js/Express + MySQL.

---

## Arquitectura general

```
                     ┌────────────────────────────────────────────────────┐
                     │                    PRODUCCIÓN                      │
                     │                                                    │
  Usuario            │  ┌──────────────┐   fetch    ┌──────────────────┐ │
  ──────────────────►│  │   VERCEL     │──────────► │    RAILWAY       │ │
                     │  │  (Frontend)  │            │   (Backend)      │ │
                     │  │  Estático    │◄────────── │   Express 5      │ │
                     │  │              │    JSON     │   Node.js        │ │
                     │  └──────────────┘            └────────┬─────────┘ │
                     │  mi-tienda.vercel.app                  │           │
                     │                               ┌────────▼─────────┐ │
                     │                               │    RAILWAY       │ │
                     │                               │    MySQL 8       │ │
                     │                               │  contactos_db    │ │
                     │                               └──────────────────┘ │
                     │                               mi-api.railway.app   │
                     └────────────────────────────────────────────────────┘

                     ┌────────────────────────────────────────────────────┐
                     │                      LOCAL                         │
                     │                                                    │
                     │  pnpm dlx serve . -p 5500    node server.js       │
                     │  └─ frontend/                └─ backend/          │
                     │     localhost:5500              localhost:3000     │
                     │                                      │             │
                     │                              MySQL local           │
                     │                              (XAMPP / Workbench)   │
                     └────────────────────────────────────────────────────┘
```

---

## Stack tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Frontend | HTML5 + Bootstrap 5.3 + Bootstrap Icons | Sin framework, sin build step |
| Estilos | CSS custom properties (`theme.css`) | Dark mode nativo de Bootstrap 5.3 |
| Backend | Node.js + Express 5 | Un solo archivo `server.js` |
| Base de datos | MySQL 8 + driver `mysql2` | Sin ORM |
| Paquetes | **pnpm** | Siempre pnpm, nunca npm ni yarn |
| Deploy frontend | **Vercel** | Detecta HTML estático automáticamente |
| Deploy backend | **Railway** | Servicio Node.js + MySQL incluidos |

---

## Estructura del repositorio

```
Taller_Full_Satck_2026/
├── frontend/
│   ├── index.html              → Inicio de la tienda
│   ├── ayuda.html              → FAQ y soporte
│   ├── contacto.html           → Formulario conectado al backend
│   ├── productos.html          → Catálogo público de productos
│   ├── admin-productos.html    → Panel de administración CRUD
│   ├── login.html              → Login (mockup — se activa en Sprint 4)
│   ├── css/
│   │   ├── theme.css           → Sistema de diseño completo
│   │   └── estilos.css         → Overrides locales
│   ├── js/
│   │   ├── theme.js            → Toggle dark/light + link activo
│   │   ├── script.js           → Formulario de contacto → backend
│   │   ├── productos.js        → Catálogo público + CRUD admin
│   │   └── login.js            → Stub para Sprint 4
│   └── img/                    → Imágenes de productos
├── backend/
│   ├── server.js               → API Express: todas las rutas
│   ├── package.json
│   └── pnpm-lock.yaml
├── docs/                       → Documentación técnica del proyecto
│   ├── FRONTEND.md             → Cómo funciona el frontend
│   ├── BACKEND.md              → Cómo funciona el backend
│   ├── BASE_DE_DATOS.md        → Tablas, campos y SQL
│   └── ARQUITECTURA.md         → Conexiones, flujos y qué no tocar
├── PLAN_SPRINTS.md             → Spec y estado de tareas por sprint
├── AGENTS.md                   → Reglas para el agente de IA
└── README_TALLER_FULL_STACK_2026.md  → Este archivo
```

---

## Roles del equipo

Antes de empezar a codear, leer **PLAN_SPRINTS.md** para saber en qué sprint estamos y qué tareas están disponibles.

| Rol | Responsabilidad principal | Archivos de trabajo |
|---|---|---|
| **Frontend** | HTML, CSS, Bootstrap, UX | `frontend/*.html`, `frontend/css/`, `frontend/js/` |
| **Backend** | Rutas Express, lógica de negocio | `backend/server.js` |
| **Base de datos** | Esquema MySQL, queries | Scripts SQL en `PLAN_SPRINTS.md` |
| **DevOps / Deploy** | Vercel, Railway, variables de entorno | Paneles externos + `.env` |

> Un integrante puede tomar varios roles. Lo importante es no editar el mismo archivo que otra persona sin coordinarlo.

---

## Configuración local — paso a paso

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/) — instalar con: `npm install -g pnpm`
- MySQL 8 corriendo localmente (XAMPP, MySQL Workbench, o instalación directa)
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/TALLER_FULL_STACK_2026.git
cd TALLER_FULL_STACK_2026
```

### 2. Crear la base de datos

Conectate a MySQL y ejecutá:

```sql
CREATE DATABASE contactos_db;
USE contactos_db;

CREATE TABLE contactos (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(100),
  correo  VARCHAR(100),
  mensaje TEXT
);
```

> Sprint 3 agrega la tabla `productos` y Sprint 4 agrega `usuarios`. Los scripts completos están en `PLAN_SPRINTS.md`.

### 3. Instalar dependencias del backend

```bash
cd Taller_Full_Satck_2026/backend
pnpm install
```

### 4. Ajustar credenciales de MySQL

Abrí `backend/server.js` y editá el bloque de conexión con tus datos locales:

```js
const db = mysql.createConnection({
  host:     'localhost',
  user:     'root',       // ← tu usuario de MySQL
  password: 'root',       // ← tu contraseña
  database: 'contactos_db'
});
```

> **No commitees tu contraseña real.** A partir del Sprint 4 esto pasa a un archivo `.env`.

### 5. Iniciar el backend

```bash
node server.js
# Servidor en http://localhost:3000
# Conectado a MySQL
```

### 6. Iniciar el frontend

En otra terminal:

```bash
cd Taller_Full_Satck_2026/frontend
pnpm dlx serve . -p 5500
```

Abrí `http://localhost:5500/index.html` en el navegador.

**Alternativa:** si tenés la extensión **Live Server** en VS Code, abrí `index.html` y hacé click en "Open with Live Server".

---

## Variables de entorno (Sprint 4)

A partir del Sprint 4 el backend usa un archivo `.env` en `backend/`. **Este archivo nunca va a git.**

```env
# backend/.env  — crear manualmente, no commitear
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=contactos_db
JWT_SECRET=clave_secreta_larga_y_aleatoria
PORT=3000
FRONTEND_URL=https://mi-tienda.vercel.app
```

En Railway, estas mismas variables se cargan en el panel **Variables** del servicio.

---

## Comandos de referencia

```bash
# ── Backend ──────────────────────────────────────
cd Taller_Full_Satck_2026/backend
pnpm install          # instalar dependencias
node server.js        # iniciar servidor
pnpm start            # alias de node server.js

# ── Frontend ─────────────────────────────────────
cd Taller_Full_Satck_2026/frontend
pnpm dlx serve . -p 5500    # servidor estático en localhost:5500

# ── Git ──────────────────────────────────────────
git status                          # ver cambios
git add ruta/al/archivo.js          # agregar archivo específico
git commit -m "feat: descripción"   # commitear
git push origin nombre-de-rama      # subir rama
git pull origin main                # traer últimos cambios de main
```

---

## Flujo de trabajo Git

### Estructura de ramas

```
main          → producción — solo merge al cerrar un sprint completo
dev           → integración — rama base para el trabajo diario
feat/xxx      → una rama por tarea o sprint
```

### Paso a paso para contribuir

```bash
# 1. Actualizarse desde dev
git checkout dev
git pull origin dev

# 2. Crear rama de trabajo
git checkout -b feat/sprint-2-catalogo

# 3. Trabajar y commitear
git add frontend/productos.html frontend/js/productos.js
git commit -m "feat: catálogo con cards y filtro por categoría"

# 4. Subir y abrir Pull Request hacia dev
git push origin feat/sprint-2-catalogo
# → abrir PR en GitHub, asignar revisores
```

### Convención de commits

| Prefijo | Cuándo usarlo |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `style:` | Cambios de CSS/HTML sin lógica |
| `docs:` | Documentación |
| `chore:` | Dependencias, config, gitignore |

Ejemplos:
```
feat: sprint 2 — catálogo con filtro por categoría
fix: formulario de contacto no enviaba en Firefox
style: ajustar padding del hero en mobile
docs: agregar instrucciones de Railway al README
chore: agregar .env al .gitignore
```

### .gitignore mínimo

Crear `Taller_Full_Satck_2026/backend/.gitignore` antes del primer push:

```
node_modules/
.env
*.log
```

Y en la raíz del repo:

```
.DS_Store
Thumbs.db
```

---

## Despliegue

### Frontend → Vercel

1. Ir a [vercel.com](https://vercel.com) → iniciar sesión con GitHub.
2. **Add New Project** → importar el repositorio.
3. Configurar:
   - **Root Directory:** `Taller_Full_Satck_2026/frontend`
   - **Framework Preset:** Other (HTML estático, sin build)
4. Deploy. Vercel asigna una URL tipo `https://taller-full-stack-2026.vercel.app/`.

Cada push a `main` dispara un re-deploy automático.

### Backend + MySQL → Railway

1. Ir a [railway.app](https://railway.app) → iniciar sesión con GitHub.
2. **New Project → Deploy from GitHub repo** → seleccionar el repositorio.
3. Agregar un servicio **MySQL** — Railway lo provisiona y entrega las credenciales.
4. En el servicio Node.js:
   - **Root Directory:** `Taller_Full_Satck_2026/backend`
   - **Start command:** `node server.js`
5. En la pestaña **Variables**, cargar todas las del `.env` con los valores de producción.
6. Railway genera una URL pública (ej: `mi-api.railway.app`).

### Después del despliegue

- Actualizar las URLs de `fetch` en los JS del frontend para apuntar al dominio de Railway.
- Restringir CORS en `server.js` al dominio de Vercel:
  ```js
  app.use(cors({ origin: process.env.FRONTEND_URL }));
  ```
- Ejecutar los scripts SQL en la MySQL de Railway para crear las tablas.

---

## Buenas prácticas

### Código

- **pnpm siempre** — el `pnpm-lock.yaml` garantiza versiones idénticas en todas las máquinas.
- **No commitear credenciales** — ni contraseñas, ni tokens JWT. Siempre `.env` local + variables en Railway.
- **No commitear `node_modules/`** — el `.gitignore` debe existir desde el primer commit.
- **Un archivo JS por responsabilidad** — `script.js` solo maneja contacto; `login.js` solo login; `theme.js` solo el tema.
- **IDs de formulario no se renombran sin actualizar el JS** — `#formulario`, `#nombre`, `#correo`, `#mensaje` los usa `script.js` directamente.

### Colaboración

- **Siempre trabajar en ramas**, nunca directamente en `main` ni en `dev`.
- **Pull Request antes de mergear** — aunque sea un equipo pequeño; ayuda a detectar errores.
- **Leer PLAN_SPRINTS.md antes de empezar** — para no duplicar trabajo ni saltarse pasos.
- **Un sprint a la vez** — no avanzar al Sprint N+1 sin cerrar el Sprint N (verificación incluida).
- **Coordinarse antes de editar `server.js`** — es el archivo más compartido del backend; dos personas editándolo en paralelo genera conflictos de merge.
