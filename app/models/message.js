var Mongoose = require("mongoose");

var MessageSchema = Mongoose.Schema({
  date: {
    type: Date
  },
  email: {
    type: String
  },
  text: {
    type: String
  }
});

var Message = Mongoose.model('Message', MessageSchema);

module.exports = {
  Message: Message
}
