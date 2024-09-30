// src/middlewares/authMiddleware.js
const path = require('path');
const { connClientes } = require(path.join(__dirname, '../../db/db'));

const isLogued = async (req, res, next) => {
    if (req.session.usuario) { 
        try { 
            const [results] = await connClientes.query('SELECT * FROM abmUsuarios WHERE usuario = ?', [req.session.usuario]);
            if (results.length > 0) {
                req.user = results[0];
                req.user.esAdmin = results[0].rol === 'admin';
                
                next();
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error('Error al verificar sesión:', error);
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};

// Middleware para verificar la sesión del socio/proveedor
    const loginSocio = async (req, res, next) => { 
        if (req.session.usuario && req.session.usuario.proveedor) {  
            
            try {
                const [results] = await connClientes.query('SELECT * FROM abmProveedores WHERE emailProveedor = ?', [req.session.usuario.proveedor]);
                if (results.length > 0) {
                    
                    req.user = results[0]; // Proveedor encontrado
                    req.session.usuario.id_Proveedor = results[0].idProveedor; // Guardar idProveedor en la sesión
                    
                    // Guarda la sesión explícitamente antes de continuar
                    req.session.save((err) => {
                        if (err) {
                            console.error('Error al guardar la sesión:', err);
                            return res.redirect('/login?error=Error+al+guardar+la+sesión');
                        }
                        
                        next(); // Continua solo después de guardar la sesión
                    });
                } else {  
                    res.redirect('/login?error=Proveedor+no+encontrado');
                }
            } catch (error) {
                console.error('Error al verificar proveedor:', error);
                res.redirect('/login?error=Error+al+verificar+el+proveedor');
            }
        } else { 
            console.log('No hay proveedor en sesión');
            res.redirect('/login');
        }
    };


module.exports = {
    isLogued,
    loginSocio // Exportamos el nuevo middleware
};

