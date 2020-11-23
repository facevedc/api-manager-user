const serviceUsuario = require("../services/usuarios.service");

async function statusResponse(response, res) {
  if (
    response.ok !== undefined ||
    response.id !== undefined ||
    (response.length !== undefined && response.length > 0)
  ) {
    res.status(200).send(response);
  } else {
    res.status(response.code).send({ message: response.message });
  }
}

exports.crear = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: `Los parametros de entrada no pueden estar vacios`
    });
  }
  const response = await serviceUsuario.insertUser(req.body);
  await statusResponse(response, res);
};

exports.buscarTodos = async (req, res) => {
  const response = await serviceUsuario.findUser(null);
  await statusResponse(response, res);
};

exports.buscarPorRut = async (req, res) => {
  const response = await serviceUsuario.findUser(req.params.rut);
  await statusResponse(response, res);
};

exports.buscarPorTienda = async (req, res) => {
  const response = await serviceUsuario.findUsersByStore(req.params.store);
  await statusResponse(response, res);
};

exports.modificar = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: `Los parametros de entrada no pueden estar vacios`
    });
  }
  req.rut = req.params.rut;
  const response = await serviceUsuario.updateUser(req.body);
  await statusResponse(response, res);
};

exports.eliminar = async (req, res) => {
  const response = await serviceUsuario.deleteUser(req.params.rut);
  statusResponse(response, res);
};
