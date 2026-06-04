// login.js — Sprint 4
// Maneja el formulario de login y la gestión del token JWT

const API_URL_AUTH = 'http://localhost:3000'; // Sprint 4: reemplazar con URL de Railway

// Si ya hay sesión activa, ir directo al admin
if (localStorage.getItem('tn-token')) {
    window.location.href = 'admin-productos.html';
}

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email    = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            mostrarError('Completá todos los campos.');
            return;
        }

        // Deshabilitar botón mientras espera respuesta
        const btn = loginForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Ingresando…';

        fetch(`${API_URL_AUTH}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(res => {
            if (!res.ok) return res.text().then(msg => { throw new Error(msg); });
            return res.json();
        })
        .then(data => {
            localStorage.setItem('tn-token', data.token);
            window.location.href = 'admin-productos.html';
        })
        .catch(err => {
            mostrarError(err.message || 'Error al conectar con el servidor.');
            btn.disabled = false;
            btn.innerHTML = '<i class="bi bi-person-lock me-1"></i>Ingresar';
        });
    });
}

function mostrarError(msg) {
    if (!loginError) return;
    loginError.textContent = msg;
    loginError.className = 'text-danger small mb-3 fw-semibold';
}
