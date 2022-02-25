const express = require("express");
const router = express.Router();
const passport = require("passport");

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

router.post("/login", passport.authenticate("local-signin", {
    successRedirect: "/perfil",
    failureRedirect: "/login",
    passReqToCallback: true
}));

router.get("/perfil", (req, res) => {
    res.render("perfil.html", {tittle: "Mi perfil"});
});

module.exports = router;