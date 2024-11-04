// Mobile menu toggle functionality with smooth transitions
function toggleMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    const icon = toggler.querySelector('i');
    
    // Add smooth transition
    navbarCollapse.style.transition = 'all 0.3s ease-in-out';
    navbarCollapse.classList.toggle('show');
    
    // Animate icon transition
    icon.style.transition = 'transform 0.3s ease';
    if (navbarCollapse.classList.contains('show')) {
        icon.classList.replace('fa-bars', 'fa-times');
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        icon.style.transform = 'rotate(0)';
    }
}

// Close mobile menu when clicking outside, with smooth animation
document.addEventListener('click', (e) => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (!toggler.contains(e.target) && !navbarCollapse.contains(e.target) && navbarCollapse.classList.contains('show')) {
        const icon = toggler.querySelector('i');
        navbarCollapse.style.transition = 'all 0.3s ease-in-out';
        navbarCollapse.classList.remove('show');
        icon.style.transition = 'transform 0.3s ease';
        icon.classList.replace('fa-times', 'fa-bars');
        icon.style.transform = 'rotate(0)';
    }
});

// Enhanced mobile menu navigation with smooth transitions
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (window.innerWidth <= 768 && navbarCollapse.classList.contains('show')) {
            const icon = toggler.querySelector('i');
            // Smooth transition when closing
            navbarCollapse.style.transition = 'all 0.3s ease-in-out';
            navbarCollapse.classList.remove('show');
            icon.style.transition = 'transform 0.3s ease';
            icon.classList.replace('fa-times', 'fa-bars');
            icon.style.transform = 'rotate(0)';
        }
    });
});

// Responsive menu handling on window resize with debouncing
let resizeTimer;
window.addEventListener('resize', () => {
    // Debounce resize events for better performance
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (window.innerWidth > 768 && navbarCollapse.classList.contains('show')) {
            const icon = toggler.querySelector('i');
            navbarCollapse.style.transition = 'all 0.3s ease-in-out';
            navbarCollapse.classList.remove('show');
            icon.style.transition = 'transform 0.3s ease';
            icon.classList.replace('fa-times', 'fa-bars');
            icon.style.transform = 'rotate(0)';
        }
    }, 250); // Wait for resize to finish before executing
});
