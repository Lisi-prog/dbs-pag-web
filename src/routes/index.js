const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
const router = express.Router();
const passport = require("passport");
const Photo = require("../models/photo");
const Album = require("../models/album");
const Archive = require("../models/archive");
const Event = require("../models/event");
const Notice = require("../models/notice");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const fs = require("fs-extra");


//----------------------------- Pagina principal -----------------------------------------------
router.get("/", async (req, res) => {
    const photos = await Photo.find();
    const albums = await Album.find().sort({ _id: -1 }).limit(3);
    //const albums = await Album.find();
    
    
    const news = await Notice.find().sort({ _id: -1 }).limit(4);
    //const news = await Notice.find();
    res.render("index.html", {photos, albums, news});
});

router.get("/contact", (req, res) => {
    res.render("contact.html");
});

router.get("/news", async (req, res) => {
    const news = await Notice.find();
    res.render("news.html", {news});
});

router.get("/addNotice", async (req, res) => {
    res.render("addNotice.html");
});

router.get("/viewNotice/:news_id", async (req, res) => {
    const {news_id} = req.params
    const news = await Notice.findById(news_id);
    res.render("viewNotice.html", {news});
});

router.post("/news/add", async (req, res) => {
    const {headline, gate} = req.body;
    var locaFilePath = req.files[0].path;
    console.log(locaFilePath);
    const result = await cloudinary.v2.uploader.upload(locaFilePath);
    const newNotice = new Notice({
         title: headline,
         description: gate,
         url: result.url,
         fecha: Date.now()   
    });
    await newNotice.save();
    await fs.unlink(locaFilePath);
    res.redirect("/news");
});

router.get("/news/delete/:news_id", async (req, res) => {
    const {news_id} = req.params;
    await Notice.findByIdAndDelete(news_id);
    res.redirect("/news");
});
//----------------------------------------------------------------------------------------------


router.get("/events", async (req, res) => {
    const events = await Event.find();
    res.render("events.html", {events});
});

router.post("/addEvent", async (req, res) => {
    const {date, ubication, description, juez, category} = req.body;
    const newEvent = new Event ({
        date: date,
        ubication: ubication,
        description: description,
        juez: juez,
        category: category
    });
    const event = await newEvent.save();
    res.redirect("/Events");
});

router.get("/events/delete/:event_id", async (req, res) => {
    const {event_id} = req.params;
    await Event.findByIdAndDelete(event_id);
    res.redirect("/events");
});

// router.post("events/delete/:event_id", (req, res) => {
//     const {event_id} = req.params;
//     console.log(photo_id);
//     const event = await Event.findByIdAndDelete(event_id);
//     // const result = await cloudinary.v2.uploader.destroy(photo.public_id);
//     console.log(result);
//     res.redirect("events.html");
// });


//----------------------------- Descargas AB ---------------------------------------------------
router.get("/downloads", async (req, res) => {
    const archives = await Archive.find();
    res.render("downloads.html", {archives});
});

router.post("/addArchive", async (req, res) => {
    const {title, description, url} = req.body;
    
    console.log(req.body);
    const newArchive = new Archive({
         title: title,
         description: description,
         url: url  
     });
    const archive = await newArchive.save();
    res.redirect("/downloads");
});

router.get("/archive/delete/:archive_id", async (req, res) => {
     const {archive_id} = req.params;
     await Archive.findByIdAndDelete(archive_id);
     res.redirect("/downloads");
 });
//----------------------------------------------------------------------------------------------

// router.use((req, res, next) => {
//     isAuthenticated(req, res, next);
//     next();
// });

router.get("/winners", (req, res) => {
    res.render("winners.html");
});

router.get("/register", (req, res) => {
    res.render("register.html");
});

router.post("/register", passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/register",
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

router.get("/visor/:album_id", async (req, res) => {
    const {album_id} = req.params;
    const albums = await Album.findById(album_id);
    //const title = albums.title;
    const photos = await Photo.find({album: album_id});
    res.render("visorAlbum.html", {photos, albums})
    // const {title} = req.params;
    // console.log(title);
    // const albums = await Album.find({title: title}); 
    // const photos = await Photo.find({album: albums});
    // console.log(photos);
    //res.render("visorAlbum.html", {albums, photos, title});
    //res.render("visorAlbum.html");
});

router.get("/addPhoto", async (req, res) => {
    const photos = await Photo.find();
    res.render("addPhoto.html", {photos});
});

router.post("/images/add", async (req, res) => {
    const {title, description} = req.body;
    const newAlbum = new Album({
        title: title,
        description: description,   
    });
    const album = await newAlbum.save();
    for (var i = 0; i < req.files.length; i++) {
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
    res.redirect("/album");
});

router.get("/images/delete/:photo_id/:album_id", async (req, res) => {
    const {photo_id, album_id} = req.params;
    const photo = await Photo.findByIdAndDelete(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    res.redirect("/visor/"+album_id);
});

router.get("/albums/delete/:album_id", async (req, res) => {  
    //const photo = mongoose.Types.ObjectId(req.params.photo_id);
    const {album_id} = req.params;
    console.log(album_id);
    const photos = await Photo.find({"album":album_id});
    console.log(photos);
    for(var i=0; i<photos.length; i++){
        await Photo.findByIdAndDelete(photos[i]._id);
        await cloudinary.v2.uploader.destroy(photos[i].public_id);
    }
    await Album.findByIdAndDelete(album_id);
    // const photo = await Photo.findByIdAndDelete(photo_id);
    // const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    // console.log(result);
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