// login.js — stub preparado para Sprint 4
//
// En Sprint 4 este archivo:
//   1. Captura el submit de #loginForm
//   2. Hace POST /login con { email, password }
//   3. Guarda el JWT en localStorage('tn-token')
//   4. Redirige a admin-productos.html
//   5. Si hay error, muestra el mensaje en #loginError
//
// Por ahora el formulario no tiene comportamiento real.
// El botón "Ingresar" no envía datos al backend hasta Sprint 4.

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // TODO Sprint 4: conectar a POST /login
  });
}
