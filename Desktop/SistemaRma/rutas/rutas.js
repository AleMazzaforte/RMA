const express = require('express');
const router = express.Router();
const authController = require('../controladores/loginController');
const mainController = require('../controladores/mainController')

router.get('/',authController.isAuthenticated, mainController.getIndex)

router.get('/login', authController.getLogin);  // Muestra el formulario de login
router.post('/login', authController.postLogin);  // Procesa el formulario de login

// Ruta para logout
router.get('/logout', authController.logout);  // Lógica de logout


module.exports = router;
