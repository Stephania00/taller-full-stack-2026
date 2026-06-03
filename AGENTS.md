# AGENTS.md — Instrucciones para el agente de IA

Este archivo guía a Claude Code (u otro agente de IA) para ejecutar los sprints del proyecto de forma autónoma y ordenada. Antes de comenzar cualquier sprint, leer `PLAN_SPRINTS.md` para entender el objetivo y los entregables esperados.

---

## Reglas spec-driven

### 1. El spec manda, no el agente
`PLAN_SPRINTS.md` es el contrato. Si algo no está escrito en él, no se implementa. Está prohibido agregar funcionalidades, abstracciones, validaciones extra o "mejoras obvias" que no aparezcan en un checkbox del sprint activo.

### 2. Ambigüedad = parar y preguntar
Si una tarea del spec puede interpretarse de dos formas distintas, el agente no elige — pregunta al usuario antes de escribir una línea de código.

### 3. Todo código traza a un checkbox
Cada cambio en el código debe poder señalar exactamente a qué tarea del `PLAN_SPRINTS.md` corresponde. Si no hay un checkbox que lo justifique, el cambio no se hace.

### 4. Si la realidad contradice el spec, se actualiza el spec primero
Si durante la implementación se descubre que algo del spec es técnicamente inviable o incorrecto, se documenta el ajuste en `PLAN_SPRINTS.md` antes de cambiar el código.

### 5. Done = funciona, no = escrito
Una tarea está completa solo cuando pasa su sección de verificación. El código que existe pero no pasa la verificación no cuenta como hecho.

### 6. No refactorizar entre sprints
El código de un sprint cerrado no se toca durante el siguiente a menos que el spec lo indique explícitamente.

### 7. Un commit por sprint cerrado
No se hacen commits parciales ni WIP. El commit ocurre únicamente cuando el checklist de cierre del sprint está completo al 100 %.  
Formato: `feat: sprint N — <descripción breve>`.

### 8. Siempre pnpm
Usar pnpm para instalar dependencias, nunca npm ni yarn.

---

## Sprint 1 — Interfaz Base y Navegación

### Contexto
Transformar las tres páginas HTML existentes (`index.html`, `ayuda.html`, `contacto.html`) en vistas con apariencia de tienda online usando Bootstrap 5.

### Pasos de ejecución

1. Agregar el CDN de Bootstrap 5 en el `<head>` de los tres archivos HTML:
   ```html
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
   ```
   Y antes del cierre de `</body>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
   ```

2. Extraer el navbar en un bloque común y replicarlo en los tres archivos. Marcar el link activo con `class="nav-link active"` según la página actual.

3. Rediseñar `index.html`: sección hero con imagen de fondo o jumbotron, sección de destacados (3 columnas con cards).

4. Rediseñar `ayuda.html`: componente Accordion de Bootstrap con al menos 4 preguntas frecuentes.

5. Rediseñar `contacto.html`: mantener el formulario funcional con el backend, aplicar clases de Bootstrap al form.

6. Conservar `css/estilos.css` solo para estilos que no pueda cubrir Bootstrap (colores de marca, fuentes).

### Verificación
- Abrir los tres archivos en el navegador y navegar entre ellos.
- Redimensionar la ventana y confirmar que el diseño es responsive.
- Llenar el formulario de contacto y confirmar que el backend lo recibe (el backend debe estar corriendo).

---

## Sprint 2 — Catálogo de Visualización

### Contexto
Crear `productos.html` con una cuadrícula de tarjetas renderizadas desde datos simulados en JavaScript. No hay conexión al backend todavía.

### Pasos de ejecución

1. Crear `frontend/productos.html` con estructura Bootstrap (navbar, sección principal, footer).
2. Agregar el link a `productos.html` en el navbar de **todos** los archivos HTML.
3. Crear `frontend/js/productos.js` con un array de al menos 6 objetos:
   ```js
   const productos = [
     { id: 1, nombre: "Producto A", categoria: "Electrónica", precio: 150000, imagen: "https://via.placeholder.com/300x200" },
     // ...
   ];
   ```
4. Renderizar las tarjetas dinámicamente con `innerHTML` sobre un contenedor `<div id="catalogo">`.
5. Incluir filtro por categoría (botones o `<select>`) que filtre el array y vuelva a renderizar.

### Verificación
- Abrir `productos.html` y confirmar que se muestran todas las tarjetas.
- Usar el filtro y confirmar que filtra correctamente.
- No debe haber errores en la consola del navegador.

---

## Sprint 3 — Gestión de Productos (CRUD)

### Contexto
Crear la tabla `productos` en MySQL, agregar las 5 rutas REST al backend y construir el panel de administración.

### Pasos de ejecución

