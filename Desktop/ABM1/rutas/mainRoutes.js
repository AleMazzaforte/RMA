const express = require('express');
const router = express.Router();
const controlador = require('../controladores/mainController');
const controladorP = require('../controladores/proveedorController');
const uploadFile = require('../src/middlewares/fotoMiddleware');
const productosController = require('../controladores/productosController');
const { isLogued, loginSocio } = require('../src/middlewares/authMiddleware');
const excelController = require('../controladores/excelController');
const logoutController = require('../controladores/logoutController');

//console.log(file)

router.get('/', controlador.getIndex )
router.get('/login', controlador.getLogin )
router.post('/login', controlador.postLogin)

router.get('/crearUsuario', isLogued, controlador.getUpdateUsuarios); // Ruta para mostrar el formulario
router.post('/crearUsuario', isLogued,controlador.postCrearUsuario);

//Rutas proveedores
router.post('/postProveedor', isLogued, uploadFile.single('fotoProveedor'), controladorP.postCargarProveedor);
// Ruta para obtener proveedores con paginación
router.get('/getProveedores', isLogued, controladorP.getProveedores);
router.get('/actualizarProveedor/:id', isLogued, controladorP.getActualizarProveedor); // Ruta para obtener el formulario de actualización
router.post('/actualizarProveedor/:id', isLogued, uploadFile.single('fotoProveedor'), controladorP.postActualizarProveedor); // Ruta para actualizar el proveedor
router.delete('/eliminarProveedor/:id', isLogued, controladorP.eliminarProveedor); // Ruta para eliminar el proveedor

// Rutas para productos
router.post('/validarProveedor', productosController.validarProveedor);
router.get('/cargarProductos', loginSocio, productosController.getCargarProductos); // Usamos loginSocio en lugar de isLogued
router.post('/postProducto', loginSocio, productosController.postProducto); // Usamos loginSocio;

// Rutas para exportar los datos
router.get('/exportarProveedores', isLogued, excelController.exportarProveedores);
router.get('/exportarProductos', isLogued, excelController.exportarProductos);

//Ruta para Logout
router.get('/logout', logoutController.getLogout); 

module.exports = router;
