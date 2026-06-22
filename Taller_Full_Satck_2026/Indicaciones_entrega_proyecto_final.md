# Indicaciones para la entrega del proyecto final
## Tienda virtual personalizada con frontend, backend y base de datos

**Programa:** Técnico en Programación de Software  
**Proyecto:** Tienda online básica con HTML, CSS, JavaScript, Bootstrap, Node.js y MySQL

---

## Propósito del entregable final

El producto final debe evidenciar el desarrollo completo de una tienda virtual personalizada, construida a partir de las estrategias desarrolladas en clase. Cada grupo deberá adaptar el proyecto a una empresa o idea de negocio propia, incorporar productos, ejecutar sus funcionalidades y explicar el flujo de información entre frontend, backend y base de datos.

---

## 1. Entregables obligatorios

| Entregable | Descripción |
|---|---|
| Repositorio GitHub | Enlace del repositorio con el proyecto completo, organizado, funcional y actualizado. |
| README.md | Documento con descripción del proyecto, integrantes, tecnologías, instalación, ejecución, pruebas y enlace del video. |
| Video de sustentación | Video con duración mínima de 7 minutos y máxima de 10 minutos. |
| Tienda virtual personalizada | Proyecto adaptado a una empresa o idea de negocio definida por el grupo. |

---

## 2. Requisitos mínimos del proyecto

| Componente | Requisito mínimo |
|---|---|
| Frontend | Debe incluir páginas principales: `index.html`, `productos.html`, `ayuda.html`, `contacto.html`, `login.html` y `admin-productos.html`. |
| Diseño visual | Debe usar Bootstrap y presentar una identidad visual coherente con la tienda elegida. |
| Catálogo de productos | Debe mostrar productos con nombre, descripción, precio, categoría, stock e imagen. |
| CRUD de productos | Debe permitir crear, consultar, actualizar y eliminar productos. |
| Backend | Debe incluir servidor desarrollado con Node.js y Express. |
| Base de datos | Debe usar MySQL con tablas para productos y usuarios. |
| Login administrativo | Debe validar el acceso al panel administrativo. |
| Protección del panel | No debe permitir el ingreso directo a `admin-productos.html` sin iniciar sesión. |
| Repositorio | Debe estar actualizado en GitHub y conservar una estructura clara de carpetas. |

---

## 3. Personalización de la tienda virtual

Cada grupo debe seleccionar una empresa, emprendimiento o idea de negocio. La tienda no debe quedar genérica. Debe personalizarse con:

1. Nombre de la tienda.
2. Logo o identidad visual, si aplica.
3. Colores y estilo visual.
4. Categorías de productos.
5. Productos relacionados con la empresa elegida.
6. Imágenes de productos.
7. Textos de presentación, ayuda y contacto.
8. Información simulada de atención al cliente.

| Tipo de tienda | Productos posibles |
|---|---|
| Tienda tecnológica | Portátiles, audífonos, teclados, mouse, memorias USB. |
| Tienda de ropa | Camisetas, pantalones, chaquetas, gorras. |
| Tienda deportiva | Balones, raquetas, zapatos, accesorios. |
| Papelería virtual | Cuadernos, lápices, carpetas, morrales. |
| Tienda de alimentos | Snacks, bebidas, productos saludables. |

---

## 4. Estructura mínima sugerida del repositorio

```
nombre-del-proyecto/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── productos.html
│   ├── ayuda.html
│   ├── contacto.html
│   ├── login.html
│   ├── admin-productos.html
│   ├── css/
│   │   └── estilos.css
│   ├── js/
│   │   ├── script.js
│   │   ├── productos.js
│   │   ├── login.js
│   │   └── auth.js
│   └── img/
│
├── database/
│   └── script_base_datos.sql
├── .gitignore
└── README.md
```

---

## 5. Contenido mínimo del README.md

1. Nombre de la tienda virtual.
2. Integrantes del grupo.
3. Descripción de la tienda.
4. Objetivo del proyecto.
5. Tecnologías utilizadas.
6. Estructura del proyecto.
7. Instrucciones de instalación y ejecución.
8. Funcionalidades implementadas.
9. Flujo de información.
10. Pruebas realizadas.
11. Enlace del video de sustentación.

---

## 6. Guía para el video de sustentación

**Duración obligatoria: mínimo 7 minutos y máximo 10 minutos.**

| Tiempo aproximado | Contenido que debe presentar el grupo |
|---|---|
| 0:00 – 0:40 | Presentación de los integrantes del grupo. |
| 0:40 – 1:20 | Nombre de la tienda virtual elegida y descripción breve de la empresa. |
| 1:20 – 2:00 | Presentación general del repositorio GitHub y estructura del proyecto. |
| 2:00 – 3:00 | Explicación del frontend: páginas, navegación, diseño y personalización visual. |
| 3:00 – 4:20 | Presentación del catálogo de productos y personalización de productos. |
| 4:20 – 5:40 | Ejecución del CRUD: crear, consultar, actualizar y eliminar productos. |
| 5:40 – 6:40 | Explicación del backend: `server.js`, rutas principales y conexión con MySQL. |
| 6:40 – 7:40 | Explicación de la base de datos: tablas, campos y registros almacenados. |
| 7:40 – 8:40 | Explicación del login, protección del panel administrativo y cierre de sesión. |
| 8:40 – 10:00 | Conclusiones: aprendizajes, dificultades y verificación final del funcionamiento. |

---

## 7. Aspectos obligatorios que deben verse en el video

### A. Presentación general
- Nombre completo de los integrantes.
- Ficha y programa de formación.
- Nombre de la tienda virtual.
- Tipo de empresa o negocio seleccionado.
- Productos que ofrece la tienda.

