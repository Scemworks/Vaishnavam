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

/**
 * Theme toggle functionality
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
    
    htmlElement.setAttribute('data-theme', newTheme);
    
    if (themeIcon) {
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    if (themeText) {
        themeText.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
};

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
 * Feature card animations using Intersection Observer
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
            entry.target.style.transform = 'translateY(0) rotateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) rotateY(180deg)';
    card.style.transition = 'opacity 0.5s ease, transform 0.8s ease';
    // Add delay for staggered animation
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateY(10deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0)';
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
