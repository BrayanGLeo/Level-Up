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
            let hasError = false;

            function markAndClearError(elementId, message) {
                const element = document.getElementById(elementId);
                element.style.borderColor = '#FF3914';
                if (message) {
                    alert(message);
                }
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

            // Valida los nombres
            const namesInput = document.getElementById('names');
            const namesValue = namesInput.value.trim();
            if (namesValue === '' || !/^[a-zA-Z\s]+$/.test(namesValue) || namesValue.length < 3) {
                markAndClearError('names', 'Por favor, ingresa tus nombres. Solo se permiten letras y deben tener al menos 3 caracteres.');
                return;
            }

            // Valida los apellidos
            const surnamesInput = document.getElementById('surnames');
            const surnamesValue = surnamesInput.value.trim();
            if (surnamesValue === '' || !/^[a-zA-Z\s]+$/.test(surnamesValue) || surnamesValue.length < 3) {
                markAndClearError('surnames', 'Por favor, ingresa tus apellidos. Solo se permiten letras y deben tener al menos 3 caracteres.');
                return;
            }

            // Valida el RUT
            const rutInput = document.getElementById('rut');
            if (!/^[0-9]{7,8}-[0-9kK]{1}$/.test(rutInput.value.trim())) {
                markAndClearError('rut', 'Por favor, ingresa un RUT válido (Ej: 12345678-9).');
                return;
            }

            // Valida la  edad
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

            // Valida el correo electrónico
            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@((duoc\.cl)|(profesor\.duoc\.cl)|(gmail\.com))$/;

            if (!emailRegex.test(emailValue)) {
                markAndClearError('email', 'El correo no es válido. Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.');
                return;
            }

            //  Valida que las contraseñas coincidan
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            if (passwordInput.value.length < 6) {
                markAndClearError('password', 'La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            if (passwordInput.value !== confirmPasswordInput.value) {
                markAndClearError('password', 'Las contraseñas no coinciden.');
                markAndClearError('confirm-password', '');
                passwordInput.value = '';
                confirmPasswordInput.value = '';
                return;
            }
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === emailValue)) {
                alert('Este correo electrónico ya está registrado.');
                return;
            }

            const newUser = {
                name: namesInput.value.trim(),
                surname: surnamesInput.value.trim(),
                email: emailValue,
                password: passwordInput.value
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            if (welcomePopup) welcomePopup.classList.remove('hidden');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];           
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                if (loginSuccessPopup) loginSuccessPopup.classList.remove('hidden');
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