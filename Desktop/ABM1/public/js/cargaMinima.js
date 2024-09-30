
//JavaScript para manejar el diálogo y el campo oculto
document.addEventListener("DOMContentLoaded", function() {
    const ordenProveedor1 = document.getElementById('ordenProveedor');
    const dialogMinimoOrden = document.getElementById('dialogMinimoOrden');
    const closeDialogBtn = document.getElementById('closeDialog');
    const guardarMinimoOrdenBtn = document.getElementById('guardarMinimoOrden');
    const inputMinimoOrdenDialog = document.getElementById('inputMinimoOrdenDialog');
    minimoOrdenInput = document.getElementById('minimoOrdenInput');

    // Escucha el cambio en el selector
    ordenProveedor1.addEventListener('change', function() {
        if (ordenProveedor1.value === 'Si') {
            // Muestra el cuadro de diálogo
            dialogMinimoOrden.style.display = 'flex';
        } else {
            // Si selecciona "No", guarda el valor "No" en el input oculto
            minimoOrdenInput.value = 'No';
        }
    });

    // Cerrar el cuadro de diálogo
    closeDialogBtn.addEventListener('click', function() {
        dialogMinimoOrden.style.display = 'none';
    });

    // Guardar el mínimo de orden ingresado
    guardarMinimoOrdenBtn.addEventListener('click', function() {
        const ordenProveedor1 = inputMinimoOrdenDialog.value;

        if (inputMinimoOrdenDialog.value && inputMinimoOrdenDialog.value >= 0) {
            // Guarda el valor ingresado en el campo oculto
            
            minimoOrdenInput.value = inputMinimoOrdenDialog.value;
            dialogMinimoOrden.style.display = 'none';
        } else {
            alert('Por favor ingrese un número válido para el mínimo de orden.');
        }
    });
});
