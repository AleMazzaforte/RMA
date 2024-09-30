// controladores/logoutController.js

module.exports = {
    
    getLogout: (req, res) => {
        
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.redirect('/'); // Redirige a la página principal en caso de error
            }
            res.redirect('/login'); // Redirige a la página de login
        });
    }
};


