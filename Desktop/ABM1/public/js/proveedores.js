let offset = 0;

document.getElementById('cargarMas').addEventListener('click', () => {
    cargarProveedores();
});

function cargarProveedores() {
    fetch(`/getProveedores?offset=${offset}`)
        .then(response => response.json())
        .then(proveedores => {
            const proveedoresBody = document.getElementById('proveedoresBody');
            
            proveedores.forEach(proveedor => {
                const row = document.createElement('tr');

                // Formatear la fecha antes de mostrarla
                const fechaFormateada = formatearFecha(new Date(proveedor.fechaProveedor));
                let foto = 'Posee foto'
                if (proveedor.fotoProveedor === null) {
                     foto = 'No posee foto'
                }
                
                row.innerHTML = `
                    <td>${proveedor.nombreProveedor}</td>
                    <td>${proveedor.contactoProveedor}</td>
                    <td>${proveedor.celularProveedor}</td>
                    <td>${proveedor.emailProveedor}</td>
                    <td>${proveedor.webProveedor}</td>
                    <td>${proveedor.ordenProveedor}</td>
                    <td>${proveedor.paisProveedor}</td>
                    <td>${proveedor.tipoProveedor}</td>
                    <td>${fechaFormateada}</td>
                    <td>${proveedor.condicionDeVenta}</td>
                    <td>${proveedor.lugarDeEntrega}</td>
                    <td>${foto}</td>
                    <td>
                        <button class="btn-actualizar" data-id="${proveedor.idProveedor}">Editar</button>
                        <button class="btn-eliminar" data-id="${proveedor.idProveedor}">Borrar</button>
                    </td>
                `;

                proveedoresBody.appendChild(row);
            });

            // Asignar los eventos después de cargar los proveedores
            asignarEventosBotones();

            // Incrementar el offset para cargar los próximos 30 proveedores
            offset += 30;
        })
        .catch(err => {
            console.error('Error al cargar proveedores:', err);
        });
}

function formatearFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

function asignarEventosBotones() {
    const botonesActualizar = document.querySelectorAll('.btn-actualizar');
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');

    botonesActualizar.forEach(boton => {
        boton.addEventListener('click', () => {
            const proveedorId = boton.getAttribute('data-id');
            window.location.href = `/actualizarProveedor/${proveedorId}`;
        });
    });

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            const proveedorId = boton.getAttribute('data-id');
            if (proveedorId) {
                if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
                    eliminarProveedor(proveedorId);
                }
            } else {
                console.error('ID del proveedor no encontrado');
            }
        });
    });
}

function eliminarProveedor(proveedorId) {
    fetch(`/eliminarProveedor/${proveedorId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Proveedor eliminado con éxito');
            window.location.href = '/';// Recarga la página para actualizar la lista
        } else {
            alert('Error al eliminar el proveedor');
        }
    })
    .catch(err => {
        console.error('Error al eliminar proveedor:', err);
    });
}




// Cargar los primeros 30 proveedores cuando la página se cargue
window.onload = cargarProveedores();


