document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchMoveX = 0;

    slides[0].classList.add('active');

    const updateSlides = () => {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
    });

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchmove', (e) => {
        touchMoveX = e.changedTouches[0].screenX;
        e.preventDefault();
    });

    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const swipeThreshold = 50;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });
});