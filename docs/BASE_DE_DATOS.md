# Base de datos — Documentación técnica

La base de datos es donde se guarda permanentemente toda la información de la tienda: los mensajes de contacto, los productos y (en Sprint 4) los usuarios administradores.

---

## ¿Qué es MySQL y por qué lo usamos?

MySQL es un sistema de gestión de bases de datos relacionales. Guarda información en **tablas**, igual que una hoja de cálculo, pero con la capacidad de manejar miles de registros, hacer búsquedas rápidas y garantizar que los datos no se corrompan.

El frontend **nunca habla directamente con MySQL**. Solo el backend puede hacerlo. Esto es una medida de seguridad: si el frontend pudiera conectarse directo a MySQL, cualquier persona vería las credenciales de acceso en el código fuente del navegador.

```
Navegador  →  backend (server.js)  →  MySQL
                                   ↓
                             Los datos se guardan
                             o se devuelven
```

---

## Nombre de la base de datos

```
contactos_db
```

Todas las tablas del proyecto viven dentro de esta base de datos. Para usarla en MySQL Workbench o en la terminal, hay que seleccionarla primero:

```sql
USE contactos_db;
```

---

## Tablas del proyecto

### Tabla `contactos` — mensajes del formulario de contacto

Guarda cada mensaje que un usuario envía desde `contacto.html`.

```sql
CREATE TABLE contactos (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(100),
  correo  VARCHAR(100),
  mensaje TEXT
);
```

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INT AUTO_INCREMENT | Número único que MySQL asigna automáticamente a cada registro |
| `nombre` | VARCHAR(100) | Nombre de la persona que escribió |
| `correo` | VARCHAR(100) | Correo electrónico de la persona |
| `mensaje` | TEXT | El contenido del mensaje (puede ser largo) |

**¿Quién escribe en esta tabla?**  
El backend con la ruta `POST /guardar`, cuando el usuario envía el formulario de contacto.

**¿Quién lee esta tabla?**  
Por ahora solo se puede consultar manualmente desde MySQL Workbench. En una versión futura se podría crear una página de admin para verlos.

---

### Tabla `productos` — inventario de la tienda

Guarda todos los productos que se muestran en el catálogo y que el admin puede gestionar.

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

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INT AUTO_INCREMENT | Identificador único del producto. MySQL lo asigna solo. |
| `nombre` | VARCHAR(100) NOT NULL | Nombre del producto. Obligatorio — no puede estar vacío. |
| `descripcion` | TEXT | Descripción larga. Puede quedar vacío. |
| `precio` | DECIMAL(10,2) NOT NULL | Precio con hasta 2 decimales. Obligatorio. Ej: `749900.00` |
| `categoria` | VARCHAR(100) | Categoría del producto. Ej: Móviles, Laptops, Audio. |
| `stock` | INT DEFAULT 0 | Unidades disponibles. Si no se especifica, queda en 0. |
| `imagen` | VARCHAR(255) | Ruta local o URL de la imagen. Ej: `img/smartphone.jpg` |

**¿Quién escribe en esta tabla?**  
El backend con las rutas `POST /productos` y `PUT /productos/:id`.

**¿Quién lee esta tabla?**  
El backend con `GET /productos` — lo llaman `productos.html` y `admin-productos.html`.

**¿Quién elimina de esta tabla?**  
El backend con `DELETE /productos/:id`.

#### ⚠️ El campo se llama `imagen`, no `imagen_url`

Este es un error fácil de cometer. El backend y el frontend están programados para usar el nombre `imagen`. Si la tabla se crea con `imagen_url`, todas las rutas del backend fallarán silenciosamente (recibirán `undefined` al intentar leer ese campo).

---

### Tabla `usuarios` — administradores (Sprint 4)

Se crea en Sprint 4. Guarda las cuentas de los administradores que pueden iniciar sesión y gestionar productos.

```sql
CREATE TABLE usuarios (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  email    VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255)        NOT NULL
);
```

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INT AUTO_INCREMENT | Identificador único del usuario |
| `email` | VARCHAR(150) UNIQUE | Correo del admin. `UNIQUE` significa que no puede repetirse. |
| `password` | VARCHAR(255) | Contraseña encriptada con bcrypt. **Nunca se guarda en texto plano.** |

> La contraseña tiene 255 caracteres porque bcrypt convierte cualquier contraseña en un hash de esa longitud.

---

## Cómo conectarse a la base de datos

### Desde MySQL Workbench

1. Abrir MySQL Workbench
2. Click en la conexión local (suele ser `root@localhost`)
3. Ingresar la contraseña
4. En el panel izquierdo, hacer doble click en `contactos_db`
5. Ya podés escribir consultas SQL en el editor

### Desde la terminal

```bash
mysql -u root -p
# Ingresar contraseña cuando la pide
USE contactos_db;
```

### Desde el backend (automático)

El backend se conecta solo al iniciar. No hay que hacer nada extra salvo que MySQL esté corriendo.

---

