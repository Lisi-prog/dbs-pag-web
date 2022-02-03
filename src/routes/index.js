const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.html", {tittle: 'RichardSom +dbs'});
});

router.get("/contact", (req, res) => {
    res.render("contact.html", {tittle: 'Contacto'});
});

module.exports = router;