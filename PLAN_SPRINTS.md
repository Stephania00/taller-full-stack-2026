# Plan de Sprints — Taller Full Stack 2026

## Separar el proyecto del repositorio original

El código base actual proviene de un repositorio del instructor. Antes de iniciar los sprints hay que tener un repo propio para poder hacer push libremente.

### Opción A — Fork en GitHub (recomendado si el repo original es público)

1. Ir al repositorio original en GitHub y hacer clic en **Fork**.
2. Clonar tu fork localmente:
   ```bash
   git clone https://github.com/TU_USUARIO/TALLER_FULL_STACK_2026.git
   cd TALLER_FULL_STACK_2026
   ```
3. Verificar que el remote apunta a tu fork:
   ```bash
   git remote -v
   # origin → https://github.com/TU_USUARIO/...
   ```

### Opción B — Nuevo repositorio limpio (si prefieres partir de cero)

1. Crear un repositorio nuevo en GitHub (sin README, sin .gitignore).
2. Dentro de la carpeta del proyecto:
   ```bash
   git init
   git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git
   git add .
   git commit -m "chore: setup inicial del proyecto"
   git push -u origin main
   ```

> En ambos casos asegúrate de que `node_modules/` esté en `.gitignore` antes del primer push.

---

## Stack de despliegue objetivo

| Capa | Servicio | Notas |
|------|----------|-------|
| Frontend | Vercel | HTML/CSS/JS estático |
| Backend | Railway o Render | Express persistente |
| Base de datos | Railway (MySQL) | Incluido en el plan gratuito |

---

## Cómo levantar el proyecto en local

### 1. Iniciar el backend

```bash
cd Taller_Full_Satck_2026/backend
pnpm install
node server.js
# → Servidor en http://localhost:3000
```

### 2. Abrir el frontend

Abre cualquier archivo HTML directamente en el navegador (`Ctrl+O`) o con Live Server en VS Code.  
El frontend hace `fetch` a `http://localhost:3000` — como el backend tiene `cors()` habilitado, el navegador lo permite sin importar el puerto del frontend.

### Por qué se mantiene CORS

En producción el frontend vive en Vercel (`https://mi-proyecto.vercel.app`) y el backend en Railway (`https://mi-backend.railway.app`). Son orígenes distintos, por lo que el navegador exige el header `Access-Control-Allow-Origin`.

Cuando se llegue al Sprint 4 (despliegue), restringir CORS al dominio real de Vercel:

```js
// server.js — reemplazar app.use(cors()) por:
app.use(cors({ origin: "https://mi-proyecto.vercel.app" }));
```

En local se puede dejar abierto (`cors()` sin opciones) o apuntarlo también a `http://localhost:5500`.

---

## Sprint 1 — Interfaz Base y Navegación

**Objetivo:** Sitio base con apariencia de tienda online y navegación funcional entre páginas estáticas.

### Tareas

- [x] Agregar Bootstrap 5 vía CDN en los tres archivos HTML existentes
- [x] Rediseñar `index.html` como página de inicio de tienda (hero, secciones, navbar)
- [x] Rediseñar `ayuda.html` con acordeón de preguntas frecuentes
- [x] Rediseñar `contacto.html` manteniendo el formulario funcional con el backend
- [x] Unificar la barra de navegación en los tres archivos (navbar Bootstrap con links activos)
- [x] Ajustar `css/estilos.css` para estilos propios que complementen Bootstrap
- [ ] Verificar navegación completa entre las tres páginas en local — **pendiente: abrir en navegador y probar formulario con backend corriendo**

### Tareas adicionales completadas

- [x] Integrar diseño de alta fidelidad desde maqueta `tienda nube/` (Bootstrap Icons, tema índigo/violeta, dark mode)
- [x] Crear `css/theme.css` y `js/theme.js` (sistema de diseño + toggle dark/light + link activo automático)
- [x] Crear `login.html` — mockup visual listo para conectar al backend en Sprint 4
- [x] Crear `js/login.js` — stub documentado con los TODO de Sprint 4
- [x] Crear `FRONTEND.md` — documentación técnica del frontend (arquitectura, componentes, buenas prácticas)
- [x] Crear `README_TALLER_FULL_STACK_2026.md` — guía de arquitectura, roles, setup y despliegue para el equipo

### Entregable

Tres páginas HTML con Bootstrap integrado, navegación funcional y apariencia de tienda online abierta localmente desde el navegador.

