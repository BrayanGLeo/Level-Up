document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const welcomePopup = document.getElementById('welcome-message');
    const closePopupButton = document.getElementById('close-popup');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Función original para marcar y limpiar
            function markAndClearError(elementId, message) {
                const element = document.getElementById(elementId);
                element.style.borderColor = '#FF3914';
                if (message) {
                    alert(message);
                }
                // No se borra el contenido para mejorar la experiencia, excepto contraseñas.
                if (element.type === 'password') {
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

            // 1. Valida los nombres
            const namesInput = document.getElementById('names');
            const namesValue = namesInput.value.trim();
            if (namesValue === '' || !/^[a-zA-Z\s]+$/.test(namesValue) || namesValue.length < 3) {
                markAndClearError('names', 'Por favor, ingresa tus nombres. Solo se permiten letras y deben tener al menos 3 caracteres.');
                return;
            }

            // 2. Valida los apellidos
            const surnamesInput = document.getElementById('surnames');
            const surnamesValue = surnamesInput.value.trim();
            if (surnamesValue === '' || !/^[a-zA-Z\s]+$/.test(surnamesValue) || surnamesValue.length < 3) {
                markAndClearError('surnames', 'Por favor, ingresa tus apellidos. Solo se permiten letras y deben tener al menos 3 caracteres.');
                return;
            }

            // 3. Valida el RUT
            const rutInput = document.getElementById('rut');
            if (!/^[0-9]{7,8}-[0-9kK]{1}$/.test(rutInput.value.trim())) {
                markAndClearError('rut', 'Por favor, ingresa un RUT válido (Ej: 12345678-9).');
                return;
            }

            // 4. Validar edad (LÓGICA CORREGIDA DENTRO DE TU ESTRUCTURA)
            const birthdateInput = document.getElementById('birthdate');
            if (!birthdateInput.value) {
                markAndClearError('birthdate', 'Por favor, ingresa tu fecha de nacimiento.');
                return;
            } else {
                const birthdate = new Date(birthdateInput.value);
                const today = new Date();
                
                let age = today.getFullYear() - birthdate.getFullYear();
                const monthDifference = today.getMonth() - birthdate.getMonth();
                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
                    age--;
                }

                if (age < 18 || age >= 120) {
                    markAndClearError('birthdate', 'Debes ser mayor de 18 años.');
                    return;
                }
            }

            // 5. Valida el formato del correo electrónico
            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@((duoc\.cl)|(profesor\.duoc\.cl)|(gmail\.com))$/;

            if (!emailRegex.test(emailValue)) {
                markAndClearError('email', 'El correo no es válido. Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.');
                return;
            }

            // 6. Valida que las contraseñas coincidan
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');

            if (passwordInput.value.length < 6) {
                markAndClearError('password', 'La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                markAndClearError('password', 'Las contraseñas no coinciden.');
                markAndClearError('confirm-password', '');
                // Borramos solo las contraseñas si no coinciden
                passwordInput.value = '';
                confirmPasswordInput.value = '';
                return;
            }

            // Si todas las validaciones son exitosas:
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
        // ... (La lógica del login se mantiene igual) ...
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let hasError = false;

            const inputs = loginForm.querySelectorAll('input');
            inputs.forEach(input => input.classList.remove('input-error'));

            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@((duoc\.cl)|(profesor\.duoc\.cl)|(gmail\.com))$/;

            if (!emailRegex.test(emailValue)) {
                emailInput.classList.add('input-error');
                hasError = true;
            }

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