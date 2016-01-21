var Account = require('./models/account');
var Activity = require('./models/activity.js');
var passport = require('passport');


module.exports = function(app){

  // Authentication

  app.post('/api/register', function(req, res){
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account){
      if (err){
        res.send({
          success : false,
          message : "Error registering user " + req.body.username + "!"
        });
      }
      passport.authenticate('local')(req, res, function(){
        res.send({
          success : true,
          message : "Success registering user " + req.body.username + "!",
          data : account
        });
      });
    });
  });

  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.send({
      success : true,
      message : "Logged in as " + req.user,
      data : req.user
    });
  });

  app.get('/api/isloggedin', function(req, res) {
    if (req.user) {
      res.send({
        success : true,
        message : "Logged in as " + req.user,
        data : req.user
      });
    } else {
      res.send({
        success : false,
        message : "You have no permissions to access this page!"
      });
    }
  });

  // Activities

  app.post('/api/activity', function(req, res){
    new Activity.Activity({
      title : req.body.title,
      description : req.body.description
    }).save(function(err, activity){
      if (!err) {
        res.send({
          success : true,
          message : "Activity named " + req.body.title + " has been saved successfully!",
          data : activity
        });
        console.log("Activity named " + req.body.title + " has been saved successfully!");
      }
    });
  });

  app.get('/api/activity', function(req, res){
    Activity.Activity.find(function(err, activities){
      if (!err) {
        res.send({
          success : true,
          message : "Activity list has been acquired successfully!",
          data : activities
        });
      }
    });
  });

  app.get('/admin/authorize', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
}
