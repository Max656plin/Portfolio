// ============================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar Tooltips de Bootstrap
    initTooltips();
    
    // Inicializar Modal de Audio
    initAudioModal();
    
    // Inicializar Control de Audio
    initAudioControl();
    
    // Inicializar Control de Video
    initVideoControl();
    
    // Inicializar botón de habilidades ocultas
    initHabilidadesButton();
    
    // Inicializar formulario
    initFormulario();
    
    // Animaciones de scroll
    initScrollAnimations();
    
    console.log('✅ Portfolio cargado correctamente');
});

// ============================================
// TOOLTIPS DE BOOTSTRAP
// ============================================
function initTooltips() {
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover'
        });
    });
    
    console.log('✅ Tooltips inicializados:', tooltipTriggerList.length);
}

// ============================================
// MODAL DE AUDIO - Se abre automáticamente
// ============================================
function initAudioModal() {
    const audioModal = new bootstrap.Modal(document.getElementById('audioModal'), {
        keyboard: false
    });
    
    const audio = document.getElementById('audioFondo');
    const btnActivarAudio = document.getElementById('activarAudio');
    
    // Mostrar modal después de 500ms
    setTimeout(() => {
        audioModal.show();
    }, 500);
    
    // Botón para activar audio
    btnActivarAudio.addEventListener('click', function() {
        audio.play()
            .then(() => {
                console.log('🎵 Audio activado');
                audioModal.hide();
                
                // Mostrar notificación
                mostrarNotificacion('Audio activado', 'success');
            })
            .catch(error => {
                console.error('❌ Error al reproducir audio:', error);
                mostrarNotificacion('Error al reproducir audio', 'danger');
            });
    });
}

// ============================================
// CONTROL DE AUDIO FLOTANTE
// ============================================
function initAudioControl() {
    const audio = document.getElementById('audioFondo');
    const btnAudio = document.getElementById('btnAudio');
    const iconoAudio = document.getElementById('iconoAudio');
    
    let isPlaying = false;
    
    btnAudio.addEventListener('click', function() {
        if (isPlaying) {
            // Pausar audio
            audio.pause();
            iconoAudio.classList.remove('fa-volume-up');
            iconoAudio.classList.add('fa-volume-mute');
            btnAudio.classList.remove('btn-primary');
            btnAudio.classList.add('btn-secondary');
            
            // Actualizar tooltip
            const tooltip = bootstrap.Tooltip.getInstance(btnAudio);
            btnAudio.setAttribute('data-bs-original-title', 'Activar música de fondo');
            tooltip.hide();
            
            console.log('🔇 Audio silenciado');
        } else {
            // Reproducir audio
            audio.play()
                .then(() => {
                    iconoAudio.classList.remove('fa-volume-mute');
                    iconoAudio.classList.add('fa-volume-up');
                    btnAudio.classList.remove('btn-secondary');
                    btnAudio.classList.add('btn-primary');
                    
                    // Actualizar tooltip
                    const tooltip = bootstrap.Tooltip.getInstance(btnAudio);
                    btnAudio.setAttribute('data-bs-original-title', 'Silenciar música de fondo');
                    tooltip.hide();
                    
                    console.log('🔊 Audio activado');
                })
                .catch(error => {
                    console.error('❌ Error al reproducir audio:', error);
                    mostrarNotificacion('Interactúa con la página para activar el audio', 'warning');
                });
        }
        
        isPlaying = !isPlaying;
    });
    
    // Detectar cuando el audio termina (aunque está en loop)
    audio.addEventListener('ended', function() {
        console.log('🎵 Audio finalizado');
    });
    
    // Detectar errores de carga
    audio.addEventListener('error', function() {
        console.error('❌ Error al cargar el audio. Verifica que los archivos existan en media/');
        mostrarNotificacion('No se pudo cargar el audio', 'danger');
    });
}

