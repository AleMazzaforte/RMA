// loginRutas.js

const express = require('express');
const router = express.Router();
const authController = require('../controladores/authController');


router.get('/login', authController.getLogin)




module.exports = router;
