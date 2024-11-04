// Add hover effects and animations using CSS classes instead of inline styles
document.querySelectorAll('.btn, .card, .flashcard').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add('hover-active');
    });

    element.addEventListener('mouseleave', () => {
        element.classList.remove('hover-active'); 
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        button.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
});

// Form field animations using CSS classes
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('focus', () => {
        field.classList.add('field-focus');
    });

    field.addEventListener('blur', () => {
        field.classList.remove('field-focus');
    });
});

// Navigation link hover effect using CSS classes
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.classList.add('nav-hover');
    });

    link.addEventListener('mouseleave', () => {
        link.classList.remove('nav-hover');
    });
});
