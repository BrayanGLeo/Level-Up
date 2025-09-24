document.querySelectorAll('.add-to-cart').forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const productoCard = evento.target.closest('.product-card');
            const producto = {
                code: productoCard.dataset.code, title: productoCard.dataset.title,
                price: parseFloat(productoCard.dataset.price), image: productoCard.dataset.image,
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
        });
    });
    
    // Vaciar todo el carrito
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                localStorage.removeItem('carrito');
                mostrarCarrito();
            }
        });
    }

    const carritoContainer = document.getElementById('carrito-container');
    if (carritoContainer) {
        carritoContainer.addEventListener('click', (evento) => {
            if (evento.target.classList.contains('restar-item')) {
                modificarCantidad(evento.target.dataset.code, -1);
            }
            if (evento.target.classList.contains('sumar-item')) {
                modificarCantidad(evento.target.dataset.code, 1);
            }
        });
    }

    mostrarCarrito();

function cerrarSesion() {
    localStorage.removeItem('sesionIniciada');
    alert("¡Has cerrado sesión exitosamente!");
}

function actualizarNavegacion() {
    const sesionIniciada = localStorage.getItem('sesionIniciada');
    const enlacesLogin = document.querySelectorAll('.enlace-login');
    const enlacesLogout = document.querySelectorAll('.enlace-logout');

    if (sesionIniciada === 'true') {
        enlacesLogin.forEach(enlace => enlace.style.display = 'none');
        enlacesLogout.forEach(enlace => enlace.style.display = 'block');
    } else {
        enlacesLogin.forEach(enlace => enlace.style.display = 'block');
        enlacesLogout.forEach(enlace => enlace.style.display = 'none');
    }
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito-container');
    if (!carritoContainer) return;

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoVacioMsg = document.getElementById('carrito-vacio');
    const carritoAcciones = document.getElementById('carrito-acciones');
    const totalPrecioEl = document.getElementById('total-precio');

    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoVacioMsg.classList.remove('hidden');
        carritoAcciones.classList.add('hidden');
    } else {
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
                            <div class="carrito-item-cantidad">
                                <button class="btn-cantidad restar-item" data-code="${producto.code}">-</button>
                                <span>${producto.quantity}</span>
                                <button class="btn-cantidad sumar-item" data-code="${producto.code}">+</button>
                            </div>
                        </div>
                        <p class="carrito-item-precio">$${itemTotal.toLocaleString('es-CL')}</p>
                    </div>
                </div>`;
            itemsContainer.innerHTML += productoHTML;
        });

        carritoContainer.appendChild(itemsContainer);
        totalPrecioEl.textContent = `$${total.toLocaleString('es-CL')} CLP`;
    }
}

function modificarCantidad(productCode, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.code === productCode);

    if (productoExistente) {
        productoExistente.quantity += cambio;
        if (productoExistente.quantity <= 0) {
            carrito = carrito.filter(item => item.code !== productCode);
        }
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}