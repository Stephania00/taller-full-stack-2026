# Backend — Documentación técnica

El backend es el servidor que recibe pedidos del frontend, habla con la base de datos y devuelve respuestas. El usuario nunca lo ve directamente — trabaja "detrás de escena".

---

## ¿Qué es el backend y por qué existe?

El frontend (el navegador) no puede conectarse directamente a MySQL por seguridad. Si lo hiciera, cualquier persona podría ver las credenciales de la base de datos simplemente abriendo el código fuente de la página.

El backend actúa como intermediario:

```
Navegador (usuario)
      ↓ fetch("http://localhost:3000/guardar")
   BACKEND (server.js)
      ↓ db.query("INSERT INTO contactos ...")
   MySQL (base de datos)
      ↓ resultado
   BACKEND
      ↓ res.send("Guardado correctamente")
Navegador (usuario)
```

---

## Stack del backend

| Tecnología | Versión | Para qué |
|---|---|---|
| Node.js | 18+ | Entorno de ejecución de JavaScript en el servidor |
| Express | 5.x | Framework para crear rutas HTTP fácilmente |
| mysql2 | 3.x | Driver para conectar Node.js con MySQL |
| cors | 2.x | Permite que el frontend llame al backend desde otro origen |

---

## Cómo correr el backend

```bash
cd Taller_Full_Satck_2026/backend
pnpm install          # solo la primera vez
node server.js        # inicia el servidor
```

Si todo está bien, la terminal muestra:
```
Servidor en http://localhost:3000
Conectado a MySQL
```

Si MySQL no está corriendo o las credenciales son incorrectas:
```
Error de conexión: { code: 'ECONNREFUSED' ... }
```

> El servidor sigue corriendo aunque falle la conexión a MySQL. Pero todas las rutas que usen la base de datos responderán con error 500.

---

## Estructura del archivo `server.js`

Todo el backend vive en un solo archivo. Su estructura es:

```
1. Importar librerías (express, mysql2, cors)
2. Crear la aplicación Express (app)
3. Activar middlewares (cors y express.json)
4. Crear la conexión a MySQL
5. Conectar a MySQL
6. Definir las rutas (endpoints)
7. Iniciar el servidor en el puerto 3000
```

---

## Los middlewares — qué son y por qué no se tocan

Los middlewares son funciones que se ejecutan antes de llegar a las rutas. Están en las primeras líneas de `server.js`:

```js
app.use(cors());           // ← Middleware 1
app.use(express.json());   // ← Middleware 2
```

### `cors()` — permitir llamadas desde el navegador

CORS significa "Cross-Origin Resource Sharing". El navegador, por seguridad, bloquea las peticiones que van de un origen a otro distinto. El frontend corre en `localhost:5500` y el backend en `localhost:3000` — son orígenes diferentes.

Sin `cors()`:
```
El navegador bloquea la petición y muestra en consola:
"Access to fetch at 'http://localhost:3000/...' has been blocked by CORS policy"
```

Con `cors()`:
```
El backend agrega el header "Access-Control-Allow-Origin: *"
El navegador permite la petición
```

> ⚠️ **Nunca eliminar esta línea.** Si la quitás, todos los `fetch` del frontend dejan de funcionar en el navegador (desde Postman sí funcionan porque no aplica la política CORS).

### `express.json()` — leer el cuerpo de las peticiones

Cuando el frontend envía datos con `fetch` en formato JSON, Express necesita "parsear" (interpretar) ese texto para convertirlo en un objeto JavaScript.

Sin `express.json()`:
```js
req.body // → undefined (el cuerpo llega pero Express no lo lee)
```

Con `express.json()`:
```js
req.body // → { nombre: "Ana", correo: "ana@email.com", mensaje: "Hola" }
```

> ⚠️ **Nunca eliminar esta línea.** Si la quitás, todas las rutas POST y PUT recibirán `req.body = undefined` y fallarán silenciosamente.

---

## La conexión a MySQL

```js
const db = mysql.createConnection({
    host:     "localhost",
    user:     "root",
    password: "root",
    database: "contactos_db"
});
```

