// Requirements

var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config/config');
var passport = require('passport');
var strategy = require('passport-local').Strategy;

// Application config

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + config.web));
require('./app/routes')(app);

// Passport config

var Account = require('./app/models/account');
passport.use(new strategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Database connection

mongoose.connect(config.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to ' + config.url);
});

// Start server

app.listen(config.port);
console.log('Listening on port ' + config.port);
