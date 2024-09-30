const express = require('express');
const session = require('express-session');
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const flash = require('express-flash');
const rutas = require('../rutas/mainRoutes');
const loginRutas = require('../rutas/loginRutas');




const app = express();
const port = process.env.PORT || 8080
// carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(flash())
//middleware
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'm1-klav3-23cr3ta',
    resave: false,
    saveUninitialized: true,
}));




app.use('/login', loginRutas)
app.use('/', rutas);


app.listen(port, (req, res) => {
    console.log(`Servidor escuchando en el puerto ${port}`); 
})
