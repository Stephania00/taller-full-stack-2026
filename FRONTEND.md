# Frontend — Documentación técnica

Stack: **HTML5 + Bootstrap 5.3 + Bootstrap Icons + CSS custom properties**. Sin framework, sin build step — todo corre directamente en el navegador.

---

## Estructura de archivos

```
frontend/
├── index.html          → Inicio: hero, categorías, productos destacados, promo, newsletter
├── ayuda.html          → Centro de ayuda: buscador, tiles de categoría, FAQ con acordeón, tarjeta de soporte
├── contacto.html       → Formulario conectado al backend + datos de contacto
├── login.html          → Login (mockup listo para conectar — Sprint 4)
├── css/
│   ├── theme.css       → Sistema de diseño completo (tokens, modo oscuro, componentes propios)
│   └── estilos.css     → Stub vacío (reservado para overrides futuros)
└── js/
    ├── script.js       → Lógica del formulario de contacto (fetch al backend)
    ├── theme.js        → Toggle dark/light persistente + marcado automático de link activo
    └── login.js        → Stub preparado para Sprint 4 (autenticación JWT)
```

---

## Dependencias (CDN)

Todas vienen por CDN con hash de integridad SRI para verificar que el archivo no fue alterado.

| Librería | Versión | Para qué |
|---|---|---|
| Bootstrap CSS | 5.3.3 | Grid, componentes, utilidades, modo oscuro nativo |
| Bootstrap Icons | 1.11.3 | Iconografía SVG inline vía `<i class="bi bi-...">` |
| Bootstrap JS bundle | 5.3.3 | Navbar colapsable, Accordion, Dropdowns |
| Google Fonts | — | Space Grotesk (títulos) + Manrope (cuerpo) |

No hay `node_modules` en el frontend. No hay proceso de build.

---

## Sistema de diseño (`theme.css`)

### Tokens de color

```css
--tn-primary:        #4f46e5   /* índigo — botones, links, acento */
--tn-primary-hover:  #4338ca
--tn-violet:         #7c3aed   /* violeta — gradientes, detalles */
```

Estos valores se aplican sobre las variables de Bootstrap (`--bs-primary`, `--bs-link-color`, etc.) para que todo el sistema de colores de Bootstrap use la paleta de marca automáticamente.

### Modo claro / oscuro

Bootstrap 5.3 soporta temas vía atributo `data-bs-theme="light|dark"` en `<html>`. El `theme.css` define los tokens para cada modo:

```css
[data-bs-theme="light"] { --tn-surface: #ffffff; --bs-body-bg: #f6f7fb; ... }
[data-bs-theme="dark"]  { --tn-surface: #171a2b; --bs-body-bg: #0e0f1a; ... }
```

### Componentes propios

| Clase | Descripción |
|---|---|
| `.brand-mark` | Logo cuadrado con gradiente índigo→violeta |
| `.hero` | Sección hero con gradiente radial de fondo |
| `.hero-eyebrow` | Pastilla de texto destacado |
| `.chip` | Etiqueta de categoría/filtro |
| `.cat-tile` / `.cat-icon` | Tiles de categoría con icono |
| `.product-card` | Tarjeta de producto con precio y badge |
| `.promo` | Banner CTA con gradiente |
| `.trust-item` | Ítem de barra de confianza (ícono + texto) |
| `.ph .ph-1-1 / .ph-4-3 / .ph-16-9` | Placeholders de imagen con relación de aspecto |
| `.pay-chip` | Pastilla de medio de pago (footer) |
| `.auth-aside` / `.auth-card` | Layout dividido de login |
| `.btn-soft` | Botón suave (fondo índigo claro) |

---

## `theme.js` — Cómo funciona

Se carga en `<head>` **sin `defer`** para aplicar el tema antes de que el navegador pinte la página y evitar el parpadeo blanco→oscuro.

```
1. Lee localStorage('tn-theme')
   ↓ no hay nada
2. Lee prefers-color-scheme del sistema operativo
   ↓
3. Aplica data-bs-theme al <html>
   ↓
4. DOMContentLoaded:
   - Registra click en [data-theme-toggle] para alternar y guardar
   - Lee location.pathname para marcar el .nav-link activo automáticamente
```

El marcado automático del link activo significa que no hay clases `active` hardcodeadas en el HTML — `theme.js` las aplica según la URL. Eso evita olvidarse de actualizar la clase al copiar el navbar entre páginas.

---

## `script.js` — Formulario de contacto

Se conecta al backend Express en `http://localhost:3000/guardar`.

```
submit en #formulario
  ↓
Validación local: nombre, correo y mensaje no vacíos
  ↓ falla → muestra error en #respuesta, no envía
  ↓ pasa
fetch POST /guardar con JSON { nombre, correo, mensaje }
  ↓ ok  → "Datos guardados en MySQL correctamente" en #respuesta + reset()
  ↓ err → "Error al guardar los datos" en #respuesta
```

Los IDs que `script.js` requiere en `contacto.html`:

| ID | Elemento |
|---|---|
| `#formulario` | `<form>` |
| `#nombre` | Input de nombre |
| `#correo` | Input de email |
| `#mensaje` | Textarea |
| `#respuesta` | `<span>` donde aparece el resultado |

---

## `login.js` — Mockup listo para Sprint 4

El archivo existe como stub. En Sprint 4 se conectará a `POST /login` del backend, recibirá un JWT y lo guardará en `localStorage`. Ver comentarios en `js/login.js`.

---

## Buenas prácticas aplicadas ✅

- **SRI (Subresource Integrity):** los CDN llevan atributo `integrity="sha384-..."` — el navegador rechaza el archivo si fue modificado.
- **Tokens CSS centralizados:** todos los colores y sombras viven en `theme.css`. Cambiar `--tn-primary` actualiza botones, links, acordeones y focus rings en una sola línea.
- **Modo oscuro sin parpadeo:** `theme.js` carga síncrono en `<head>` para aplicar el tema antes del primer paint.
- **Link activo automático:** ninguna página hardcodea `class="active"` — `theme.js` lo resuelve por URL. Copiar el navbar entre páginas no genera bugs.
- **Validación antes de fetch:** `script.js` valida campos vacíos localmente antes de hacer la petición HTTP.
- **`novalidate` + JS validation:** se desactiva la validación nativa del navegador (inconsistente entre navegadores) y se controla desde JS.
- **CORS en el backend:** permite que el frontend en cualquier puerto (`5500`, `5501`, etc.) llame a `localhost:3000` sin bloqueos.

---

## Oportunidades de mejora ⚠️

- **Navbar y footer repetidos en cada HTML:** la misma estructura de navbar está copiada en los cuatro archivos. Si cambia un link hay que editarlos todos. La solución sería migrar a un framework con componentes (React, Vue, Astro) o usar un servidor que soporte includes (Nunjucks, EJS). Por ahora es aceptable para un proyecto estático sin build.
- **Checkbox "acepto" no validado por script.js:** el formulario de contacto tiene un checkbox de privacidad que `script.js` no verifica antes de enviar. En producción debería validarse.
- **Credenciales hardcodeadas en server.js:** se resuelve en Sprint 4 con `dotenv` y variables de entorno.
- **Placeholders de imagen:** todas las imágenes son `.ph` (divs rayados). Se reemplazan por `<img>` reales cuando haya assets definitivos.
- **Sin manejo de estado del carrito:** el contador `3` en el navbar es estático. Se conecta en un sprint futuro.
