const bcrypt = require('bcryptjs');
const User = require('./models/user')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;




// check if login
function authUser(req, res, next) {
    if(req.user == null){
        res.status(403);
        return res.send("You need to login");
    }
    next();
}

//check is Admin
function checkRole(role){
    return function (req, res, next) {
        if(req.body.user.role !== role){
            res.status(401);
            return res.send("Not Allowed");
        }
        next();
    }
}

function userValidate(RedirectPage) {
    return (req, res, next) => {
        if(req.body.username.length < 5){
            req.flash("message", "validate error");
            res.redirect(`/${RedirectPage}`)
            return;
        }
        next();
    }
}

async function registerHash(req, res, next) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    var user = new User(req.body);
    await user.save();
    next();
}

async function loginAuth(req ,res, next) {
    passport.authenticate('local', function(err, user, info){
        if(!user){
            req.flash("message", info.message);
            res.redirect(`/login`)
            return;
        }

        req.login(user, function(err) {
            if(err) { return next(err); }
        })
        next();
    })(req, res, next);
    
}   


passport.use(new LocalStrategy(
    async function(username, password, done) {
        var user = await User.findOne({ username: username});
        if(!user){
            return done(null, false, { message: "username not found." });
        }
        var isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return done(null, false, { message: "password not match." });
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser( function(id, done) {
    User.findOne({ _id: id }, (err, user) => {
        done(err, user);
    });
});



module.exports = {
    authUser,
    checkRole,
    userValidate,
    loginAuth,
    registerHash
}