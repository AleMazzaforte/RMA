// login.js

document.addEventListener('DOMContentLoaded', function () {
    const btnInvitado = document.getElementById('btn-invitado');
    const btnSocio = document.getElementById('btn-socio');
    const formInvitado = document.getElementById('form-invitado');
    const formSocio = document.getElementById('form-socio');

    // Mostrar formulario de Invitado y ocultar el de Socio
    btnInvitado.addEventListener('click', function () {
        formInvitado.style.display = 'block';
        formSocio.style.display = 'none';
    });

    // Mostrar formulario de Socio y ocultar el de Invitado
    btnSocio.addEventListener('click', function () {
        formSocio.style.display = 'block';
        formInvitado.style.display = 'none';
    });
});
