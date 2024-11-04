// Theme toggle functionality
const themeToggle = document.createElement('button');
themeToggle.classList.add('theme-toggle');
themeToggle.setAttribute('aria-label', 'Toggle dark mode');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Handle theme toggle click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle button icon
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if on mobile
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Mobile menu functionality
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

// Only show hamburger menu on mobile
if (window.innerWidth <= 768) {
    navToggle.style.display = 'block';
} else {
    navToggle.style.display = 'none';
    navLinks.style.display = 'flex';
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Mobile menu toggle click handler
navToggle.addEventListener('click', toggleMobileMenu);

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        navToggle.style.display = 'block';
        if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    } else {
        navToggle.style.display = 'none';
        navLinks.style.display = 'flex';
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
        if (!e.target.closest('.nav-container')) {
            toggleMobileMenu();
        }
    }
});

// Card basic functionality
document.querySelectorAll('.card').forEach(card => {
    const heading = card.querySelector('h3');
    const paragraph = card.querySelector('p');
    
    if (paragraph) {
        paragraph.style.opacity = '1';
    }
});

// Mobile background handling
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.backgroundAttachment = 'scroll';
    document.querySelector('.hero').style.backgroundAttachment = 'scroll';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.style.backgroundAttachment === 'fixed') {
            section.style.backgroundAttachment = 'scroll';
        }
    });
}
