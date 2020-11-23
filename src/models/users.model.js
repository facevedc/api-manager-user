const mongoose = require("mongoose");

const { Schema } = mongoose;
const usuarioSchema = new Schema({
  rut: Number,
  dv: String,
  nombres: String,
  apellido_paterno: String,
  apellido_materno: String,
  fono: Number,
  email: String,
  instagram: String,
  password: String,
  tienda: String
});

module.exports = mongoose.model("usuarios", usuarioSchema);
