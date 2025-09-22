document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const welcomePopup = document.getElementById('welcome-message');
    const closePopupButton = document.getElementById('close-popup');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // --- CÓDIGO DE VALIDACIÓN RESTAURADO ---

            // Función para marcar el campo con error y limpiarlo
            function markAndClearError(elementId, message) {
                const element = document.getElementById(elementId);
                element.style.borderColor = '#FF3914';
                if (message) { // Solo muestra alerta si hay mensaje
                    alert(message);
                }
                if (element.type !== 'password') {
                    element.value = '';
                }
            }

            // Función para limpiar errores visuales (solo cambia el color)
            function clearVisualErrors() {
                const inputs = document.querySelectorAll('#registerForm input');
                inputs.forEach(input => {
                    input.style.borderColor = '#39FF14';
                });
            }

            clearVisualErrors();

            // Validar nombres y apellidos
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

            // Validar RUT
            const rutInput = document.getElementById('rut');
            const rutValue = rutInput.value.trim();
            const rutRegex = /^[0-9]{7,8}-[0-9kK]{1}$/;

            if (!rutRegex.test(rutValue)) {
                markAndClearError('rut', 'Por favor, ingresa un RUT válido (Ej: 12345678-9).');
                return;
            }

            // Validar la edad (mayor de 18 años)
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

            // Validar el formato del correo electrónico
            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            
            if (!emailRegex.test(emailValue)) {
                markAndClearError('email', 'Por favor, ingresa un correo electrónico con un formato válido (ej. yo@duocuc.cl).');
                return;
            }
            
            // Validar que las contraseñas coincidan
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            
            if (passwordInput.value.length < 6) {
                markAndClearError('password', 'La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            
            if (passwordInput.value !== confirmPasswordInput.value) {
                markAndClearError('password', 'Las contraseñas no coinciden. Por favor, verifica los campos.');
                markAndClearError('confirm-password', ''); // No muestra alerta duplicada
                return;
            }

            // --- FIN DEL CÓDIGO RESTAURADO ---

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
            // Aquí podrías agregar validaciones para el login también si quisieras
            alert('Inicio de sesión exitoso.');
            window.location.href = '../index.html';
        });
    }
});