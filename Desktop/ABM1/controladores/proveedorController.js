const { connClientes } = require('../db/db'); // Asegúrate de importar connClientes
const bcrypt = require('bcryptjs');
const paises = require('./paises'); // Importar el archivo de países


module.exports = {    
    // Cargar un nuevo proveedor
    postCargarProveedor: (req, res) => {
            
        const { 
            nombreProveedor, 
            contactoProveedor,
            passwordProveedor, 
            celularProveedor, 
            emailProveedor, 
            webProveedor,  
            minimoOrdenInput, 
            paisProveedor, 
            tipoProveedor, 
            condicionDeVenta, 
            lugarDeEntrega
        } = req.body;
    
        // Obtener el nombre del país a partir del ID
        const paisSeleccionado = paises.find(p => p.id == paisProveedor);
    
        if (!paisSeleccionado) {
            return res.status(400).send('País no válido');
        }
    
        const nombrePais = paisSeleccionado.nombre;
    
      
    
        // Agregar los campos adicionales en la consulta SQL
        const query = 'INSERT INTO abmProveedores (nombreProveedor, contactoProveedor, passwordProveedor, celularProveedor, emailProveedor, webProveedor, ordenProveedor, paisProveedor, tipoProveedor, condicionDeVenta, lugarDeEntrega, fotoProveedor, fechaProveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())';
        
        connClientes.execute(query, [
            nombreProveedor, 
            contactoProveedor,
            passwordProveedor,
            celularProveedor, 
            emailProveedor, 
            webProveedor, 
            minimoOrdenInput, 
            nombrePais, 
            tipoProveedor, 
            condicionDeVenta, 
            lugarDeEntrega, 
            req.file ? req.file.filename : null // Verificamos si hay archivo, de lo contrario pasamos null
        ])
        .then(([results1]) => {
            return res.redirect('/?success=Proveedor cargado con éxito');
        })
        .catch((err) => {
            console.error('Error al cargar proveedor:', err.message, err.code, err.stack);
            res.status(500).send('Error al cargar proveedor');
        });
    },
    

    // Obtener la lista de proveedores con paginación
      // Controlador para obtener todos los proveedores
    getProveedores: (req, res) => {
        const query = 'SELECT * FROM abmProveedores'; // Consulta para obtener todos los proveedores
        connClientes.execute(query)
            .then(([results1]) => {
                res.json(results1); // Enviar todos los resultados en formato JSON
            })
            .catch((err) => {
                console.error('Error al obtener proveedores:', err.message, err.code, err.stack);
                res.status(500).send('Error al obtener proveedores');
            });
    },


    // Obtener el proveedor para editar
    getActualizarProveedor: async (req, res) => {
        const proveedorId = req.params.id;

        // Consulta para obtener los datos del proveedor
        const queryProveedor = 'SELECT * FROM abmProveedores WHERE idProveedor = ?';

        try {
            // Ejecutar la consulta del proveedor
            const [proveedorResults] = await connClientes.execute(queryProveedor, [proveedorId]);
            
            if (proveedorResults.length > 0) {
                // Renderizar la vista con el proveedor y la lista de países
                res.render('editarProveedor', { proveedor: proveedorResults[0], paises });
            } else {
                res.status(404).send('Proveedor no encontrado');
            }
        } catch (err) {
            console.error('Error al obtener proveedor:', err.message, err.code, err.stack);
            res.status(500).send('Error al obtener proveedor');
        }
    },

    // Actualizar proveedor
    postActualizarProveedor: async (req, res) => {
        const { id } = req.params;
        const { nombreProveedor, contactoProveedor, celularProveedor, emailProveedor, webProveedor, minimoOrdenInput, paisProveedor, tipoProveedor, condicionDeVenta, lugarDeEntrega } = req.body;
        
        if (!id) {
            return res.status(400).send('El ID del proveedor es necesario');
        }
    
        // Obtener el nombre del país a partir del ID
        const paisSeleccionado = paises.find(p => p.id == paisProveedor);
        
        if (!paisSeleccionado) {
            return res.status(400).send('País no válido');
        }
    
        const nombrePais = paisSeleccionado.nombre;
    
        try {
            // Verificar si el mínimo de orden no ha sido proporcionado y mantener el valor anterior si es el caso
            let minimoOrden = minimoOrdenInput;
    
            if (!minimoOrdenInput || minimoOrdenInput.trim() === "") {
                // Obtener el valor anterior de la base de datos
                const querySelectMinimoOrden = 'SELECT ordenProveedor FROM abmProveedores WHERE idProveedor = ?';
                const [result] = await connClientes.execute(querySelectMinimoOrden, [id]);
                minimoOrden = result[0].ordenProveedor; // Reemplazar por el valor existente
            }
    
            // Consulta SQL para actualizar el proveedor
            const query = `
                UPDATE abmProveedores 
                SET nombreProveedor = ?, contactoProveedor = ?, celularProveedor = ?, emailProveedor = ?, webProveedor = ?, ordenProveedor = ?, paisProveedor = ?, tipoProveedor = ?, condicionDeVenta = ?, lugarDeEntrega = ?, fotoProveedor = ?
                WHERE idProveedor = ?
            `;
            
            await connClientes.execute(query, [
                nombreProveedor, 
                contactoProveedor, 
                celularProveedor, 
                emailProveedor, 
                webProveedor, 
                minimoOrden, // Utilizar el valor correcto
                nombrePais, 
                tipoProveedor, 
                condicionDeVenta, 
                lugarDeEntrega, 
                req.body ? req.body.fotoProveedor : null, 
                id
            ]);
    
            return res.redirect('/?success=Proveedor actualizado con éxito');
        } catch (err) {
            console.error('Error al actualizar proveedor:', err.message, err.code, err.stack);
            res.status(500).send('Error al actualizar proveedor');
        }
    },    

    // Eliminar proveedor
    eliminarProveedor: (req, res) => {
        const proveedorId = req.params.id;
        const query = 'DELETE FROM abmProveedores WHERE idProveedor = ?';

        connClientes.execute(query, [proveedorId])
            .then(([results]) => {
                if (results.affectedRows > 0) {
                    res.status(200).send('Proveedor eliminado con éxito');
                } else {
                    res.status(404).send('Proveedor no encontrado');
                }
            })
            .catch((err) => {
                console.error('Error al eliminar proveedor:', err.message, err.code, err.stack);
                res.status(500).send('Error al eliminar proveedor');
            });
    }
};


