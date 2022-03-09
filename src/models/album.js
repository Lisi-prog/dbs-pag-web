const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const albumSchema = new Schema({
    title: String,
    description: String,
    date: String
});

module.exports = model("album", albumSchema);