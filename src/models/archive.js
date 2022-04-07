const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const archiveSchema = new Schema({
    title: String,
    description: String,
    url: String
});

module.exports = model("archive", archiveSchema);