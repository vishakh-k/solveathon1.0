document.addEventListener('DOMContentLoaded', () => {
    // Loader Logic
    // GSAP Jet Animation
    const jet = document.querySelector('.loading-jet-img');

    // Initial State Set by CSS, but ensure GSAP takes over
    const tl = gsap.timeline();

    // 1. Entry Animation
    tl.to(jet, {
        duration: 1.5,
        opacity: 1,
        scale: 1,
        ease: "power2.out"
    })
        // 2. Idle Animation (Floating)
        .to(jet, {
            y: -15,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    // 3. Launch Sequence (Exit)
    setTimeout(() => {
        // Kill idle animation to start launch
        tl.kill();

        gsap.to(jet, {
            duration: 1.5,
            y: -1000,
            scale: 0.2,
            rotation: -10,
            ease: "power4.in",
            onComplete: () => {
                // Ensure loader background slides up after jet flies out
                gsap.to('#loader', {
                    y: '-100%',
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // === Homepage Animations Start Here ===

                        // 1. Text Animation: "SOLVE-A-THON 1.0"
                        // Using a clip-path reveal effect for a high-tech look
                        gsap.fromTo(".main-title",
                            {
                                clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)",
                                opacity: 0,
                                y: 30
                            },
                            {
                                clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
                                opacity: 1,
                                y: 0,
                                duration: 1.5,
                                ease: "power4.out"
                            }
                        );

                        // 2. Buttons Animation: Staggered Fade Up
                        gsap.to(".btn", {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.2, // Buttons appear one after another
                            ease: "back.out(1.7)",
                            delay: 0.5 // Wait a bit after text starts
                        });

                        // Button Hover Animations (GSAP Interactivity)
                        document.querySelectorAll('.btn').forEach(btn => {
                            btn.addEventListener('mouseenter', () => {
                                gsap.to(btn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
                            });
                            btn.addEventListener('mouseleave', () => {
                                gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
                            });
                        });
                    }
                });
            }
        });
    }, 4500); // Trigger launch after 4.5s

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Divider Jet Animation (Passing Jet)
    const jetDivider = document.querySelector('.divider-jet');
    if (jetDivider) {
        gsap.fromTo(jetDivider,
            { x: '-10vw' },
            {
                x: '110vw',
                duration: 3,
                ease: "none",
                repeat: -1,
                repeatDelay: 5 // Jet passes every 5 seconds
            }
        );
    }

    // Apply fade-in animation logic to glass-panels if needed, 
    // though CSS hover effects are already there.
    // Additional reveal on scroll:
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 1s ease-in-out';
        observer.observe(section);
    });

    // Custom Observer callback to handle opacity
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(sec => sectionObserver.observe(sec));

    // Timeline Items Observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
