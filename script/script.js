// Add 'navbarDark' class on navbar when scrolling
const header = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const top = window.scrollY;
    if (top >= 100) {
        header.classList.add('navbarDark');
    } else {
        header.classList.remove('navbarDark');
    }
});

// Collapse navbar after clicking a link on small devices
const navLinks = document.querySelectorAll('.nav-item .nav-link'); // Target only nav-links
const menuToggle = document.getElementById('navbarSupportedContent');
const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false }); // Initialize without toggling

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (menuToggle.classList.contains('show')) {
            bsCollapse.toggle(); // Collapse only if the menu is expanded
        }
    });
});
