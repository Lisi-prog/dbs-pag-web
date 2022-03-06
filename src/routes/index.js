const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
const router = express.Router();
const passport = require("passport");
const Photo = require("../models/photo");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

router.get("/", (req, res) => {
    res.render("index.html", {tittle: 'RichardSom +dbs'});
});

router.get("/contact", (req, res) => {
    res.render("contact.html", {tittle: 'Contacto'});
});

router.get("/register", (req, res) => {
    res.render("login.html", {tittle: 'Inicio de sesion'});
});

router.post("/register", passport.authenticate("local-signup", {
    successRedirect: "/perfil",
    failureRedirect: "/login",
    passReqToCallback: true
}));

router.get("/login", (req, res) => {
    res.render("login.html", {tittle: 'Inicio de sesion'});
});

router.get("/album", (req, res) => {
    res.render("album.html", {tittle: 'Album'});
});

router.get("/visor", (req, res) => {
    res.render("visorAlbum.html", {tittle: 'Album'});
});

router.get("/addPhoto", (req, res) => {
    res.render("addPhoto.html", {tittle: 'Album'});
});

router.post("/images/add", async (req, res) => {
    const {title, description} = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new Photo({
    title: title,
    description: description,
    imageURL: result.url, 
    public_id: result.public_id
    })
    await newPhoto.save();
    res.send("Recibido");
});

router.post("/login", passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/login",
    passReqToCallback: true
}));

router.get("/logout", (req, res, next) => {
    req.logOut();
    res.redirect("/");
});

// router.use((req, res, next) => {
//     isAuthenticated(req, res, next);
//     next();
// });

router.get("/perfil", isAuthenticated, (req, res) => {
    res.render("perfil.html", {tittle: "Mi perfil"});
});

function isAuthenticated(req, res ,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
};

module.exports = router;