# Guía 2. Catálogo de productos y CRUD de productos

**Autor:** Guillermo Bejarano Reyes  
**Proyecto:** Tienda online básica con HTML, CSS, JavaScript, Bootstrap, Node.js y MySQL  
**Programa:** Técnico en Programación de Software  
**Semanas:** 2 y 3 — Creación del catálogo de productos e implementación del CRUD

---

## 1. Propósito de la guía

Orientar al aprendiz en la creación de una página de catálogo de productos y en la implementación progresiva de un CRUD básico para administrar productos de una tienda online.

En esta guía se trabajarán los siguientes componentes:

1. `productos.html`
2. `admin-productos.html`
3. `productos.js`
4. Tabla `productos` en MySQL
5. Rutas backend para registrar, consultar, actualizar y eliminar productos

> El login, la autenticación básica, el despliegue y la documentación final se desarrollarán en la siguiente guía.

---

## 2. Herramientas de trabajo

| Herramienta | Uso |
|---|---|
| Visual Studio Code | Edición del proyecto |
| GitHub | Control y entrega del repositorio |
| Live Server | Ejecución del frontend |
| Bootstrap | Diseño visual responsive |
| Codex | Apoyo guiado para generación y ajuste de código |
| Node.js | Ejecución del backend |
| Express | Creación de rutas del servidor |
| MySQL | Almacenamiento de productos |
| MySQL Workbench | Administración de la base de datos |
| Navegador web | Pruebas de visualización |
| Postman o navegador | Prueba de rutas backend, si se requiere |

---

## 3. Repositorio base

Cada aprendiz debe continuar trabajando sobre el repositorio utilizado en la Guía 1.

El proyecto debe conservar los avances realizados en:

1. `index.html`
2. `ayuda.html`
3. `contacto.html`

> Antes de iniciar esta guía, el aprendiz debe verificar que el repositorio esté actualizado en GitHub.

---

## 4. Resultado esperado de la guía

Al finalizar esta guía, el aprendiz deberá contar con:

1. Página `productos.html` creada como catálogo visual de productos.
2. Página `admin-productos.html` creada para administrar productos.
3. Tabla `productos` creada en MySQL.
4. Backend actualizado con rutas para productos.
5. Archivo `productos.js` conectado al backend.
6. Funcionalidad para registrar productos.
7. Funcionalidad para listar productos.
8. Funcionalidad para editar productos.
9. Funcionalidad para eliminar productos.
10. Productos mostrados con imagen, nombre, descripción, precio, categoría y stock.
11. Repositorio actualizado en GitHub.
12. Evidencias de funcionamiento.

---

## 5. Organización esperada del proyecto

El aprendiz debe conservar y ampliar la estructura del proyecto de la siguiente forma:

```
frontend/
│
├── index.html
├── ayuda.html
├── contacto.html
├── productos.html
├── admin-productos.html
│
├── css/
│   └── estilos.css
│
├── js/
│   ├── script.js
│   └── productos.js
│
├── img/
└── video/

backend/
│
├── server.js
├── package.json
└── package-lock.json
```

> No se deben cambiar los nombres de carpetas ni eliminar archivos existentes.

---

## 6. Actividad 1. Revisar el estado del proyecto

### Instrucción

Antes de iniciar la creación del catálogo y el CRUD, el aprendiz debe verificar que el proyecto de la Guía 1 funciona correctamente.

Debe revisar:

1. Que `index.html` cargue correctamente.
2. Que `ayuda.html` cargue correctamente.
3. Que `contacto.html` conserve su estructura.
4. Que el menú navegue entre las páginas.
5. Que Bootstrap esté integrado.
6. Que el proyecto esté actualizado en GitHub.

---

## 7. Actividad 2. Crear la página `productos.html`

### Propósito

Crear una página de catálogo visual donde el usuario pueda observar los productos disponibles de la tienda online.

