// Theme toggling logic
const themeBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Check local storage for preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);
} else {
    // Default to dark as requested ('qui claque' often refers to a nice dark mode initially)
    htmlEl.setAttribute('data-theme', 'dark');
}

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateIcons(newTheme);
});

function updateIcons(theme) {
    if (theme === 'dark') {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
}

// Language toggling logic
const langToggle = document.getElementById('lang-toggle');
const savedLang = localStorage.getItem('lang') || 'fr';

document.documentElement.lang = savedLang;
if (langToggle) {
    langToggle.value = savedLang;
    langToggle.addEventListener('change', (e) => {
        const newLang = e.target.value;
        document.documentElement.lang = newLang;
        localStorage.setItem('lang', newLang);
    });
}

// Fade in up animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach((el) => {
    observer.observe(el);
});

// Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const indicators = document.querySelectorAll('.indicator');

    if (track && indicators.length > 0) {
        let currentIndex = 0;
        const totalSlides = indicators.length;
        let slideInterval;

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 33.33}%)`;

            indicators.forEach((ind, i) => {
                if (i === index) {
                    ind.classList.add('active');
                    ind.style.background = 'white';
                } else {
                    ind.classList.remove('active');
                    ind.style.background = 'rgba(255,255,255,0.5)';
                }
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(currentIndex);
        };

        // Auto play
        const startSlideShow = () => {
            slideInterval = setInterval(nextSlide, 3000);
        };

        const stopSlideShow = () => {
            clearInterval(slideInterval);
        };

        startSlideShow();

        // Manual navigation
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel(currentIndex);
                stopSlideShow();
                startSlideShow(); // Reset timer
            });
        });

        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopSlideShow);
            carouselContainer.addEventListener('mouseleave', startSlideShow);
        }
    }
});
