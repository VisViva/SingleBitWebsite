var Account = require('../models/account');
var Passport = require('passport');

module.exports = {
  register : function(req, res){
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account){
      if (err){
        res.send({ success : false });
        console.log(err);
      }
      Passport.authenticate('local')(req, res, function(){
        res.send({ success : true, data : account });
        console.log("Success registering user " + req.body.username + "!");
      });
    });
  },

  login : function(req, res){
    res.send({ success : true, data : req.user.username });
    console.log("Logged in as " + req.user.username);
  },

  logout : function(req, res){
    req.session = null;
    res.send({ success : true, data : req.user.username });
    console.log(req.user.username + "just logged out!");
  },

  check : function(req, res) {
    if (req.user) {
      res.send({ success : true, data : req.user.username });
      console.log("Logged in as " + req.user.username);
    } else {
      res.send({ success : false });
      console.log("You have no permissions to access this page!");
    }
  },

  // Middleware

  isAuthenticated : function(req, res, next) {
    if (req.user != undefined) {
      return next();
    } else {
      res.send({ success : false });
      console.log("You have no permissions to access api!");
    }
  }
};
