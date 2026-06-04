/* ============================================================
   Tienda Nube — Lógica de tema (modo claro/oscuro persistente)
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'tn-theme';

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function store(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }
  function preferred() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.querySelectorAll('[data-theme-icon]').forEach(function (el) {
      el.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
  }

  // Aplica el tema lo antes posible para evitar parpadeo
  apply(getStored() || preferred());

  document.addEventListener('DOMContentLoaded', function () {
    apply(getStored() || preferred());

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-bs-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        apply(next);
        store(next);
      });
    });

    // Marca el enlace activo del navbar según la página actual
    const here = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.navbar .nav-link[href]').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === here || (here === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // Cambia el botón "Ingresar" según si hay sesión activa
    var loginBtn = document.querySelector('.navbar a[href="login.html"]');
    if (loginBtn) {
      try {
        if (localStorage.getItem('tn-token')) {
          loginBtn.innerHTML = '<i class="bi bi-person-check me-1"></i> Admin';
          loginBtn.setAttribute('href', 'admin-productos.html');
          loginBtn.style.whiteSpace = 'nowrap';
        }
      } catch (e) {}
    }
  });
})();
