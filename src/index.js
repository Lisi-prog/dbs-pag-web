if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const express = require("express");
//const mongoose = require("mongoose");
const app = express();
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const multer = require("multer");


//Initializations
require("./passport/local-auth");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, "public/uploads"),
//     filename: (req, file, cb) => {
//         cb(null, new Date().getTime() + path.extname(file.originalname));
//     }
// });

const storage = multer.memoryStorage({
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
});


app.use(multer({storage: storage}).array("image"));


app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash("signupMessage");
    app.locals.signinMessage = req.flash("signinMessage");
    app.locals.user = req.user;
    next();
});


//Routes
app.use(require("./routes/index"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Listening to server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});