const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const noticeSchema = new Schema({
    title: String,
    description: String,
    url: String,
    fecha: Date
});

module.exports = model("notice", noticeSchema);