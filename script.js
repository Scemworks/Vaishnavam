// Mobile menu toggle functionality
function toggleMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
    
    const toggler = document.querySelector('.navbar-toggler');
    const icon = toggler.querySelector('i');
    
    if (navbarCollapse.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times'); 
        icon.classList.add('fa-bars');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (!toggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
        const icon = toggler.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (window.innerWidth <= 768) {
            navbarCollapse.classList.remove('show');
            const icon = toggler.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Update menu state on window resize
window.addEventListener('resize', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (window.innerWidth > 768) {
        navbarCollapse.classList.remove('show');
        const icon = toggler.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});