### B. Repositorio GitHub
- Enlace del repositorio.
- Estructura de carpetas.
- Archivos principales del frontend.
- Archivos JavaScript.
- Archivo `server.js`.
- Archivo `README.md`.

### C. Ejecución del proyecto
- Visual Studio Code abierto.
- Backend ejecutándose con `node server.js`.
- Frontend ejecutado con Live Server.
- MySQL activo.
- Navegación entre las páginas principales.

### D. Funcionalidades del frontend
- Página principal personalizada.
- Página de productos.
- Página de ayuda.
- Página de contacto.
- Página de login.
- Panel de administración de productos.

### E. Funcionalidades técnicas
- Crear producto.
- Consultar o listar productos.
- Editar producto.
- Eliminar producto.
- Verificar los cambios en MySQL.
- Iniciar sesión.
- Cerrar sesión.
- Intentar ingresar al panel administrativo sin login y mostrar la redirección.

---

## 8. Flujo de información que debe explicarse

```
Usuario
  ↓
Frontend (HTML, CSS, Bootstrap)
  ↓
JavaScript
  ↓
Fetch API
  ↓
Backend (Node.js + Express)
  ↓
Base de datos (MySQL)
  ↓
Respuesta al frontend
  ↓
Resultado visible para el usuario
```

---

## 9. Guion breve sugerido para el video

**Inicio:**
> Somos el grupo conformado por ________. Nuestro proyecto corresponde a una tienda virtual llamada ________, orientada a la venta de ________.

**Presentación de la tienda:**
> La tienda fue personalizada con nombre, colores, productos e información relacionada con la empresa seleccionada. En el catálogo se presentan productos como ________, ________ y ________.

**Repositorio:**
> En GitHub se encuentra el repositorio del proyecto. La estructura está organizada en una carpeta frontend, donde están las páginas HTML, los archivos CSS, JavaScript e imágenes; y una carpeta backend, donde se encuentra `server.js` y la configuración de Node.js.

**Frontend:**
> El frontend permite la navegación entre las páginas principales: inicio, productos, ayuda, contacto, login y administración de productos. El diseño utiliza Bootstrap para organizar la interfaz y facilitar la visualización en diferentes dispositivos.

**Backend:**
> El backend está desarrollado con Node.js y Express. En `server.js` se encuentran las rutas que permiten gestionar productos, validar el login y conectar con la base de datos MySQL.

**Base de datos:**
> La base de datos contiene las tablas `productos` y `usuarios`. La tabla `productos` almacena nombre, descripción, precio, categoría, stock e imagen. La tabla `usuarios` permite validar el acceso administrativo.

**Funcionalidad:**
> A continuación se demuestra el CRUD de productos. Primero se registra un producto, luego se consulta, posteriormente se edita y finalmente se elimina. También se verifica el cambio en MySQL.

**Login:**
> El sistema cuenta con login administrativo. Cuando las credenciales son correctas, se permite el ingreso al panel de administración. Si no existe sesión activa, el sistema redirige al usuario hacia `login.html`.

**Cierre:**
> Como conclusión, el proyecto permitió integrar frontend, backend y base de datos en una tienda virtual funcional, aplicando navegación, diseño visual, CRUD, autenticación básica y control del repositorio en GitHub.

---

## 10. Lista de verificación para evaluar la entrega

| Criterio | Cumple | Observación |
|---|---|---|
| Presenta enlace del repositorio GitHub | Sí / No | |
| El repositorio está actualizado | Sí / No | |
| Incluye README completo | Sí / No | |
| La tienda está personalizada | Sí / No | |
| Incluye productos relacionados con la empresa elegida | Sí / No | |
| El frontend funciona correctamente | Sí / No | |
| El backend se ejecuta correctamente | Sí / No | |
| La base de datos está conectada | Sí / No | |
| Implementa CRUD de productos | Sí / No | |
| Implementa login administrativo | Sí / No | |
| Protege el panel administrativo | Sí / No | |
| El video dura entre 7 y 10 minutos | Sí / No | |
| El video presenta integrantes y tienda elegida | Sí / No | |
| El video explica frontend, backend y base de datos | Sí / No | |
| El video demuestra funcionalidades en ejecución | Sí / No | |
| El grupo explica el flujo de información | Sí / No | |

---

## 11. Texto sugerido para publicar en plataforma

**Entrega final: Tienda virtual personalizada**

Cada grupo deberá entregar el producto final de la tienda virtual desarrollada en clase. El proyecto debe estar personalizado con una empresa o idea de negocio seleccionada por el grupo, incluyendo nombre de la tienda, diseño visual, productos, categorías e información general.

La entrega debe incluir:

1. Enlace del repositorio GitHub con el proyecto completo.
2. Archivo README actualizado con instrucciones de instalación y ejecución.
3. Enlace de un video de sustentación con duración mínima de 7 minutos y máxima de 10 minutos.

En el video se debe presentar:

1. Integrantes del grupo.
2. Nombre y descripción de la tienda virtual elegida.
3. Repositorio GitHub y estructura del proyecto.
4. Ejecución del backend, frontend y base de datos.
5. Funcionamiento de la navegación del sitio.
6. Catálogo de productos personalizado.
7. CRUD de productos: crear, consultar, actualizar y eliminar.
8. Login administrativo y cierre de sesión.
9. Protección del panel administrativo.
10. Flujo de información entre frontend, backend y base de datos.

> El video debe evidenciar tanto la funcionalidad del sistema como la comprensión técnica del proyecto desarrollado.
