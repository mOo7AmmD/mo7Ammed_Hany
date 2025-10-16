// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
} 

// Skills progress animation
function initSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const bar = card.querySelector('.skill-bar span');
        const percent = card.querySelector('.skill-percent');
        if (bar) bar.style.width = '0%';
        if (percent) percent.textContent = '0%';
        card.dataset.animated = 'false';
    });
}

function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length) return;

    const triggerBottom = window.innerHeight * 0.85;
    skillCards.forEach(card => {
        const bar = card.querySelector('.skill-bar span');
        const percent = card.querySelector('.skill-percent');
        const level = card.getAttribute('data-level');
        const rect = card.getBoundingClientRect();

        if (rect.top < triggerBottom && card.dataset.animated !== 'true') {
            // Animate bar width
            if (bar) bar.style.width = level + '%';

            // Animate number count-up
            if (percent) {
                const duration = 900; // ms
                const start = performance.now();
                const target = parseInt(level, 10) || 0;

                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const value = Math.round(progress * target);
                    percent.textContent = value + '%';
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            }

            card.dataset.animated = 'true';
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', () => {
    initSkills();
    animateSkills();
});