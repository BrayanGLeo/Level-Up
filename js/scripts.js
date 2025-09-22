document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const welcomePopup = document.getElementById('welcome-message');
    const closePopupButton = document.getElementById('close-popup');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Función para marcar el campo con error y limpiarlo
            function markAndClearError(elementId, message) {
                const element = document.getElementById(elementId);
                element.style.borderColor = '#FF3914';
                element.value = '';
                alert(message);
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
            const birthdate = new Date(birthdateInput.value);
            const today = new Date();
            const age = today.getFullYear() - birthdate.getFullYear();
            const monthDifference = today.getMonth() - birthdate.getMonth();

            if (age < 18 || (age === 18 && monthDifference < 0) || (age === 18 && monthDifference === 0 && today.getDate() < birthdate.getDate())) {
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
            
            if (passwordInput.value !== confirmPasswordInput.value) {
                markAndClearError('password', 'Las contraseñas no coinciden. Por favor, verifica los campos.');
                markAndClearError('confirm-password', '');
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
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            window.location.href = '../index.html';
        });
    }

    function agregarAlCarrito(evento) {
        const productoCard = evento.target.closest('.product-card');
        const producto = {
            code: productoCard.dataset.code,
            title: productoCard.dataset.title,
            price: parseFloat(productoCard.dataset.price),
            image: productoCard.dataset.image,
            quantity: 1
        };

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoExistente = carrito.find(item => item.code === producto.code);

        if (productoExistente) {
            productoExistente.quantity++;
        } else {
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`"${producto.title}" ha sido añadido al carrito.`);
    }

    function mostrarCarrito() {
        const carritoContainer = document.getElementById('carrito-container');
        // Si no estamos en la página del carrito, no hacemos nada
        if (!carritoContainer) return;

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const carritoVacioMsg = document.getElementById('carrito-vacio');
        const carritoAcciones = document.getElementById('carrito-acciones');
        const totalPrecioEl = document.getElementById('total-precio');

        carritoContainer.innerHTML = ''; // Limpiamos la vista para no duplicar

        if (carrito.length === 0) {
            // Si no hay productos, mostramos el mensaje de vacío y ocultamos las acciones
            carritoVacioMsg.classList.remove('hidden');
            carritoAcciones.classList.add('hidden');
        } else {
            // Si SÍ hay productos, ocultamos el mensaje de vacío y mostramos las acciones
            carritoVacioMsg.classList.add('hidden');
            carritoAcciones.classList.remove('hidden');
            
            let total = 0;
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'carrito-items-container';

            carrito.forEach(producto => {
                const itemTotal = producto.price * producto.quantity;
                total += itemTotal;

                const productoHTML = `
                    <div class="carrito-item">
                        <img src="${producto.image}" alt="${producto.title}" class="carrito-item-imagen">
                        <div class="carrito-item-info">
                            <div>
                                <h3>${producto.title}</h3>
                                <p>Cantidad: ${producto.quantity}</p>
                            </div>
                            <p class="carrito-item-precio">$${itemTotal.toLocaleString('es-CL')}</p>
                        </div>
                    </div>
                `;
                itemsContainer.innerHTML += productoHTML;
            });

            carritoContainer.appendChild(itemsContainer);
            totalPrecioEl.textContent = `$${total.toLocaleString('es-CL')} CLP`;
        }
    }

    function vaciarCarrito() {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            localStorage.removeItem('carrito');
            mostrarCarrito();
        }
    }

    document.querySelectorAll('.add-to-cart').forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }
    
    // Esta línea se asegura de que el carrito se dibuje correctamente al cargar la página
    mostrarCarrito();

    // LÓGICA PARA LA PÁGINA DE CHECKOUT
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        const metodoEntrega = document.getElementById('metodo-entrega');
        const direccionDespacho = document.getElementById('direccion-despacho');

        metodoEntrega.addEventListener('change', () => {
            if (metodoEntrega.value === 'despacho') {
                direccionDespacho.classList.remove('hidden');
                document.getElementById('direccion').required = true;
                document.getElementById('ciudad').required = true;
            } else {
                direccionDespacho.classList.add('hidden');
                document.getElementById('direccion').required = false;
                document.getElementById('ciudad').required = false;
            }
        });

        checkoutForm.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const nombreUsuario = document.getElementById('nombre').value;
            alert(`¡Gracias por tu compra, ${nombreUsuario}!\nTu pedido ha sido realizado con éxito.`);
            localStorage.removeItem('carrito');
            window.location.href = '../index.html';
        });
    }
});