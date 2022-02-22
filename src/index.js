const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

//Conection to server
mongoose.connect("mongodb+srv://admin:admin@cluster0.eflub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(db => console.log("DB connected"))
    .catch(err => console.log(err));

//Initializations
require("./passport/local-auth");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(require("./routes/index"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Listening to server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});