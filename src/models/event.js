const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const eventSchema = new Schema({
    date: String,
    ubication: String,
    description: String,
    juez: String,
    category: String
});

module.exports = model("event", eventSchema);