const express = require("express");
const pool = require("../database");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
const router = express.Router();
const passport = require("passport");
const cloudinary = require("cloudinary");



cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const fs = require("fs-extra");


//----------------------------- Pagina principal -----------------------------------------------
router.get("/", async (req, res) => {
    const albums = await pool.query("SELECT * FROM album;");
    const photos = await pool.query("SELECT * FROM photo;");
    const news = null;
    res.render("index.html", {photos, albums, news});
});

router.get("/contact", (req, res) => {
    res.render("contact.html");
});

router.get("/news", async (req, res) => {
    const news = await pool.query("SELECT * FROM notice;");
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
    const events = await pool.query("SELECT * FROM events;");
    res.render("events.html", {events});
});

router.post("/addEvent", async (req, res) => {
    const {date, ubication, description, juez, category} = req.body;
    var date1 = date.split("/").reverse().join("/");
    await pool.query("INSERT INTO events(fecha, ubicacion, descrip, juez, category) VALUES (?, ?, ?, ?, ?);", [date1, ubication, description, juez, category]);
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
    const archives = await pool.query("SELECT * FROM archive;");
    res.render("downloads.html", {archives});
});

router.post("/addArchive", async (req, res) => {
    const {title, description, url} = req.body;
    await pool.query("INSERT INTO archive(title, descrip, url) VALUES(?,?,?);", [title, description, url]);
    res.redirect("/downloads");
});

router.get("/archive/delete/:archive_id", async (req, res) => {
     const {archive_id} = req.params;
     await pool.query("DELETE FROM archive WHERE id = ?", [archive_id]);
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

router.get("/company", (req, res) => {
    res.render("sites/company.html");
});

router.get("/videos", async (req, res) => {
    const archives = await pool.query("SELECT * FROM archive;");
    res.render("sites/videos.html", {archives});
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
    res.render("login.html");
});

router.get("/album", async (req, res) => {
    const albums = await pool.query("SELECT * FROM album;");
    const photos = await pool.query("SELECT * FROM photo;");
    res.render("album.html", {photos, albums});
});

router.get("/visor/:album_id", async (req, res) => {
    const {album_id} = req.params;
    const albums = await pool.query("SELECT * FROM album WHERE id = ?;", [album_id]);
    const photos = await pool.query("SELECT * FROM photo WHERE idAlbum = ?;", [album_id]);
    res.render("visorAlbum.html", {photos, albums})
});

router.get("/addPhoto", async (req, res) => {
    res.render("addPhoto.html");
});

router.post("/images/add", async (req, res) => {
    const {title, description} = req.body;
    const newAlbum = {
        title: title,
        description: description,   
    };
    const album = await pool.query("INSERT INTO album(title, descrip) VALUES(?,?);", [newAlbum.title, newAlbum.description]);
    
    for (var i = 0; i < req.files.length; i++) {
        var locaFilePath = req.files[i].path;
        const result = await cloudinary.v2.uploader.upload(locaFilePath);
        const newPhoto = {
            imageURL: result.url, 
            public_id: result.public_id,
            album: album.insertId
        }
        await pool.query("INSERT INTO photo(imageURL, public_id, idAlbum) VALUES(?,?,?);", [newPhoto.imageURL, newPhoto.public_id, newPhoto.album]);
        await fs.unlink(locaFilePath);
    }
    res.redirect("/album");
});

router.get("/images/delete/:photo_id/:album_id", async (req, res) => {
    const {photo_id, album_id} = req.params;
    const photo = await pool.query("SELECT * FROM photo WHERE id = ? AND idAlbum = ?", [photo_id, album_id]);
    const result = await cloudinary.v2.uploader.destroy(photo[0].public_id);
    await pool.query("DELETE FROM photo WHERE id = ? ;", [photo_id]);
    res.redirect("/visor/"+album_id);
});

router.get("/albums/delete/:album_id", async (req, res) => {  
    const {album_id} = req.params;
    const photos = await pool.query("SELECT * FROM photo WHERE idAlbum = ?", [album_id]);
    for(var i=0; i<photos.length; i++){
        await pool.query("DELETE FROM photo WHERE id = ?", [photos[i].id]);
        await cloudinary.v2.uploader.destroy(photos[i].public_id);
    }
    await pool.query("DELETE FROM album WHERE id = ?", [album_id]);
    res.redirect("/album");
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
    res.render("perfil.html");
});

function isAuthenticated(req, res ,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
};

module.exports = router;