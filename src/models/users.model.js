const sql = require('../config/dataBase/connection.database');

const Usuario = function(usuario) {
    this.rut = usuario.rut;
    this.dv = usuario.dv;
    this.nombres = usuario.nombres;
    this.apellido_paterno = usuario.apellido_paterno;
    this.apellido_materno = usuario.apellido_materno;
    this.email = usuario.email;
    this.fono = usuario.fono;
    this.instagram = usuario.instagram;
    this.password = usuario.password;
}

Usuario.crear = (nuevo_Usuario, resultado) => {
    sql.query('INSERT INTO usuarios SET ?', nuevo_Usuario, (error, res) => {
        if(error){
            console.log('Error al insertar');
            resultado(error, null);
            return;
        }
        console.log(`Usuario creado: { rut: ${res.rut}-${res.dv} }`);
        return resultado(null, { rut: `${res.rut}-${res.dv}` });
    }); 
}

Usuario.buscarPorRut = (rut, resultado) => {
    if(rut.includes('-')){
       rut = rut.split('-')[0];
    }
    sql.query(`SELECT * FROM usuarios Where rut = ${rut}`, (error, res) => {
        if(error){
            console.log(`Error al consultar por el rut: ${rut}, error: ${error}`);
            resultado(error, null);
            return;
        } else if(res.length) {
            console.log(`Rut encontrado: ${res[0]}`);
            resultado(null, res[0]);
            return;
        }
        console.log(`Usuario no encontrado`);
        resultado({ kind: 'not_found' }, null);
        return;
    }); 
};

Usuario.buscarTodos = resultado => {
    sql.query('SELECT * FROM usuarios', (error, res) => {
        if (error) {
            console.log(`Error al consultar por los usuarios, error: ${error}`);
          resultado(null, error);
          return;
        }   
        console.log(`Usuarios encontrados: ${res}`);
        resultado(null, res);
    });
};

Usuario.modificarPorRut = (rut, usuarios, result) => {
    if(rut.includes('-')){
        rut = rut.split('-')[0];
     }
    sql.query(
      'UPDATE usuarios SET nombres = ?, apellido_paterno = ?, apellido_materno = ?, fono = ?, email = ?, instagram = ?, password = ? WHERE rut = ?',
      [usuarios.nombres, usuarios.apellido_paterno, usuarios.apellido_materno, usuarios.fono, usuarios.email, usuarios.instagram, usuarios.password, rut],
      (err, res) => {
        if (err) {
          console.log('Error al modificar el usuario: ', err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: 'not_found' }, null);
          return;
        }
  
        console.log('usuario modificado: ', { rut: rut, ...usuarios });
        result(null, { rut: rut, ...usuarios });
      }
    );
};

Usuario.eliminar = (rut, result) => {
    sql.query('DELETE FROM usuarios WHERE rut = ?', rut, (err, res) => {
      if (err) {
        console.log('Error al eliminar el usuario: ', err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }
  
      console.log('usuario eliminado con rut: ', rut);
      result(null, res);
    });
  };

module.exports = Usuario;