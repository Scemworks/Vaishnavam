/**
 * Handles smooth scrolling behavior for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to top on page load/refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

/**
 * Theme toggle functionality with animations
 */
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle?.querySelector('i');
const themeText = themeToggle?.querySelector('span');

// Position theme toggle button on right side of navbar
if (themeToggle) {
    themeToggle.style.marginLeft = 'auto';
    themeToggle.style.marginRight = '1rem';
}

const toggleTheme = () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class before changing theme
    document.body.classList.add('theme-transition');
    
    // Set timeout to remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
    
    htmlElement.setAttribute('data-theme', newTheme);
    
    if (themeIcon) {
        // Animate icon rotation and swap
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            themeIcon.style.transform = 'rotate(0)';
        }, 150);
    }

    if (themeText) {
        // Fade out text, change it, then fade in
        themeText.style.opacity = '0';
        setTimeout(() => {
            themeText.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
            themeText.style.opacity = '1';
        }, 150);
    }
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
};

// Add transition styles
const style = document.createElement('style');
style.textContent = `
    .theme-transition * {
        transition: background-color 0.5s ease, 
                    color 0.5s ease,
                    border-color 0.5s ease,
                    box-shadow 0.5s ease !important;
    }
    #theme-toggle i {
        transition: transform 0.3s ease;
    }
    #theme-toggle span {
        transition: opacity 0.3s ease;
    }
    .feature-card {
        cursor: pointer;
        perspective: 1000px;
    }
    .feature-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }
    .feature-card.flipped .feature-card-inner {
        transform: rotateY(180deg);
    }
    .feature-card-front, .feature-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        padding: 2rem;
        background: var(--card-bg);
        border-radius: 10px;
    }
    .feature-card-back {
        background: var(--card-back);
        transform: rotateY(180deg);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Set initial theme based on saved preference or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (themeText) {
        themeText.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    if (themeIcon) {
        themeIcon.className = prefersDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    if (themeText) {
        themeText.textContent = prefersDark ? 'Light Mode' : 'Dark Mode';
    }
}

themeToggle?.addEventListener('click', toggleTheme);

/**
 * Interactive feature cards with flip animation
 */
const featureCards = document.querySelectorAll('.feature-card');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

featureCards.forEach((card, index) => {
    // Create inner container for flip effect
    const cardInner = document.createElement('div');
    cardInner.className = 'feature-card-inner';
    
    // Create front side
    const cardFront = document.createElement('div');
    cardFront.className = 'feature-card-front';
    cardFront.innerHTML = card.innerHTML;
    
    // Create back side with additional info
    const cardBack = document.createElement('div');
    cardBack.className = 'feature-card-back';
    cardBack.innerHTML = `<p>${card.getAttribute('data-description') || 'Click to learn more about this feature!'}</p>`;
    
    // Set up card structure
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.innerHTML = '';
    card.appendChild(cardInner);
    
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.8s ease';
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
    
    // Add click handler for flip
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('flipped')) {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('flipped')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

/**
 * Parallax scrolling effect for hero section
 * Uses requestAnimationFrame for performance optimization
 */
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            ticking = false;
        });
        ticking = true;
    }
});

/**
 * Form validation for contact form
 * Validates name, email and phone number inputs
 * @param {HTMLFormElement} formElement - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
const validateForm = (formElement) => {
    const emailInput = formElement.querySelector('input[type="email"]');
    const phoneInput = formElement.querySelector('input[type="tel"]');
    const nameInput = formElement.querySelector('input[type="text"]');
    
    let isValid = true;

    if (nameInput) {
        const isNameValid = nameInput.value.trim().length >= 2;
        toggleError(nameInput, isNameValid);
        isValid = isValid && isNameValid;
    }

    if (emailInput) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isEmailValid = emailPattern.test(emailInput.value);
        toggleError(emailInput, isEmailValid);
        isValid = isValid && isEmailValid;
    }

    if (phoneInput) {
        const phonePattern = /^(\+\d{1,3}[-.\s]?)?\d{10}$/;
        const isPhoneValid = phonePattern.test(phoneInput.value.replace(/\s+/g, ''));
        toggleError(phoneInput, isPhoneValid);
        isValid = isValid && isPhoneValid;
    }

    return isValid;
};

/**
 * Helper function to toggle error class on form inputs
 * @param {HTMLElement} element - The input element
 * @param {boolean} isValid - Whether the input is valid
 */
const toggleError = (element, isValid) => {
    if (isValid) {
        element.classList.remove('error');
    } else {
        element.classList.add('error');
    }
};

/**
 * Handles mobile menu toggle with animation
 * Only activates for screens below 768px (mobile devices)
 */
const toggleMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.nav-toggle');
        
        nav?.classList.toggle('active');
        navLinks?.classList.toggle('show');
        hamburger?.classList.toggle('active');
        
        if (navLinks) {
            navLinks.style.transition = 'transform 0.3s ease-in-out';
            if (navLinks.classList.contains('show')) {
                navLinks.style.transform = 'translateX(0)';
            } else {
                navLinks.style.transform = 'translateX(100%)';
            }
        }
    }
};

// Add resize listener to handle menu state on screen size changes
window.addEventListener('resize', () => {
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.nav-toggle');
    
    if (window.innerWidth > 768) {
        nav?.classList.remove('active');
        navLinks?.classList.remove('show');
        hamburger?.classList.remove('active');
        if (navLinks) {
            navLinks.style.transform = 'none';
        }
    }
});

// Add smooth scrolling for Reserve Your Stay button
const reserveButton = document.querySelector('.cta-button');
if (reserveButton) {
    reserveButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}
