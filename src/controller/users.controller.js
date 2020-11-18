const Usuarios = require('../models/users.model');

exports.crear = (req, res) => {
 // Validate request
 if (!req.body) {
    res.status(400).send({
      message: `Los parametros de entrada no pueden estar vacios`
    });
  }
  // Create a Customer
  const usuario = new Usuarios({
    rut: req.body.rut,
    dv: req.body.dv,
    nombres: req.body.nombres,
    apellido_paterno: req.body.apellido_paterno,
    apellido_materno: req.body.apellido_materno,
    email: req.body.email,
    fono: req.body.fono,
    instagram: req.body.instagram,
    password: req.body.password,
  });
  // Save Customer in the database
  Usuarios.crear(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Ocurrio algun error mientras se creaba el usuario'
      });
    else res.send(data);
  });
};


exports.buscarTodos = (req, res) => {
    Usuarios.buscarTodos((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || 'Ocurrio algun error mientras se buscaban los usuarios.'
        });
        else res.send(data);
    });
};


exports.buscarPorRut = (req, res) => {
    Usuarios.buscarPorRut(req.params.rut, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `No se encontro el usuario con rut ${req.params.rut}.`
          });
        } else {
          res.status(500).send({
            message: `Error al buscar el usuario con rut ${req.params.rut}`
          });
        }
      } else res.send(data);
    });
};

exports.modificar = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: `Los parametros de entrada no pueden estar vacios`
      });
    }
  
    Usuarios.modificarPorRut(
      req.params.rut,
      new Usuarios(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Error al buscar el usuario con rut ${req.params.rut}.`
            });
          } else {
            res.status(500).send({
              message: `Error al actualizar Usuario con rut ${req.params.rut}`
            });
          }
        } else res.send(data);
      }
    );
};

exports.eliminar = (req, res) => {
    Usuarios.eliminar(req.params.rut, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `No se encontro el usuario con rut: ${req.params.rut}.`
          });
        } else {
          res.status(500).send({
            message: `No se pudo eliminar el usuario con rut ${req.params.rut}.`
          });
        }
      } else res.send({ message: `Usuario eliminado con exito!` });
    });
};