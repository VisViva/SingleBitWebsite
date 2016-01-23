var Mongoose = require("mongoose");

var ResourceSchema = Mongoose.Schema({
  type: {
    type: Mongoose.Schema.Types.ObjectId
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
    name: Mongoose.Schema.Types.ObjectId
  }],
  description: {
    type: String
  }
});

var Resource = Mongoose.model('Resource', ResourceSchema);

module.exports = {
  Resource: Resource
}
