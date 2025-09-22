document.addEventListener('DOMContentLoaded', () => {
    const loginLogoutLink = document.getElementById('login-logout-link');
    if (!loginLogoutLink) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        loginLogoutLink.textContent = 'Cerrar Sesión';
        loginLogoutLink.style.cursor = 'pointer';

        loginLogoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Se limpia el estado de la sesión
            localStorage.removeItem('isLoggedIn');
            alert('Has cerrado la sesión.');
            
            // Redirige al inicio
            const isInsidePages = window.location.pathname.includes('/pages/');
            window.location.href = isInsidePages ? '../index.html' : 'index.html';
        });
    }
});