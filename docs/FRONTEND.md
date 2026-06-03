# Frontend — Documentación técnica

Stack: **HTML5 + Bootstrap 5.3 + Bootstrap Icons + CSS custom properties**.  
Sin framework, sin proceso de build — todo corre directamente en el navegador.

---

## ¿Qué es el frontend?

El frontend es todo lo que el usuario ve y con lo que interactúa en el navegador: páginas, botones, formularios, tarjetas de productos. **No guarda datos por sí solo** — cuando necesita guardar o consultar información, le habla al backend a través de `fetch()`.

---

## Estructura de archivos

```
frontend/
├── index.html              → Página de inicio: hero, categorías, productos destacados
├── ayuda.html              → Centro de ayuda con acordeón de preguntas frecuentes
├── contacto.html           → Formulario de contacto conectado al backend
├── productos.html          → Catálogo público de productos (datos reales de MySQL)
├── admin-productos.html    → Panel de administración: crear, editar y eliminar productos
├── login.html              → Login (mockup — se activa en Sprint 4)
│
├── css/
│   ├── theme.css           → Sistema de diseño: colores, tipografía, dark mode, componentes
│   └── estilos.css         → Estilos adicionales pequeños (filtro activo del catálogo)
│
├── js/
│   ├── theme.js            → Toggle dark/light + marca el link activo del navbar
│   ├── script.js           → Maneja el formulario de contacto → fetch al backend
│   ├── productos.js        → Catálogo público + panel CRUD del admin
│   └── login.js            → Stub vacío para Sprint 4 (autenticación JWT)
│
└── img/
    └── .gitkeep            → Carpeta para imágenes de productos
```

---

## Dependencias (CDN)

Todas vienen por internet mediante CDN. El proyecto **requiere conexión a internet** para cargar Bootstrap, los iconos y las fuentes.

| Librería | Versión | Para qué se usa |
|---|---|---|
| Bootstrap CSS | 5.3.3 | Grid responsive, navbar, cards, tabla, acordeón, badges |
| Bootstrap Icons | 1.11.3 | Íconos en botones, navbar y tarjetas (`<i class="bi bi-...">`) |
| Bootstrap JS | 5.3.3 | Navbar colapsable en mobile, acordeón de ayuda, dropdowns |
| Google Fonts | — | Tipografías: Space Grotesk (títulos) y Manrope (texto) |

> Si no hay internet, las páginas cargan sin estilos ni iconos. Para uso offline habría que descargar esas librerías.

---

## Cómo se cargan los archivos en cada página

Cada página HTML tiene este orden en el `<head>`:

```html
<link href="bootstrap.min.css" ...>       <!-- 1. Estilos de Bootstrap -->
<link href="bootstrap-icons.min.css" ...> <!-- 2. Íconos -->
<link href="css/theme.css" ...>           <!-- 3. Estilos propios de la tienda -->
<link href="css/estilos.css" ...>         <!-- 4. Ajustes pequeños -->
<script src="js/theme.js"></script>       <!-- 5. Tema ANTES del body (evita parpadeo) -->
```

Y al final del `<body>`:

```html
<script src="bootstrap.bundle.min.js" ...> <!-- Bootstrap JS -->
<script src="js/script.js"></script>       <!-- Solo en pages con formulario de contacto -->
<script src="js/productos.js"></script>    <!-- Solo en productos.html y admin-productos.html -->
```

---

## Páginas y qué hace cada una

### `index.html` — Inicio
La página principal de la tienda. Contiene secciones de marketing: hero, barra de confianza, categorías, productos destacados, banner de oferta, por qué elegirnos y newsletter.

Los productos destacados son generados por un pequeño script `<script>` inline al final de la página (array de 8 productos hardcodeados). **No se conecta al backend** — es solo visual.

---

### `ayuda.html` — Centro de ayuda
Página informativa con un acordeón de Bootstrap que contiene 6 preguntas frecuentes y una tarjeta lateral con información de contacto de soporte.

**No se conecta al backend.**

---

### `contacto.html` — Formulario de contacto
La única página del frontend que se comunica con el backend **en los primeros sprints**.

