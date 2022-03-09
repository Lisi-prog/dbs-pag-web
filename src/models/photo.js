const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const photoSchema = new Schema({
    imageURL: String,
    public_id: String,
    album: {type: Schema.ObjectId, ref: "album"}
});

module.exports = model("photo", photoSchema);