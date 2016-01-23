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
    q.all(activity.tags.map(function(tag){
      if (tag._id == undefined){
        return new Tag.Tag({text : tag.text}).save();
      } else {
        tag._id = mongoose.Types.ObjectId(tag._id);
        return q(tag);
      }
    })).then(function(results){
      console.log(results);
      results.forEach(function(element){
        if (element._doc != undefined){
          for (var i = 0; i < activity.tags.length; ++i){
            if (activity.tags[i].text == element._doc.text){
              activity.tags[i]._id = element._doc._id;
            }
          }
        }
      });

      if (activity._id != undefined){
        Activity.Activity.findByIdAndUpdate(mongoose.Types.ObjectId(activity._id), {
          title : activity.title,
          description : activity.description,
          tags : activity.tags,
          date : activity.date
        }, function(err, updatedActivity) {
          if (!err) {
            updatedActivity._doc.tags = activity.tags;
            res.send({
              success: true,
              message: "Activity named " + req.body.title + " has been updated successfully!",
              data: updatedActivity._doc
            });
          }
        });
      } else {
        new Activity.Activity({
          title : activity.title,
          description : activity.description,
          tags : activity.tags,
          date : activity.date
        }).save(function(err, savedActivity){
          if (!err) {
            savedActivity._doc.tags = activity.tags;
            res.send({
              success : true,
              message : "Activity named " + req.body.title + " has been saved successfully!",
              data : savedActivity._doc
            });
            console.log("Activity named " + req.body.title + " has been saved successfully!");
          }
        });
      }
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

  // Tags

  app.post('/api/tags', function(req, res){
    Tag.Tag.find({'text': {'$regex': '.*' + req.body.query + '.*'}}, function(err, tags){
      if (!err) {
        res.send({
          success : true,
          message : "Tags suggestions list has been acquired successfully!",
          data : tags
        });
      }
    });
  });

  // Single Page Redirection

  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
}
