var Activity = require('./models/activity.js');

module.exports = function(app){
  app.get('*', function(req, res){
    res.sendfile('./public/views/index.html');
  });

  app.post('/activity', function(req, res){
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

  app.get('/activity', function(req, res){
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
}
