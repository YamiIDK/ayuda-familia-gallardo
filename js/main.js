document.addEventListener('DOMContentLoaded', function() {
    
    // --- CONFIGURACIÓN DEL CONTADOR ---
    // CAMBIA ESTE VALOR cada vez que recibas una donación para actualizar la página.
    const meta = 5500;
    let recaudado = 0; // <-- EDITA AQUÍ EL MONTO ACTUAL

    // --- CONFIGURACIÓN DE IDIOMA ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const htmlElement = document.documentElement;
    const defaultLang = 'es';
    let currentLang = localStorage.getItem('lang') || defaultLang;

    // --- FUNCIONES ---

    function actualizarContador() {
        const progressFill = document.getElementById('progress-fill');
        const recaudadoSpan = document.getElementById('recaudado');
        const metaSpan = document.getElementById('meta');

        const porcentaje = Math.min((recaudado / meta) * 100, 100);
        
        progressFill.style.width = porcentaje + '%';
        recaudadoSpan.textContent = `$${recaudado.toLocaleString()}`;
        metaSpan.textContent = `$${meta.toLocaleString()}`;

        if (porcentaje > 10) {
            progressFill.textContent = `${Math.round(porcentaje)}%`;
        } else {
            progressFill.textContent = '';
        }
    }

    function setLanguage(lang) {
        const elementsToTranslate = document.querySelectorAll('[data-es]');
        
        elementsToTranslate.forEach(el => {
            if (lang === 'en') {
                el.textContent = el.getAttribute('data-en');
            } else {
                el.textContent = el.getAttribute('data-es');
            }
        });

        htmlElement.setAttribute('lang', lang);
        langToggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    function toggleLanguage() {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        setLanguage(newLang);
    }

    // --- INICIALIZACIÓN ---

    // Establecer el idioma guardado al cargar la página
    setLanguage(currentLang);

    // Actualizar el contador al cargar la página
    actualizarContador();

    // --- EVENT LISTENERS ---

    // Evento para el botón de cambio de idioma
    langToggleBtn.addEventListener('click', toggleLanguage);

    // Mensaje de agradecimiento al hacer clic en el botón principal
    const mainDonationBtn = document.getElementById('main-donation-btn');
    mainDonationBtn.addEventListener('click', function(e) {
        const thankYouMsg = currentLang === 'en' 
            ? "Thank you so much for your incredible support! You will be redirected to PayPal to complete your donation. Your help changes our lives."
            : "¡Muchísimas gracias por tu increíble apoyo! Serás redirigido a PayPal para completar tu donación. Tu ayuda cambia nuestras vidas.";
        
        const confirmation = confirm(thankYouMsg);
        if (!confirmation) {
            e.preventDefault();
        }
    });
});