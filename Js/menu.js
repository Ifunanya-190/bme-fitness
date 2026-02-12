// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-links");

    // Add null checks to prevent errors
    if (toggle && nav) {
        toggle.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle("active");
            // Change icon from ☰ to × when menu is active
            if (nav.classList.contains("active")) {
                toggle.innerHTML = "×";
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                toggle.innerHTML = "☰";
                // Restore body scroll when menu is closed
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener("click", function(e) {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove("active");
                toggle.innerHTML = "☰";
                // Restore body scroll when menu is closed
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener("keydown", function(e) {
            if (e.key === 'Escape' && nav.classList.contains("active")) {
                nav.classList.remove("active");
                toggle.innerHTML = "☰";
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener("resize", function() {
            if (window.innerWidth > 768 && nav.classList.contains("active")) {
                nav.classList.remove("active");
                toggle.innerHTML = "☰";
                document.body.style.overflow = '';
            }
        });
    } else {
        console.warn('Menu elements not found - check HTML structure');
    }
});