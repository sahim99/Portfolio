// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
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

// Typing Animation
const typingWords = [
    "Python Developer",
    "DevOps Engineer",
    "Backend Specialist",
    "Automation Lover"
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingWordSpan = document.getElementById('typing-word');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

function typeWord() {
    const currentWord = typingWords[typingIndex];
    if (isDeleting) {
        typingWordSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingWordSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
        delay = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingWords.length;
        delay = 500;
    }
    setTimeout(typeWord, delay);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingWordSpan) typeWord();
});

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-content, .tech-item, .project-card, .contact-content');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Animate SVG tech stack lines when diagram is in view
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const diagram = document.getElementById('tech-diagram');
        if (!diagram) return;
        const lines = diagram.querySelectorAll('.tech-link');
        // Remove animation so it can be triggered
        lines.forEach(line => {
            line.style.animation = 'none';
            // Force reflow
            void line.offsetWidth;
            line.style.animation = '';
        });
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lines.forEach(line => {
                        line.classList.add('draw');
                    });
                    obs.disconnect();
                }
            });
        }, { threshold: 0.2 });
        observer.observe(diagram);
    });
})();

// Add draw class animation for .tech-link
const techStyle = document.createElement('style');
techStyle.innerHTML = `
    .tech-link.draw {
        animation: drawLine 1.2s cubic-bezier(0.77,0,0.18,1) forwards;
    }
    .tech-link.draw:nth-of-type(1) { animation-delay: 0.1s; }
    .tech-link.draw:nth-of-type(2) { animation-delay: 0.2s; }
    .tech-link.draw:nth-of-type(3) { animation-delay: 0.3s; }
    .tech-link.draw:nth-of-type(4) { animation-delay: 0.4s; }
    .tech-link.draw:nth-of-type(5) { animation-delay: 0.5s; }
    .tech-link.draw:nth-of-type(6) { animation-delay: 0.6s; }
    .tech-link.draw:nth-of-type(7) { animation-delay: 0.7s; }
    .tech-link.draw:nth-of-type(8) { animation-delay: 0.8s; }
    .tech-link.draw:nth-of-type(9) { animation-delay: 0.9s; }
    .tech-link.draw:nth-of-type(10) { animation-delay: 1.0s; }
    .tech-link.draw:nth-of-type(11) { animation-delay: 1.1s; }
    .tech-link.draw:nth-of-type(12) { animation-delay: 1.2s; }
    .tech-link.draw:nth-of-type(13) { animation-delay: 1.3s; }
    .tech-link.draw:nth-of-type(14) { animation-delay: 1.4s; }
`;
document.head.appendChild(techStyle);

// --- Navbar background update logic as a function ---
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (window.scrollY > 100) {
        if (isLight) {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = '0 4px 24px 0 rgba(80,180,255,0.10), 0 1.5px 0 #fff inset';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    } else {
        if (isLight) {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = '0 4px 24px 0 rgba(80,180,255,0.10), 0 1.5px 0 #fff inset';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}
window.addEventListener('scroll', updateNavbarBackground);
// --- Ensure navbar updates after theme toggle ---
const themeToggleBtn = document.getElementById('theme-toggle-btn');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        setTimeout(updateNavbarBackground, 10);
    });
}

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
/*
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Update button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send to Flask backend
            const response = await fetch('http://localhost:5000/send-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Error: ' + result.error, 'error');
            }
        } catch (error) {
            showNotification('Error: Could not connect to server. Please try again later.', 'error');
            console.error('Error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
*/

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Tech stack hover effects
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const techName = item.getAttribute('data-tech');
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particles, .gradient-waves');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to first nav link
    const firstNavLink = document.querySelector('.nav-link');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
    
    // Preload images for better performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar background effect
    const navbar = document.querySelector('.navbar');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (window.scrollY > 100) {
        if (isLight) {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = '0 4px 24px 0 rgba(80,180,255,0.10), 0 1.5px 0 #fff inset';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    } else {
        if (isLight) {
            navbar.style.background = '#fff';
            navbar.style.boxShadow = '0 4px 24px 0 rgba(80,180,255,0.10), 0 1.5px 0 #fff inset';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100));

// Theme Toggle Logic
const htmlEl = document.documentElement;
const toggleIcon = themeToggleBtn ? themeToggleBtn.querySelector('.toggle-icon') : null;

const sunSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5.5" stroke="#FFD600" stroke-width="2"/><g stroke="#FFD600" stroke-width="2"><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g></svg>`;
const moonSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 0 1 12.21 3a7 7 0 1 0 8.79 9.79z" stroke="#B3B3B3" stroke-width="2"/></svg>`;

function setTheme(theme) {
  if (theme === 'light') {
    htmlEl.setAttribute('data-theme', 'light');
    themeToggleBtn.classList.remove('active');
    if (toggleIcon) toggleIcon.innerHTML = sunSVG;
  } else {
    htmlEl.setAttribute('data-theme', 'dark');
    themeToggleBtn.classList.add('active');
    if (toggleIcon) toggleIcon.innerHTML = moonSVG;
  }
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

const initialTheme = getPreferredTheme();
setTheme(initialTheme);

function animateThemeTransition() {
  const body = document.body;
  body.classList.add('theme-transition');
  setTimeout(() => {
    body.classList.add('theme-in');
    setTimeout(() => {
      body.classList.remove('theme-transition', 'theme-in');
    }, 600);
  }, 10);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    animateThemeTransition();
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
  });
} 

// --- Tech Tree Tooltip Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const diagram = document.getElementById('tech-diagram');
  const tooltip = document.getElementById('tech-tooltip');
  if (!diagram || !tooltip) return;

  const techDescriptions = {
    Python: 'Core language for backend, automation, and AI/ML.',
    Flask: 'Lightweight Python web framework for APIs and apps.',
    Docker: 'Containerization for consistent, portable deployments.',
    AWS: 'Cloud platform for scalable infrastructure and services.',
    Terraform: 'Infrastructure as Code for cloud automation.',
    Jenkins: 'CI/CD automation server for DevOps pipelines.',
    Linux: 'Open-source OS for servers, dev, and automation.',
    Git: 'Version control for code collaboration and history.',
    SQL: 'Relational databases for structured data and analytics.'
  };

  function showTooltip(evt, tech) {
    tooltip.textContent = techDescriptions[tech] || tech;
    tooltip.classList.add('visible');
    // Position tooltip near mouse, but within container
    const containerRect = diagram.getBoundingClientRect();
    const mouseX = evt.clientX - containerRect.left;
    const mouseY = evt.clientY - containerRect.top;
    tooltip.style.left = `${mouseX + 12}px`;
    tooltip.style.top = `${mouseY - 8}px`;
    tooltip.style.transition = 'opacity 0.2s, transform 0.2s';
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(-12px) scale(1.08)';
  }
  function hideTooltip() {
    tooltip.classList.remove('visible');
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'scale(1)';
  }
  diagram.querySelectorAll('.tech-node').forEach(node => {
    const tech = node.getAttribute('data-tech');
    node.addEventListener('mousemove', e => showTooltip(e, tech));
    node.addEventListener('mouseleave', hideTooltip);
    node.addEventListener('touchstart', e => {
      showTooltip(e.touches[0], tech);
      setTimeout(hideTooltip, 2000);
    });
  });
}); 