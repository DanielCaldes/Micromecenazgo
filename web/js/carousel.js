const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach((carouselContainer) => {
    // Selección de elementos dentro de cada carrusel
    const carousel = carouselContainer.querySelector('.carousel');
    const carouselItems = carouselContainer.querySelectorAll('.carousel-item');
    const prevBtn = carouselContainer.querySelector('.carousel-button--prev');
    const nextBtn = carouselContainer.querySelector('.carousel-button--next');

    let currentIndex = 0; // Índice de la imagen actual

    // Función para mover el carrusel
    function moveCarousel() {
        const width = carouselItems[0].clientWidth;
        carousel.style.transform = `translateX(-${currentIndex * width}px)`;
    }

    // Función para ir a la siguiente imagen
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length; // Cicla entre las imágenes
        moveCarousel();
    });

    // Función para ir a la imagen anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length; // Cicla entre las imágenes
        moveCarousel();
    });

    // Mueve el carrusel al principio al cargar la página
    window.onload = () => moveCarousel();
});