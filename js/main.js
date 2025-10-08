document.addEventListener('DOMContentLoaded', function() {
    
    // --- CONFIGURACIÓN DEL CONTADOR ---
    // CAMBIA ESTE VALOR cada vez que recibas una donación para actualizar la página.
    const meta = 5500;
    let recaudado = 0; // <-- EDITA AQUÍ EL MONTO ACTUAL

    // --- NO ES NECESARIO EDITAR DEBAJO DE ESTA LÍNEA ---
    
    const progressFill = document.getElementById('progress-fill');
    const recaudadoSpan = document.getElementById('recaudado');
    const metaSpan = document.getElementById('meta');

    function actualizarContador() {
        const porcentaje = Math.min((recaudado / meta) * 100, 100);
        
        progressFill.style.width = porcentaje + '%';
        recaudadoSpan.textContent = `$${recaudado.toLocaleString()}`;
        metaSpan.textContent = `$${meta.toLocaleString()}`;

        // Mostrar el porcentaje dentro de la barra si hay espacio
        if (porcentaje > 10) {
            progressFill.textContent = `${Math.round(porcentaje)}%`;
        } else {
            progressFill.textContent = ''; // Ocultar si es muy pequeño
        }
    }

    // Llamar a la función al cargar la página
    actualizarContador();

    // Mensaje de agradecimiento al hacer clic en el botón principal
    const mainDonationBtn = document.getElementById('main-donation-btn');
    mainDonationBtn.addEventListener('click', function(e) {
        // Mostrar una alerta simple. Se puede reemplazar por un modal más elegante.
        const confirmacion = confirm("¡Muchísimas gracias por tu increíble apoyo! Serás redirigido a PayPal para completar tu donación. Tu ayuda cambia nuestras vidas.");
        if (!confirmacion) {
            e.preventDefault(); // Previene la redirección si el usuario cancela
        }
    });
});