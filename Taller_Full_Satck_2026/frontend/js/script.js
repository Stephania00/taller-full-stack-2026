const formulario = document.getElementById("formulario");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre  = document.getElementById("nombre").value.trim();
        const correo  = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const asunto  = document.getElementById("asunto").value;
        const acepto  = document.getElementById("acepto").checked;

        const respuesta = document.getElementById("respuesta");

        // Validación
        if (!nombre || !correo || !mensaje) {
            respuesta.textContent = "Nombre, email y mensaje son obligatorios.";
            return;
        }
        if (!asunto) {
            respuesta.textContent = "Por favor seleccioná un asunto.";
            return;
        }
        if (!acepto) {
            respuesta.textContent = "Debés aceptar la política de privacidad.";
            return;
        }

        // ENVIAR AL BACKEND
        fetch(`${CONFIG.API_URL}/guardar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
        })
        .then(res => res.text())
        .then(data => {
            console.log("Respuesta servidor:", data);
            respuesta.textContent = "Datos guardados en MySQL correctamente";
            formulario.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            respuesta.textContent = "Error al guardar los datos";
        });

    });
}
