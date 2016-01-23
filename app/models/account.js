var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var PassportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(PassportLocalMongoose);

module.exports = Mongoose.model('Account', Account);