1. Ejecutar en MySQL:
   ```sql
   CREATE TABLE productos (
     id          INT AUTO_INCREMENT PRIMARY KEY,
     nombre      VARCHAR(150)   NOT NULL,
     descripcion TEXT,
     categoria   VARCHAR(100),
     precio      DECIMAL(10,2)  NOT NULL,
     imagen_url  VARCHAR(255),
     creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. Agregar las rutas al `backend/server.js` en este orden:
   - `GET /productos` — `SELECT * FROM productos`
   - `GET /productos/:id` — `SELECT * FROM productos WHERE id = ?`
   - `POST /productos` — `INSERT INTO productos (...) VALUES (...)`
   - `PUT /productos/:id` — `UPDATE productos SET ... WHERE id = ?`
   - `DELETE /productos/:id` — `DELETE FROM productos WHERE id = ?`

3. Probar las 5 rutas con Thunder Client o Postman antes de tocar el frontend.

4. Crear `frontend/admin-productos.html`:
   - Tabla Bootstrap que lista productos desde `GET /productos`.
   - Botón "Nuevo producto" que abre un modal con el formulario de creación.
   - Botón "Editar" por fila que rellena el mismo modal con los datos del producto.
   - Botón "Eliminar" por fila con `confirm()` antes de ejecutar el `DELETE`.

5. Crear `frontend/js/admin-productos.js` con las funciones `listar()`, `crear()`, `editar()`, `eliminar()` usando `fetch`.

6. Actualizar `frontend/js/productos.js` para consumir `GET /productos` en lugar del array simulado.

### Verificación
- Crear un producto desde el panel admin y confirmar que aparece en `productos.html`.
- Editar y eliminar un producto y confirmar los cambios en la base de datos con `SELECT * FROM productos`.
- No debe haber errores en consola ni en la terminal del backend.

---

## Sprint 4 — Seguridad, QA y Despliegue

### Contexto
Agregar autenticación JWT, proteger las rutas admin, hacer QA del sistema completo y desplegar.

### Pasos de ejecución

#### Autenticación

1. Instalar dependencias:
   ```bash
   cd backend
   pnpm add bcryptjs jsonwebtoken
   ```

2. Ejecutar en MySQL:
   ```sql
   CREATE TABLE usuarios (
     id       INT AUTO_INCREMENT PRIMARY KEY,
     email    VARCHAR(150) UNIQUE NOT NULL,
     password VARCHAR(255)        NOT NULL
   );
   ```

3. Agregar rutas:
   - `POST /register` — recibe `{email, password}`, hashea con bcrypt y guarda.
   - `POST /login` — valida email/password y devuelve un JWT firmado con `JWT_SECRET`.

4. Crear middleware `verificarToken(req, res, next)` que lea el header `Authorization: Bearer <token>` y lo valide.

5. Proteger `POST /productos`, `PUT /productos/:id` y `DELETE /productos/:id` con ese middleware.

6. Crear `frontend/login.html` — formulario que llama a `POST /login`, guarda el token en `localStorage` y redirige a `admin-productos.html`.

7. En `admin-productos.js`, leer el token de `localStorage` y enviarlo en el header de cada `fetch` a rutas protegidas. Si no hay token, redirigir a `login.html`.

#### Variables de entorno

1. Crear `backend/.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=contactos_db
   JWT_SECRET=cambia_esto_por_algo_seguro
   PORT=3000
   ```

2. Instalar dotenv:
   ```bash
   pnpm add dotenv
   ```

3. Al inicio de `server.js` agregar `require('dotenv').config()` y reemplazar todos los valores hardcodeados por `process.env.VARIABLE`.

4. Agregar `.env` al `.gitignore` si no está ya.

#### Restricción de CORS para producción

Cuando se conozca el dominio de Vercel, reemplazar en `server.js`:
```js
// Antes:
app.use(cors());

// Después:
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
```
Y agregar `FRONTEND_URL=https://mi-proyecto.vercel.app` al `.env` de producción en Railway.

#### QA

- Probar el flujo completo: registro → login → CRUD de productos → formulario de contacto.
- Intentar acceder a `admin-productos.html` sin token y confirmar que redirige a login.
- Intentar llamar a `DELETE /productos/1` sin token desde Thunder Client y confirmar que retorna 401.

#### Despliegue

1. Hacer push del repositorio a GitHub (sin `node_modules` ni `.env`).
2. Conectar el repositorio a **Vercel** para el frontend (carpeta raíz: `frontend/`).
3. Crear proyecto en **Railway**:
   - Agregar el servicio de MySQL y copiar las credenciales.
   - Agregar el servicio Node.js apuntando a la carpeta `backend/`.
   - Configurar las variables de entorno en Railway con los valores reales.
4. Actualizar las URLs de `fetch` en el frontend al dominio de Railway.
5. Hacer push final y verificar el despliegue en producción.

### Verificación final
- Abrir la URL de Vercel en el navegador.
- Completar el flujo completo desde producción (no desde local).
- Confirmar que los datos persisten en la base de datos de Railway.

---

## Checklist de cierre de sprint

Antes de marcar un sprint como completo, verificar:

- [ ] Todas las tareas del sprint en `PLAN_SPRINTS.md` están marcadas.
- [ ] El proyecto levanta en local sin errores.
- [ ] No hay errores en la consola del navegador ni en la terminal del backend.
- [ ] Se hizo commit con el mensaje `feat: sprint N — <descripción>`.
- [ ] El código no contiene credenciales hardcodeadas (a partir del Sprint 4).
