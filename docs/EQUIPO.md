# Guía del equipo — Tienda Nube Full Stack

Documento para los cuatro integrantes del proyecto. Explica cómo arrancar en local, cómo trabajar con Git y qué reglas seguimos para no pisarnos el trabajo.

---

## Integrantes y roles

| Nombre | Rama | Responsabilidad |
|---|---|---|
| **Stephania** | `stephania` | DevOps · Login · Seguridad · Pruebas |
| **Cesar** | `cesar` | Backend (server.js, rutas, Express) |
| **Alimson** | `alimson` | Frontend (HTML, CSS, JS del cliente) |
| **Ashlee** | `ashlee` | Base de datos (MySQL, tablas, datos) |

> **Stephania es quien aprueba y fusiona los PR a `main`.** Nadie fusiona su propio código, nadie se para en main y hace merge.

---

## Setup inicial — primera vez en tu máquina

### 1. Clonar el repositorio

```bash
git clone https://github.com/Stephania00/taller-full-stack-2026.git
cd taller-full-stack-2026/Taller_Full_Satck_2026
```

### 2. Instalar dependencias del backend

```bash
cd backend
pnpm install
```

### 3. Crear el archivo de variables de entorno

```bash
# Windows
copy .env.example .env

# Mac / Linux
cp .env.example .env
```

Luego abrir `.env` y cambiá `DB_PASSWORD` por tu contraseña local de MySQL. El resto podés dejarlo igual.

### 4. Configurar la base de datos

Seguir los 4 pasos del archivo `docs/BASE_DE_DATOS.md` — ahí está todo el SQL que necesitás ejecutar en MySQL Workbench.

### 5. Instalar dependencias del frontend

```bash
cd Taller_Full_Satck_2026/frontend
pnpm install
```

### 6. Correr el proyecto

Abrí dos terminales:

```bash
# Terminal 1 — backend
cd Taller_Full_Satck_2026/backend
pnpm start
# → Servidor en http://localhost:3000

# Terminal 2 — frontend
cd Taller_Full_Satck_2026/frontend
pnpm start
# → Abrí http://localhost:5500/index.html
```

> Ambas terminales deben estar corriendo al mismo tiempo para que el sitio funcione completo.

---

## Flujo de trabajo con Git

### Regla principal

```
main = código estable y aprobado
Tu rama = donde trabajás vos
```

Nunca trabajés directamente en `main`. Cada uno trabaja en su rama y abre un Pull Request cuando termina.

---

### Cambiar a tu rama (primera vez en tu máquina)

Las ramas ya están creadas en GitHub. Solo tenés que bajarla y moverte a ella:

```bash
git checkout main
git pull origin main
git checkout cesar           # cambiá por tu nombre: stephania / cesar / alimson / ashlee
git pull origin cesar        # sincronizá con el remoto
```

---

### Ciclo diario de trabajo

```bash
# 1. Antes de empezar — traé los últimos cambios de main
git checkout main
git pull origin main
git checkout cesar           # volvé a tu rama
git merge main               # incorporá los cambios nuevos

# 2. Trabajá en tu código...

# 3. Guardar y subir tu trabajo
git add nombre-del-archivo.js          # agregá solo los archivos que tocaste
git commit -m "feat: descripción corta de lo que hiciste"
git push origin cesar
```

---

### Abrir un Pull Request

Cuando terminás una tarea:

1. Entrá a [github.com/Stephania00/taller-full-stack-2026](https://github.com/Stephania00/taller-full-stack-2026)
2. Click en **"Compare & pull request"** que aparece en tu rama
3. Título: describí qué hiciste en una línea
4. Descripción: qué cambiaste y cómo probarlo
5. Click **"Create pull request"**
6. Avisale a Stephania por WhatsApp para que lo revise

> Stephania revisa, pide cambios si hace falta, y fusiona a `main`.

---

## Convención de commits

Usamos un prefijo para saber de qué tipo es cada cambio:

| Prefijo | Cuándo usarlo | Ejemplo |
|---|---|---|
| `feat:` | Funcionalidad nueva | `feat: agregar filtro por precio` |
| `fix:` | Corrección de bug | `fix: corregir validación del formulario` |
| `style:` | Cambios visuales sin lógica | `style: ajustar colores del navbar` |
| `docs:` | Documentación | `docs: actualizar BASE_DE_DATOS.md` |
| `chore:` | Configuración, dependencias | `chore: actualizar .gitignore` |

---

## ✅ Lo que SÍ hay que hacer

- Trabajar siempre en tu rama, no en `main`
- Hacer `git pull` de `main` antes de empezar cada día
- Commits pequeños y frecuentes — mejor 5 commits chicos que uno gigante
- Probar que tu código funciona antes de abrir el PR
- Avisarle a Stephania cuando abrís un PR

---

## ❌ Lo que NO hay que hacer

- **No pushear directo a `main`** — el repo no lo permite, pero por si acaso
- **No subir el archivo `.env`** — tiene contraseñas. Está en `.gitignore` por una razón
- **No subir `node_modules/`** — pesa cientos de MB y se regenera con `pnpm install`
- **No hacer `git add .` a ciegas** — revisá qué archivos estás incluyendo antes de commitear
- **No fusionar tu propio PR** — siempre lo revisa otra persona
- **No borrar la rama de otro** — cada uno es dueño de su rama
- **No modificar `server.js` si sos de frontend** y viceversa — hablarlo antes

---

## Archivos por rol — quién toca qué

| Archivo | Responsable |
|---|---|
| `backend/server.js` | Cesar + Stephania (seguridad) |
| `backend/.env.example` | Stephania |
| `frontend/js/productos.js` | Alimson |
| `frontend/js/login.js` | Stephania |
| `frontend/js/script.js` | Alimson |
| `frontend/*.html` | Alimson |
| `frontend/css/` | Alimson |
| `docs/BASE_DE_DATOS.md` | Ashlee |
| `docs/EQUIPO.md` | Stephania |
| `PLAN_SPRINTS.md` | Stephania |

> Si necesitás tocar un archivo que no es tuyo, avisale al responsable primero.

---

## Ante cualquier duda

1. Primero revisá `docs/` — hay documentación técnica detallada
2. Si no encontrás la respuesta, preguntale a Stephania
3. **Nunca fuerces un push (`git push --force`) sin consultarlo**
