var mongoose = require("mongoose");

var ActivitySchema = mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  thumbnail: {
    type: Buffer
  },
  date: {
    type: Date
  },
  tags: [{
    name: mongoose.Schema.Types.ObjectId
  }],
  description: {
    type: String
  }
});

var Activity = mongoose.model('Activity', ActivitySchema);

module.exports = {
  Activity: Activity
}
