var Account = require('./models/account');
var Activity = require('./models/activity.js');
var Tag = require('./models/tag.js');
var passport = require('passport');
var mongoose = require('mongoose');
var q = require('q');
mongoose.Promise = q.Promise;

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

  app.post('/api/login', passport.authenticate('local'), function(req, res){
    res.send({
      success : true,
      message : "Logged in as " + req.user.username,
      data : req.user.username
    });
  });

  app.get('/api/loggedin', function(req, res) {
    if (req.user) {
      res.send({
        success : true,
        message : "Logged in as " + req.user.username,
        data : req.user.username
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
    var activity = req.body;
    activity.tagIds = [];
    q.all(activity.tags.map(function(tag){
      if (tag._id == undefined){
        return new Tag.Tag({text : tag.text}).save();
      } else {
        return q(tag._id);
      }
    })).then(function(results){
      console.log(results);
      results.forEach(function(element){
        activity.tagIds.push(element._doc._id);
      });
      new Activity.Activity({
        title : activity.title,
        description : activity.description,
        tags : activity.tagIds,
        date : activity.date
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
    }, function (err) {
      console.log(err);
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

  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
}
