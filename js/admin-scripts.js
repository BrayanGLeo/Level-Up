document.addEventListener('DOMContentLoaded', () => {
    const nuevoProductoForm = document.getElementById('nuevoProductoForm');
    if (nuevoProductoForm) {
        nuevoProductoForm.addEventListener('submit', guardarProducto);
        cargarDatosParaEditarProducto();
    }

    const nuevoUsuarioForm = document.getElementById('nuevoUsuarioForm');
    if (nuevoUsuarioForm) {
        nuevoUsuarioForm.addEventListener('submit', guardarUsuario);
        cargarDatosParaEditarUsuario();
    }

    if (document.getElementById('tabla-productos')) {
        listarProductos();
    }
    if (document.getElementById('tabla-usuarios')) {
        listarUsuarios();
    }
});

function guardarProducto(event) {
    event.preventDefault();
    if (!validarFormularioProducto()) return;

    const editIndex = document.getElementById('editIndex').value;
    let productos = JSON.parse(localStorage.getItem('productos_admin')) || [];

    const productoData = {
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        categoria: document.getElementById('categoria').value,
    };

    if (editIndex !== "") {
        productos[editIndex] = productoData;
        alert('Producto actualizado con éxito.');
    } else {
        productos.push(productoData);
        alert('Producto guardado con éxito.');
    }
    
    localStorage.setItem('productos_admin', JSON.stringify(productos));
    window.location.href = 'listar-productos.html';
}

function listarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos_admin')) || [];
    const tbody = document.getElementById('tabla-productos').querySelector('tbody');
    tbody.innerHTML = '';

    productos.forEach((producto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString('es-CL')}</td>
            <td>${producto.stock}</td>
            <td>
                <button class="btn-action edit" onclick="editarProducto(${index})">Editar</button>
                <button class="btn-action delete" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarProducto(index) {
    window.location.href = `nuevo-producto.html?editIndex=${index}`;
}

function cargarDatosParaEditarProducto() {
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('editIndex');

    if (editIndex !== null) {
        document.querySelector('.admin-header h1').textContent = 'Editar Producto';
        document.querySelector('button[type="submit"]').textContent = 'Actualizar Producto';

        let productos = JSON.parse(localStorage.getItem('productos_admin')) || [];
        const producto = productos[editIndex];

        if (producto) {
            document.getElementById('codigo').value = producto.codigo;
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('precio').value = producto.precio;
            document.getElementById('stock').value = producto.stock;
            document.getElementById('categoria').value = producto.categoria;
            document.getElementById('editIndex').value = editIndex;
        }
    }
}

function eliminarProducto(index) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        let productos = JSON.parse(localStorage.getItem('productos_admin')) || [];
        productos.splice(index, 1);
        localStorage.setItem('productos_admin', JSON.stringify(productos));
        listarProductos();
    }
}

function guardarUsuario(event) {
    event.preventDefault();
    if (!validarFormularioUsuario()) return;

    const editIndex = document.getElementById('editIndex').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios_admin')) || [];

    const usuarioData = {
        run: document.getElementById('run').value,
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
    };

    if (editIndex !== "") {
        usuarios[editIndex] = usuarioData;
        alert('Usuario actualizado con éxito.');
    } else {
        usuarios.push(usuarioData);
        alert('Usuario guardado con éxito.');
    }

    localStorage.setItem('usuarios_admin', JSON.stringify(usuarios));
    window.location.href = 'listar-usuarios.html';
}

function listarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios_admin')) || [];
    const tbody = document.getElementById('tabla-usuarios').querySelector('tbody');
    tbody.innerHTML = '';

    usuarios.forEach((usuario, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.run}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>
                <button class="btn-action edit" onclick="editarUsuario(${index})">Editar</button>
                <button class="btn-action delete" onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarUsuario(index) {
    window.location.href = `nuevo-usuario.html?editIndex=${index}`;
}

function cargarDatosParaEditarUsuario() {
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('editIndex');

    if (editIndex !== null) {
        document.querySelector('.admin-header h1').textContent = 'Editar Usuario';
        document.querySelector('button[type="submit"]').textContent = 'Actualizar Usuario';

        let usuarios = JSON.parse(localStorage.getItem('usuarios_admin')) || [];
        const usuario = usuarios[editIndex];

        if (usuario) {
            document.getElementById('run').value = usuario.run;
            document.getElementById('nombre').value = usuario.nombre;
            document.getElementById('email').value = usuario.email;
            document.getElementById('editIndex').value = editIndex;
        }
    }
}

function eliminarUsuario(index) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios_admin')) || [];
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios_admin', JSON.stringify(usuarios));
        listarUsuarios();
    }
}

function mostrarError(elementId, mensaje) {
    const elemento = document.getElementById(elementId);
    const errorSpan = elemento.nextElementSibling;
    errorSpan.textContent = mensaje;
}

function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(span => {
        span.textContent = '';
    });
}

function validarFormularioProducto() { return true; }
function validarFormularioUsuario() { return true; }