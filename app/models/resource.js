var Mongoose = require("mongoose");

var ResourceSchema = Mongoose.Schema({
  contentType: {
    type: String
  },
  resourceType: {
    type: String
  },
  title: {
    type: String
  },
  thumbnail: {
    type: String
  },
  date: {
    type: Date
  },
  tags: [{
    name: Mongoose.Schema.Types.ObjectId
  }],
  description: {
    type: String
  },
  number: {
    type: String
  }
});

var Resource = Mongoose.model('Resource', ResourceSchema);

module.exports = {
  Resource: Resource
}
