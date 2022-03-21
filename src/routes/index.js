const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
const router = express.Router();
const passport = require("passport");
const Photo = require("../models/photo");
const Album = require("../models/album");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const fs = require("fs-extra");

// router.get("/", async (req, res) => {
//     const photos = await Photo.find();
//     const albums = await Album.find();
//     res.render("index.html", {photos, albums});
// });

router.get("/", (req, res) => {
    res.render("index.html");
});

router.get("/contact", (req, res) => {
    res.render("contact.html");
});

router.get("/news", (req, res) => {
    res.render("news.html");
});

router.get("/events", (req, res) => {
    res.render("events.html");
});

router.get("/downloads", (req, res) => {
    res.render("downloads.html");
});

router.get("/winners", (req, res) => {
    res.render("winners.html");
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

router.get("/album", async (req, res) => {
    const photos = await Photo.find();
    const albums = await Album.find();
    res.render("album.html", {photos, albums});
});

router.get("/visor/:title", async (req, res) => {
    const {title} = req.params;
    console.log(title);
    const albums = await Album.find({title: title}); 
    const photos = await Photo.find({album: albums});
    console.log(photos);
    res.render("visorAlbum.html", {albums, photos, title});
    //res.render("visorAlbum.html");
});

router.get("/addPhoto", async (req, res) => {
    const photos = await Photo.find();
    res.render("addPhoto.html", {photos});
});

router.post("/images/add", async (req, res) => {
    const {title, description} = req.body;
    console.log(req.files);
    console.log(req.body);
    const newAlbum = new Album({
        title: title,
        description: description,   
    });
    const album = await newAlbum.save();
    for (var i = 0; i < req.files.length; i++) {
        console.log(title, description);
        var locaFilePath = req.files[i].path;
        const result = await cloudinary.v2.uploader.upload(locaFilePath);
        const newPhoto = new Photo({
        imageURL: result.url, 
        public_id: result.public_id,
        album: album._id
        })
        await newPhoto.save();
        await fs.unlink(locaFilePath);
    }
    res.send("Recibido");
});

router.get("/images/delete/:photo_id", async (req, res) => {  
    //const photo = mongoose.Types.ObjectId(req.params.photo_id);
    const {photo_id} = req.params;
    console.log(photo_id);
    const photo = await Photo.findByIdAndDelete(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result);
    res.redirect("/");
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