> En esta actividad todavía no se administran productos. La página funcionará como catálogo visual inicial.

### Elementos mínimos

La página `productos.html` debe incluir:

1. Estructura HTML5 correcta.
2. Bootstrap 5 mediante CDN.
3. Barra de navegación con enlaces a: Inicio, Productos, Ayuda y Contacto.
4. Título principal: **Catálogo de productos**.
5. Sección introductoria.
6. Tarjetas de productos usando Bootstrap.
7. Imagen del producto.
8. Nombre del producto.
9. Descripción breve.
10. Precio.
11. Categoría.
12. Botón visual (por ejemplo: Ver detalle, Consultar, Agregar).
13. Pie de página básico.

### Uso de imágenes

El aprendiz puede utilizar imágenes de tres maneras:

1. Imágenes guardadas en la carpeta `frontend/img/`.
2. Imágenes mediante URL externa.
3. Imágenes libres de bancos gratuitos, respetando derechos de uso.

Se recomienda que las imágenes sean sencillas y relacionadas con la tienda seleccionada.

**Ejemplo de ruta local:**
```html
<img src="img/producto1.jpg" class="card-img-top" alt="Producto 1">
```

**Ejemplo de imagen por URL:**
```html
<img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Imagen del producto">
```

---

## 8. Prompt sugerido para Codex: creación de `productos.html`

```
Actúa como asistente de programación para un aprendiz del SENA.
Estoy trabajando en una tienda online básica con HTML, CSS, JavaScript y Bootstrap.
Lee primero el archivo AGENTS.md y respeta sus instrucciones.
Crea el archivo frontend/productos.html para mostrar un catálogo visual de productos.

Reglas:
- No cambies la estructura del proyecto.
- No modifiques backend.
- No modifiques index.html.
- No modifiques ayuda.html.
- No modifiques contacto.html.
- No uses React, Angular ni Vue.
- Usa Bootstrap 5 mediante CDN.
- El diseño debe ser sencillo y adecuado para aprendices principiantes.
- Usa imágenes de ejemplo mediante URL o rutas locales en img/.
- No conectes todavía esta página con MySQL.
- Explica brevemente qué cambios realizaste.
- Indica cómo probar la página con Live Server.

La página productos.html debe incluir:
1. Estructura HTML5 correcta.
2. Barra de navegación con enlaces a Inicio, Productos, Ayuda y Contacto.
3. Título principal: Catálogo de productos.
4. Sección breve de presentación.
5. Mínimo seis tarjetas de productos con imagen, nombre, descripción, precio y categoría.
6. Botón visual en cada tarjeta.
7. Diseño responsive con Bootstrap.
8. Pie de página básico.
```

---

## 9. Actividad 3. Actualizar el menú de navegación

### Instrucción

Después de crear `productos.html`, el aprendiz debe actualizar el menú de navegación en las páginas:

1. `index.html`
2. `ayuda.html`
3. `contacto.html`
4. `productos.html`

El menú debe incluir:

1. Inicio
2. Productos
3. Ayuda
4. Contacto

### Resultado esperado

Desde cualquier página debe ser posible navegar hacia las demás páginas principales del sitio.

---

## 10. Prompt sugerido para Codex: actualizar navegación

```
Actúa como asistente de programación para un aprendiz del SENA.
Estoy trabajando en una tienda online básica con HTML, CSS, JavaScript y Bootstrap.
Lee primero el archivo AGENTS.md y respeta sus instrucciones.
Actualiza únicamente los menús de navegación de las páginas frontend/index.html,
frontend/ayuda.html, frontend/contacto.html y frontend/productos.html.

Reglas:
- No cambies el contenido principal de las páginas.
- No modifiques backend.
- No modifiques archivos CSS ni JavaScript.
- No uses React, Angular ni Vue.
- Mantén Bootstrap 5 mediante CDN.
- El menú debe tener enlaces hacia:
  Inicio: index.html
  Productos: productos.html
  Ayuda: ayuda.html
  Contacto: contacto.html
- Explica brevemente qué cambios realizaste.
- Indica cómo probar la navegación con Live Server.
```

