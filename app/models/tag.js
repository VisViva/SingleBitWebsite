var Mongoose = require("mongoose");

var TagSchema = Mongoose.Schema({
  text: {
    type: String
  }
});

var Tag = Mongoose.model('Tag', TagSchema);

module.exports = {
  Tag: Tag
}
