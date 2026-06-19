// auth.js — protección de páginas administrativas
// Incluir en cualquier página que requiera sesión activa,
// antes del script principal de la página.

(function () {
    if (!localStorage.getItem('tn-token')) {
        window.location.replace('login.html');
    }
})();
