document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       1. Scroll Progress Bar
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = winScroll / height;
        progressBar.style.transform = `scaleX(${scrolled})`;
    });

    /* ==========================================================================
       2. Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('open');
        mobileMenuBtn.textContent = isMenuOpen ? 'close' : 'menu';
    });

    // Close menu when clicking a link
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            mobileMenuBtn.textContent = 'menu';
        });
    });

    /* ==========================================================================
       3. Scroll Reveal Observer
       ========================================================================== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-section').forEach(section => revealObserver.observe(section));

    /* ==========================================================================
       4. Formspree AJAX Submission
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading
            submitBtn.classList.add('form-loading');
            formSuccess.classList.add('hidden');
            formError.classList.add('hidden');
            
            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formSuccess.classList.remove('hidden');
                    contactForm.reset();
                } else {
                    formError.classList.remove('hidden');
                }
            } catch (error) {
                formError.classList.remove('hidden');
            } finally {
                submitBtn.classList.remove('form-loading');
            }
        });
    }

    /* ==========================================================================
       5. Premium Theme Color Controller (iro.js)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeColorPanel = document.getElementById('theme-color-panel');
    const hexInput = document.getElementById('hex-input');
    const livePreview = document.getElementById('live-color-preview');
    const btnApply = document.getElementById('btn-apply-color');
    const btnReset = document.getElementById('btn-reset-color');
    const presetBtns = document.querySelectorAll('.preset-btn');

    let currentColorHex = '#00fdee';

    // Initialize iro.js Color Picker
    let colorPicker;
    if (typeof iro !== 'undefined') {
        colorPicker = new iro.ColorPicker("#iro-color-wheel", {
            width: 200,
            color: currentColorHex,
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.1)",
            layout: [
                { component: iro.ui.Wheel, options: {} },
                { component: iro.ui.Slider, options: { sliderType: 'value' } }
            ]
        });

        // Update preview and input when dragging wheel
        colorPicker.on('color:change', function(color) {
            livePreview.style.backgroundColor = color.hexString;
            hexInput.value = color.hexString;
            currentColorHex = color.hexString;
        });
    }

    // Toggle Panel Visibility
    if (themeToggleBtn && themeColorPanel) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeColorPanel.classList.toggle('open');
            if (themeColorPanel.classList.contains('open') && colorPicker) {
                // Reset wheel to current theme color when opening
                const currentTheme = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
                if (currentTheme) {
                    colorPicker.color.hexString = currentTheme;
                    livePreview.style.backgroundColor = currentTheme;
                    hexInput.value = currentTheme;
                    currentColorHex = currentTheme;
                }
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (themeColorPanel.classList.contains('open') && !themeColorPanel.contains(e.target)) {
                themeColorPanel.classList.remove('open');
            }
        });
        
        // Prevent closing when clicking inside panel
        themeColorPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Hex Input Manual Edit
    if (hexInput && colorPicker) {
        hexInput.addEventListener('change', (e) => {
            const hex = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                colorPicker.color.hexString = hex;
            } else {
                e.target.value = currentColorHex; // Revert if invalid
            }
        });
    }

    // Preset Swatches
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const hex = btn.getAttribute('data-color');
            if (colorPicker) {
                colorPicker.color.hexString = hex;
            }
        });
    });

    // Helper Functions for Color Math
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    }

    function hexToHsl(hex) {
        let { r, g, b } = hexToRgb(hex);
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        } else { h = s = 0; }
        return { h: h * 360, s, l };
    }

    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    // Core Apply Function
    function applyThemeColor(hexColor) {
        const root = document.documentElement;
        const rgb = hexToRgb(hexColor);
        
        root.style.setProperty('--color-primary', hexColor);
        root.style.setProperty('--theme-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        
        const hsl = hexToHsl(hexColor);
        const secHue = (hsl.h + 60) % 360;
        const secHex = hslToHex(secHue, hsl.s * 100, hsl.l * 100);
        const secRgb = hexToRgb(secHex);
        
        root.style.setProperty('--color-secondary', secHex);
        root.style.setProperty('--theme-secondary-rgb', `${secRgb.r}, ${secRgb.g}, ${secRgb.b}`);
        
        window.dispatchEvent(new CustomEvent('themeColorChanged', { detail: { primary: hexColor } }));
        if (themeColorPanel) themeColorPanel.classList.remove('open');
    }

    // Apply Button
    if (btnApply) {
        btnApply.addEventListener('click', () => {
            applyThemeColor(currentColorHex);
        });
    }

    // Reset Button
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            const defaultColor = '#00fdee';
            if (colorPicker) {
                colorPicker.color.hexString = defaultColor;
            }
            applyThemeColor(defaultColor);
        });
    }

    /* ==========================================================================
       6. Three.js Space Chase Animation (Hero Section)
       ========================================================================== */
    (function initThreeJS() {
        const container = document.getElementById('threejs-container-hero');
        if (!container || typeof THREE === 'undefined') return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Deep Space Particle Field
        const starCount = 6000;
        const starGeometry = new THREE.BufferGeometry();
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i++) {
            starPositions[i] = (Math.random() - 0.5) * 1500;
        }
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0x47d6ff, size: 0.8, transparent: true, opacity: 0.4 });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Neural Cloud Nebula Effect
        const nebulaGeo = new THREE.SphereGeometry(30, 32, 32);
        const nebulaMat = new THREE.MeshPhongMaterial({
            color: 0x00fdee,
            transparent: true,
            opacity: 0.03,
            wireframe: true
        });
        const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
        nebula.scale.set(40, 40, 40);
        scene.add(nebula);

        // Cinematic Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const mainLight = new THREE.PointLight(0x47d6ff, 2, 200);
        mainLight.position.set(30, 30, 30);
        scene.add(mainLight);

        // Space Ships (Interceptors)
        function createShip(color, scale = 1) {
            const group = new THREE.Group();
            const bodyGeo = new THREE.ConeGeometry(0.5, 2, 4);
            const bodyMat = new THREE.MeshPhongMaterial({ color: color, shininess: 100 });
            const body = new THREE.Mesh(bodyGeo, bodyMat);
            body.rotation.x = Math.PI / 2;
            group.add(body);

            const wingGeo = new THREE.BoxGeometry(2, 0.1, 0.8);
            const wing = new THREE.Mesh(wingGeo, bodyMat);
            wing.position.z = -0.3;
            group.add(wing);

            // Engine Glow
            const engineGeo = new THREE.SphereGeometry(0.3, 16, 16);
            const engineMat = new THREE.MeshBasicMaterial({ color: 0x00fdee });
            const engine = new THREE.Mesh(engineGeo, engineMat);
            engine.position.z = -1;
            group.add(engine);

            group.scale.set(scale, scale, scale);
            return group;
        }

        const shipLead = createShip(0xffffff, 0.8);
        const shipChase = createShip(0x333333, 0.7);
        scene.add(shipLead);
        scene.add(shipChase);

        shipLead.position.set(0, 0, 0);
        shipChase.position.set(0, -3, -10);

        // Plasma Bolts
        const bolts = [];
        const boltMaterial = new THREE.MeshBasicMaterial({ color: 0x00fdee });
        const boltGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 6);

        function fireBolt() {
            const bolt = new THREE.Mesh(boltGeo, boltMaterial);
            bolt.rotation.x = Math.PI / 2;
            bolt.position.copy(shipChase.position);
            bolt.position.y += 0.5;
            bolt.position.x += (Math.random() - 0.5) * 1;
            bolts.push(bolt);
            scene.add(bolt);
        }

        // Listen for Theme Color Changes
        window.addEventListener('themeColorChanged', (e) => {
            const newColor = new THREE.Color(e.detail.primary);
            starMaterial.color = newColor;
            nebulaMat.color = newColor;
            mainLight.color = newColor;
            engineMat.color = newColor;
            boltMaterial.color = newColor;
        });

        camera.position.z = 15;
        camera.position.y = 5;
        camera.lookAt(0, 0, 0);

        // Mouse Parallax Interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        container.addEventListener('mousemove', (event) => {
            const rect = container.getBoundingClientRect();
            mouseX = (event.clientX - rect.left) - (rect.width / 2);
            mouseY = (event.clientY - rect.top) - (rect.height / 2);
        });

        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;

            // Parallax camera movement
            targetX = mouseX * 0.005;
            targetY = mouseY * 0.005;
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (-targetY + 5 - camera.position.y) * 0.05;

            // Evasive Maneuvers
            const xPos = Math.sin(time) * 5;
            const yPos = Math.cos(time * 0.7) * 2;
            const zPos = Math.sin(time * 0.3) * 2;

            shipLead.position.x = xPos;
            shipLead.position.y = yPos;
            shipLead.position.z = zPos;
            shipLead.rotation.z = Math.sin(time) * 0.5;
            shipLead.rotation.y = Math.sin(time * 0.5) * 0.2;

            // Pursuer AI
            shipChase.position.lerp(new THREE.Vector3(xPos, yPos - 2.5, zPos - 8), 0.05);
            shipChase.lookAt(shipLead.position);

            if (Math.random() > 0.95) {
                fireBolt();
            }

            // Projectile physics
            for (let i = bolts.length - 1; i >= 0; i--) {
                bolts[i].position.z += 1.5;
                bolts[i].position.lerp(shipLead.position, 0.02);
                if (bolts[i].position.z > 50) {
                    scene.remove(bolts[i]);
                    bolts.splice(i, 1);
                }
            }

            stars.rotation.y += 0.0005;
            nebula.rotation.y -= 0.0002;
            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });

        animate();
    })();
});