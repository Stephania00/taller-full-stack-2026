// productos.js — Sprint 4
// Maneja dos páginas:
//   productos.html      → catálogo público (GET /productos — sin token)
//   admin-productos.html → panel CRUD (requiere token JWT)

const API_URL = CONFIG.API_URL; // Configuración centralizada

const fmt = n => '$' + Number(n).toLocaleString('es-CO');

// ── Headers con token para rutas protegidas ───────────────────────────────────
function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (localStorage.getItem('tn-token') || '')
    };
}

// ═══════════════════════════════════════════════════════════════
// CATÁLOGO PÚBLICO — productos.html
// ═══════════════════════════════════════════════════════════════

function initCatalogo() {
    fetch(`${API_URL}/productos`)
        .then(res => res.json())
        .then(data => {
            renderCatalogo(data, 'Todos');
            initFiltros(data);
        })
        .catch(() => {
            const catalogo = document.getElementById('catalogo');
            if (catalogo) {
                catalogo.innerHTML = `
                  <div class="col-12 text-center py-5">
                    <i class="bi bi-wifi-off fs-1 text-secondary"></i>
                    <p class="text-secondary mt-3 mb-0">No se pudo conectar con el servidor.<br>
                    Verificá que el backend esté corriendo en <strong>localhost:3000</strong>.</p>
                  </div>`;
            }
        });
}

function renderCatalogo(lista, filtro) {
    const datos = filtro === 'Todos' ? lista : lista.filter(p => p.categoria === filtro);
    const catalogo = document.getElementById('catalogo');
    const contador = document.getElementById('contador');
    if (!catalogo) return;

    if (contador) {
        contador.textContent = datos.length === 1
            ? '1 producto encontrado'
            : `${datos.length} productos encontrados`;
    }

    if (datos.length === 0) {
        catalogo.innerHTML = `
          <div class="col-12 text-center py-5">
            <i class="bi bi-box-seam fs-1 text-secondary"></i>
            <p class="text-secondary mt-3 mb-0">No hay productos en esta categoría.</p>
          </div>`;
        return;
    }

    catalogo.innerHTML = datos.map(p => `
        <div class="col-6 col-md-4 col-lg-3">
          <article class="card product-card card-hover h-100 border-0 overflow-hidden">
            ${p.imagen
                ? `<img src="${p.imagen}" class="card-img-top"
                     alt="${p.nombre}" style="aspect-ratio:1/1;object-fit:cover;">`
                : `<div class="ph ph-1-1"><span class="ph-label">[ ${p.categoria || 'Producto'} ]</span></div>`
            }
            <div class="card-body d-flex flex-column">
              <small class="text-secondary">${p.categoria || ''}</small>
              <h6 class="fw-semibold mt-1 mb-2 lh-sm">${p.nombre}</h6>
              <p class="small text-secondary flex-grow-1 mb-3">${p.descripcion || ''}</p>
              <div class="d-flex justify-content-between align-items-end">
                <div>
                  <div class="price fs-5 text-primary">${fmt(p.precio)}</div>
                  <small class="text-secondary">Stock: ${p.stock ?? 0}</small>
                </div>
                <button type="button" class="btn btn-soft btn-sm rounded-circle"
                  style="width:36px;height:36px;" aria-label="Agregar al carrito">
                  <i class="bi bi-bag-plus"></i>
                </button>
              </div>
            </div>
          </article>
        </div>`).join('');
}

function initFiltros(lista) {
    const contenedor = document.getElementById('filtros');
    if (!contenedor) return;

    const categorias = ['Todos', ...new Set(lista.map(p => p.categoria).filter(Boolean))];

    contenedor.innerHTML = categorias.map(cat =>
        `<button type="button" class="chip${cat === 'Todos' ? ' chip-activo' : ''}"
          data-cat="${cat}">${cat}</button>`
    ).join('');

    contenedor.querySelectorAll('[data-cat]').forEach(btn => {
        btn.addEventListener('click', function () {
            contenedor.querySelectorAll('[data-cat]').forEach(b => b.classList.remove('chip-activo'));
            this.classList.add('chip-activo');
            renderCatalogo(lista, this.dataset.cat);
        });
    });
}

// ═══════════════════════════════════════════════════════════════
// PANEL ADMIN — admin-productos.html
// ═══════════════════════════════════════════════════════════════

function listarProductos() {
    fetch(`${API_URL}/productos`)
        .then(res => res.json())
        .then(data => renderTabla(data))
        .catch(() => {
            const tbody = document.getElementById('tablaProductos');
            if (tbody) tbody.innerHTML = `
              <tr><td colspan="6" class="text-center text-danger py-4">
                <i class="bi bi-exclamation-triangle me-2"></i>
                No se pudo conectar con el backend.
              </td></tr>`;
        });
}

