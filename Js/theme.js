// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
    
    // Add to body
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('bme-theme');
    if (savedTheme) {
        document.body.classList.toggle('light-theme', savedTheme === 'light');
        updateThemeIcon(savedTheme === 'light');
        
        // Force update user dropdown if it exists
        setTimeout(() => {
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) {
                if (savedTheme === 'light') {
                    userDropdown.style.background = '#ffffff';
                    userDropdown.style.backgroundColor = '#ffffff';
                } else {
                    userDropdown.style.background = 'var(--deep)';
                    userDropdown.style.backgroundColor = '#1a1a1a';
                }
            }
        }, 100);
    } else {
        // Check system preference
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        document.body.classList.toggle('light-theme', prefersLight);
        updateThemeIcon(prefersLight);
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('bme-theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
        
        // Force update user dropdown if it exists
        const userDropdown = document.getElementById('userDropdown');
        if (userDropdown) {
            if (isLight) {
                userDropdown.style.background = '#ffffff';
                userDropdown.style.backgroundColor = '#ffffff';
            } else {
                userDropdown.style.background = 'var(--deep)';
                userDropdown.style.backgroundColor = '#1a1a1a';
            }
        }
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
    
    function updateThemeIcon(isLight) {
        themeToggle.innerHTML = isLight ? '☀️' : '🌙';
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
        if (!localStorage.getItem('bme-theme')) {
            const isLight = e.matches;
            document.body.classList.toggle('light-theme', isLight);
            updateThemeIcon(isLight);
        }
    });
});