// ============================================
// CONTROL DE VIDEO
// ============================================
function initVideoControl() {
    const video = document.getElementById('videoPresentacion');
    const btnPlayVideo = document.getElementById('btnPlayVideo');
    
    btnPlayVideo.addEventListener('click', function() {
        if (video.paused) {
            video.play()
                .then(() => {
                    btnPlayVideo.innerHTML = '<i class="fas fa-pause me-2"></i>Pausar Video';
                    btnPlayVideo.classList.remove('btn-success');
                    btnPlayVideo.classList.add('btn-warning');
                    console.log('▶️ Video reproduciendo');
                })
                .catch(error => {
                    console.error('❌ Error al reproducir video:', error);
                    mostrarNotificacion('Error al reproducir el video', 'danger');
                });
        } else {
            video.pause();
            btnPlayVideo.innerHTML = '<i class="fas fa-play me-2"></i>Reproducir Video';
            btnPlayVideo.classList.remove('btn-warning');
            btnPlayVideo.classList.add('btn-success');
            console.log('⏸️ Video pausado');
        }
    });
    
    // Detectar cuando el video termina
    video.addEventListener('ended', function() {
        btnPlayVideo.innerHTML = '<i class="fas fa-play me-2"></i>Reproducir Video';
        btnPlayVideo.classList.remove('btn-warning');
        btnPlayVideo.classList.add('btn-success');
        console.log('🎬 Video finalizado');
    });
    
    // Detectar errores de carga
    video.addEventListener('error', function() {
        console.error('❌ Error al cargar el video. Verifica que los archivos existan en media/');
        mostrarNotificacion('No se pudo cargar el video', 'danger');
    });
}

// ============================================
// BOTÓN MOSTRAR HABILIDADES (HTML5 hidden)
// ============================================
function initHabilidadesButton() {
    const btnMostrar = document.getElementById('btnMostrarHabilidades');
    const habilidadesDiv = document.getElementById('habilidadesOcultas');
    
    let mostrado = false;
    
    btnMostrar.addEventListener('click', function() {
        if (mostrado) {
            // Ocultar
            habilidadesDiv.hidden = true;
            btnMostrar.innerHTML = '<i class="fas fa-eye me-2"></i>Mostrar Habilidades Técnicas';
            btnMostrar.classList.remove('btn-danger');
            btnMostrar.classList.add('btn-outline-primary');
        } else {
            // Mostrar
            habilidadesDiv.hidden = false;
            btnMostrar.innerHTML = '<i class="fas fa-eye-slash me-2"></i>Ocultar Habilidades Técnicas';
            btnMostrar.classList.remove('btn-outline-primary');
            btnMostrar.classList.add('btn-danger');
        }
        
        mostrado = !mostrado;
    });
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
function initFormulario() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica
        if (!nombre || !email || !mensaje) {
            mostrarNotificacion('Por favor completa todos los campos', 'warning');
            return;
        }
        
        // Simular envío
        console.log('📧 Enviando formulario:', { nombre, email, mensaje });
        
        // Mostrar mensaje de éxito
        mostrarNotificacion('¡Mensaje enviado correctamente!', 'success');
        
        // Limpiar formulario
        form.reset();
    });
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar secciones
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observar cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// FUNCIÓN PARA MOSTRAR NOTIFICACIONES
// (Usando Toasts de Bootstrap)
// ============================================
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear toast dinámicamente
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${tipo} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    // Crear contenedor si no existe
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Añadir toast
    toastContainer.innerHTML = toastHTML;
    
    // Mostrar toast
    const toastElement = toastContainer.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Eliminar después de ocultar
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// ============================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ============================================
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar navbar en móvil
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        }
    });
});

// ============================================
// NAVBAR SHRINK AL HACER SCROLL
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-shrink');
    } else {
        navbar.classList.remove('navbar-shrink');
    }
});

// ============================================
// DETECCIÓN DE COMPATIBILIDAD MULTIMEDIA
// ============================================
function checkMultimediaSupport() {
    const audio = document.getElementById('audioFondo');
    const video = document.getElementById('videoPresentacion');
    
    // Verificar soporte de audio
    const audioSupport = {
        mp3: audio.canPlayType('audio/mpeg'),
        ogg: audio.canPlayType('audio/ogg')
    };
    
    // Verificar soporte de video
    const videoSupport = {
        mp4: video.canPlayType('video/mp4'),
        webm: video.canPlayType('video/webm'),
        ogg: video.canPlayType('video/ogg')
    };
    
    console.log('🎵 Soporte de Audio:', audioSupport);
    console.log('🎬 Soporte de Video:', videoSupport);
    
    return { audioSupport, videoSupport };
}

// Ejecutar verificación
checkMultimediaSupport();

// ============================================
// EASTER EGG - Konami Code por Kojima 
// ============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        mostrarNotificacion('Si has intentado esto y lo has logrado Kojima estará orgulloso', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ============================================
// LOG DE FINALIZACIÓN
// ============================================
console.log(`
╔═══════════════════════════════════════════╗
║   Portfolio de Máximo Casado Giner        ║
║   Con Bootstrap 5 & Multimedia            ║
║   Todos los sistemas operativos           ║ 
╚═══════════════════════════════════════════╝
`);

// ============================================
// EXPORTAR FUNCIONES PARA TESTING (Node.js)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initTooltips,
        mostrarNotificacion,
        checkMultimediaSupport
    };
}
