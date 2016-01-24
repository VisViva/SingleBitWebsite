// Requirements

var Config = require('./app/config/config');
var Express = require('express');
var CookieParser = require('cookie-parser');
var Session = require('cookie-session');
var BodyParser = require('body-parser');
var MethodOverride = require('method-override');
var Logger = require('morgan');

var Mongoose = require('mongoose');
var Passport = require('passport');
var Strategy = require('passport-local').Strategy;

// Application config

var app = Express();
app.use(Logger('dev'));
app.use(BodyParser.json());
app.use(BodyParser.json({ type: 'application/vnd.api+json' }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(Session({keys: ['secretkey1', 'secretkey2', '...']}));
app.use(MethodOverride('X-HTTP-Method-Override'));
app.use(Express.static(__dirname + Config.web));
app.use(Passport.initialize());
app.use(Passport.session());

// Routes
app.use('/', require('./app/routes')(__dirname));

// Passport config

var Account = require('./app/models/account');
Passport.use(new Strategy(Account.authenticate()));
Passport.serializeUser(Account.serializeUser());
Passport.deserializeUser(Account.deserializeUser());

// Database connection

Mongoose.connect(Config.url);
var Database = Mongoose.connection;
Database.on('error', console.error.bind(console, 'connection error:'));
Database.once('open', function() {
  console.log('Connected to ' + Config.url);
});

// Start server

app.listen(Config.port);
console.log('Listening on port ' + Config.port);

module.exports = app;