`mysql.createConnection()` crea el objeto de conexión pero **no conecta todavía**. La conexión real ocurre con:

```js
db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});
```

La variable `db` es la que usan todas las rutas para ejecutar consultas SQL. Por eso **no se debe renombrar ni eliminar**.

### Cambiar las credenciales

Si tu MySQL tiene usuario o contraseña diferente, editá este bloque:

```js
const db = mysql.createConnection({
    host:     "localhost",    // siempre localhost en desarrollo local
    user:     "tu_usuario",   // ← cambiá esto
    password: "tu_password",  // ← y esto
    database: "contactos_db"  // nombre de la base de datos (no cambiar)
});
```

> En Sprint 4 esto se reemplaza por variables de entorno (`process.env.DB_USER`, etc.) para no tener contraseñas en el código.

---

## Las rutas — qué son y cómo funcionan

Una ruta es una dirección que el backend "escucha". Cuando el frontend hace `fetch("http://localhost:3000/guardar")`, el backend busca si tiene una ruta definida para `/guardar` y ejecuta su función.

Cada ruta tiene tres partes:
```js
app.post("/guardar",  (req, res) => { ... });
//   ↑       ↑              ↑
// método  dirección      función que se ejecuta
```

---

## Ruta de prueba

```js
app.get("/", (req, res) => {
    res.send("Servidor conectado a MySQL");
});
```

Se prueba abriendo `http://localhost:3000` en el navegador. Si responde, el servidor está corriendo. Si no, el servidor no está iniciado.

---

## Ruta de contacto — `POST /guardar`

```
Frontend envía: { nombre, correo, mensaje }
        ↓
server.js desestructura req.body
        ↓
Valida que los 3 campos no estén vacíos
        ↓ (si alguno falta) → responde 400 "Datos incompletos"
        ↓ (si están completos)
Ejecuta: INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)
        ↓ (si hay error SQL) → responde 500 "Error en servidor"
        ↓ (si todo bien)
Responde: "Datos guardados correctamente"
```

Los `?` en el SQL son **placeholders de seguridad**. mysql2 reemplaza cada `?` con el valor correspondiente del array `[nombre, correo, mensaje]`, y sanitiza los valores para evitar inyección SQL.

> ⚠️ **Nunca eliminar esta ruta.** La usa `script.js` del formulario de contacto.

---

## La función `campoVacio()`

```js
function campoVacio(valor) {
    return valor === undefined || valor === null || valor.toString().trim() === "";
}
```

Esta función detecta si un campo llegó vacío, nulo o solo con espacios. Se usa en las rutas de productos para validar antes de ejecutar el SQL.

| Caso | `campoVacio()` devuelve |
|---|---|
| `undefined` (el campo no llegó en el body) | `true` |
| `null` | `true` |
| `""` (string vacío) | `true` |
| `"   "` (solo espacios) | `true` |
| `"Smartphone"` | `false` |
| `0` (número cero) | `false` — el cero es un valor válido para stock o precio |

---

## Rutas CRUD de productos

### `GET /productos` — Listar todos

```
frontend: fetch("http://localhost:3000/productos")
        ↓
server.js: SELECT * FROM productos
        ↓
MySQL devuelve un array con todos los registros
        ↓
server.js: res.json(resultados)
        ↓
frontend recibe: [{ id:1, nombre:"...", precio:..., ... }, ...]
```

No requiere body. Solo devuelve todos los productos de la tabla.

---

### `POST /productos` — Crear producto

```
frontend envía: { nombre, descripcion, precio, categoria, stock, imagen }
        ↓
server.js valida con campoVacio() que nombre y precio no estén vacíos
        ↓ (si faltan) → 400 "Nombre y precio son obligatorios"
        ↓ (si están)
INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen)
VALUES (?, ?, ?, ?, ?, ?)
        ↓
MySQL guarda el registro y devuelve el ID del nuevo producto
        ↓
server.js responde: { mensaje: "Producto registrado correctamente", id: 4 }
```

---

### `PUT /productos/:id` — Editar producto

El `:id` en la URL es un **parámetro dinámico**. Si el frontend hace `fetch("http://localhost:3000/productos/3")`, Express guarda el `3` en `req.params.id`.

