const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Permitir comunicación con frontend
app.use(cors());
app.use(express.json());

// Configuración de conexión
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "contactos_db"
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor conectado a MySQL");
});


// ✅ RUTA PARA GUARDAR DATOS
app.post("/guardar", (req, res) => {

    const { nombre, correo, mensaje } = req.body;

    console.log("Datos recibidos:", req.body);

    if (!nombre || !correo || !mensaje) {
        return res.status(400).send("Datos incompletos");
    }

    const sql = "INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)";

    db.query(sql, [nombre, correo, mensaje], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error en servidor");
        }

        console.log("Registro insertado:", result);
        res.send("Datos guardados correctamente");
    });
});


// ── Utilidad de validación ────────────────────────────────────────────────────
function campoVacio(valor) {
    return valor === undefined || valor === null || valor.toString().trim() === "";
}

// ── CRUD productos ────────────────────────────────────────────────────────────

app.get("/productos", (req, res) => {
    db.query("SELECT * FROM productos", (err, resultados) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error al listar productos");
        }
        res.json(resultados);
    });
});

app.post("/productos", (req, res) => {
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

app.put("/productos/:id", (req, res) => {
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

app.delete("/productos/:id", (req, res) => {
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

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});