El formulario tiene campos de nombre, apellido, correo, teléfono, asunto y mensaje. El archivo `script.js` solo lee los tres campos obligatorios para el backend: `#nombre`, `#correo` y `#mensaje`.

#### IDs que NO se deben cambiar

| ID | Elemento | Por qué es importante |
|---|---|---|
| `formulario` | `<form>` | `script.js` busca este ID para agregar el listener de submit |
| `nombre` | `<input>` | `script.js` lee su valor para enviarlo al backend |
| `correo` | `<input type="email">` | Igual que nombre |
| `mensaje` | `<textarea>` | Igual que nombre |
| `respuesta` | `<span>` | `script.js` escribe aquí el mensaje de éxito o error |

> ⚠️ Si renombrás uno de estos IDs el formulario deja de funcionar sin mostrar ningún error visible. Es uno de los errores más difíciles de detectar para principiantes.

---

### `productos.html` — Catálogo público
Muestra las tarjetas de todos los productos registrados en MySQL.

Al cargar la página, `productos.js` hace una petición `GET /productos` al backend y renderiza las tarjetas con `innerHTML`. Si el backend no está corriendo, muestra un mensaje de error en lugar de las tarjetas.

Tiene un sistema de filtros por categoría generado automáticamente desde las categorías que existan en la base de datos.

#### IDs que usa `productos.js`

| ID | Elemento | Para qué |
|---|---|---|
| `catalogo` | `<div>` | Aquí se inyectan las tarjetas de productos |
| `filtros` | `<div>` | Aquí se inyectan los botones de categoría |
| `contador` | `<p>` | Muestra cuántos productos hay en la categoría activa |

---

### `admin-productos.html` — Panel de administración
Página de uso interno para gestionar el inventario. **No aparece en el navbar público.**

Tiene dos zonas:
- **Formulario** (izquierda): para crear o editar un producto
- **Tabla** (derecha): lista todos los productos con botones de acción

#### IDs que usa `productos.js`

| ID | Elemento | Para qué |
|---|---|---|
| `formProducto` | `<form>` | `productos.js` captura su submit para crear/editar |
| `productoId` | `<input hidden>` | Guarda el ID cuando se está editando (vacío = modo crear) |
| `pNombre` | `<input>` | Campo nombre del formulario |
| `pDescripcion` | `<textarea>` | Campo descripción |
| `pPrecio` | `<input type="number">` | Campo precio |
| `pCategoria` | `<select>` | Campo categoría |
| `pStock` | `<input type="number">` | Campo stock |
| `pImagen` | `<input>` | Campo imagen (ruta o URL) |
| `tablaProductos` | `<tbody>` | `productos.js` inyecta las filas aquí |
| `mensajeForm` | `<p>` | Muestra mensajes de éxito o error |
| `formTitulo` | `<h2>` | Cambia entre "Nuevo producto" y "Editar producto" |
| `btnGuardar` | `<button type="submit">` | Cambia su texto según el modo |
| `btnCancelar` | `<button>` | Aparece solo en modo edición, limpia el formulario |

---

### `login.html` — Login (mockup)
Página visual lista pero sin lógica real todavía. El formulario tiene los campos y el botón, pero al hacer click no pasa nada (salvo que `login.js` esté implementado en Sprint 4).

#### IDs preparados para Sprint 4

| ID | Elemento | Lo que hará en Sprint 4 |
|---|---|---|
| `loginForm` | `<form>` | `login.js` capturará el submit |
| `email` | `<input type="email">` | Se enviará a `POST /login` |
| `password` | `<input type="password">` | Se enviará a `POST /login` |
| `loginError` | `<p>` | Mostrará el error del backend si las credenciales son incorrectas |

---

## `theme.css` — Sistema de diseño

Es el archivo CSS más importante del proyecto. Define la identidad visual completa de la tienda.

### Variables de color (tokens)

```css
--tn-primary:  #4f46e5   /* índigo — color principal: botones, links, bordes activos */
--tn-violet:   #7c3aed   /* violeta — gradientes y acentos decorativos */
```

Estos valores están conectados a las variables internas de Bootstrap. Cambiar `--tn-primary` automáticamente cambia el color de todos los botones primarios, links, focus rings y bordes activos de todo el sitio.

