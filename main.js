// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Typewriter effect
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const words = JSON.parse(dynamicText.getAttribute('data-text') || '[]');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeDelay = 150;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                dynamicText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeDelay = 80;
            } else {
                dynamicText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeDelay = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeDelay = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeDelay = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, typeDelay);
        }

        // Start the typewriter effect
        setTimeout(typeEffect, 1000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Particles background effect
    createParticles();

    //about - section

    // Initialize AOS for about section elements with custom settings
    const aboutElements = document.querySelectorAll('#about [data-aos]');
    aboutElements.forEach(el => {
        // Ensure AOS is properly initialized for these elements
        el.setAttribute('data-aos-duration', '1000');
        el.setAttribute('data-aos-once', 'false');
    });
    
    // Create parallax effect for about section background
    const aboutSection = document.querySelector('.about-section');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const aboutSectionTop = aboutSection.offsetTop - window.innerHeight;
        const aboutSectionBottom = aboutSection.offsetTop + aboutSection.offsetHeight;
        
        if (scrollPosition > aboutSectionTop && scrollPosition < aboutSectionBottom) {
            const parallaxValue = (scrollPosition - aboutSectionTop) * 0.1;
            aboutSection.style.backgroundPosition = `center ${parallaxValue}px`;
        }
    });
    
    // Add glow effect to about section on scroll
    window.addEventListener('scroll', function() {
        const aboutSectionRect = aboutSection.getBoundingClientRect();
        const aboutSectionCenter = aboutSectionRect.top + (aboutSectionRect.height / 2);
        const windowCenter = window.innerHeight / 2;
        
        // Calculate distance from center
        const distance = Math.abs(aboutSectionCenter - windowCenter);
        const maxDistance = window.innerHeight;
        const proximity = 1 - Math.min(distance / maxDistance, 1);
        
        // Apply glowing effect based on proximity to viewport center
        if (proximity > 0) {
            const glowIntensity = proximity * 0.3; // Max 30% intensity
            aboutSection.style.boxShadow = `0 0 ${30 * proximity}px rgba(100, 255, 218, ${glowIntensity})`;
        } else {
            aboutSection.style.boxShadow = 'none';
        }
    });
    
    // Add interactive effect to the hexagon profile image
    const hexagonImg = document.querySelector('.hexagon img');
    if (hexagonImg) {
        aboutSection.addEventListener('mousemove', function(e) {
            const boundingRect = aboutSection.getBoundingClientRect();
            const mouseX = e.clientX - boundingRect.left;
            const mouseY = e.clientY - boundingRect.top;
            
            const centerX = boundingRect.width / 2;
            const centerY = boundingRect.height / 2;
            
            const moveX = (mouseX - centerX) / centerX * 5;
            const moveY = (mouseY - centerY) / centerY * 5;
            
            hexagonImg.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        });
        
        aboutSection.addEventListener('mouseleave', function() {
            hexagonImg.style.transform = 'scale(1) translate(0, 0)';
        });
    }
    
    // Add reveal animation for skill items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skill-reveal');
            }
        });
    }, { threshold: 0.2 });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
});

// Create particles for background
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Number of particles
    const particleCount = 80;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positions
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 5 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        // Apply styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Append to container
        particlesContainer.appendChild(particle);
    }
}

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(el => el.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        border-radius: 50%;
        background-color: var(--secondary);
        opacity: 0.3;
        animation: float infinite linear;
    }

    @keyframes float {
        0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-100px) translateX(50px) scale(1.2);
            opacity: 0.4;
        }
        50% {
            transform: translateY(-200px) translateX(0) scale(0.8);
            opacity: 0.2;
        }
        75% {
            transform: translateY(-100px) translateX(-50px) scale(1.1);
            opacity: 0.3;
        }
        100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(style);

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // You would typically send data to a server here
        // For now, we'll just show a success message
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.style.display = 'none';
        });
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.style.display = 'none';
        
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you ${name} for your message. I'll get back to you soon!</p>
            <button class="btn primary-btn" id="resetForm">Send Another Message</button>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Reset form button
        document.getElementById('resetForm').addEventListener('click', function() {
            contactForm.reset();
            successMessage.remove();
            formGroups.forEach(group => {
                group.style.display = 'block';
            });
            submitBtn.style.display = 'block';
        });
    });
}

// Add additional CSS for form success message
const formStyle = document.createElement('style');
formStyle.textContent = `
    .success-message {
        text-align: center;
        padding: var(--spacing-lg);
        animation: fadeIn 0.5s ease;
    }
    
    .success-icon {
        font-size: 3rem;
        color: var(--secondary);
        margin-bottom: var(--spacing-md);
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(formStyle);