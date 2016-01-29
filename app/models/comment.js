var Mongoose = require("mongoose");

var CommentSchema = Mongoose.Schema({
  resource: {
    type: Mongoose.Schema.Types.ObjectId
  },
  date: {
    type: Date
  },
  sender: {
    type: String
  },
  text: {
    type: String
  }
});

var Comment = Mongoose.model('Comment', CommentSchema);

module.exports = {
  Comment: Comment
}