### Modo claro y modo oscuro

Bootstrap 5.3 tiene un sistema nativo de temas. Funciona con el atributo `data-bs-theme` en la etiqueta `<html>`:

```html
<html data-bs-theme="light">  <!-- modo claro -->
<html data-bs-theme="dark">   <!-- modo oscuro -->
```

`theme.css` define colores diferentes para cada modo:

```css
[data-bs-theme="light"] { --tn-surface: #ffffff;  --bs-body-bg: #f6f7fb; }
[data-bs-theme="dark"]  { --tn-surface: #171a2b;  --bs-body-bg: #0e0f1a; }
```

El usuario puede cambiar el modo con el botón de luna/sol en el navbar. El cambio se guarda en `localStorage` y persiste entre visitas.

### Clases de componentes propios

| Clase | Descripción |
|---|---|
| `.brand-mark` | Cuadrado con gradiente índigo→violeta (logo de la tienda) |
| `.hero` | Fondo con gradiente radial suave para la sección principal |
| `.hero-eyebrow` | Pastilla de texto pequeño sobre el título del hero |
| `.chip` | Etiqueta tipo pastilla para filtros y categorías |
| `.chip-activo` | Estado activo del chip (fondo índigo, texto blanco) |
| `.cat-tile` | Tile de categoría con icono y texto centrado |
| `.cat-icon` | Icono circular con fondo índigo suave |
| `.product-card` | Tarjeta de producto con estilos de precio y placeholders |
| `.ph / .ph-1-1 / .ph-4-3 / .ph-16-9` | Placeholder de imagen con patrón rayado y relación de aspecto |
| `.promo` | Banner con degradado índigo→violeta para ofertas |
| `.trust-item` | Ítem de la barra de confianza (ícono + texto) |
| `.btn-soft` | Botón con fondo suave (índigo claro) |
| `.auth-aside / .auth-card` | Layout dividido para las páginas de login y registro |
| `.tn-nav` | Navbar con efecto de cristal (blur + transparencia) |
| `.tn-footer` | Footer con borde superior y colores propios |

> ⚠️ **No modificar los tokens de `:root`** a menos que quieras cambiar toda la paleta de la tienda. Un solo cambio en `--tn-primary` afecta cientos de elementos en todas las páginas.

---

## `theme.js` — Cómo funciona

Se carga en el `<head>` **sin el atributo `defer`**, a propósito. Si tuviera `defer`, el navegador lo ejecutaría después de renderizar el HTML y el usuario vería un parpadeo blanco antes de que se aplique el tema oscuro.

```
1. Se ejecuta inmediatamente al cargar el <head>
2. Lee localStorage('tn-theme') — ¿el usuario ya eligió un tema?
   → Si sí: aplica ese tema
   → Si no: lee prefers-color-scheme del sistema operativo
3. Aplica data-bs-theme="light" o "dark" al <html>

4. Cuando el DOM termina de cargar (DOMContentLoaded):
   a. Registra el click en el botón [data-theme-toggle] del navbar
      → Al hacer click: alterna el tema y lo guarda en localStorage
   b. Lee la URL actual (location.pathname)
      → Busca el nav-link que apunte a esa página
      → Le agrega class="active" automáticamente
```

El marcado automático del link activo es muy útil: como el navbar está copiado en todas las páginas, no hay que acordarse de qué página tiene el `active`. El JS lo resuelve solo según la URL.

---

## `script.js` — Formulario de contacto

```
El usuario llena nombre + correo + mensaje y hace click en "Enviar"
        ↓
script.js intercepta el submit con event.preventDefault()
        ↓
Valida que ninguno de los 3 campos esté vacío
        ↓ (si alguno está vacío)
Escribe un error en #respuesta y para
        ↓ (si están completos)
fetch POST http://localhost:3000/guardar
  Envía: { nombre, correo, mensaje } en formato JSON
        ↓ (respuesta exitosa)
Escribe "Datos guardados en MySQL correctamente" en #respuesta
Limpia el formulario con formulario.reset()
        ↓ (si hay error de red o el backend no responde)
Escribe "Error al guardar los datos" en #respuesta
```

