var Comment = require('../models/comment.js').Comment;
var Mongoose = require('mongoose');
require('mongoose-pagination');

module.exports = {
  save : function (req, res) {
    var comment = req.body;
    new Comment({
      resource: Mongoose.Types.ObjectId(comment.resource),
      date: comment.date,
      sender: comment.sender,
      text: comment.text
    }).save(function (err, data) {
      if (!err) {
        res.send({ success: true });
        console.log("Comment has been successfully saved!");
      } else {
        console.log(err);
      }
    });
  },

  delete : function(req, res){
    Comment.findByIdAndRemove(Mongoose.Types.ObjectId(req.params.id), function (err) {
      if (!err) {
        res.send({ success: true });
        console.log("Comment with id " + req.params.id + " has been successfully removed!");
      } else {
        console.log(err);
      }
    });
  },

  list : function (req, res) {
    Comment.find({'resource': req.params.resource}, '_id date sender text', { sort: { date: 1 }}, function(err, comments) {
      if (!err){
        if (comments.length != 0){
          res.send({ success : true, data : { docs : comments }});
          console.log("Comment list for resource " + req.params.resource + " has been successfully acquired!");
        } else {
          res.send({ success : false, data : { docs : [] } });
          console.log("No comments for resource " + req.params.resource + "!");
        }
      } else {
        console.log(err);
      }
    });
  }
};
