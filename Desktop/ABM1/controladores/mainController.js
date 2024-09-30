const path = require('path');
const { connClientes } = require('../db/db');
const bcrypt = require('bcryptjs');
const { isLogued } = require(path.join(__dirname, '../src/middlewares/authMiddleware'));
const paises = require('./paises');  // Importa el arreglo de países desde paises.js

module.exports = {

    // Método para cargar la página de inicio con los países
    getIndex: [isLogued, (req, res) => {
        try {
            const esAdmin = req.user.rol === 'Administrador'; // Verifica si el usuario es administrador
            res.render('index.ejs', { paises, esAdmin });
        } catch (error) {
            console.error('Error al obtener países:', error);
            res.status(500).send('Error al obtener países');
        }
    }],

    // Métodos para login
    getLogin: (req, res) => {
        res.render('login.ejs');
    },

    postLogin: async (req, res) => {
        const { usuario, password } = req.body;
        const query = 'SELECT * FROM abmUsuarios WHERE usuario = ?';

        try {
            const [results] = await connClientes.query(query, [usuario]);

            if (results.length === 0) {
                // Si no se encuentra el usuario
                res.redirect('/login');
            } else {
                const usuarioEncontrado = results[0];
                const isPasswordCorrect = await bcrypt.compare(password, usuarioEncontrado.password); // compare async
                if (isPasswordCorrect) {
                    req.session.usuario = usuario; // Guardar usuario en la sesión
                    req.session.role = usuarioEncontrado.rol; // Guardar el rol en la sesión
                    res.redirect('/');
                } else {
                    // Si la contraseña es incorrecta
                    res.redirect('/login');
                }
            }
        } catch (error) {
            console.error('Error en la consulta de login:', error); // Captura cualquier error en la consulta
            res.redirect('/login');
        }
    },

    // Métodos para crear usuarios
    getUpdateUsuarios: [isLogued, (req, res) => {
        if (req.user.rol === 'Administrador') {
             res.render('updateUsuarios.ejs');
        }else {
            res.send('<h1>Usuario invitado no tiene acceso</h1>')
        }
        
    }],

    postCrearUsuario: async (req, res) => {
        const { nombre, password, rol } = req.body; // Asegúrate de capturar el rol si es necesario
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            await connClientes.query('INSERT INTO abmUsuarios (usuario, password, rol) VALUES (?, ?, ?)', [nombre, hash, rol]);
            res.redirect('/login'); // Redirige al login después de crear el usuario
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.redirect('/crearUsuario'); // O redirige a una página de error
        }
    }
};

