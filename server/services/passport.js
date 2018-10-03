"use strict"
let User = require('../models/users');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
        const extUser = await User.findOne({googleId: profile.id})
            if (extUser) {
                return cb(null, extUser);
            }
              const user = await new User({ googleId: profile.id}).save()
              cb(null, user)   
        }
));
