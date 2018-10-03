const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./services/passport');

require('./db/mongoConnection');

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))

require('./routes/auth')(app);

app.listen(process.env.PORT || 5000);
