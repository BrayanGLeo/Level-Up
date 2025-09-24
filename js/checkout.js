document.addEventListener('DOMContentLoaded', () => {
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

            const cart = JSON.parse(localStorage.getItem('carrito')) || [];
            if (cart.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            const orderNumber = Date.now();
            const orderDate = new Date().toLocaleDateString('es-CL');
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            
            const newOrder = {
                number: orderNumber,
                date: orderDate,
                items: cart,
                total: total,
                customer: {
                    name: document.getElementById('nombre').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('telefono').value,
                }
            };

            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));

            localStorage.removeItem('carrito');

            alert(`¡Gracias por tu compra, ${newOrder.customer.name}!\nTu pedido #${orderNumber} ha sido realizado con éxito.`);
            window.location.href = '../index.html';
        });
    }
});