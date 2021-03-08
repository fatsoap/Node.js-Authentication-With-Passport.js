if( process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const { checkRole, authUser, userValidate, loginAuth, registerHash } = require('./userAuth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 *24 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('user.ejs', { user: req.user, flash: req.flash("message")});
})


app.get('/login', (req, res) => {
    res.render('form.ejs', { 
        form: {
            page: "Login",
            action: "/login",
            method: "POST",
            btn: "register",
        },
        flash: req.flash("message")[0]
    });
})

app.post('/login', userValidate("login"), loginAuth, (req, res) => {
    req.flash("message", "login success");
    res.redirect('/');
})

app.get('/register', (req, res) => {
    res.render('form.ejs', { 
        form: {
            page: "Register",
            action: "/register",
            method: "POST",
            btn: "login",
        },
        flash: req.flash("message")[0]
    });
})

app.post('/register', userValidate("register"), registerHash, async (req, res) => {
    req.flash("message", "register success");
    res.redirect("/");
})

app.get('/admin', authUser, checkRole("ADMIN"), (req, res) => {
    res.status(201).send(req.body);
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.listen(PORT, () => { console.log(`server running on ${PORT}`) });