function renderTabla(lista) {
    const tbody = document.getElementById('tablaProductos');
    const total = document.getElementById('totalProductos');
    if (!tbody) return;

    if (total) total.textContent = `${lista.length} producto${lista.length !== 1 ? 's' : ''}`;

    if (lista.length === 0) {
        tbody.innerHTML = `
          <tr><td colspan="6" class="text-center text-secondary py-4">
            No hay productos registrados todavía.
          </td></tr>`;
        return;
    }

    tbody.innerHTML = lista.map(p => `
        <tr>
          <td><small class="text-secondary">#${p.id}</small></td>
          <td>
            <div class="fw-semibold lh-sm">${p.nombre}</div>
            <small class="text-secondary">${p.descripcion ? p.descripcion.substring(0, 50) + (p.descripcion.length > 50 ? '…' : '') : '—'}</small>
          </td>
          <td><span class="badge bg-soft-primary text-primary">${p.categoria || '—'}</span></td>
          <td class="text-end fw-semibold">${fmt(p.precio)}</td>
          <td class="text-center">${p.stock ?? 0}</td>
          <td class="text-center">
            <div class="d-flex gap-1 justify-content-center">
              <button type="button" class="btn btn-soft btn-sm"
                onclick="cargarEdicion(${p.id}, '${esc(p.nombre)}', '${esc(p.descripcion)}', ${p.precio}, '${esc(p.categoria)}', ${p.stock ?? 0}, '${esc(p.imagen)}')">
                <i class="bi bi-pencil"></i>
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger"
                onclick="eliminarProducto(${p.id}, '${esc(p.nombre)}')">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>`).join('');
}

function esc(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function guardarProducto(e) {
    e.preventDefault();

    const id = document.getElementById('productoId').value;
    const datos = {
        nombre:      document.getElementById('pNombre').value.trim(),
        descripcion: document.getElementById('pDescripcion').value.trim(),
        precio:      document.getElementById('pPrecio').value,
        categoria:   document.getElementById('pCategoria').value,
        stock:       document.getElementById('pStock').value || 0,
        imagen:      document.getElementById('pImagen').value.trim(),
    };

    if (!datos.nombre || !datos.precio) {
        mostrarMensaje('Nombre y precio son obligatorios.', 'text-danger');
        return;
    }

    const metodo = id ? 'PUT' : 'POST';
    const url    = id ? `${API_URL}/productos/${id}` : `${API_URL}/productos`;

    fetch(url, {
        method: metodo,
        headers: authHeaders(),
        body: JSON.stringify(datos),
    })
    .then(res => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('tn-token');
            window.location.href = 'login.html';
            return;
        }
        if (!res.ok) return res.text().then(t => { throw new Error(t); });
        return res.text();
    })
    .then(msg => {
        if (!msg) return;
        mostrarMensaje(id ? 'Producto actualizado.' : 'Producto registrado.', 'text-success');
        limpiarFormulario();
        listarProductos();
    })
    .catch(err => mostrarMensaje(err.message || 'Error al conectar con el servidor.', 'text-danger'));
}

function cargarEdicion(id, nombre, descripcion, precio, categoria, stock, imagen) {
    document.getElementById('productoId').value   = id;
    document.getElementById('pNombre').value      = nombre;
    document.getElementById('pDescripcion').value = descripcion;
    document.getElementById('pPrecio').value      = precio;
    document.getElementById('pCategoria').value   = categoria;
    document.getElementById('pStock').value       = stock;
    document.getElementById('pImagen').value      = imagen;

    document.getElementById('formTitulo').textContent = 'Editar producto';
    document.getElementById('btnGuardar').innerHTML   = '<i class="bi bi-check-lg me-1"></i>Actualizar producto';
    document.getElementById('btnCancelar').classList.remove('d-none');

    document.getElementById('formProducto').scrollIntoView({ behavior: 'smooth' });
}

function eliminarProducto(id, nombre) {
    if (!confirm(`¿Eliminás el producto "${nombre}"?\nEsta acción no se puede deshacer.`)) return;

    fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
    .then(res => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('tn-token');
            window.location.href = 'login.html';
            return;
        }
        if (!res.ok) return res.text().then(t => { throw new Error(t); });
        return res.text();
    })
    .then(msg => {
        if (!msg) return;
        mostrarMensaje('Producto eliminado.', 'text-success');
        listarProductos();
    })
    .catch(err => mostrarMensaje(err.message || 'Error al eliminar.', 'text-danger'));
}

function limpiarFormulario() {
    document.getElementById('formProducto').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('formTitulo').textContent = 'Nuevo producto';
    document.getElementById('btnGuardar').innerHTML   = '<i class="bi bi-check-lg me-1"></i>Guardar producto';
    document.getElementById('btnCancelar').classList.add('d-none');
}

function mostrarMensaje(texto, clase) {
    const el = document.getElementById('mensajeForm');
    if (!el) return;
    el.textContent = texto;
    el.className   = `mt-3 text-center small fw-semibold ${clase}`;
    setTimeout(() => { el.textContent = ''; }, 4000);
}

// ═══════════════════════════════════════════════════════════════
// INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // productos.html — catálogo público
    if (document.getElementById('catalogo')) {
        initCatalogo();
    }

    // admin-productos.html — panel de gestión (requiere token)
    if (document.getElementById('formProducto')) {
        if (!localStorage.getItem('tn-token')) {
            window.location.href = 'login.html';
            return;
        }

        listarProductos();

        document.getElementById('formProducto')
            .addEventListener('submit', guardarProducto);

        document.getElementById('btnCancelar')
            .addEventListener('click', limpiarFormulario);

        document.getElementById('btnLogout')
            .addEventListener('click', function () {
                localStorage.removeItem('tn-token');
                window.location.href = 'login.html';
            });
    }

});
