const express = require("express");
const pool = require("../database");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const fs = require("fs-extra");
const { now } = require("mongoose");
const {Storage} = require("@google-cloud/storage");
const {format} = require("util");

const storage = new Storage({
    keyFilename: path.join(__dirname, "../elegant-pipe-356603-81fb7a82f326.json"),
    projectId: "elegant-pipe-356603"
});
storage.getBuckets().then(x => console.log(x));
//const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const bucket = storage.bucket('masdbs-bucket');



router.post('/upload', async (req, res, next) => {
    if (!req.files) {
      res.status(400).send('No file uploaded.');
      return;
    }
    try {
        for (var i = 0; i < req.files.length; i++) {
            console.log(req.files[0]);
            // Create a new blob in the bucket and upload the file data.
            const blob = bucket.file(req.files[i].originalname);

            const blobStream = blob.createWriteStream({
                resumable: false,
            });
        
            blobStream.on('error', err => {
                next(err);
            });
        
            blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                 `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
                res.status(200).send(publicUrl);
                //res.redirect("/");
            });

            blobStream.end(req.files[i].buffer);
        }
    } catch (error) {
        res.status(500).send(error);
    }    
});
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
    await pool.query("DELETE FROM events WHERE id = ?", [event_id]);
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
    const videos = await pool.query("SELECT * FROM videos;");
    res.render("sites/videos.html", {videos});
});

router.post("/addVideo", async (req, res) => {
    const {title, url} = req.body;
    await pool.query("INSERT INTO videos(title, url) VALUES(?,?);", [title, url]);
    res.redirect("/videos");
});

router.get("/videos/delete/:video_id", async (req, res) => {
    const {video_id} = req.params;
    await pool.query("DELETE FROM videos WHERE id = ?", [video_id]);
    res.redirect("/videos");
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
        try {
            // Create a new blob in the bucket and upload the file data.
            let filename = new Date().getTime() + req.files[i].originalname;
            const blob = bucket.file(filename);

            const blobStream = blob.createWriteStream({
                resumable: false,
            });
    
            blobStream.on('error', err => {
                //next(err);
                console.log(err);
            });
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            const newPhoto = {
                filename: filename, 
                ruta: publicUrl,
                originalname: req.files[i].originalname,
                mymetype: req.files[i].mimetype,
                size: req.files[i].size,
                created_at: now(),
                album: album.insertId
            }
            await pool.query("INSERT INTO photo(filename, ruta, originalname, mymetype, size, created_at, idAlbum ) VALUES(?,?,?,?,?,?,?);", [newPhoto.filename, newPhoto.ruta, newPhoto.originalname, newPhoto.mymetype, newPhoto.size, newPhoto.created_at, newPhoto.album]);

        // blobStream.on('finish', () => {
        // // The public URL can be used to directly access the file via HTTP.
        //     const publicUrl = format(
        //             `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        //     );
        //     //await pool.query("INSERT INTO photo(filename, ruta, originalname, mymetype, size, created_at, idAlbum ) VALUES(?,?,?,?,?,?,?);", [newPhoto.filename, newPhoto.ruta, newPhoto.originalname, newPhoto.mymetype, newPhoto.size, newPhoto.created_at, newPhoto.album]);
        // });

            blobStream.end(req.files[i].buffer);
        } catch (error) {
            window.alert("Ocurrio un problema")
        }
    }
    res.redirect("/album");
});

router.get("/images/delete/:photo_id/:album_id", async (req, res) => {
    const {photo_id, album_id} = req.params;
    const photo = await pool.query("SELECT * FROM photo WHERE id = ? AND idAlbum = ?", [photo_id, album_id]);
    await bucket.file(photo[0].filename).delete();
    await pool.query("DELETE FROM photo WHERE id = ? ;", [photo_id]);
    res.redirect("/visor/"+ album_id);
});

router.get("/albums/delete/:album_id", async (req, res) => {  
    const {album_id} = req.params;
    const photos = await pool.query("SELECT * FROM photo WHERE idAlbum = ?", [album_id]);
    for(var i=0; i < photos.length; i++){
        await pool.query("DELETE FROM photo WHERE id = ?", [photos[i].id]);
        await bucket.file(photos[i].filename).delete();
        //await fs.unlink(path.resolve("./src/public/") + photos[i].ruta);
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