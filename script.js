// Карусель админки
class Carousel {
    constructor(containerClass) {
        this.container = document.querySelector(containerClass);
        this.slides = this.container.querySelectorAll('.carousel-slide, .bot-slide');
        this.dots = this.container.querySelectorAll('.dot, .bot-dot');
        this.prevBtn = this.container.querySelector('.carousel-prev, .bot-prev');
        this.nextBtn = this.container.querySelector('.carousel-next, .bot-next');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.showSlide(this.currentSlide);
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }
    
    next() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) nextIndex = 0;
        this.showSlide(nextIndex);
    }
    
    prev() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) prevIndex = this.slides.length - 1;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
}

// Инициализация каруселей
document.addEventListener('DOMContentLoaded', () => {
    new Carousel('.carousel');
    new Carousel('.bot-carousel');
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.feature-card, .pipeline-step, .workflow-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
