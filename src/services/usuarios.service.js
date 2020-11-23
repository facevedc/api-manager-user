/* eslint-disable no-new-object */
const usuariosModel = require("../models/users.model");

const errorMsg = {
  code: 0,
  message: ""
};

async function findUser(rutUsuario) {
  errorMsg.code = 204;
  errorMsg.message = "Usuario no encontrado";
  const filter = rutUsuario !== null ? { rut: rutUsuario } : {};
  const usuario = await usuariosModel.find(filter);
  if (usuario.length === 0) {
    return errorMsg;
  }
  return usuario;
}

async function findUsersByStore(store) {
  errorMsg.code = 204;
  errorMsg.message = `Usuarios no encontrados para la tienda ${store}`;
  const filter = { tienda: store };
  const usuario = await usuariosModel.find(filter);
  if (usuario.length === 0) {
    return errorMsg;
  }
  return usuario;
}

async function existUser(rut) {
  const result = await findUser(rut);
  if (result.code === undefined && result.length > 0) {
    return true;
  }
  return false;
}

async function insertUser(usuario) {
  if (await existUser(usuario.rut)) {
    errorMsg.code = 404;
    errorMsg.message = "Usuario ya existe";
    return errorMsg;
  }

  return usuariosModel.create(usuario);
}

async function updateUser(usuario) {
  const updateRequest = {
    nombres: usuario.nombres,
    apellido_paterno: usuario.apellido_paterno,
    apellido_materno: usuario.apellido_materno,
    fono: usuario.fono,
    email: usuario.email,
    instagram: usuario.instagram,
    password: usuario.password,
    tienda: usuario.tienda
  };
  let usuarioResult = "";
  if (await existUser(usuario.rut)) {
    usuarioResult = await usuariosModel.updateOne(
      {
        rut: usuario.rut
      },
      updateRequest,
      {
        new: true
      }
    );
    if (!usuarioResult) {
      errorMsg.code = 500;
      errorMsg.message = "No se pudo actualizar el usuario";
      usuarioResult = errorMsg;
    }
  } else {
    errorMsg.code = 404;
    errorMsg.message = "Usuario ya existe";
    usuarioResult = errorMsg;
  }
  return usuarioResult;
}

async function deleteUser(rut) {
  if (!(await existUser(rut))) {
    errorMsg.code = 404;
    errorMsg.message = "Usuario no encontrado";
    return errorMsg;
  }
  return usuariosModel.deleteOne({ rut });
}

module.exports = {
  insertUser,
  findUser,
  findUsersByStore,
  updateUser,
  deleteUser
};
