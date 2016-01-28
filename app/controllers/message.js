var Message = require('../models/message.js');
var Mongoose = require('mongoose');
require('mongoose-pagination');

module.exports = {
  save : function (req, res) {
    var date = new Date();
    var message = req.body;
    new Message.Message({
      date: date,
      email: message.email,
      text: message.text
    }).save(function (err) {
      if (!err) {
        res.send({
          success: true,
          message: "Your message has been successfully saved!"
        });
        console.log("Message has been successfully saved!");
      }
    });
  },

  delete : function(req, res){
    Message.Message.findByIdAndRemove(Mongoose.Types.ObjectId(req.params.id), function (err) {
      if (!err) {
        res.send({
          success: true,
          message: "Message with id " + req.params.id + " has been successfully removed!"
        });
      }
    });
  },

  get : function(req, res){
    Message.Message.findById(Mongoose.Types.ObjectId(req.params.id), function (err, foundMessage) {
      if (!err) {
        res.send({
          success: true,
          message: "Message with id " + req.params.id + " has been successfully found!",
          data: foundMessage
        });
      }
    });
  },

  list : function (req, res) {
    Message.Message.find({}, '_id date text email', {sort: {date: -1}}).paginate(req.params.page, parseInt(req.params.itemsperpage), function(err, messages, total) {
      if (!err){
        if (messages.length != 0){
          res.send({
            success : true,
            message : "Message list has been successfully acquired!",
            data : {
              docs : messages,
              total : total,
              page : req.params.page
            }
          });
        } else {
          res.send({
            success : false,
            message : "No messages!",
            data : {
              total : total,
              page : req.params.page
            }
          });
        }
      }
    });
  }
};
