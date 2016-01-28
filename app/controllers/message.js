var Message = require('../models/message.js');

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
          message: "Message with id " + req.body.id + " has been successfully removed!"
        });
      }
    });
  },

  list : function (req, res) {
    Message.Message.find().sort(['_id', 1]).paginate(req.params.page, parseInt(req.params.itemsperpage), function(err, messages, total) {
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
