/**
 * Initialize page functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initThemeToggle();
    initFacilityCards();
    initParallaxEffect();
    initFormValidation();
    initMobileMenu();
    initReserveButton();
});

/**
 * Smooth scrolling for navigation
 */
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

/**
 * Theme toggle with animations
 */
const initThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle?.querySelector('i');
    const themeText = themeToggle?.querySelector('span');

    if (themeToggle) {
        themeToggle.style.marginLeft = 'auto';
        themeToggle.style.marginRight = '1rem';
    }

    // Add theme styles
    const style = document.createElement('style');
    style.textContent = `
        .theme-transition * {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .facility-card {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            background: var(--card-bg);
            box-shadow: 0 4px 6px var(--card-shadow);
        }
        
        .facility-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .facility-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 2rem;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            color: white;
            transform: translateY(100%);
            transition: transform 0.5s ease;
        }
        
        .facility-card:hover .facility-image {
            transform: scale(1.1);
        }
        
        .facility-card:hover .facility-content {
            transform: translateY(0);
        }
        
        .facility-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .facility-description {
            font-size: 1rem;
            line-height: 1.6;
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);

    // Handle theme toggle
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.classList.add('theme-transition');
        setTimeout(() => document.body.classList.remove('theme-transition'), 1000);
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeUI(newTheme);
    };

    const updateThemeUI = (theme) => {
        if (themeIcon) {
            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
                themeIcon.style.transform = 'rotate(0)';
            }, 150);
        }

        if (themeText) {
            themeText.style.opacity = '0';
            setTimeout(() => {
                themeText.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
                themeText.style.opacity = '1';
            }, 150);
        }
    };

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggle?.addEventListener('click', toggleTheme);
};

/**
 * Initialize facility cards with hover effects
 */
const initFacilityCards = () => {
    const facilities = [
        {
            title: 'Luxury Rooms',
            description: 'Experience ultimate comfort in our meticulously designed rooms',
            image: 'room.jpg'
        },
        {
            title: 'Fine Dining',
            description: 'Savor exquisite cuisine at our world-class restaurants',
            image: 'dining.jpg'
        },
        {
            title: 'Wellness Center',
            description: 'Rejuvenate your body and mind at our premium spa and fitness center',
            image: 'spa.jpg'
        }
    ];

    const facilitiesContainer = document.querySelector('.features-grid');
    if (facilitiesContainer) {
        facilitiesContainer.innerHTML = facilities.map(facility => `
            <div class="facility-card">
                <img src="${facility.image}" alt="${facility.title}" class="facility-image">
                <div class="facility-content">
                    <h3 class="facility-title">${facility.title}</h3>
                    <p class="facility-description">${facility.description}</p>
                </div>
            </div>
        `).join('');
    }
};

// ... rest of the code remains unchanged ...
