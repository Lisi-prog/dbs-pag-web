const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

//Conection to server
mongoose.connect("mongodb+srv://admin:admin@cluster0.eflub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(db => console.log("DB connected"))
    .catch(err => console.log(err));

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//middlewares


//Routes
app.use(require("./routes/index"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Listening to server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});