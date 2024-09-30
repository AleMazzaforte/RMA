// productosController.js
const { connClientes } = require('../db/db');

module.exports = {
  validarProveedor: async (req, res) => {
    const { emailProveedor, password } = req.body;
    
    try {
      // Buscar el proveedor por email y password
      const [result] = await connClientes.query(
        'SELECT * FROM abmProveedores WHERE emailProveedor = ? AND passwordProveedor = ?',
        [emailProveedor, password]
       
      );
      
      if (result.length > 0) {
        // Si el proveedor es válido, guardar los datos en la sesión
        const proveedor = result[0];
        req.session.usuario = {
          proveedor: emailProveedor, // Guardar el email del proveedor en la sesión
          id_Proveedor: proveedor.id_Proveedor
        }
       //console.log('en productosController req.session.usuario', req.session.usuario)
        // Redirigir a la página de carga de productos
        res.redirect('/cargarProductos');
      } else {  
        // Si no se encuentra el proveedor, redirigir con un mensaje de error
        res.redirect('/login?error=Credenciales+inválidas');
      }
    } catch (error) { console.log('3333'); 
      console.error('Error al validar proveedor:', error);
      res.status(500).send('Error en el servidor');
    }
  },

  getCargarProductos: (req, res) => {
     
    if (req.user) {
      // Renderizar el formulario de carga de productos
      res.render('cargarProductos', { id_Proveedor: req.user.id_Proveedor });
    } else {
      // Redirigir a login si no hay usuario
      res.redirect('/login');
    }
  },

  postProducto: async (req, res) => {
    
    const { codigoProducto, descripcionProducto, precioProducto, kgProducto, m3Producto, posicionArancelariaProducto, monedaProducto } = req.body;

    // Obtener el id del proveedor desde la sesión
    const id_Proveedor = req.session.usuario.id_Proveedor;
    console.log('productos controller id_proveedor', id_Proveedor)
    try {
      // Insertar producto asociado al proveedor
      const result = await connClientes.query(
        'INSERT INTO abmProductos (codigoProducto, descripcionProducto, precioProducto, pesoProducto, m3Producto, posicionArancelaria, monedaProducto, id_Proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [codigoProducto, descripcionProducto, precioProducto, kgProducto, m3Producto, posicionArancelariaProducto, monedaProducto, id_Proveedor]
      );
      console.log('Resultado de la inserción:', result)
      res.redirect('/cargarProductos?success=Producto+agregado+exitosamente');
    } catch (error) {
      console.error('Error al agregar producto:', error);
      res.status(500).send('Error en el servidor');
    }
  }
};


