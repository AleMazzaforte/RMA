const mysql = require('mysql2');
const poolClientes = require('../db/db');
const bcrypt = require('bcryptjs');

module.exports = {
  crearUsuario: (usuario, password) => {
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const query = 'INSERT INTO usuarios (usuario, password) VALUES (?, ?)';
    poolClientes.execute(query, [usuario, hash], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Usuario creado con éxito');
      }
    });
  },

  verificarUsuario: (usuario, password) => {
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';
    poolClientes.execute(query, [usuario], (err, results) => {
      if (err) {
        console.error(err);
        return false;
      } else if (results.length === 0) {
        return false;
      } else {
        const usuarioEncontrado = results[0];
        return bcrypt.compareSync(password, usuarioEncontrado.password);
      }
    });
  },
};
