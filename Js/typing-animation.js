// Automatic Typing Animation for Hero Text
class TypingAnimation {
    constructor() {
        // Check if hero section exists first (prevents errors on other pages)
        const heroSection = document.querySelector('.hero');
        if (!heroSection) {
            console.log('No hero section found - skipping typing animation');
            return;
        }
        
        this.heroTitle = document.querySelector('.hero h1');
        this.heroSubtitle = document.querySelector('.hero p');
        this.heroButton = document.querySelector('.hero .btn');
        
        // Check if elements exist
        if (this.heroTitle && this.heroSubtitle && this.heroButton) {
            this.isMobile = window.innerWidth <= 768;
            this.init();
        } else {
            console.warn('Hero elements not found for typing animation');
        }
    }
    
    init() {
        // Skip animation on mobile for better performance
        if (this.isMobile) {
            this.showMobileOptimized();
            return;
        }
        
        // Hide all elements initially
        this.heroTitle.style.opacity = '0';
        this.heroSubtitle.style.opacity = '0';
        this.heroButton.style.opacity = '0';
        
        // Store original text
        this.originalTitle = this.heroTitle.textContent;
        this.originalSubtitle = this.heroSubtitle.textContent;
        
        // Clear content
        this.heroTitle.textContent = '';
        this.heroSubtitle.textContent = '';
        
        // Start animation sequence
        setTimeout(() => this.typeText(this.heroTitle, this.originalTitle, 100, () => {
            setTimeout(() => this.typeText(this.heroSubtitle, this.originalSubtitle, 50, () => {
                setTimeout(() => this.showButton(), 500);
            }), 500);
        }), 500);
    }
    
    // Mobile optimized version - show content immediately
    showMobileOptimized() {
        this.heroTitle.style.opacity = '1';
        this.heroSubtitle.style.opacity = '1';
        this.heroButton.style.opacity = '1';
        this.heroButton.style.transform = 'translateY(0)';
        
        // Add dropdown after a short delay
        setTimeout(() => {
            this.createDropdownMenu();
        }, 1000);
    }
    
    typeText(element, text, speed, callback) {
        element.style.opacity = '1';
        let index = 0;
        
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, speed);
            } else if (callback) {
                callback();
            }
        };
        
        typeChar();
    }
    
    showButton() {
        this.heroButton.style.opacity = '1';
        this.heroButton.style.transform = 'translateY(0)';
        
        // Add dropdown animation after button appears
        setTimeout(() => {
            this.createDropdownMenu();
        }, 300);
    }
    
    createDropdownMenu() {
        // Check if dropdown already exists
        if (document.querySelector('.join-dropdown')) return;
        
        // Create dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'join-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-content">
                <a href="login.html" class="dropdown-item">Sign Up</a>
                <a href="pricing.html" class="dropdown-item">View Plans</a>
                <a href="contact.html" class="dropdown-item">Contact Us</a>
                <a href="https://wa.me/2349012345678?text=I'm%20interested%20in%20BME%20Services" class="dropdown-item whatsapp-item">WhatsApp</a>
            </div>
        `;
        
        // Position dropdown below button with proper positioning
        const buttonRect = this.heroButton.getBoundingClientRect();
        const parentRect = this.heroButton.parentElement.getBoundingClientRect();
        
        dropdown.style.position = 'absolute';
        dropdown.style.top = 'calc(100% + 10px)';
        dropdown.style.left = '0px';
        dropdown.style.zIndex = '1000';
        dropdown.style.minWidth = this.heroButton.offsetWidth + 'px';
        
        // Add to DOM
        this.heroButton.parentElement.style.position = 'relative';
        this.heroButton.parentElement.appendChild(dropdown);
        
        // Animate dropdown appearance
        setTimeout(() => {
            dropdown.classList.add('show');
        }, 100);
        
        // Handle button click to toggle dropdown
        this.heroButton.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.heroButton.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                dropdown.classList.remove('show');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing typing animation...');
    new TypingAnimation();
});