---

## 11. Actividad 4. Crear la tabla `productos` en MySQL

### Propósito

Crear la estructura de almacenamiento para los productos de la tienda online.

### Instrucción

En MySQL Workbench, el aprendiz debe ejecutar el siguiente script:

```sql
USE contactos_db;

CREATE TABLE productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio      DECIMAL(10,2) NOT NULL,
  categoria   VARCHAR(100),
  stock       INT DEFAULT 0,
  imagen      VARCHAR(255)
);
```

### Campos de la tabla

| Campo | Descripción |
|---|---|
| `id` | Identificador único del producto |
| `nombre` | Nombre del producto |
| `descripcion` | Descripción breve |
| `precio` | Precio del producto |
| `categoria` | Categoría del producto |
| `stock` | Cantidad disponible |
| `imagen` | Ruta o URL de la imagen |

---

## 12. Actividad 5. Insertar productos de prueba

### Propósito

Verificar que la tabla `productos` funciona correctamente antes de conectarla con el backend.

### Script sugerido

```sql
INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen)
VALUES
  ('Camiseta básica', 'Camiseta cómoda para uso diario', 35000, 'Ropa', 10, 'img/camiseta.jpg'),
  ('Morral urbano', 'Morral práctico para estudio o trabajo', 85000, 'Accesorios', 5, 'img/morral.jpg'),
  ('Audífonos', 'Audífonos con buena calidad de sonido', 60000, 'Tecnología', 8, 'img/audifonos.jpg');
```

### Verificación

```sql
SELECT * FROM productos;
```

---

## 13. Actividad 6. Crear rutas backend para productos

### Propósito

Ampliar el backend actual para permitir operaciones CRUD sobre productos.

### Rutas mínimas requeridas

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/productos` | Listar productos |
| `POST` | `/productos` | Registrar producto |
| `PUT` | `/productos/:id` | Actualizar producto |
| `DELETE` | `/productos/:id` | Eliminar producto |

> **Importante:** El aprendiz debe modificar únicamente el archivo `backend/server.js`. No debe eliminar la ruta existente del formulario de contacto.

---

## 14. Prompt sugerido para Codex: rutas backend

```
Actúa como asistente de programación para un aprendiz del SENA.
Estoy trabajando en una tienda online básica con HTML, CSS, JavaScript, Bootstrap, Node.js,
Express y MySQL.
Lee primero el archivo AGENTS.md y respeta sus instrucciones.
Modifica únicamente el archivo backend/server.js para agregar rutas CRUD para la tabla productos.

Reglas:
- No elimines la conexión actual a MySQL.
- No elimines la ruta existente /guardar.
- No cambies el puerto 3000.
- No uses frameworks adicionales.
- Usa Express y mysql2.
- Mantén el código sencillo para aprendices principiantes.
- Valida que los campos obligatorios no lleguen vacíos.
- Explica brevemente qué cambios realizaste.
- Indica cómo probar las rutas.

Crea las siguientes rutas:
1. GET /productos para listar productos.
2. POST /productos para registrar productos.
3. PUT /productos/:id para actualizar productos.
4. DELETE /productos/:id para eliminar productos.

