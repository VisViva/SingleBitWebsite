var Tag = require('../models/tag.js');

module.exports = {
  suggest : function(req, res){
    Tag.Tag.find({'text': {'$regex': '.*' + req.params.query + '.*'}}, function(err, tags){
      if (!err) {
        res.send({ success : true, data : tags });
        console.log("Tags suggestions list has been successfully acquired!");
      } else {
        console.log(err);
      }
    });
  }
};
