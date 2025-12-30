// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Carousel functionality for project cards with animations
class Carousel {
    constructor(container) {
        this.container = container;
        this.images = container.querySelectorAll('.project-img');
        this.currentIndex = 0;
        this.prevBtn = container.querySelector('.prev-btn');
        this.nextBtn = container.querySelector('.next-btn');
        this.dotsContainer = container.querySelector('.carousel-dots');
        this.isAnimating = false;
        
        this.reset();
        this.init();
    }
    
    reset() {
        // Asegurar que solo la primera imagen esté activa al inicio
        this.images.forEach((img, index) => {
            // Forzar reset completo
            img.classList.remove('active');
            img.style.animation = '';
            img.style.opacity = '';
            img.style.visibility = '';
            img.style.pointerEvents = '';
            img.style.transform = '';
            
            // Activar solo la primera imagen
            if (index === 0) {
                // Forzar con setTimeout para asegurar que se aplique después del reset
                setTimeout(() => {
                    img.classList.add('active');
                }, 10);
            }
        });
        
        // Limpiar dots si existen
        if (this.dotsContainer) {
            this.dotsContainer.innerHTML = '';
        }
    }
    
    init() {
        // Create dots
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                this.goToSlide(index);
            });
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        
        // Add event listeners
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.prevSlide();
        });
        
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.nextSlide();
        });
    }
    
    goToSlide(index, direction = null) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.isAnimating = true;
        
        const currentImage = this.images[this.currentIndex];
        const nextImage = this.images[index];
        
        // Auto-detect direction if not provided
        if (!direction) {
            direction = index > this.currentIndex ? 'next' : 'prev';
        }
        
        // Remove active class from current dot
        this.dots[this.currentIndex].classList.remove('active');
        
        // Limpiar estilos inline de la imagen actual
        currentImage.style.opacity = '';
        currentImage.style.visibility = '';
        currentImage.style.pointerEvents = '';
        
        // Remove active class from current image first
        currentImage.classList.remove('active');
        
        // Add animation classes based on direction
        if (direction === 'next') {
            currentImage.style.animation = 'slideOutLeft 0.5s ease-out forwards';
            nextImage.style.animation = 'slideInRight 0.5s ease-out forwards';
        } else {
            currentImage.style.animation = 'slideOutRight 0.5s ease-out forwards';
            nextImage.style.animation = 'slideInLeft 0.5s ease-out forwards';
        }
        
        // Make next image visible with active class
        nextImage.classList.add('active');
        
        // Update current index immediately
        this.currentIndex = index;
        this.dots[this.currentIndex].classList.add('active');
        
        // Wait for animation to complete, then clean up
        setTimeout(() => {
            currentImage.style.animation = '';
            nextImage.style.animation = '';
            // Limpiar estilos inline
            currentImage.style.opacity = '';
            currentImage.style.visibility = '';
            currentImage.style.pointerEvents = '';
            nextImage.style.opacity = '';
            nextImage.style.visibility = '';
            nextImage.style.pointerEvents = '';
            this.isAnimating = false;
        }, 500);
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex, 'next');
    }
    
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.goToSlide(prevIndex, 'prev');
    }
}

// Initialize carousels for all project cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-container').forEach(container => {
        new Carousel(container);
    });
});

// Modal functionality
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modalTitle');
const modalLocation = document.getElementById('modalLocation');
const modalDescription = document.getElementById('modalDescription');

let modalCarousel = null;

// Open modal when clicking on project card or "Ver detalles" button
document.querySelectorAll('.project-card').forEach(card => {
    const viewDetailsBtn = card.querySelector('.view-details');
    const projectInfo = card.querySelector('.project-info');
    
    const openModalHandler = (e) => {
        e.stopPropagation();
        const projectId = card.getAttribute('data-project');
        openModal(card);
    };
    
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', openModalHandler);
    }
    
    if (projectInfo) {
        projectInfo.addEventListener('click', openModalHandler);
    }
});

function openModal(card) {
    // Get data from the card itself
    const title = card.querySelector('.project-title').textContent;
    const location = card.querySelector('.project-location').textContent;
    const images = Array.from(card.querySelectorAll('.project-img')).map(img => img.src);
    
    // Set modal content
    modalTitle.textContent = title;
    modalLocation.textContent = location;
    
    // Reset and set modal images
    const modalImages = modal.querySelectorAll('.modal-carousel-img');
    modalImages.forEach((img, index) => {
        img.classList.remove('active');
        img.style.animation = '';
        img.style.opacity = '0';
        
        if (images[index]) {
            img.src = images[index];
            img.alt = title;
            
            if (index === 0) {
                img.classList.add('active');
                img.style.opacity = '1';
            }
        }
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Destroy previous carousel if exists
    if (modalCarousel) {
        modalCarousel = null;
    }
    
    // Initialize modal carousel
    setTimeout(() => {
        const modalCarouselContainer = document.querySelector('.modal-carousel-container');
        modalCarousel = new Carousel(modalCarouselContainer);
    }, 100);
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
const heroProjects = document.querySelector('.hero-projects');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroProjects && scrolled < heroProjects.offsetHeight) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    }
});

// Animación de entrada al cargar la página
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animar el hero
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Intersection Observer para animaciones de scroll
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

// Observar elementos con animación
const animatedElements = document.querySelectorAll('.section-header, .cta-content');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Add loading state to images
const projectImages = document.querySelectorAll('.project-img');
projectImages.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Prevenir comportamiento por defecto en enlaces vacíos
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Add fade-in animation to CTA section
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ctaContent = entry.target.querySelector('.cta-content');
                if (ctaContent) {
                    ctaContent.style.opacity = '1';
                    ctaContent.style.transform = 'translateY(0)';
                }
            }
        });
    }, { threshold: 0.3 });
    
    const ctaContent = ctaSection.querySelector('.cta-content');
    if (ctaContent) {
        ctaContent.style.opacity = '0';
        ctaContent.style.transform = 'translateY(30px)';
        ctaContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    ctaObserver.observe(ctaSection);
}

console.log('Nuestros Proyectos - HVAC con carrusel y animaciones initialized successfully');
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});