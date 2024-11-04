/**
 * Initialize page functionality when DOM content is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initThemeToggle();
    initFlashcards();
    initParallaxEffect();
    initFormValidation();
    initMobileMenu();
    initReserveButton();
});

/**
 * Implements smooth scrolling behavior for navigation links
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
 * Manages theme toggling functionality with smooth transitions
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

    // Inject dynamic theme styles
    const style = document.createElement('style');
    style.textContent = `
        .theme-transition * {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .flashcard {
            position: relative;
            width: 100%;
            height: 300px;
            perspective: 1000px;
            margin: 20px 0;
            transition: transform 0.3s ease;
        }
        
        .flashcard:hover {
            transform: translateY(-5px);
        }
        
        .flashcard-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
            cursor: pointer;
        }
        
        .card-front, .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            background: var(--card-bg);
            border-radius: 12px;
            box-shadow: 0 8px 16px var(--card-shadow);
        }
        
        .card-back {
            transform: rotateY(180deg);
            background: var(--card-back);
        }
        
        .flashcard-inner.flipped {
            transform: rotateY(180deg);
        }
        
        .card-title {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--card-text);
        }
        
        .card-description {
            font-size: 1.1rem;
            line-height: 1.6;
            color: var(--card-text);
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);

    /**
     * Toggles between light and dark themes with animation
     */
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.classList.add('theme-transition');
        setTimeout(() => document.body.classList.remove('theme-transition'), 1000);
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeUI(newTheme);
    };

    /**
     * Updates UI elements when theme changes
     * @param {string} theme - The new theme ('light' or 'dark')
     */
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

    // Initialize theme based on user preference or system settings
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggle?.addEventListener('click', toggleTheme);
};

/**
 * Initializes interactive feature cards with flip animation and hover effects
 */
const initFlashcards = () => {
    const features = [
        {
            title: 'Luxury Rooms',
            frontDescription: 'Experience ultimate comfort in our premium suites',
            backDescription: 'Meticulously designed rooms featuring king-size beds, smart TVs, and panoramic views',
            icon: 'fas fa-bed'
        },
        {
            title: 'Fine Dining',
            frontDescription: 'Savor world-class culinary delights',
            backDescription: 'Award-winning chefs create unforgettable dining experiences with local ingredients',
            icon: 'fas fa-utensils'
        },
        {
            title: 'Wellness Center',
            frontDescription: 'Your journey to relaxation begins here',
            backDescription: 'State-of-the-art spa facilities, yoga studio, and personalized wellness programs',
            icon: 'fas fa-spa'
        }
    ];

    const featuresContainer = document.querySelector('.features-grid');
    if (featuresContainer) {
        featuresContainer.innerHTML = features.map(feature => `
            <div class="flashcard">
                <div class="flashcard-inner">
                    <div class="card-front">
                        <i class="${feature.icon} fa-4x" style="margin-bottom: 1.5rem; color: var(--accent-color)"></i>
                        <h3 class="card-title">${feature.title}</h3>
                        <p class="card-description">${feature.frontDescription}</p>
                    </div>
                    <div class="card-back">
                        <h3 class="card-title">${feature.title}</h3>
                        <p class="card-description">${feature.backDescription}</p>
                    </div>
                </div>
            </div>
        `).join('');

        // Initialize flip animation handlers with smooth transitions
        document.querySelectorAll('.flashcard-inner').forEach(card => {
            card.addEventListener('click', () => {
                card.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.classList.toggle('flipped');
            });
        });
    }
};

// Additional functionality to be implemented
