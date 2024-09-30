const ExcelJS = require('exceljs');
const { connClientes } = require('../db/db');

module.exports = {
    exportarProveedores: async (req, res) => {
        try {
            // Crear un nuevo libro de Excel
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Proveedores');

            // Agregar cabeceras
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Nombre', key: 'nombreProveedor', width: 30 },
                { header: 'Contacto', key: 'contactoProveedor', width: 30 },
                { header: 'Celular', key: 'celularProveedor', width: 20 },
                { header: 'Email', key: 'emailProveedor', width: 30 },
                { header: 'Web', key: 'webProveedor', width: 30 },
                { header: 'Orden Mínima', key: 'ordenProveedor', width: 20 },
                { header: 'País', key: 'paisProveedor', width: 20 },
                { header: 'Tipo', key: 'tipoProveedor', width: 20 },
                { header: 'Condición de Venta', key: 'condicionDeVenta', width: 30 },
                { header: 'Lugar de Entrega', key: 'lugarDeEntrega', width: 30 },
                { header: 'Foto', key: 'fotoProveedor', width: 30 }
            ];
            

            // Obtener datos de proveedores desde la base de datos
            const proveedoresDatos = await connClientes.query('SELECT * FROM abmProveedores');
            

            const proveedores = proveedoresDatos[0];
            // Agregar datos a la hoja de Excel
            proveedores.forEach(proveedor => { 
                worksheet.addRow({
                    id: proveedor.idProveedor,
                    nombreProveedor: proveedor.nombreProveedor,
                    contactoProveedor: proveedor.contactoProveedor,
                    celularProveedor: proveedor.celularProveedor,
                    emailProveedor: proveedor.emailProveedor,
                    webProveedor: proveedor.webProveedor,
                    ordenProveedor: proveedor.ordenProveedor,
                    paisProveedor: proveedor.paisProveedor,
                    tipoProveedor: proveedor.tipoProveedor,
                    condicionDeVenta: proveedor.condicionDeVenta,
                    lugarDeEntrega: proveedor.lugarDeEntrega,
                    fotoProveedor: proveedor.fotoProveedor
                });
            });
            
            // Configurar la respuesta HTTP
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=proveedores.xlsx');

            // Enviar el archivo Excel al cliente
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al exportar datos de proveedores');
        }
    },

    exportarProductos: async (req, res) => {
        try {
            // Crear un nuevo libro de Excel
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Productos');
    
            // Agregar cabeceras
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Código', key: 'codigoProducto', width: 20 },
                { header: 'Descripción', key: 'descripcionProducto', width: 30 },
                { header: 'Moneda', key: 'monedaProducto', width: 15 },
                { header: 'Precio', key: 'precioProducto', width: 15 },
                { header: 'Peso', key: 'pesoProducto', width: 15 },
                { header: 'M3', key: 'm3Producto', width: 15 },
                { header: 'Posición Arancelaria', key: 'posicionArancelaria', width: 30 },
                { header: 'Proveedor ID', key: 'id_Proveedor', width: 15 }
            ];
            console.log('Antes de realizar la consulta SQL para productos.');

            // Obtener datos de productos desde la base de datos
            const productosData = await connClientes.query('SELECT * FROM abmProductos');
            console.log('Datos obtenidos de la base de datos:', productosData);

             // Verificar si los datos están vacíos
             if (!productosData || productosData.length === 0) {
                console.warn('No se obtuvieron productos de la base de datos.');
            } else {
                console.log(`Se obtuvieron ${productosData.length} productos.`);
            }

            const productos = productosData[0];

            // Agregar datos a la hoja de Excel
            productos.forEach(producto => {
                worksheet.addRow({
                    id: producto.id,
                    codigoProducto: producto.codigoProducto,
                    descripcionProducto: producto.descripcionProducto,
                    monedaProducto: producto.monedaProducto,
                    precioProducto: producto.precioProducto,
                    pesoProducto: producto.pesoProducto,
                    m3Producto: producto.m3Producto,
                    posicionArancelaria: producto.posicionArancelaria,
                    id_Proveedor: producto.id_Proveedor
                });
            });

            console.log('Finalizando la creación del archivo Excel para productos.');
    
            // Configurar la respuesta HTTP
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');
    
            // Enviar el archivo Excel al cliente
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al exportar datos de productos');
        }
    }
};