---

## Sprint 2 — Catálogo de Visualización

**Objetivo:** Vista del catálogo con tarjetas de productos (datos simulados/mockup).

### Tareas

- [ ] Crear `frontend/productos.html`
- [ ] Agregar la nueva página al navbar en todos los archivos HTML
- [ ] Construir cuadrícula con Bootstrap Cards (imagen, nombre, categoría, precio)
- [ ] Crear `frontend/js/productos.js` — renderizar tarjetas desde un array de objetos JS (mockup)
- [ ] Incluir al menos 3 categorías y 6 productos simulados
- [ ] Estilizar hover y responsive (mobile-first con grid de Bootstrap)

### Entregable

Página `productos.html` mostrando tarjetas de productos con datos simulados, sin conexión al backend todavía.

---

## Sprint 3 — Gestión de Productos (CRUD)

**Objetivo:** Módulo administrativo con operaciones completas sobre la base de datos.

### Base de datos — nueva tabla

```sql
CREATE TABLE productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(150)   NOT NULL,
  descripcion TEXT,
  categoria   VARCHAR(100),
  precio      DECIMAL(10,2)  NOT NULL,
  imagen_url  VARCHAR(255),
  creado_en   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);
```

### Tareas — Backend (`server.js`)

- [ ] `GET    /productos`       — listar todos los productos
- [ ] `GET    /productos/:id`   — obtener uno por ID
- [ ] `POST   /productos`       — crear producto
- [ ] `PUT    /productos/:id`   — editar producto
- [ ] `DELETE /productos/:id`   — eliminar producto

### Tareas — Frontend

- [ ] Crear `frontend/admin-productos.html` con tabla de productos y botones de acción
- [ ] Crear `frontend/js/admin-productos.js` — consumir todas las rutas CRUD con `fetch`
- [ ] Conectar `productos.html` al endpoint `GET /productos` (reemplazar el mockup del Sprint 2)
- [ ] Formulario de creación/edición en modal Bootstrap
- [ ] Confirmación antes de eliminar (`confirm()` o modal)

### Entregable

Panel admin en `admin-productos.html` que permite crear, ver, editar y eliminar productos en MySQL. La página `productos.html` muestra datos reales.

---

## Sprint 4 — Seguridad, QA y Despliegue

**Objetivo:** Login funcional, pruebas documentadas y proyecto desplegado.

### Base de datos — tabla de usuarios

```sql
CREATE TABLE usuarios (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  email    VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255)        NOT NULL
);
```

### Tareas — Autenticación

- [ ] Instalar `bcryptjs` y `jsonwebtoken` en el backend
- [ ] `POST /register` — registrar usuario (hash de contraseña con bcrypt)
- [ ] `POST /login`    — validar credenciales y devolver JWT
- [ ] Middleware `verificarToken` que proteja las rutas del admin (`/productos` POST/PUT/DELETE)
- [ ] Crear `frontend/login.html` con formulario que guarda el token en `localStorage`
- [ ] Redirigir a `login.html` si no hay token al intentar acceder a `admin-productos.html`

### Tareas — QA

- [ ] Probar cada ruta del backend con Thunder Client o Postman y adjuntar capturas
- [ ] Probar flujo completo: registro → login → crear producto → editar → eliminar
- [ ] Probar formulario de contacto (`contacto.html`) end-to-end

### Tareas — Despliegue

- [ ] Crear repositorio en GitHub y hacer push del proyecto (sin `node_modules`)
- [ ] Conectar el repositorio a Vercel para el frontend
- [ ] Crear proyecto en Railway, conectar MySQL y configurar variables de entorno:
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`
- [ ] Actualizar `server.js` para leer credenciales desde `process.env` en lugar de valores hardcodeados
- [ ] Restringir CORS al dominio real de Vercel
- [ ] Actualizar las URLs de `fetch` en todos los JS del frontend al dominio de Railway
- [ ] Verificar despliegue completo en producción

### Tareas — Documentación

- [ ] Actualizar `README_TALLER_FULL_STACK_2026.md` con arquitectura final, variables de entorno y pasos de despliegue
- [ ] Agregar evidencias de prueba (capturas o video demostrativo)

### Entregable

Repositorio en GitHub con el proyecto funcional, CORS restringido al dominio de producción, credenciales por variables de entorno y documentación actualizada.
