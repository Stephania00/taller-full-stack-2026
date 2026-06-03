# Arquitectura del proyecto — Tienda Nube Full Stack

Este documento explica cómo está construido el proyecto, qué hace cada archivo, qué llama a qué y cuáles son las partes que **no se deben modificar** sin entender el impacto.

---

## Mapa general de archivos

```
Taller_Full_Satck_2026/
│
├── frontend/                   ← Lo que ve el usuario en el navegador
│   ├── index.html              ← Página de inicio de la tienda
│   ├── ayuda.html              ← Centro de ayuda / FAQ
│   ├── contacto.html           ← Formulario de contacto → backend
│   ├── productos.html          ← Catálogo público de productos
│   ├── admin-productos.html    ← Panel admin: crear/editar/eliminar productos
│   ├── login.html              ← Login (mockup — se activa en Sprint 4)
│   │
│   ├── css/
│   │   ├── theme.css           ← Sistema de diseño completo (colores, dark mode, componentes)
│   │   └── estilos.css         ← Overrides locales adicionales (casi vacío)
│   │
│   ├── js/
│   │   ├── theme.js            ← Toggle dark/light + marca el link activo del navbar
│   │   ├── script.js           ← Maneja el formulario de contacto → fetch al backend
│   │   ├── productos.js        ← Maneja catálogo (mockup) y CRUD del admin
│   │   └── login.js            ← Stub vacío — se implementa en Sprint 4
│   │
│   └── img/
│       └── .gitkeep            ← Carpeta reservada para imágenes de productos
│
└── backend/
    ├── server.js               ← Todo el servidor: conexión MySQL + todas las rutas API
    ├── package.json            ← Dependencias: express, mysql2, cors
    └── pnpm-lock.yaml          ← Versiones exactas de dependencias (no editar a mano)
```

---

## Diagrama de conexiones

```
NAVEGADOR
    │
    ├── carga ──► index.html
    │                │
    │                ├── <link> ──────────────────► css/theme.css      (estilos)
    │                ├── <script> ─────────────────► js/theme.js       (dark mode + nav activo)
    │                └── <script> ─────────────────► js/script.js      (solo actúa en contacto.html)
    │
    ├── carga ──► contacto.html
    │                │
    │                └── js/script.js
    │                        │
    │                        └── fetch POST ────────► localhost:3000/guardar
    │                                                        │
    │                                                   server.js
    │                                                        │
    │                                                   INSERT INTO contactos
    │                                                        │
    │                                                      MySQL
    │
    ├── carga ──► productos.html
    │                │
    │                └── js/productos.js
    │                        │
    │                        ├── (Sprint 2) array mockup — sin backend
    │                        └── (Sprint 3) fetch GET ──► localhost:3000/productos
    │                                                            │
    │                                                       server.js
    │                                                            │
    │                                                    SELECT * FROM productos
    │
    └── carga ──► admin-productos.html
                     │
                     └── js/productos.js
                             │
                             ├── fetch GET    ──► /productos       (listar)
                             ├── fetch POST   ──► /productos       (crear)
                             ├── fetch PUT    ──► /productos/:id   (editar)
                             └── fetch DELETE ──► /productos/:id   (eliminar)
                                                        │
                                                   server.js
                                                        │
                                                 INSERT / SELECT /
                                                 UPDATE / DELETE
                                                        │
                                                      MySQL
                                                  tabla productos
```

---

## Qué hace cada archivo

### `frontend/index.html`
Página principal de la tienda. Contiene: navbar, hero, barra de confianza, categorías, grid de productos destacados (generado por JS inline), banner promo, sección "por qué nosotros", newsletter y footer.

No se conecta al backend. Los productos destacados son datos mockup dentro de un `<script>` inline en la misma página.

---

### `frontend/ayuda.html`
Centro de ayuda. Contiene: navbar, hero con buscador (decorativo), tiles de categorías, acordeón Bootstrap con preguntas frecuentes, tarjeta lateral de soporte y footer.

No se conecta al backend.

---

### `frontend/contacto.html`
Formulario de contacto. **Es la única página del frontend que se comunica con el backend en los primeros sprints.**

#### IDs que NO se deben cambiar — los usa `script.js`

| ID | Elemento | Qué hace script.js con él |
|---|---|---|
| `formulario` | `<form>` | Le agrega el listener de `submit` |
| `nombre` | `<input>` | Lee su `.value` para enviar al backend |
| `correo` | `<input type="email">` | Lee su `.value` para enviar al backend |
| `mensaje` | `<textarea>` | Lee su `.value` para enviar al backend |
| `respuesta` | `<span>` | Escribe el mensaje de éxito o error |

> ⚠️ Si renombrás cualquiera de estos IDs, el formulario deja de funcionar silenciosamente — no hay error visible, simplemente no envía.

---

### `frontend/productos.html`
Catálogo público. Muestra las tarjetas de productos para que el usuario las vea.

- **Sprint 2:** renderiza un array mockup definido en `productos.js`
- **Sprint 3:** consume `GET /productos` del backend y muestra datos reales de MySQL

Los campos que muestra cada tarjeta: imagen, nombre, descripción, precio, categoría, stock.

