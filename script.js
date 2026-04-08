document.addEventListener("DOMContentLoaded", () => {
    // ============================
    // Initialize Lucide Icons
    // ============================
    lucide.createIcons();

    // ============================
    // Navbar Scroll Effect
    // ============================
    const navbar = document.getElementById("navbar");

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run on load

    // ============================
    // Mobile Menu Toggle
    // ============================
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuBtn.classList.toggle("active");
            navLinks.classList.toggle("open");
            document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenuBtn.classList.remove("active");
                navLinks.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }

    // ============================
    // Scroll Reveal Animations
    // ============================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .zoom-in, .fade-in');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================
    // Parallax Hero Background
    // ============================
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scroll = window.scrollY;
                    if (scroll < window.innerHeight) {
                        heroBg.style.transform = `translateY(${scroll * 0.35}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ============================
    // Animated Counter for Stats
    // ============================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = "true";
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ============================
    // Contact Form with WhatsApp
    // ============================
    const form = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value.trim();

            // Build WhatsApp message
            let waMsg = `Hola, soy *${name}*.%0A`;
            waMsg += `📧 Email: ${email}%0A`;
            waMsg += `📞 Teléfono: ${phone}%0A`;
            waMsg += `🔧 Servicio de interés: *${service}*%0A`;
            if (message) {
                waMsg += `💬 Mensaje: ${message}%0A`;
            }
            waMsg += `%0A_Enviado desde la web de Chepén Transport_`;

            const waURL = `https://wa.me/51945573721?text=${waMsg}`;

            // Show success message
            form.style.display = "none";
            formSuccess.style.display = "block";

            // Re-init icons for the success message
            lucide.createIcons();

            // Open WhatsApp in a new tab
            window.open(waURL, "_blank");

            // Reset form after 5 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = "block";
                formSuccess.style.display = "none";
            }, 6000);
        });
    }

    // ============================
    // Smooth Scroll for Nav Links
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    // Active Nav Link Highlight
    // ============================
    const sections = document.querySelectorAll('section[id], footer[id]');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -80% 0px'
    });

    sections.forEach(section => navObserver.observe(section));
});
