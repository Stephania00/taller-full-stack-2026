require('dotenv').config();

const express = require("express");
const mysql   = require("mysql2");
const cors    = require("cors");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");

const app = express();

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(cors()); // Permitir peticiones desde cualquier origen en desarrollo/producción
app.use(express.json());

// ── Conexión MySQL ────────────────────────────────────────────────────────────
const db = mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

// ── Utilidades ────────────────────────────────────────────────────────────────
function campoVacio(valor) {
    return valor === undefined || valor === null || valor.toString().trim() === "";
}

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) return res.status(401).json({ error: 'Acceso denegado. Token requerido.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) return res.status(403).json({ error: 'Token inválido o expirado.' });
        req.usuario = usuario;
        next();
    });
}

// ── Ruta de prueba ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.send("Servidor Tienda Nube conectado a MySQL");
});

// ── Contacto ──────────────────────────────────────────────────────────────────
app.post("/guardar", (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
        return res.status(400).send("Datos incompletos");
    }

    const sql = "INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)";
    db.query(sql, [nombre, correo, mensaje], (err) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error en servidor");
        }
        res.send("Datos guardados correctamente");
    });
});

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post("/register", async (req, res) => {
    const { email, password, secret } = req.body;

    if (secret !== process.env.REGISTER_SECRET)
        return res.status(403).send("No autorizado");

    if (campoVacio(email) || campoVacio(password)) {
        return res.status(400).send("Email y contraseña son obligatorios");
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(409).send("El email ya está registrado");
                console.error("Error SQL:", err);
                return res.status(500).send("Error al registrar usuario");
            }
            res.status(201).send("Usuario registrado correctamente");
        });
    } catch (e) {
        res.status(500).send("Error interno del servidor");
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (campoVacio(email) || campoVacio(password)) {
        return res.status(400).send("Email y contraseña son obligatorios");
    }

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, resultados) => {
        if (err) return res.status(500).send("Error en servidor");
        if (resultados.length === 0) return res.status(401).send("Credenciales incorrectas");

        const usuario = resultados[0];
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).send("Credenciales incorrectas");

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        res.json({ token });
    });
});

// ── Productos (GET público — sin token) ───────────────────────────────────────
app.get("/productos", (req, res) => {
    db.query("SELECT * FROM productos", (err, resultados) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al listar productos");
        }
        res.json(resultados);
    });
});

// ── Productos (escritura — requieren token) ───────────────────────────────────
app.post("/productos", verificarToken, (req, res) => {
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;

    if (campoVacio(nombre) || campoVacio(precio)) {
        return res.status(400).send("Nombre y precio son obligatorios");
    }

    const sql = `INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nombre, descripcion, precio, categoria, stock || 0, imagen], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al registrar producto");
        }
        res.status(201).json({ mensaje: "Producto registrado correctamente", id: result.insertId });
    });
});

app.put("/productos/:id", verificarToken, (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;

    if (campoVacio(nombre) || campoVacio(precio)) {
        return res.status(400).send("Nombre y precio son obligatorios");
    }

    const sql = `UPDATE productos
                 SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, stock = ?, imagen = ?
                 WHERE id = ?`;
    db.query(sql, [nombre, descripcion, precio, categoria, stock || 0, imagen, id], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al actualizar producto");
        }
        if (result.affectedRows === 0) return res.status(404).send("Producto no encontrado");
        res.send("Producto actualizado correctamente");
    });
});

app.delete("/productos/:id", verificarToken, (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM productos WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al eliminar producto");
        }
        if (result.affectedRows === 0) return res.status(404).send("Producto no encontrado");
        res.send("Producto eliminado correctamente");
    });
});

// ── Iniciar servidor ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