---

## `productos.js` — Catálogo y CRUD

Este archivo tiene una responsabilidad dual: maneja tanto el catálogo público como el panel admin. Al cargarse detecta automáticamente en cuál de las dos páginas está:

```js
// Al terminar de cargar el HTML:
if (document.getElementById('catalogo')) {
  // Estamos en productos.html → iniciar catálogo
}
if (document.getElementById('formProducto')) {
  // Estamos en admin-productos.html → iniciar admin
}
```

### En `productos.html` (catálogo)

```
Página carga
    ↓
fetch GET http://localhost:3000/productos
    ↓ (respuesta exitosa)
Recibe array de productos desde MySQL
    ↓
initFiltros(): genera botones de categoría a partir de los datos reales
renderCatalogo(): genera tarjetas con innerHTML
    ↓ (si el backend no responde)
Muestra mensaje de error con ícono
```

### En `admin-productos.html` (CRUD)

```
Página carga → listarProductos() → muestra todos en #tablaProductos

Click "Guardar producto" (formulario vacío de ID)
    → guardarProducto() → fetch POST /productos → vuelve a listar

Click "Editar" en una fila
    → cargarEdicion() → rellena el formulario + pone el ID en #productoId
    → el formulario pasa a modo edición
    Click "Actualizar producto"
    → guardarProducto() detecta que hay ID → fetch PUT /productos/:id → vuelve a listar

Click "Eliminar" en una fila
    → confirm() pregunta al usuario
    → Si acepta: fetch DELETE /productos/:id → vuelve a listar
```

### `API_URL` — la variable más importante para Sprint 4

```js
const API_URL = 'http://localhost:3000';
```

Esta constante está al inicio de `productos.js`. Todas las llamadas `fetch` la usan. En Sprint 4, cuando el backend esté desplegado en Railway, solo hay que cambiar **esta línea** y todo el frontend apunta automáticamente a producción.

---

## `login.js` — Stub para Sprint 4

El archivo existe pero está casi vacío. Tiene un listener que captura el submit del formulario pero no hace nada todavía. En Sprint 4 se implementará:

1. `fetch POST /login` con `{ email, password }`
2. Si el servidor responde con un token JWT → guardarlo en `localStorage('tn-token')`
3. Redirigir a `admin-productos.html`
4. En `admin-productos.html` al cargar: verificar si hay token → si no hay, redirigir a `login.html`

---

## Buenas prácticas aplicadas ✅

- **SRI en los CDN:** cada `<link>` y `<script>` de CDN tiene `integrity="sha384-..."`. El navegador verifica que el archivo no fue alterado antes de ejecutarlo.
- **Tokens CSS centralizados:** cambiar `--tn-primary` actualiza todo el sitio en una línea.
- **Dark mode sin parpadeo:** `theme.js` corre síncrono en `<head>`, antes del primer render.
- **Link activo automático:** `theme.js` evita que haya que hardcodear `class="active"` en cada página.
- **`novalidate` + validación JS:** se desactiva la validación nativa del navegador (que es inconsistente entre Chrome, Firefox y Safari) y se controla todo desde JS.
- **`API_URL` centralizada:** cambiar la URL del backend es una sola línea en `productos.js`.
- **Detección de página en `productos.js`:** un solo archivo JS sirve para dos páginas distintas sin duplicar código.

---

## Oportunidades de mejora ⚠️

- **Navbar y footer copiados en cada HTML:** si cambia un link, hay que editarlo en todos los archivos. Solución futura: migrar a un framework con componentes (React, Vue, Astro).
- **`admin-productos.html` accesible por URL directa:** cualquiera que sepa la URL puede entrar. Se protege en Sprint 4 con verificación de token JWT.
- **Imágenes son placeholders:** las tarjetas muestran un div rayado en lugar de foto real. Se reemplazan agregando archivos en `frontend/img/` y actualizando el campo `imagen` en la base de datos.
- **El carrito muestra siempre "3":** el contador del navbar es estático. Se conecta en un sprint futuro.
- **Credenciales hardcodeadas en `server.js`:** se pasan a variables de entorno en Sprint 4.
