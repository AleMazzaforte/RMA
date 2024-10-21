const express = require('express');
const path = require('path');
const rutas = require('./rutas/rutas.js');
const session = require('express-session');
require('dotenv').config();


const port = process.env.PORT ;

const app = express();

// Configuración de express-session
app.use(session({
    secret: process.env.SECRET_KEY,  // Cambia esto por una cadena secreta única
    resave: false,  // No vuelve a guardar la sesión si no se modifica
    saveUninitialized: false,  // No guarda sesiones no inicializadas
    cookie: { secure: false }  // Si estás en producción, cambia a `true` solo si usas HTTPS
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usar las rutas importadas
app.use('/', rutas);



app.listen(port, (req, res) => {
    console.log(`Servidor corriendo en puerto:  ${port}`);
})

