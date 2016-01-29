var Message = require('../models/message.js').Message;
var Mongoose = require('mongoose');
require('mongoose-pagination');

module.exports = {
  save : function (req, res) {
    var date = new Date();
    var message = req.body;
    new Message({
      date: date,
      email: message.email,
      text: message.text
    }).save(function (err) {
      if (!err) {
        res.send({ success: true });
        console.log("Message has been successfully saved!");
      } else {
        console.log(err);
      }
    });
  },

  delete : function(req, res){
    Message.findByIdAndRemove(Mongoose.Types.ObjectId(req.params.id), function (err) {
      if (!err) {
        res.send({ success: true });
        console.log("Message with id " + req.params.id + " has been successfully removed!");
      } else {
        console.log(err);
      }
    });
  },

  get : function(req, res){
    Message.findById(Mongoose.Types.ObjectId(req.params.id), function (err, foundMessage) {
      if (!err) {
        res.send({ success: true, data: foundMessage });
        console.log("Message with id " + req.params.id + " has been successfully found!");
      } else {
        console.log(err);
      }
    });
  },

  list : function (req, res) {
    Message.find({}, '_id date text email', { sort: { date: -1 }}).paginate(req.params.page, parseInt(req.params.itemsperpage), function(err, messages, total) {
      if (!err){
        if (messages.length != 0){
          res.send({ success : true, data : { docs : messages, total : total, page : req.params.page }});
          console.log("Message list has been successfully acquired!");
        } else {
          res.send({ success : false, data : { total : total, page : req.params.page }});
          console.log("No messages!");
        }
      } else {
        console.log(err);
      }
    });
  }
};
