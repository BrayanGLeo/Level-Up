document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const welcomePopup = document.getElementById('welcome-message');
    const closePopupButton = document.getElementById('close-popup');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Función para marcar el campo con error y limpiarlo
            function markAndClearError(elementId, message) {
                const element = document.getElementById(elementId);
                element.style.borderColor = '#FF3914';
                if (message) {
                    alert(message);
                }
                if (element.type !== 'password') {
                    element.value = '';
                }
            }

            function clearVisualErrors() {
                const inputs = document.querySelectorAll('#registerForm input');
                inputs.forEach(input => {
                    input.style.borderColor = '#39FF14';
                });
            }

            clearVisualErrors();

            // Valida los nombres y apellidos
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

            // Valida el RUT
            const rutInput = document.getElementById('rut');
            const rutValue = rutInput.value.trim();
            const rutRegex = /^[0-9]{7,8}-[0-9kK]{1}$/;

            if (!rutRegex.test(rutValue)) {
                markAndClearError('rut', 'Por favor, ingresa un RUT válido (Ej: 12345678-9).');
                return;
            }

            // Valida la edad (mayor de 18 años)
            const birthdateInput = document.getElementById('birthdate');
            if (!birthdateInput.value) {
                markAndClearError('birthdate', 'Por favor, ingresa tu fecha de nacimiento.');
                return;
            }
            const birthdate = new Date(birthdateInput.value);
            const today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear();
            const monthDifference = today.getMonth() - birthdate.getMonth();

            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
                age--;
            }

            if (age < 18) {
                markAndClearError('birthdate', 'Solo se permite el registro a usuarios mayores de 18 años. 🙁');
                return;
            }

            // Validaa el formato del correo electrónico
            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@((duoc\.cl)|(profesor\.duoc\.cl)|(gmail\.com))$/;

            if (!emailRegex.test(emailValue)) {
                markAndClearError('email', 'El correo no es válido. Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.');
                return;
            }

            // Valida que las contraseñas coincidan
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');

            if (passwordInput.value.length < 6) {
                markAndClearError('password', 'La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                markAndClearError('password', 'Las contraseñas no coinciden. Por favor, verifica los campos.');
                markAndClearError('confirm-password', '');
                return;
            }

            // Si todas las validaciones son exitosas, muestra el popup:
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
            let hasError = false;

            const inputs = loginForm.querySelectorAll('input');
            inputs.forEach(input => input.classList.remove('input-error'));

            // 1. Validar Correo Electrónico con RESTRICCIÓN DE NEGOCIO
            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@((duoc\.cl)|(profesor\.duoc\.cl)|(gmail\.com))$/;

            if (!emailRegex.test(emailValue)) {
                emailInput.classList.add('input-error');
                hasError = true;
            }

            // 2. Validar que la contraseña no esté vacía
            const passwordInput = document.getElementById('password');
            if (passwordInput.value.trim() === '') {
                passwordInput.classList.add('input-error');
                hasError = true;
            }

            if (hasError) {
                alert('El correo o la contraseña no son válidos. Recuerda que solo se admiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com.');
                return;
            }

            alert('Inicio de sesión exitoso.');
            window.location.href = '../index.html';
        });
    }
});