La tabla productos tiene los campos:
- id
- nombre
- descripcion
- precio
- categoria
- stock
- imagen
```

---

## 15. Actividad 7. Crear la página `admin-productos.html`

### Propósito

Crear una página administrativa para gestionar los productos de la tienda.

### Elementos mínimos

La página `admin-productos.html` debe incluir:

1. Estructura HTML5 correcta.
2. Bootstrap 5 mediante CDN.
3. Menú de navegación.
4. Título: **Administración de productos**.
5. Formulario para registrar productos.
6. Campos: Nombre, Descripción, Precio, Categoría, Stock, Imagen.
7. Botón para guardar.
8. Tabla para listar productos.
9. Botones para editar y eliminar.
10. Enlace al archivo `js/productos.js`.

---

## 16. Prompt sugerido para Codex: `admin-productos.html`

```
Actúa como asistente de programación para un aprendiz del SENA.
Estoy trabajando en una tienda online básica con HTML, CSS, JavaScript y Bootstrap.
Lee primero el archivo AGENTS.md y respeta sus instrucciones.
Crea el archivo frontend/admin-productos.html para administrar productos de una tienda online.

Reglas:
- No cambies la estructura del proyecto.
- No modifiques backend.
- No modifiques las otras páginas.
- No uses React, Angular ni Vue.
- Usa Bootstrap 5 mediante CDN.
- El diseño debe ser sencillo para aprendices principiantes.
- El formulario debe tener id="formProducto".
- La tabla debe tener id="tablaProductos".
- Debe enlazar el archivo js/productos.js.
- Explica brevemente qué cambios realizaste.
- Indica cómo probar la página con Live Server.

La página debe incluir:
1. Barra de navegación con enlaces a Inicio, Productos, Ayuda y Contacto.
2. Título: Administración de productos.
3. Formulario con los campos:
   - nombre
   - descripcion
   - precio
   - categoria
   - stock
   - imagen
4. Botón Guardar producto.
5. Tabla para mostrar productos.
6. Botones Editar y Eliminar en cada fila.
7. Pie de página básico.
```

---

## 17. Actividad 8. Crear el archivo `productos.js`

### Propósito

Conectar la página `admin-productos.html` con las rutas backend para realizar el CRUD.

### Funciones mínimas del archivo

El archivo `productos.js` debe permitir:

1. Capturar los datos del formulario.
2. Enviar productos al backend.
3. Listar productos en una tabla.
4. Cargar datos para editar.
5. Actualizar productos.
6. Eliminar productos.
7. Mostrar mensajes básicos al usuario.

**Archivo a crear:** `frontend/js/productos.js`

---

## 18. Prompt sugerido para Codex: `productos.js`

```
Actúa como asistente de programación para un aprendiz del SENA.
Estoy trabajando en una tienda online básica con HTML, CSS, JavaScript, Bootstrap, Node.js,
Express y MySQL.
Lee primero el archivo AGENTS.md y respeta sus instrucciones.
Crea el archivo frontend/js/productos.js para conectar admin-productos.html con el backend.

Reglas:
- No modifiques archivos HTML.
- No modifiques backend.
- No uses frameworks adicionales.
- Usa JavaScript básico y fetch.
- Usa la URL base http://localhost:3000.
- El código debe ser sencillo para aprendices principiantes.
- Debe funcionar con el formulario id="formProducto".
- Debe mostrar los productos en la tabla id="tablaProductos".
- Explica brevemente qué cambios realizaste.
- Indica cómo probarlo.

El archivo debe permitir:
1. Listar productos desde GET /productos.
2. Guardar productos con POST /productos.
3. Editar productos con PUT /productos/:id.
4. Eliminar productos con DELETE /productos/:id.
5. Limpiar el formulario después de guardar.
6. Mostrar mensajes en consola o en pantalla.

