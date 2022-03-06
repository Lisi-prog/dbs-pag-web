const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const photoSchema = new Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String
});

module.exports = model("photo", photo);