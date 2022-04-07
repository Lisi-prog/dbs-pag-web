const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const eventSchema = new Schema({
    fecha: Date,
    ubicacion: String,
    descripcion: String,
    juez: String,
    categoria: String
});

module.exports = model("archive", eventSchema);