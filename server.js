// Requirements

var Mongoose = require('mongoose');
var Express = require('express');
var BodyParser = require('body-parser');
var MethodOverride = require('method-override');
var Config = require('./app/config/config');
var Passport = require('passport');
var Strategy = require('passport-local').Strategy;

// Application config

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.json({ type: 'application/vnd.api+json' }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(MethodOverride('X-HTTP-Method-Override'));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(Express.static(__dirname + Config.web));
require('./app/routes')(app, __dirname);

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
