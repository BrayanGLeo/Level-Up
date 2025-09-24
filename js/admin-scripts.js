document.addEventListener('DOMContentLoaded', () => {
    const regionesYComunas = {
        "Biobío": ["Concepción", "Los Ángeles", "Talcahuano", "Coronel", "Chiguayante", "Hualpén"],
        "Metropolitana": ["Santiago", "Maipú", "Puente Alto", "La Florida", "Las Condes", "Ñuñoa"],
        "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Los Andes"],
        "Araucanía": ["Temuco", "Villarrica", "Pucón", "Angol", "Lautaro", "Carahue"],
        "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Los Vilos", "Andacollo"]
    };

    const nuevoProductoForm = document.getElementById('nuevoProductoForm');
    if (nuevoProductoForm) {
        nuevoProductoForm.addEventListener('submit', guardarProducto);
        cargarDatosParaEditarProducto();
    }

    const nuevoUsuarioForm = document.getElementById('nuevoUsuarioForm');
    if (nuevoUsuarioForm) {
        const regionSelect = document.getElementById('region');
        const comunaSelect = document.getElementById('comuna');

        regionSelect.innerHTML = '<option value="">Seleccione una región</option>';
        for (const region in regionesYComunas) {
            regionSelect.innerHTML += `<option value="${region}">${region}</option>`;
        }

        regionSelect.addEventListener('change', () => {
            comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
            const regionSeleccionada = regionSelect.value;
            if (regionSeleccionada && regionesYComunas[regionSeleccionada]) {
                regionesYComunas[regionSeleccionada].forEach(comuna => {
                    comunaSelect.innerHTML += `<option value="${comuna}">${comuna}</option>`;
                });
            }
        });

        nuevoUsuarioForm.addEventListener('submit', guardarUsuario);
        cargarDatosParaEditarUsuario(regionesYComunas);
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
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        stockCritico: document.getElementById('stockCritico').value,
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value,
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
        const alertaStock = (producto.stockCritico && parseInt(producto.stock) <= parseInt(producto.stockCritico)) 
            ? `<br><small style="color:red;">(Stock bajo)</small>` 
            : '';

        tr.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString('es-CL')}</td>
            <td>${producto.stock}${alertaStock}</td>
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
            document.getElementById('descripcion').value = producto.descripcion || '';
            document.getElementById('precio').value = producto.precio;
            document.getElementById('stock').value = producto.stock;
            document.getElementById('stockCritico').value = producto.stockCritico || '';
            document.getElementById('categoria').value = producto.categoria;
            document.getElementById('imagen').value = producto.imagen || '';
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
        apellidos: document.getElementById('apellidos').value,
        email: document.getElementById('email').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        direccion: document.getElementById('direccion').value,
        region: document.getElementById('region').value,
        comuna: document.getElementById('comuna').value,
        tipoUsuario: document.getElementById('tipoUsuario').value,
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
            <td>${usuario.nombre} ${usuario.apellidos}</td>
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

function cargarDatosParaEditarUsuario(regionesYComunas) {
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
            document.getElementById('apellidos').value = usuario.apellidos || '';
            document.getElementById('email').value = usuario.email;
            document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento || '';
            document.getElementById('direccion').value = usuario.direccion || '';
            document.getElementById('tipoUsuario').value = usuario.tipoUsuario || '';
            document.getElementById('editIndex').value = editIndex;
            
            // Cargar y seleccionar región y comuna
            const regionSelect = document.getElementById('region');
            regionSelect.value = usuario.region;
            
            // Disparar el evento change para cargar las comunas correspondientes
            const event = new Event('change');
            regionSelect.dispatchEvent(event);
            
            document.getElementById('comuna').value = usuario.comuna;
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

function validarFormularioProducto() {
    limpiarErrores();
    let esValido = true;

    const codigo = document.getElementById('codigo').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const stockCritico = document.getElementById('stockCritico').value;
    const categoria = document.getElementById('categoria').value;

    if (!codigo) {
        mostrarError('codigo', 'El código del producto es requerido.');
        esValido = false;
    } else if (codigo.length < 3) {
        mostrarError('codigo', 'El código debe tener al menos 3 caracteres.');
        esValido = false;
    }

    if (!nombre) {
        mostrarError('nombre', 'El nombre del producto es requerido.');
        esValido = false;
    } else if (nombre.length > 100) {
        mostrarError('nombre', 'El nombre no debe exceder los 100 caracteres.');
        esValido = false;
    }

    if (precio === '') {
        mostrarError('precio', 'El precio es requerido.');
        esValido = false;
    } else if (parseFloat(precio) < 0) {
        mostrarError('precio', 'El precio no puede ser negativo.');
        esValido = false;
    }

    if (stock === '') {
        mostrarError('stock', 'El stock es requerido.');
        esValido = false;
    } else if (!Number.isInteger(parseFloat(stock)) || parseInt(stock) < 0) {
        mostrarError('stock', 'El stock debe ser un número entero igual o mayor a 0.');
        esValido = false;
    }

    if (!categoria) {
        mostrarError('categoria', 'Debe seleccionar una categoría.');
        esValido = false;
    }

    if (descripcion && descripcion.length > 500) {
        mostrarError('descripcion', 'La descripción no debe exceder los 500 caracteres.');
        esValido = false;
    }

    if (stockCritico && (!Number.isInteger(parseFloat(stockCritico)) || parseInt(stockCritico) < 0)) {
        mostrarError('stockCritico', 'El stock crítico debe ser un número entero igual o mayor a 0.');
        esValido = false;
    }

    return esValido;
}

function validarFormularioUsuario() {
    limpiarErrores();
    let esValido = true;

    const run = document.getElementById('run').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;

    if (!run) {
        mostrarError('run', 'El RUN es requerido.');
        esValido = false;
    } else if (run.length < 7 || run.length > 9) {
        mostrarError('run', 'El RUN debe tener entre 7 y 9 caracteres.');
        esValido = false;
    }

    if (!nombre) {
        mostrarError('nombre', 'El nombre es requerido.');
        esValido = false;
    } else if (nombre.length > 50) {
        mostrarError('nombre', 'El nombre no debe exceder los 50 caracteres.');
        esValido = false;
    }

    if (!apellidos) {
        mostrarError('apellidos', 'Los apellidos son requeridos.');
        esValido = false;
    } else if (apellidos.length > 100) {
        mostrarError('apellidos', 'Los apellidos no deben exceder los 100 caracteres.');
        esValido = false;
    }

    if (!email) {
        mostrarError('email', 'El correo electrónico es requerido.');
        esValido = false;
    } else if (email.length > 100) {
        mostrarError('email', 'El correo no debe exceder los 100 caracteres.');
        esValido = false;
    } else if (!email.endsWith('@duoc.cl') && !email.endsWith('@profesor.duoc.cl') && !email.endsWith('@gmail.com')) {
        mostrarError('email', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.');
        esValido = false;
    }

    if (!direccion) {
        mostrarError('direccion', 'La dirección es requerida.');
        esValido = false;
    } else if (direccion.length > 300) {
        mostrarError('direccion', 'La dirección no debe exceder los 300 caracteres.');
        esValido = false;
    }

    if (!region) {
        mostrarError('region', 'Debe seleccionar una región.');
        esValido = false;
    }
    
    if (!comuna) {
        mostrarError('comuna', 'Debe seleccionar una comuna.');
        esValido = false;
    }

    if (!tipoUsuario) {
        mostrarError('tipoUsuario', 'Debe seleccionar un tipo de usuario.');
        esValido = false;
    }

    return esValido;
}