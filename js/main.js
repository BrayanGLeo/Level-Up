document.addEventListener('DOMContentLoaded', () => {
    const loginNavItem = document.getElementById('login-nav-item');
    const profileNavItem = document.getElementById('profile-nav-item');
    const logoutButton = document.getElementById('logout-button');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    if (!loginNavItem || !profileNavItem) {
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        loginNavItem.classList.add('hidden');
        profileNavItem.classList.remove('hidden');
        
        if (dropdownToggle) {
            dropdownToggle.textContent = `Hola, ${currentUser.name}`;
        }

    } else {
        loginNavItem.classList.remove('hidden');
        profileNavItem.classList.add('hidden');
    }

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (event) => {
            event.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
    }
    
    window.addEventListener('click', function(event) {
        if (dropdownMenu && profileNavItem && !profileNavItem.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('currentUser');
            alert('Has cerrado la sesión.');
            
            const isInsidePages = window.location.pathname.includes('/pages/');
            window.location.href = isInsidePages ? '../index.html' : 'index.html';
        });
    }
});