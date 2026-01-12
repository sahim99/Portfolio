// =========================================
// 1. LOADING SCREEN
// =========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5, // Faster fade
        delay: 0.2,    // Shorter wait
        onStart: () => {
            initAnimations(); // Start animations immediately as screen fades
        },
        onComplete: () => {
            loadingScreen.style.display = 'none';
        }
    });
});

// =========================================
// 2. THREE.JS BACKGROUND (Starfield Network)
// =========================================
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for retina
    container.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const counts = 2000; // Number of particles
    const positions = new Float32Array(counts * 3);

    for (let i = 0; i < counts * 3; i++) {
        // Spread particles in a large sphere
        positions[i] = (Math.random() - 0.5) * 20; 
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x64ffda, // Accent Color
        transparent: true,
        opacity: 0.8,
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animate
    const clock = new THREE.Clock();

    function animate() {
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        const elapsedTime = clock.getElapsedTime();

        // Rotate entire system slowly
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Mouse interaction smoothing
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        // Wave effect
        // particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.2;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();

    // Resize Handle
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Three.js immediately
initThreeJS();


// =========================================
// 3. GSAP ANIMATIONS
// =========================================
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    
    // Hero Text Stagger
    const heroTl = gsap.timeline();
    heroTl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        skewY: 7
    })
    .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.cta-buttons .btn', {
        y: 20,
        opacity: 0,
        duration: 0.6, // Faster duration
        ease: 'back.out(1.7)',
        clearProps: 'opacity' 
    }, '-=0.8') // Start much earlier (almost with subtitle)
    .add(() => {
         // Start Floating Animation after entrance timeline completes
         gsap.to('.cta-buttons .btn', {
             y: -10, // Move up 10px from current (0)
             duration: 2,
             yoyo: true,
             repeat: -1,
             ease: 'sine.inOut'
         });
    });

    // Section Titles Reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Info Cards Stagger (About Section)
    gsap.from('.info-card', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Project Cards Reveal (Robust)
    const projectCards = gsap.utils.toArray('.project-card');
    projectCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%', // Trigger slightly earlier
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1, // Simple index-based delay based on order in DOM
            ease: 'power2.out',
            clearProps: 'all' // Ensure visibility remains after animation
        });
    });

    // Navbar Scroll Effect
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)'; // Darker background on scroll
            navbar.style.padding = '0.8rem 0';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.6)';
            navbar.style.padding = '1rem 0';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        }
    });
}

// =========================================
// 4. VANILLA TILT (3D Card Effect)
// =========================================
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 10,           // Max tilt rotation (degrees)
    speed: 400,        // Speed of transition
    glare: true,       // Add glare effect
    "max-glare": 0.2,  // Max opacity of glare
    scale: 1.02        // Scale up on hover
});

VanillaTilt.init(document.querySelectorAll(".tech-item"), {
    max: 15,
    speed: 400,
    scale: 1.1
});

// =========================================
// 5. THEME TOGGLES & UTILS
// =========================================
// Theme toggle logic remains similar but simplified for new variables
const themeBtn = document.getElementById('theme-toggle-btn');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        if (html.getAttribute('data-theme') === 'light') {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}