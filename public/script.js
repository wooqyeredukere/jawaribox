/**
 * JawariBox V4 - Fresh & Premium
 * Clean animations, smooth interactions
 */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let lenis;

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initLenis();
    initNavbar();
    initHero();
    initScrollAnimations();
    initMenuCards();
    initFAQ();
    initFAB();
});

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const word = preloader.querySelector('.preloader-word');
    const line = preloader.querySelector('.preloader-line');

    const tl = gsap.timeline();

    // Animate preloader elements
    tl.to(word, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .to(line.querySelector('::after') || line, {
        '--progress': '100%',
        duration: 1.5,
        ease: 'power2.inOut'
    }, '-=0.3');

    // Simulate loading
    gsap.to(line, {
        '--width': '100%',
        duration: 1.8,
        delay: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    preloader.classList.add('hidden');
                    animateHeroEntrance();
                }
            });
        }
    });

    // Manual line animation
    gsap.fromTo(line.querySelector('::after') ? line : line,
        { width: '0%' },
        {
            width: '100%',
            duration: 1.5,
            delay: 0.5,
            ease: 'power2.inOut'
        }
    );
}

// ============================================
// LENIS SMOOTH SCROLL
// ============================================
function initLenis() {
    lenis = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
        autoResize: true
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for smooth animation frame updates
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing for consistent performance
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger uses Lenis scroll position
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                lenis.scrollTo(value, { immediate: true });
            }
            return lenis.scroll;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.body.style.transform ? "transform" : "fixed"
    });

    // Refresh ScrollTrigger after Lenis is ready
    ScrollTrigger.refresh();
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLogo = document.querySelector('.nav-logo');

    // Scroll state
    ScrollTrigger.create({
        trigger: document.body,
        start: 'top -80',
        onEnter: () => navbar.classList.add('scrolled'),
        onLeaveBack: () => navbar.classList.remove('scrolled')
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, {
                    offset: -80,
                    duration: 2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    // Logo click - scroll to top
    navLogo.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(0, {
            duration: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
    });
}

// ============================================
// HERO
// ============================================
function initHero() {
    // Set initial states
    gsap.set('.hero-badge', { opacity: 0, y: 20 });
    gsap.set('.title-line', { opacity: 0, y: 40 });
    gsap.set('.hero-subtitle', { opacity: 0, y: 20 });
    gsap.set('.hero-kn', { opacity: 0, y: 20 });
    gsap.set('.hero-app-banner', { opacity: 0, y: 20 });
    gsap.set('.hero-actions', { opacity: 0, y: 20 });
    gsap.set('.hero-features .feature', { opacity: 0, y: 20 });
    gsap.set('.hero-image-wrapper', { opacity: 0, scale: 0.95 });
    gsap.set('.floating-card', { opacity: 0, scale: 0.8 });
    gsap.set('.hero-scroll-indicator', { opacity: 0 });
}

function animateHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8
    })
    .to('.title-line', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15
    }, '-=0.4')
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to('.hero-kn', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.6')
    .to('.hero-app-banner', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to('.hero-actions', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to('.hero-features .feature', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1
    }, '-=0.4')
    .to('.hero-image-wrapper', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=1')
    .to('.floating-card', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.5)'
    }, '-=0.5')
    .to('.hero-scroll-indicator', {
        opacity: 1,
        duration: 0.6
    }, '-=0.3');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    // About section
    gsap.from('.about-intro', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-intro',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.about-text p', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.about-image-wrapper', {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.about-image-caption', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // Value cards
    gsap.utils.toArray('.value-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Menu header
    gsap.from('.menu-header', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.menu-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Menu items
    gsap.utils.toArray('.menu-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Davangere Reveal Animation
    const davangereReveal = document.querySelector('.davangere-reveal');
    if (davangereReveal) {
        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.davangere-reveal',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        revealTl
            .from('.davangere-reveal', {
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                ease: 'power3.out'
            })
            .from('.reveal-eyebrow', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.reveal-headline', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.journey-point', {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                stagger: 0.15,
                ease: 'back.out(1.5)'
            }, '-=0.4')
            .from('.journey-arrow', {
                opacity: 0,
                x: -10,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.6')
            .from('.reveal-subtext', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.reveal-badge-wrap', {
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                ease: 'back.out(1.5)'
            }, '-=0.3')
            .from('.reveal-decoration', {
                opacity: 0,
                scale: 0.5,
                rotation: -180,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out'
            }, '-=0.8');
    }

    // Process section
    gsap.from('.process-header', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.process-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.from(step, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.process-steps',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.step-connector').forEach((connector, i) => {
        gsap.from(connector, {
            scaleX: 0,
            duration: 0.6,
            delay: 0.3 + (i * 0.15),
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.process-steps',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.info-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.process-info',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // CTA section
    gsap.from('.cta-content', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.cta',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // WhatsApp Chat Animation
    const waMessages = document.querySelectorAll('.wa-message, .wa-typing');
    if (waMessages.length > 0) {
        gsap.from('.wa-phone-frame', {
            opacity: 0,
            y: 50,
            rotateY: -15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cta-visual',
                start: 'top 70%',
                toggleActions: 'play none none reverse',
                onEnter: () => {
                    // Animate messages one by one
                    const messages = [
                        { el: '.wa-msg-1', delay: 0.5 },
                        { el: '.wa-msg-2', delay: 1.5 },
                        { el: '.wa-msg-3', delay: 2.5 },
                        { el: '.wa-msg-4', delay: 3.5 },
                        { el: '.wa-msg-5', delay: 4.8 },  // typing
                        { el: '.wa-msg-6', delay: 5.8 }
                    ];

                    messages.forEach(({ el, delay }) => {
                        const element = document.querySelector(el);
                        if (element) {
                            gsap.to(element, {
                                opacity: 1,
                                y: 0,
                                duration: 0.4,
                                delay: delay,
                                ease: 'back.out(1.5)',
                                onStart: () => element.classList.add('visible')
                            });
                        }
                    });

                    // Hide typing indicator after last message
                    setTimeout(() => {
                        const typing = document.querySelector('.wa-typing');
                        if (typing) {
                            gsap.to(typing, { opacity: 0, duration: 0.2 });
                        }
                    }, 5800);
                }
            }
        });
    }

    gsap.from('.cta-visual img', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.cta',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // Hide hero scroll on scroll
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
            if (self.progress > 0.1) {
                gsap.to('.hero-scroll-indicator', { opacity: 0, duration: 0.3 });
            }
        }
    });
}

// ============================================
// MENU CARDS INTERACTION
// ============================================
function initMenuCards() {
    const menuItems = document.querySelectorAll('.menu-item:not(.menu-item-cta)');

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Value cards hover
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Process steps hover
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        const number = step.querySelector('.step-number');

        step.addEventListener('mouseenter', () => {
            gsap.to(number, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        step.addEventListener('mouseleave', () => {
            gsap.to(number, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });

    // Scroll animations for FAQ
    gsap.from('.faq-header', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.faq-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.utils.toArray('.faq-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.faq-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ============================================
// FAB
// ============================================
function initFAB() {
    const fab = document.getElementById('fabWhatsapp');

    fab.addEventListener('mouseenter', () => {
        gsap.to(fab, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    fab.addEventListener('mouseleave', () => {
        gsap.to(fab, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // Show/hide based on scroll
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'bottom top',
        onEnter: () => gsap.to(fab, { opacity: 1, duration: 0.3 }),
        onLeaveBack: () => gsap.to(fab, { opacity: 0.6, duration: 0.3 })
    });
}

// ============================================
// BUTTON HOVER EFFECTS
// ============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// ============================================
// RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
