
module.exports = {
    getLogin: (req, res) => {
        res.render('login');
    },

    postLogin: (req, res) => {
        const { username, password } = req.body;

        // Aquí podrías agregar una verificación real, como buscar en una base de datos
        if (username === 'usuarioCorrecto' && password === 'contraseniaCorrecta') {
            req.session.usuario = username;  // Almacenar el nombre de usuario en la sesión
            req.session.isAuthenticated = true;  // Marcar que está autenticado
            return res.redirect('/');
        } else {
            res.redirect('/login');
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error al cerrar sesión');
            }
            res.redirect('/login');
        });
    },

    isAuthenticated: (req, res, next) => {
        if (req.session.isAuthenticated) {  // Verificar si está autenticado
            return next();
        } else {
            res.redirect('/login');
        }
    }
};
