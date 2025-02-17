const hamburgerButton = document.querySelector('.hamburger');
const navigationMenu = document.querySelector('.navigation');
const menuLinks = document.querySelectorAll('.navigation a');

// Añadimos el evento de clic al botón hamburguesa
hamburgerButton.addEventListener('click', function() {
    if (navigationMenu.style.display === "none" || navigationMenu.style.display === "") {
        navigationMenu.style.display = "flex";  // Lo mostramos
    } else {
        navigationMenu.style.display = "none";  // Lo ocultamos
    }
});

// Si el tamaño de la ventana es mayor que 768px (pantalla grande)
function checkWindowSize() {
    if (window.innerWidth > 768) {
        navigationMenu.style.display = "flex";
    } else {
        navigationMenu.style.display = "none";  // Lo ocultamos
    }
}

menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {  // Solo lo ocultamos si estamos en modo móvil
            navigationMenu.style.display = "none";  // Ocultamos el menú cuando se hace clic en un enlace
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    checkWindowSize();
});


window.addEventListener('resize', checkWindowSize);