---

### `frontend/admin-productos.html`
Panel de administración. Solo para uso interno — **no aparece en el navbar público**.

Contiene un formulario para crear/editar productos y una tabla con todos los productos registrados en MySQL.

#### IDs que NO se deben cambiar — los usa `productos.js`

| ID | Elemento | Para qué |
|---|---|---|
| `formProducto` | `<form>` | `productos.js` captura su `submit` y lee sus campos |
| `tablaProductos` | `<tbody>` | `productos.js` inyecta las filas de productos aquí |

---

### `frontend/login.html`
Página de login. **Mockup visual en Sprint 1 — no funcional todavía.**

En Sprint 4 se conecta al backend (`POST /login`), recibe un JWT y lo guarda en `localStorage`.

#### IDs preparados para Sprint 4

| ID | Elemento | Para qué |
|---|---|---|
| `loginForm` | `<form>` | `login.js` captura su `submit` |
| `email` | `<input type="email">` | Se envía a `POST /login` |
| `password` | `<input type="password">` | Se envía a `POST /login` |
| `loginError` | `<p>` | Muestra errores del backend |

---

### `frontend/css/theme.css`
Sistema de diseño completo. Define todos los tokens de color, tipografía, modo oscuro, componentes propios (`.hero`, `.cat-tile`, `.product-card`, `.promo`, `.auth-aside`, etc.) y overrides de Bootstrap.

**No se deben tocar los tokens de `:root`** (`--tn-primary`, `--tn-violet`, etc.) a menos que se quiera cambiar toda la paleta de la tienda.

---

### `frontend/js/theme.js`
Se carga en `<head>` (sin `defer`, a propósito) para aplicar el tema oscuro/claro **antes del primer render** y evitar el parpadeo blanco.

Hace tres cosas:
1. Lee `localStorage('tn-theme')` y aplica el tema al cargar
2. Escucha el botón `[data-theme-toggle]` para alternar y guardar el tema
3. Lee la URL actual (`location.pathname`) y agrega `class="active"` al link del navbar que corresponde a la página actual

> ⚠️ No agregar `defer` a este script. Rompe el anti-parpadeo.

---

### `frontend/js/script.js`
Maneja el formulario de contacto. Se incluye en `contacto.html` e `index.html` (en index no hace nada porque no hay `#formulario`).

Flujo:
```
1. Busca document.getElementById("formulario")
2. Si existe, agrega listener de submit
3. Al submit: valida que nombre, correo y mensaje no estén vacíos
4. Si pasan la validación: fetch POST a http://localhost:3000/guardar
5. Éxito → escribe en #respuesta + reset del form
6. Error → escribe error en #respuesta
```

**No modificar** la URL `http://localhost:3000/guardar` hasta Sprint 4 (cuando se reemplaza por la URL de Railway).

---

### `frontend/js/productos.js`
Tiene dos responsabilidades:

**En `productos.html`:**
- Sprint 2: define un array de productos mockup y renderiza tarjetas Bootstrap con `innerHTML`
- Sprint 3: reemplaza el array por `fetch GET /productos` y renderiza los datos reales

**En `admin-productos.html`:**
- Sprint 3: captura el formulario `#formProducto`, llama a POST/PUT según si es creación o edición
- Inyecta filas en `#tablaProductos` con botones Editar y Eliminar
- Al click en Editar: carga los datos en el formulario y cambia el modo a "actualizar"
- Al click en Eliminar: pide `confirm()` y llama a DELETE

---

### `frontend/js/login.js`
Stub vacío por ahora. En Sprint 4 implementará:
1. Capturar submit de `#loginForm`
2. `fetch POST /login` con `{ email, password }`
3. Guardar el token JWT en `localStorage('tn-token')`
4. Redirigir a `admin-productos.html`
5. Si no hay token en `admin-productos.html`, redirigir a `login.html`

---

### `backend/server.js`
Todo el servidor en un solo archivo. Estructura:

```
1. Importar express, mysql2, cors
2. Crear app Express
3. Activar cors() y express.json()
4. Crear conexión MySQL (createConnection)
5. Conectar a MySQL (db.connect)
6. Definir rutas:
   GET  /                    → health check
   POST /guardar             → guardar contacto en MySQL
   GET  /productos           → listar productos (Sprint 3)
   POST /productos           → crear producto  (Sprint 3)
   PUT  /productos/:id       → editar producto (Sprint 3)
   DELETE /productos/:id     → eliminar producto (Sprint 3)
   POST /register            → registrar usuario (Sprint 4)
   POST /login               → autenticar y devolver JWT (Sprint 4)
7. app.listen(3000)
```

#### Partes que NO se deben eliminar ni renombrar

| Elemento | Por qué |
|---|---|
| `app.use(cors())` | Sin esto el navegador bloquea todos los fetch del frontend |
| `app.use(express.json())` | Sin esto `req.body` llega `undefined` en POST/PUT |
| `POST /guardar` | Lo usa `script.js` del formulario de contacto |
| Puerto `3000` | Está hardcodeado en `script.js` y `productos.js` (hasta Sprint 4) |
| Variable `db` | La usan todas las rutas |