Recuerde ejecutar el node server.js del backend.
```

---

## 19. Actividad 9. Conectar el catálogo con productos visibles

### Propósito

Permitir que la página `productos.html` muestre productos de forma visual.

### Recomendación para esta guía

Para mantener el trabajo sencillo, se recomienda que `productos.html` conserve tarjetas visuales de ejemplo.

Si el grupo avanza rápido, se puede agregar una conexión básica con `GET /productos` para mostrar productos reales desde MySQL.

### Alcance mínimo

1. `productos.html` con tarjetas visuales.
2. `admin-productos.html` con CRUD conectado a MySQL.

### Alcance opcional

1. Cargar productos reales en `productos.html` usando `fetch`.
2. Mostrar los productos registrados en MySQL como tarjetas.

---

## 20. Prompt opcional para Codex: catálogo dinámico

```
Actúa como asistente de programación para un aprendiz del SENA.
Estoy trabajando en una tienda online básica con HTML, CSS, JavaScript, Bootstrap, Node.js,
Express y MySQL.
Lee primero el archivo AGENTS.md y respeta sus instrucciones.
Haz que frontend/productos.html pueda mostrar productos reales consultando GET
http://localhost:3000/productos.

Reglas:
- No modifiques backend.
- No modifiques admin-productos.html.
- No uses frameworks adicionales.
- Usa JavaScript básico y fetch.
- Usa tarjetas Bootstrap para mostrar los productos.
- Si no hay productos, muestra un mensaje indicando que no hay productos registrados.
- Mantén el diseño sencillo.
- Explica brevemente qué cambios realizaste.
- Indica cómo probarlo.

Cada producto debe mostrar:
- Imagen
- Nombre
- Descripción
- Precio
- Categoría
- Stock
```

---

## 21. Actividad 10. Pruebas mínimas

El aprendiz debe verificar:

| Prueba | Resultado esperado |
|---|---|
| Abrir `productos.html` | Carga el catálogo visual |
| Abrir `admin-productos.html` | Carga el panel de administración |
| Crear producto | El producto se guarda en MySQL |
| Listar productos | Los productos aparecen en la tabla |
| Editar producto | Los datos se actualizan correctamente |
| Eliminar producto | El producto desaparece de la tabla y de MySQL |
| Consultar MySQL | Los datos coinciden con lo registrado |
| Menú | Navega correctamente entre páginas |
| Imágenes | Se visualizan en las tarjetas o tabla |
| Responsive | La página se adapta a diferentes pantallas |

### Manejo de imágenes locales

Para la visualización del catálogo de productos, el aprendiz deberá utilizar imágenes locales almacenadas en la carpeta `frontend/img/`. Para esta actividad se trabajará con cuatro imágenes correspondientes a los productos: Camiseta básica, Morral urbano, Audífonos y Teclado.

Cada imagen debe copiarse dentro de la carpeta `img/` con nombres simples, en minúscula, sin espacios ni caracteres especiales. Por ejemplo: `camiseta.png`, `morral.png`, `audifonos.png` y `teclado.png`.

En la base de datos, el campo `imagen` no debe guardar la imagen directamente, sino la ruta relativa del archivo. Por ejemplo: `img/camiseta.png`.

Se recomienda que las imágenes tengan una proporción aproximada de 600 x 400 px, formato `.png` o `.jpg`, y un peso liviano para facilitar la carga del sitio.

Después de copiar las imágenes, el aprendiz debe verificar que se visualicen correctamente en `productos.html` y que las rutas registradas en MySQL coincidan exactamente con los nombres de los archivos guardados en la carpeta `img/`.

---

## Recomendación sobre el menú principal

Se recomienda **no dejar `admin-productos.html` visible en el menú principal**.

| Página | ¿Debe ir en el menú principal? | Justificación |
|---|---|---|
| `index.html` | Sí | Es la página de inicio de la tienda |
| `productos.html` | Sí | Es el catálogo público |
| `ayuda.html` | Sí | Es información para el usuario |
| `contacto.html` | Sí | Es contacto público |
| `admin-productos.html` | No inicialmente | Es una página administrativa |

---

## Actualizar el repositorio en GitHub y Readme

Al finalizar todas las actividades, el aprendiz debe:

1. Hacer commit de todos los archivos nuevos y modificados.
2. Subir los cambios al repositorio en GitHub.
3. Actualizar el archivo `README.md` con una descripción de los avances de la Guía 2.
