/* ===========================
   MOBILE MENU TOGGLE
   =========================== */
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.sidebar .nav-link');

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('show');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
});

// Close sidebar when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    });
});


/* ===========================
   SMOOTH SCROLL BEHAVIOR
   =========================== */
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

/* ===========================
   ACTIVE NAV LINK HIGHLIGHT
   =========================== */
const sections = document.querySelectorAll('section');

function highlightActiveSection() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

/* ===========================
   SCROLL REVEAL ANIMATION
   =========================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project items
document.querySelectorAll('.skill-card, .project-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ===========================
   NAVBAR SHADOW ON SCROLL
   =========================== */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 212, 255, 0.1)';
    }
});

/* ===========================
   ADD ACTIVE CLASS TO NAV LINK
   =========================== */
function addActiveNavStyle() {
    const currentScroll = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (currentScroll >= sectionTop - 100 && currentScroll < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                // Don't set inline styles for mobile sidebar nav links
                if (!link.closest('.nav-menu')) {
                    link.style.color = '#e0e0e0';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = '#00ffff';
                        link.style.borderBottom = '3px solid #00ffff';
                        link.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8)';
                    } else {
                        link.style.borderBottom = 'none';
                        link.style.textShadow = 'none';
                    }
                }
            });
        }
    });
}

window.addEventListener('scroll', addActiveNavStyle);

/* ===========================
   PAGE LOAD ANIMATION
   =========================== */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/* ===========================
   CONTACT LINK HANDLERS
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    // Update contact information
    const emailLink = document.querySelector('a[href^="mailto:"]');
    const whatsappLink = document.querySelector('a[href^="https://wa.me/"]');
    const linkedinLink = document.querySelector('a[href*="linkedin"]');
    const githubLink = document.querySelector('a[href*="github"]');

    // Replace with actual contact details
    if (emailLink) {
        emailLink.href = 'mailto:your.email@example.com';
    }
    if (whatsappLink) {
        whatsappLink.href = 'https://wa.me/your-phone-number';
    }
    if (linkedinLink) {
        linkedinLink.href = 'https://linkedin.com/in/your-profile';
    }
    if (githubLink) {
        githubLink.href = 'https://github.com/your-username';
    }
});

/* ===========================
   DEBOUNCE FUNCTION
   =========================== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ===========================
   PERFORMANCE: Lazy load images if any
   =========================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===========================
   PRINT FUNCTIONALITY
   =========================== */
function printPage() {
    window.print();
}

/* ===========================
   UTILITY: Format Phone Number
   =========================== */
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return phoneNumber;
}

/* ===========================
   CONSOLE WELCOME MESSAGE
   =========================== */
console.log(
    '%cIT Support & Network Portfolio',
    'color: #0066cc; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cDesigned for fresh graduates in IT Support and Network Management',
    'color: #666666; font-size: 14px;'
);
