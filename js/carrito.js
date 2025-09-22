document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA PARA AÑADIR AL CARRITO (usado en catalogo.html) ---
    function agregarAlCarrito(evento) {
        const productoCard = evento.target.closest('.product-card');
        if (!productoCard) return;

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

    document.querySelectorAll('.add-to-cart').forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    // --- LÓGICA PARA LA PÁGINA DEL CARRITO (usado en carrito.html) ---
    const carritoContainer = document.getElementById('carrito-container');
    if (carritoContainer) {
        function mostrarCarrito() {
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
                                    <p>Cantidad: ${producto.quantity}</p>
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

        function vaciarCarrito() {
            if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                localStorage.removeItem('carrito');
                mostrarCarrito();
            }
        }

        const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
        if (vaciarCarritoBtn) {
            vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
        }
        
        mostrarCarrito(); // Llama para dibujar el carrito al cargar la página.
    }
});