---

## Base de datos MySQL

### Tabla `contactos`
Recibe los envíos del formulario de contacto.

```sql
CREATE TABLE contactos (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(100),
  correo  VARCHAR(100),
  mensaje TEXT
);
```

### Tabla `productos` (Sprint 3)
Almacena los productos de la tienda.

```sql
CREATE TABLE productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100)  NOT NULL,
  descripcion TEXT,
  precio      DECIMAL(10,2) NOT NULL,
  categoria   VARCHAR(100),
  stock       INT           DEFAULT 0,
  imagen      VARCHAR(255)
);
```

> ⚠️ El campo se llama `imagen` (no `imagen_url`). Si se crea con el nombre incorrecto, el backend no encontrará el campo y fallará silenciosamente.

### Tabla `usuarios` (Sprint 4)
Almacena los usuarios del panel admin.

```sql
CREATE TABLE usuarios (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  email    VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255)        NOT NULL
);
```

---

## Flujos completos

### Flujo 1 — Envío del formulario de contacto

```
Usuario llena nombre + correo + mensaje en contacto.html
        ↓
click en "Enviar mensaje"
        ↓
script.js intercepta el submit (event.preventDefault)
        ↓
Valida que los 3 campos no estén vacíos
        ↓ (si pasan)
fetch POST http://localhost:3000/guardar
  body: { nombre, correo, mensaje }
        ↓
server.js recibe en req.body
        ↓
Valida que no vengan vacíos
        ↓
INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)
        ↓
MySQL guarda el registro
        ↓
server.js responde: "Datos guardados correctamente"
        ↓
script.js escribe en #respuesta: "Datos guardados en MySQL correctamente"
script.js hace formulario.reset()
```

---

### Flujo 2 — Ver catálogo de productos (Sprint 3)

```
Usuario abre productos.html
        ↓
productos.js ejecuta al cargar: fetch GET http://localhost:3000/productos
        ↓
server.js: SELECT * FROM productos
        ↓
MySQL devuelve array de productos en JSON
        ↓
server.js: res.json(resultados)
        ↓
productos.js recibe el array
        ↓
Genera HTML de tarjetas Bootstrap con innerHTML
        ↓
Usuario ve las tarjetas en pantalla
```

---

### Flujo 3 — Crear un producto desde el admin (Sprint 3)

```
Admin llena el formulario en admin-productos.html
        ↓
click en "Guardar producto"
        ↓
productos.js captura submit de #formProducto
        ↓
Lee los valores: nombre, descripcion, precio, categoria, stock, imagen
        ↓
fetch POST http://localhost:3000/productos
  body: { nombre, descripcion, precio, categoria, stock, imagen }
        ↓
server.js valida con campoVacio() que no lleguen vacíos
        ↓
INSERT INTO productos (...) VALUES (?, ?, ?, ?, ?, ?)
        ↓
MySQL guarda el producto
        ↓
server.js responde: { mensaje: "Producto registrado correctamente", id: X }
        ↓
productos.js limpia el formulario y vuelve a ejecutar listarProductos()
        ↓
La tabla #tablaProductos se actualiza con el nuevo producto
```

---

### Flujo 4 — Login con JWT (Sprint 4)

```
Admin ingresa email + password en login.html
        ↓
login.js: fetch POST http://localhost:3000/login
  body: { email, password }
        ↓
server.js busca el usuario en MySQL por email
        ↓
bcrypt.compare(password, hash_guardado)
        ↓ (si coincide)
jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '8h' })
        ↓
server.js responde: { token: "eyJ..." }
        ↓
login.js guarda en localStorage('tn-token')
        ↓
login.js redirige a admin-productos.html
        ↓
admin-productos.html carga → productos.js lee localStorage('tn-token')
        ↓ (si no hay token)
window.location.href = 'login.html'
        ↓ (si hay token)
Agrega header: Authorization: Bearer <token>
en cada fetch a rutas protegidas (POST/PUT/DELETE /productos)
```

---

## Resumen de lo que nunca se toca sin leer esto primero

| Archivo / elemento | Por qué es sensible |
|---|---|
| IDs del formulario de contacto (`formulario`, `nombre`, `correo`, `mensaje`, `respuesta`) | `script.js` los lee directamente por ID |
| IDs del admin (`formProducto`, `tablaProductos`) | `productos.js` los lee directamente por ID |
| IDs del login (`loginForm`, `email`, `password`, `loginError`) | `login.js` los leerá en Sprint 4 |
| `app.use(cors())` en `server.js` | Eliminar esto bloquea todos los fetch del frontend |
| `app.use(express.json())` en `server.js` | Sin esto, `req.body` es `undefined` |
| `POST /guardar` en `server.js` | Lo usa el formulario de contacto |
| Puerto `3000` en `server.js` | Hardcodeado en los JS del frontend hasta Sprint 4 |
| Nombre del campo `imagen` en la tabla MySQL | El backend y el frontend usan exactamente ese nombre |
| `<script src="js/theme.js">` sin `defer` | Si se agrega `defer`, el tema parpadea al cargar |
