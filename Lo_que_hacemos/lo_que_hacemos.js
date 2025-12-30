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

// Intersection Observer for scroll animations
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

// Observe all animated elements
const animatedElements = document.querySelectorAll('.service-card, .download-card, .process-step');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

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
const heroServices = document.querySelector('.hero-services');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroServices && scrolled < heroServices.offsetHeight) {
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

// Download buttons functionality
const downloadButtons = document.querySelectorAll('.download-button');
downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const fileName = this.getAttribute('data-file');
        
        // Aquí debes especificar la ruta correcta donde están tus PDFs
        // Por ejemplo, si están en una carpeta "documents" o "pdfs":
        const filePath = `../documents/${fileName}`;
        
        // Crear un elemento anchor temporal para la descarga
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Feedback visual
        const originalText = this.innerHTML;
        this.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Descargando...
        `;
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add hover effect to download cards
const downloadCards = document.querySelectorAll('.download-card');
downloadCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Stagger animation for service cards
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) {
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                servicesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    servicesObserver.observe(servicesGrid);
}

// Stagger animation for download cards
const downloadsGrid = document.querySelector('.downloads-grid');
if (downloadsGrid) {
    const downloadsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.download-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                downloadsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    downloadsObserver.observe(downloadsGrid);
}

// Stagger animation for process steps
const processTimeline = document.querySelector('.process-timeline');
if (processTimeline) {
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = entry.target.querySelectorAll('.process-step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                processObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    processObserver.observe(processTimeline);
}

// Prevenir comportamiento por defecto en enlaces vacíos
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Add smooth reveal animation for section headers
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    headerObserver.observe(header);
});

// Add animation to CTA section
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

// Counter animation for process numbers (optional enhancement)
const processNumbers = document.querySelectorAll('.step-number');
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 0.6s ease';
        }
    });
}, { threshold: 0.5 });

processNumbers.forEach(num => {
    numberObserver.observe(num);
});

// Performance optimization: Throttle scroll events
let ticking = false;
const throttle = (fn) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            fn();
            ticking = false;
        });
        ticking = true;
    }
};

// Lazy loading for images (si decides agregar imágenes en el futuro)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            observer.unobserve(img);
        }
    });
});

// Add pulse animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});