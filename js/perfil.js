document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert("Debes iniciar sesión para acceder a esta página.");
        window.location.href = 'login.html';
        return;
    }

    const userNameEl = document.getElementById('user-name');
    const userEmailEl = document.getElementById('user-email');
    if (userNameEl && userEmailEl) {
        userNameEl.textContent = `${currentUser.name} ${currentUser.surname}`;
        userEmailEl.textContent = currentUser.email;
    }

    const changePicBtn = document.getElementById('change-pic-btn');
    const fileInput = document.getElementById('file-input');
    const profilePic = document.getElementById('profile-pic');

    if (changePicBtn) {
        changePicBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePic.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const changeEmailForm = document.getElementById('changeEmailForm');
    const changePasswordForm = document.getElementById('changePasswordForm');

    if (changeEmailForm) {
        changeEmailForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Correo electrónico actualizado con éxito (simulado).');
            changeEmailForm.reset();
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newPass = document.getElementById('new-password').value;
            const confirmPass = document.getElementById('confirm-password').value;

            if (newPass !== confirmPass) {
                alert('Las nuevas contraseñas no coinciden.');
                return;
            }
            alert('Contraseña actualizada con éxito (simulado).');
            changePasswordForm.reset();
        });
    }

    const orderListContainer = document.getElementById('order-list-container');
    const orderDetailsContainer = document.getElementById('order-details-container');

    if (orderListContainer) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        function showOrderList() {
            orderListContainer.innerHTML = '';
            orderDetailsContainer.classList.add('hidden');
            orderListContainer.classList.remove('hidden');

            if (orders.length === 0) {
                orderListContainer.innerHTML = '<p>Aún no has realizado ningún pedido. ¡<a href="catalogo.html">Explora nuestro catálogo</a> para empezar!</p>';
                return;
            }

            const orderTable = document.createElement('table');
            orderTable.className = 'order-table';
            orderTable.innerHTML = `
                <thead>
                    <tr>
                        <th>N° de Orden</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            const tbody = orderTable.querySelector('tbody');

            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>#${order.number}</td>
                    <td>${order.date}</td>
                    <td>$${order.total.toLocaleString('es-CL')}</td>
                    <td><button class="btn btn-small view-details-btn" data-order-number="${order.number}">Ver Detalles</button></td>
                `;
                tbody.appendChild(row);
            });
            orderListContainer.appendChild(orderTable);
        }

        function showOrderDetails(orderNumber) {
            const order = orders.find(o => o.number == orderNumber);
            if (!order) return;

            orderListContainer.classList.add('hidden');
            orderDetailsContainer.classList.remove('hidden');
            
            const detailsContent = document.getElementById('order-details-content');
            detailsContent.innerHTML = `
                <h3>Detalles del Pedido #${order.number}</h3>
                <p><strong>Fecha:</strong> ${order.date}</p>
                <p><strong>Total:</strong> $${order.total.toLocaleString('es-CL')}</p>
                <p><strong>Cliente:</strong> ${order.customer.name} (${order.customer.email})</p>
                <h4>Artículos Comprados:</h4>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <img src="${item.image.startsWith('http') ? item.image : '../' + item.image}" alt="${item.title}" class="order-item-image">
                            <span>${item.title} (x${item.quantity})</span>
                            <span>$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        orderListContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-details-btn')) {
                showOrderDetails(event.target.dataset.orderNumber);
            }
        });

        const backButton = document.getElementById('back-to-orders');
        if(backButton) {
            backButton.addEventListener('click', showOrderList);
        }

        showOrderList();
    }
});