```
frontend envía: PUT /productos/3  con body { nombre, descripcion, precio, ... }
        ↓
server.js lee req.params.id (= 3) y req.body
        ↓
Valida nombre y precio
        ↓
UPDATE productos SET nombre=?, descripcion=?, ... WHERE id=?
        ↓ (affectedRows === 0 significa que no existe ese ID)
→ 404 "Producto no encontrado"
        ↓ (si actualizó)
→ "Producto actualizado correctamente"
```

---

### `DELETE /productos/:id` — Eliminar producto

```
frontend envía: DELETE /productos/3
        ↓
server.js lee req.params.id (= 3)
        ↓
DELETE FROM productos WHERE id=?
        ↓ (affectedRows === 0)
→ 404 "Producto no encontrado"
        ↓ (si eliminó)
→ "Producto eliminado correctamente"
```

---

## Resumen de todas las rutas

| Método | Ruta | Función | Body requerido |
|---|---|---|---|
| `GET` | `/` | Health check | — |
| `POST` | `/guardar` | Guardar contacto | `{ nombre, correo, mensaje }` |
| `GET` | `/productos` | Listar productos | — |
| `POST` | `/productos` | Crear producto | `{ nombre, descripcion, precio, categoria, stock, imagen }` |
| `PUT` | `/productos/:id` | Editar producto | `{ nombre, descripcion, precio, categoria, stock, imagen }` |
| `DELETE` | `/productos/:id` | Eliminar producto | — |
| `POST` | `/register` | Registrar usuario | `{ email, password }` ← Sprint 4 |
| `POST` | `/login` | Login con JWT | `{ email, password }` ← Sprint 4 |

---

## Cómo probar las rutas sin el frontend

Podés usar **Thunder Client** (extensión de VS Code) o **Postman** para enviarle peticiones al backend directamente.

### Ejemplos

**Listar productos:**
```
GET  http://localhost:3000/productos
```

**Crear producto:**
```
POST  http://localhost:3000/productos
Body (JSON):
{
  "nombre": "Teclado prueba",
  "descripcion": "Descripción de prueba",
  "precio": 50000,
  "categoria": "Accesorios",
  "stock": 5,
  "imagen": ""
}
```

**Editar producto con ID 1:**
```
PUT  http://localhost:3000/productos/1
Body (JSON): { mismo formato que POST }
```

**Eliminar producto con ID 1:**
```
DELETE  http://localhost:3000/productos/1
```

---

## Errores comunes y cómo resolverlos

| Error en consola | Causa probable | Solución |
|---|---|---|
| `Error de conexión: ECONNREFUSED` | MySQL no está corriendo | Iniciar MySQL (XAMPP, Workbench, servicio) |
| `Error de conexión: ER_ACCESS_DENIED` | Usuario o contraseña incorrectos | Corregir credenciales en `createConnection` |
| `Error de conexión: ER_BAD_DB_ERROR` | La base de datos `contactos_db` no existe | Ejecutar `CREATE DATABASE contactos_db` en MySQL |
| `Error SQL: ER_NO_SUCH_TABLE` | La tabla no existe | Ejecutar el script de creación de tabla |
| `Cannot GET /ruta` | La ruta no está definida en server.js | Revisar que la ruta exista y el método sea el correcto |
| `req.body undefined` | Falta `app.use(express.json())` | Verificar que esté al inicio de server.js |
| CORS error en consola del navegador | Falta `app.use(cors())` | Verificar que esté al inicio de server.js |

---

## Lo que NO se debe tocar sin entender el impacto

| Elemento | Por qué es delicado |
|---|---|
| `app.use(cors())` | Sin esto el frontend no puede hacer ningún fetch |
| `app.use(express.json())` | Sin esto `req.body` llega `undefined` en POST y PUT |
| Variable `db` | Todas las rutas la usan para consultar MySQL |
| Puerto `3000` | Está hardcodeado en `script.js` y `productos.js` del frontend |
| `POST /guardar` | Lo usa el formulario de contacto |
| Los `?` en las consultas SQL | Son la protección contra inyección SQL — nunca interpolar variables directamente |
