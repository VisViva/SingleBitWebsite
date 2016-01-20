var mongoose = require("mongoose");
var express = require('express');
var bodyParser = require("body-parser");
var config = require('./config/config');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + config.web));

mongoose.connect(config.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to ' + config.url);
});

require('./app/routes')(app);
app.listen(config.port);
console.log('Listening on port ' + config.port);
