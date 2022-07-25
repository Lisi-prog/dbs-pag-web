const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const helpers = require("../passport/helpers");
const pool = require("../database");

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser( async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    done(null, rows);
});

passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await pool.query("SELECT * FROM usuario WHERE email = ?;", [email]);
    if(user.length != 0){
        return done(null, false, req.flash("signupMessage","Ya tiene una cuenta"));
    }else{
        const newUser = {
            email,
            password,
        };
        newUser.email = email;
        newUser.password = await helpers.encryptPassword(password);
        await pool.query("INSERT INTO usuario(email, pass) VALUES (?, ?);", [newUser.email, newUser.password]);
        done(null, newUser);
    }
}));

passport.use("local-signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await pool.query("SELECT * FROM usuario WHERE email = ?;", [email]);
    if(user.length === 0){
        done(null, false, req.flash("signinMessage", "Usuario no encontrado."));
    }
    if(await helpers.comparePassword(password, user.pass)){
        done(null, false, req.flash("signinMessage", "Contraseña incorrecta"));
    }
    done(null, user);
}));