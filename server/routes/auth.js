"use strict"
const passport  = require('passport');
const User = require('../models/users');
require('../services/passport');


module.exports = function(app) {
    
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/dashboard');
    });

    app.get('/api/current_user', (req, res, next) => {
        // Update views
            req.session.views = (req.session.views || 0) + 1
            try {
                User.findById(req.session.passport.user).then(user => {
                    res.end(JSON.stringify(user))
                })
            } catch(e) {
                res.send(null)
            }
         })

    app.get('/api/logout', (req, res) => {
       // Get rid of the session token. Then call `logout`; it does no harm.
        req.logout();
        req.session = null;
        res.redirect('/');
    });
    
}