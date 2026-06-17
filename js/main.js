/**
 * Barbearia Bigodon - Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // STICKY HEADER EFFECT
    // ==========================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case page was reloaded scrolled down


    // ==========================================
    // MOBILE HAMBURGER MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        // Prevent body scrolling when mobile menu is open
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // ==========================================
    // ACTIVE NAV LINK TRACKING ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const trackActiveLink = () => {
        const scrollPosition = window.scrollY + 120; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', trackActiveLink);


    // ==========================================
    // SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
    });

    fadeElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // ==========================================
    // COOKIE CONSENT BANNER (LGPD / AdSense Compliance)
    // ==========================================
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');

    if (cookieConsent && cookieAccept && cookieDecline) {
        // Check if user already accepted or declined cookies
        const consentStatus = localStorage.getItem('cookies-accepted');

        if (!consentStatus) {
            // Show banner after 1.5 seconds delay
            setTimeout(() => {
                cookieConsent.classList.remove('hide');
            }, 1500);
        } else {
            // Keep hidden if status is set
            cookieConsent.classList.add('hide');
        }

        // Action when Accept is clicked
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookieConsent.classList.add('hide');
        });

        // Action when Decline is clicked
        cookieDecline.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'false');
            cookieConsent.classList.add('hide');
        });
    }

});
