-- Script de base de datos — Tienda Nube
-- Programa: Técnico en Programación de Software — SENA
--
-- Instrucciones:
--   Opción A (MySQL Workbench): Archivo > Open SQL Script > ejecutar
--   Opción B (terminal): mysql -u root -p < database/script_base_datos.sql

CREATE DATABASE IF NOT EXISTS contactos_db;
USE contactos_db;

-- ── Tabla: mensajes del formulario de contacto ────────────────────────────────
CREATE TABLE IF NOT EXISTS contactos (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(100),
  correo  VARCHAR(100),
  mensaje TEXT
);

-- ── Tabla: inventario de productos ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100)  NOT NULL,
  descripcion TEXT,
  precio      DECIMAL(10,2) NOT NULL,
  categoria   VARCHAR(100),
  stock       INT           DEFAULT 0,
  imagen      VARCHAR(255)
);

-- ── Tabla: administradores ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  email    VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255)        NOT NULL
);

-- ── Productos de ejemplo ──────────────────────────────────────────────────────
INSERT IGNORE INTO productos (nombre, descripcion, precio, categoria, stock, imagen) VALUES
('Smartphone Aurora 5G',      'Pantalla AMOLED 6.7", 108 MP, batería 5000 mAh',           749900,  'Móviles',   15, ''),
('Smartphone Nova Lite',      'Pantalla IPS 6.5", 50 MP, 128 GB almacenamiento',          349900,  'Móviles',   22, ''),
('Notebook UltraBook Pro',    'Intel i7, 16 GB RAM, 512 GB SSD, pantalla 14"',           1349900,  'Laptops',    8, ''),
('Notebook CloudBook Air',    'AMD Ryzen 5, 8 GB RAM, 256 GB SSD, ultradelgada',          799900,  'Laptops',   12, ''),
('Auriculares NoiseFree ANC', 'Cancelación de ruido activa, 30 h de batería',             189900,  'Audio',     20, ''),
('Parlante BoomBox 360',      'Sonido 360°, resistente al agua IPX7, Bluetooth 5.3',       99900,  'Audio',     35, ''),
('Control Pro Gaming',        'Inalámbrico, vibración háptica, compatible PC y consolas', 129900,  'Gaming',    18, ''),
('Smartwatch FitPulse 2',     'Monitor cardíaco, GPS, 7 días de batería, AMOLED',         229900,  'Wearables', 10, '');
