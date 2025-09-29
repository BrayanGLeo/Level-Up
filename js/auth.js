document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const welcomePopup = document.getElementById('welcome-message');
    const closePopupButton = document.getElementById('close-popup');
    const loginForm = document.getElementById('loginForm');
    const loginSuccessPopup = document.getElementById('login-success-message');
    const closeLoginPopupButton = document.getElementById('close-login-popup');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            event.stopPropagation(); 

            function markError(elementId, message) {
                const element = document.getElementById(elementId);
                element.style.borderColor = '#FF3914';
                alert(message);
                if (element.type === 'password') element.value = '';
            }
            function clearErrors() {
                document.querySelectorAll('#registerForm input').forEach(input => {
                    input.style.borderColor = '#39FF14';
                });
            }
            clearErrors();
            
            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value.trim().toLowerCase();
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');

            const emailRegex = /^[^\s@]+@((duoc\.cl)|(profesor\.duoc\.cl)|(gmail\.com)|(admin\.cl))$/;
            if (!emailRegex.test(emailValue)) {
                markError('email', 'El correo no es válido. Solo se permiten dominios @duoc.cl, @profesor.duoc.cl, @gmail.com y @admin.cl.');
                return;
            }
            if (passwordInput.value.length < 6) {
                markError('password', 'La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            if (passwordInput.value !== confirmPasswordInput.value) {
                markError('password', 'Las contraseñas no coinciden.');
                markError('confirm-password', '');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === emailValue)) {
                alert('Este correo electrónico ya está registrado.');
                return;
            }
            const newUser = {
                name: document.getElementById('names').value.trim(),
                surname: document.getElementById('surnames').value.trim(),
                email: emailValue,
                password: passwordInput.value
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            if (emailValue.endsWith('@admin.cl')) {
                alert('Cuenta de administrador registrada con éxito. Redirigiendo al panel...');
                window.location.href = '../index-admin.html';
            } else {
                if (welcomePopup) welcomePopup.classList.remove('hidden');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            event.stopPropagation(); 
            
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // --- Redirección condicional (solo para @admin.cl) ---
                if (user.email.endsWith('@admin.cl')) {
                    alert('Inicio de sesión de administrador exitoso. Redirigiendo al panel...');
                    setTimeout(() => {
                        window.location.href = '../index-admin.html';
                    }, 100);
                } else {
                    if (loginSuccessPopup) loginSuccessPopup.classList.remove('hidden');
                }
            } else {
                alert('Correo o contraseña incorrectos. Por favor, verifica tus datos o regístrate.');
            }
        });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
    if (closeLoginPopupButton) {
        closeLoginPopupButton.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
});