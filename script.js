document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Switcher
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            
            // Update active class on buttons
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update body class for CSS to handle visibility
            document.body.className = `lang-${lang}`;
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
        const spans = menuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // 3. Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Run once
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Initial trigger for elements already in view (like Hero)
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // 4. Smooth Scrolling for Anchor Links (handled mostly by CSS, but good for offsets)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const headerOffset = 80; // navbar height
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Navbar scroll effect (add shadow on scroll)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(15, 23, 42, 0.7)';
        }
    });
});
