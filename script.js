document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

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

    // Handle touch events with improved iOS compatibility
    slides.forEach(slide => {
        let startX = 0;
        let startY = 0;
        let initialTouchTime = 0;
        let isHorizontalSwipe = false;
        
        slide.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            initialTouchTime = Date.now();
            isHorizontalSwipe = false;
        }, { passive: true });

        slide.addEventListener('touchmove', (e) => {
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            const elapsedTime = Date.now() - initialTouchTime;

            // Determine if this is a horizontal swipe
            // Must meet all criteria:
            // 1. Horizontal movement is significantly larger than vertical (1.5x)
            // 2. Horizontal movement exceeds minimum threshold (10px)
            // 3. Movement happened within timing window (300ms)
            // 4. Total movement is not too large (prevents accidental swipes)
            if (Math.abs(diffX) > Math.abs(diffY) * 1.5 && 
                Math.abs(diffX) > 10 && 
                Math.abs(diffX) < 150 && 
                elapsedTime < 300) {
                
                isHorizontalSwipe = true;
                e.preventDefault();
            }
        }, { passive: false });

        slide.addEventListener('touchend', (e) => {
            const diffX = startX - e.changedTouches[0].clientX;
            const diffY = startY - e.changedTouches[0].clientY;
            const elapsedTime = Date.now() - initialTouchTime;

            // Only trigger slide change if:
            // 1. It was determined to be a horizontal swipe
            // 2. The movement is significant enough (50px)
            // 3. The gesture was quick enough (300ms)
            // 4. Horizontal movement is clearly dominant
            if (isHorizontalSwipe && 
                Math.abs(diffX) > 50 && 
                Math.abs(diffX) > Math.abs(diffY) * 1.5 && 
                elapsedTime < 300) {
                
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }, { passive: true });
    });
});