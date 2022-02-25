const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    console.log(email);
    const user = await User.findOne({email: email});
    console.log(user);
    if(user){
        return done(null, false, req.flash("signupMessage","Ya tiene una cuenta"));
    }else{
        const newUser = new User();;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use("local-signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        done(null, false, req.flash("signinMessage", "Usuario no encontrado."));
    }
    if(!user.comparePassword(password)){
        done(null, false, req.flash("signinMessage", "Contraseña incorrecta"));
    }
    done(null, user);
}));