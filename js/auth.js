document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const welcomePopup = document.getElementById('welcome-message');
    const closePopupButton = document.getElementById('close-popup');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            function markAndClearError(elementId, message) {
                const element = document.getElementById(elementId);
                element.style.borderColor = '#FF3914';
                element.value = '';
                alert(message);
            }

            function clearVisualErrors() {
                const inputs = document.querySelectorAll('#registerForm input');
                inputs.forEach(input => input.style.borderColor = '#39FF14');
            }

            clearVisualErrors();

            const namesInput = document.getElementById('names');
            const surnamesInput = document.getElementById('surnames');
            const namesValue = namesInput.value.trim();
            const surnamesValue = surnamesInput.value.trim();
            const nameRegex = /^[a-zA-Z\s]+$/;

            if (namesValue === '' || !nameRegex.test(namesValue) || namesValue.length < 3) {
                markAndClearError('names', 'Por favor, ingresa tus nombres. Solo se permiten letras y deben tener al menos 3 caracteres.');
                return;
            }

            if (surnamesValue === '' || !nameRegex.test(surnamesValue) || surnamesValue.length < 3) {
                markAndClearError('surnames', 'Por favor, ingresa tus apellidos. Solo se permiten letras y deben tener al menos 3 caracteres.');
                return;
            }

            const rutInput = document.getElementById('rut');
            const rutValue = rutInput.value.trim();
            const rutRegex = /^[0-9]{7,8}-[0-9kK]{1}$/;

            if (!rutRegex.test(rutValue)) {
                markAndClearError('rut', 'Por favor, ingresa un RUT válido (Ej: 12345678-9).');
                return;
            }

            const birthdateInput = document.getElementById('birthdate');
            const birthdate = new Date(birthdateInput.value);
            const today = new Date();
            const age = today.getFullYear() - birthdate.getFullYear();
            const monthDifference = today.getMonth() - birthdate.getMonth();

            if (age < 18 || (age === 18 && monthDifference < 0) || (age === 18 && monthDifference === 0 && today.getDate() < birthdate.getDate())) {
                markAndClearError('birthdate', 'Solo se permite el registro a usuarios mayores de 18 años. 🙁');
                return;
            }
            
            const emailInput = document.getElementById('email');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value)) {
                markAndClearError('email', 'Por favor, ingresa un correo electrónico con un formato válido (ej. yo@duocuc.cl).');
                return;
            }
            
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            if (passwordInput.value !== confirmPasswordInput.value) {
                markAndClearError('password', 'Las contraseñas no coinciden.');
                markAndClearError('confirm-password', '');
                return;
            }

            welcomePopup.classList.remove('hidden');
        });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            welcomePopup.classList.add('hidden');
            window.location.href = '../index.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validaciones del PDF para el Login
            const correosValidos = /@(duoc.cl|profesor.duoc.cl|gmail.com)$/;
            if (!correosValidos.test(email)) {
                alert('Error: Solo se permiten correos con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                return;
            }

            if (password.length < 4 || password.length > 10) {
                alert('Error: La contraseña debe tener entre 4 y 10 caracteres.');
                return;
            }
            
            // Si las validaciones pasan:
            alert('¡Inicio de sesión exitoso!');
            localStorage.setItem('sesionIniciada', 'true');
            window.location.href = '../index.html';
        });
    }
});