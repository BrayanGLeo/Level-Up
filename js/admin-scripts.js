document.addEventListener('DOMContentLoaded', () => {
    inicializarProductos();

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

function inicializarProductos() {
    if (localStorage.getItem('productos_admin')) {
        return;
    }

    const productosCatalogo = [
        { codigo: "JM001", nombre: "Catan", descripcion: "Un clásico juego de estrategia donde compites por colonizar la isla de Catan.", precio: 29990, stock: 15, stockCritico: 5, categoria: "juegos", imagen: "https://dojiw2m9tvv09.cloudfront.net/10102/product/X_catan9477.jpg?43&time=1757334820" },
        { codigo: "JM002", nombre: "Carcassonne", descripcion: "Un juego de colocación de fichas donde construyes el paisaje medieval.", precio: 24990, stock: 20, stockCritico: 5, categoria: "juegos", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0QZhisa2tKRa2YTmjEjXPBMwT3DkYtKgcuQ&s" },
        { codigo: "AC001", nombre: "Controlador Xbox Series X", descripcion: "Experiencia de juego cómoda con botones mapeables y respuesta táctil mejorada.", precio: 59990, stock: 30, stockCritico: 10, categoria: "accesorios", imagen: "https://http2.mlstatic.com/D_NQ_NP_851883-MLA54692335944_032023-O.webp" },
        { codigo: "AC002", nombre: "Auriculares HyperX Cloud II", descripcion: "Sonido envolvente de calidad con micrófono desmontable y espuma viscoelástica.", precio: 79990, stock: 25, stockCritico: 8, categoria: "accesorios", imagen: "https://http2.mlstatic.com/D_NQ_NP_719345-MLU77945147420_082024-O.webp" },
        { codigo: "CO001", nombre: "PlayStation 5", descripcion: "La consola de última generación de Sony, con gráficos impresionantes y carga ultrarrápida.", precio: 549990, stock: 10, stockCritico: 3, categoria: "consolas", imagen: "https://http2.mlstatic.com/D_Q_NP_883946-MLA79964406701_102024-O.webp" },
        { codigo: "CG001", nombre: "PC Gamer ASUS ROG Strix", descripcion: "Un potente equipo diseñado para los gamers más exigentes, con los últimos componentes.", precio: 1299990, stock: 5, stockCritico: 2, categoria: "consolas", imagen: "https://www.asus.com/media/Odin/Websites/global/Series/52.png" },
        { codigo: "SG001", nombre: "Silla Gamer Secretlab Titan", descripcion: "Diseñada para el máximo confort, con soporte ergonómico y personalización ajustable.", precio: 349990, stock: 12, stockCritico: 4, categoria: "accesorios", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_eJAGG3mPro93cQDCHvq5yis6rEBVfxar3SGGGO3Huic3NRc6l4pv5gYTEpZXS2N5JaI&usqp=CAU" },
        { codigo: "MS001", nombre: "Mouse Gamer Logitech G502 HERO", descripcion: "Con sensor de alta precisión y botones personalizables para un control preciso.", precio: 49990, stock: 40, stockCritico: 10, categoria: "accesorios", imagen: "https://http2.mlstatic.com/D_NQ_NP_657872-MLU70840166924_082023-O.webp" },
        { codigo: "MP001", nombre: "Mousepad Razer Goliathus", descripcion: "Área de juego amplia con iluminación RGB personalizable y superficie suave.", precio: 29990, stock: 50, stockCritico: 15, categoria: "accesorios", imagen: "https://assets2.razerzone.com/images/pnx.assets/b761ba62aece1bcec7a7d9c998177cb9/razer-goliathus-chroma-3xl-ogimage_1200x630.webp" },
        { codigo: "PP001", nombre: "Polera Gamer Personalizada", descripcion: "Camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag.", precio: 14990, stock: 100, stockCritico: 20, categoria: "accesorios", imagen: "https://i.imgur.com/yX3aL8p.jpeg" }
    ];

    localStorage.setItem('productos_admin', JSON.stringify(productosCatalogo));
}


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
            
            const regionSelect = document.getElementById('region');
            regionSelect.value = usuario.region;
            
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