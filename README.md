# Tienda Nube — Tienda Virtual de Tecnología

**Programa:** Técnico en Programación de Software  
**Institución:** SENA

---

## 1. Nombre de la tienda virtual

**Tienda Nube** — Tienda online de tecnología con productos como smartphones, laptops, auriculares, accesorios de gaming y wearables.

---

## 2. Integrantes del grupo

| Nombre | Rol |
|---|---|
| Alissom Sanchez Castillo | Frontend — HTML, CSS, JavaScript del cliente |
| Stephania Patiño | Backend · Login · Seguridad · Pruebas |

---

## 3. Descripción de la tienda

Tienda Nube es una tienda virtual de tecnología que permite a los usuarios explorar un catálogo de productos, filtrar por categoría y contactarse con la tienda. Los administradores pueden gestionar el inventario completo desde un panel protegido con autenticación JWT.

---

## 4. Objetivo del proyecto

Desarrollar una tienda virtual completa que integre frontend, backend y base de datos, aplicando los conocimientos adquiridos durante la formación en Técnico en Programación de Software del SENA. El proyecto demuestra el manejo de tecnologías web modernas, rutas REST, autenticación segura y persistencia de datos con MySQL.

---

## 5. Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, Bootstrap 5.3, Bootstrap Icons, JavaScript |
| Backend | Node.js, Express 5 |
| Base de datos | MySQL 8 + driver mysql2 |
| Autenticación | JWT (jsonwebtoken) + bcrypt |
| Gestor de paquetes | pnpm |

---

## 6. Estructura del proyecto

```
Taller_Full_Satck_2026/
├── frontend/
│   ├── index.html              → Inicio de la tienda
│   ├── productos.html          → Catálogo público de productos
│   ├── ayuda.html              → Preguntas frecuentes y soporte
│   ├── contacto.html           → Formulario de contacto
│   ├── login.html              → Inicio de sesión administrativo
│   ├── admin-productos.html    → Panel de administración CRUD
│   ├── css/
│   │   ├── theme.css           → Sistema de diseño y variables
│   │   └── estilos.css         → Estilos personalizados
│   ├── js/
│   │   ├── script.js           → Formulario de contacto
│   │   ├── productos.js        → Catálogo público + CRUD admin
│   │   ├── login.js            → Manejo del token JWT
│   │   └── auth.js             → Protección de rutas privadas
│   ├── img/                    → Imágenes de productos
│   └── video/                  → Recursos de video
├── backend/
│   ├── server.js               → Servidor Express con todas las rutas
│   ├── .env.example            → Plantilla de variables de entorno
│   └── package.json
├── database/
│   └── script_base_datos.sql   → Script SQL para crear las tablas
└── README.md
```

---

## 7. Instrucciones de instalación y ejecución

### Requisitos previos

- Node.js v18 o superior
- MySQL 8 corriendo localmente (XAMPP o MySQL Workbench)
- pnpm — instalar con: `npm install -g pnpm`

### Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/Stephania00/taller-full-stack-2026.git
cd taller-full-stack-2026/Taller_Full_Satck_2026
```

### Paso 2 — Crear la base de datos

Abrir MySQL Workbench y ejecutar el archivo `database/script_base_datos.sql`, o desde la terminal:

```bash
mysql -u root -p < database/script_base_datos.sql
```

### Paso 3 — Configurar el backend

```bash
cd backend
pnpm install
copy .env.example .env
```

Editar `.env` con las credenciales locales de MySQL:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=contactos_db
JWT_SECRET=clave_secreta_larga
PORT=3000
```

### Paso 4 — Iniciar el backend

```bash
node server.js
# Servidor corriendo en https://taller-full-stack-2026-production.up.railway.app
```

### Paso 5 — Iniciar el frontend

Abrir `frontend/index.html` con **Live Server** en VS Code, o ejecutar:

```bash
cd frontend
pnpm dlx serve . -p 5500
# Abrir http://localhost:5500/index.html en el navegador
```

### Paso 6 — Crear el usuario administrador

Con el backend corriendo, abrir la consola del navegador (F12) y pegar:

```js
fetch('https://taller-full-stack-2026-production.up.railway.app/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@tienda.com',
    password: 'tienda2026',
    secret: 'tiendanube_registro_2026'
  })
}).then(r => r.text()).then(console.log)
```

Respuesta esperada: `Usuario registrado correctamente`

---

## 8. Funcionalidades implementadas

- Catálogo de productos cargado dinámicamente desde MySQL
- Filtro de productos por categoría en tiempo real
- CRUD completo de productos desde el panel administrativo:
  - Crear producto con nombre, descripción, precio, categoría, stock e imagen
  - Listar todos los productos en tabla
  - Editar producto existente
  - Eliminar producto
- Login administrativo con autenticación JWT y contraseña encriptada con bcrypt
- Protección del panel: redirige a `login.html` si no hay sesión activa
- Cierre de sesión desde el panel
- Formulario de contacto conectado al backend y guardado en MySQL
- Diseño responsive con Bootstrap 5.3
- Modo oscuro / claro

---

## 9. Flujo de información

```
Usuario en el navegador
        ↓
Frontend (HTML + Bootstrap)
        ↓
JavaScript — fetch API
        ↓
Backend — Node.js + Express (server.js)
        ↓
Base de datos — MySQL (contactos_db)
        ↓
Respuesta JSON al frontend
        ↓
Resultado visible para el usuario
```

---

## 10. Pruebas realizadas

| Prueba | Resultado esperado |
|---|---|
| Abrir `index.html` | Carga la página de inicio con productos destacados |
| Abrir `productos.html` | Carga el catálogo desde MySQL con filtros por categoría |
| Abrir `admin-productos.html` sin login | Redirige automáticamente a `login.html` |
| Iniciar sesión con credenciales correctas | Accede al panel de administración |
| Iniciar sesión con credenciales incorrectas | Muestra mensaje de error |
| Crear producto desde el panel | Producto guardado en MySQL y visible en la tabla |
| Editar producto | Datos actualizados correctamente en MySQL |
| Eliminar producto | Producto eliminado de MySQL y de la tabla |
| Enviar formulario de contacto | Mensaje guardado en la tabla `contactos` |
| Cerrar sesión | Token eliminado, redirige a `login.html` |
| Navegar entre páginas | Menú funciona correctamente en todas las páginas |
| Verificar cambios en MySQL | Los datos del panel coinciden con MySQL Workbench |

---

## 11. Enlace del video de sustentación

[Pendiente — se publicará en YouTube próximamente]
