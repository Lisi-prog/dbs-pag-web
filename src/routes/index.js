const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.html", {tittle: 'RichardSom +dbs'});
});

router.get("/contact", (req, res) => {
    res.render("contact.html", {tittle: 'Contacto'});
});

router.get("/login", (req, res) => {
    res.render("login.html", {tittle: 'Inicio de sesion'});
});

router.post("/login", (req, res, next) => {
    console.log(req.body);
    res.send("Recibido");
});

module.exports = router;