var mongoose = require("mongoose");

var TagSchema = mongoose.Schema({
  text: {
    type: String
  }
});

var Tag = mongoose.model('Tag', TagSchema);

module.exports = {
  Tag: Tag
}