## Comandos SQL básicos que vas a usar

### Ver todos los productos
```sql
SELECT * FROM productos;
```

### Ver un producto específico
```sql
SELECT * FROM productos WHERE id = 1;
```

### Ver productos de una categoría
```sql
SELECT * FROM productos WHERE categoria = 'Gaming';
```

### Ver todos los mensajes de contacto
```sql
SELECT * FROM contactos;
```

### Insertar un producto manualmente
```sql
INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen)
VALUES ('Monitor 4K', 'Panel IPS 144Hz', 899900, 'Gaming', 5, 'img/monitor.jpg');
```

### Actualizar un producto
```sql
UPDATE productos SET precio = 750000, stock = 10 WHERE id = 1;
```

### Eliminar un producto
```sql
DELETE FROM productos WHERE id = 1;
```

### Ver la estructura de una tabla
```sql
DESCRIBE productos;
```

---

## Tipos de datos que usamos

| Tipo | Para qué | Ejemplo |
|---|---|---|
| `INT` | Números enteros | `id`, `stock` |
| `INT AUTO_INCREMENT` | ID que MySQL asigna solo, aumentando de a 1 | `id = 1, 2, 3...` |
| `VARCHAR(n)` | Texto corto, máximo n caracteres | `nombre`, `correo` |
| `TEXT` | Texto largo, sin límite fijo | `descripcion`, `mensaje` |
| `DECIMAL(10,2)` | Número decimal con hasta 10 dígitos y 2 decimales | `749900.00` |

---

## Restricciones importantes

| Restricción | Significado | Ejemplo |
|---|---|---|
| `NOT NULL` | El campo no puede quedar vacío | `nombre VARCHAR(100) NOT NULL` |
| `DEFAULT 0` | Si no se especifica un valor, queda en 0 | `stock INT DEFAULT 0` |
| `UNIQUE` | No pueden existir dos registros con el mismo valor | `email VARCHAR(150) UNIQUE` |
| `AUTO_INCREMENT` | MySQL asigna el valor solo, no hay que enviarlo | `id INT AUTO_INCREMENT` |
| `PRIMARY KEY` | Identifica de forma única cada fila de la tabla | `id INT AUTO_INCREMENT PRIMARY KEY` |

---

## Cómo fluye la información entre el frontend y la base de datos

```
┌─────────────────────────────────────────────────────────────┐
│  USUARIO EN EL NAVEGADOR                                    │
│                                                             │
│  Llena formulario → click Enviar                            │
│         ↓                                                   │
│  script.js / productos.js hace fetch()                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP (JSON)
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  BACKEND — server.js (Node.js + Express)                    │
│                                                             │
│  Recibe req.body → valida → ejecuta db.query(sql, valores)  │
└──────────────────────────┬──────────────────────────────────┘
                           │ mysql2 protocol
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  BASE DE DATOS — MySQL                                      │
│                                                             │
│  Ejecuta: INSERT / SELECT / UPDATE / DELETE                 │
│  Devuelve: resultado o array de registros                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↑ (respuesta sube por el mismo camino)
```

---

## Verificar que todo funciona correctamente

Después de crear o editar un producto desde el admin, podés verificar en MySQL Workbench que el cambio quedó guardado:

```sql
SELECT * FROM productos ORDER BY id DESC;
```

Si ves el producto con los datos correctos, la cadena completa funciona: frontend → backend → MySQL.

---

## Lo que NO se debe cambiar sin entender el impacto

| Elemento | Por qué es delicado |
|---|---|
| Nombre de la base de datos `contactos_db` | El backend se conecta a ese nombre específico en `createConnection` |
| Nombre del campo `imagen` en la tabla `productos` | El backend y el frontend usan ese nombre exacto. Si cambiás el campo en MySQL, hay que actualizar también el código |
| El campo `id` como `AUTO_INCREMENT PRIMARY KEY` | Es la referencia única que usan `PUT /productos/:id` y `DELETE /productos/:id` |
| El campo `password` en `usuarios` | Siempre debe guardarse encriptado con bcrypt. Nunca en texto plano. |
| Eliminar registros de `contactos` | Son mensajes reales de usuarios — si los borrás, se pierden para siempre |

---

## Buenas prácticas con la base de datos

- **Hacé respaldos antes de cambios grandes.** Desde MySQL Workbench: `Server → Data Export`.
- **No borres tablas enteras con `DROP TABLE`** en producción sin estar seguro — es irreversible.
- **Usá `WHERE` siempre en `UPDATE` y `DELETE`.** Sin `WHERE`, el comando afecta todos los registros.
  ```sql
  -- ✅ Correcto
  DELETE FROM productos WHERE id = 5;
  
  -- ❌ Peligroso — borra TODOS los productos
  DELETE FROM productos;
  ```
- **No guardes contraseñas en texto plano.** Siempre usar bcrypt (Sprint 4).
- **Los `?` en el backend son tu mejor amigo.** Protegen contra inyección SQL — nunca armes el SQL concatenando strings directamente.
