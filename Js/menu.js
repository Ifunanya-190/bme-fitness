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
            } else {
                toggle.innerHTML = "☰";
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener("click", function(e) {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove("active");
                toggle.innerHTML = "☰";
            }
        });
    } else {
        console.warn('Menu elements not found - check HTML structure');
    }
});