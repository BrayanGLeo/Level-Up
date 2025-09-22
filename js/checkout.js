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
            const nombreUsuario = document.getElementById('nombre').value;
            alert(`¡Gracias por tu compra, ${nombreUsuario}!\nTu pedido ha sido realizado con éxito.`);
            localStorage.removeItem('carrito');
            window.location.href = '../index.html';
        });
    }
});