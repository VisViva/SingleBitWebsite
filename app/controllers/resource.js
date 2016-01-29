var Resource = require('../models/resource.js').Resource;
var Tag = require('../models/tag.js').Tag;
var Mongoose = require('mongoose');
var Q = require('q');
require('mongoose-pagination');

Mongoose.Promise = Q.Promise;

module.exports = {
  save : function (req, res) {
    var resource = req.body;
    if ((resource.tags == undefined) || (resource.tags == null)) resource.tags = [];
    Q.all(resource.tags.map(function (tag) {
      if (tag._id == undefined) {
        return Tag.findOne({text:tag.text});
      } else {
        return Q(tag);
      }
    })).
    then(function (results) {
      console.log(results);
      results.forEach(function (element) {
        if (element != null) {
          if (element._doc != undefined) {
            for (var i = 0; i < resource.tags.length; ++i) {
              if (resource.tags[i].text == element._doc.text) {
                resource.tags[i]._id = element._doc._id;
              }
            }
          }
        }
      });
    }).
    then(function(){
      // Insert tags
      Q.all(resource.tags.map(function (tag) {
        if (tag._id == undefined) {
          return new Tag({text: tag.text}).save();
        } else {
          tag._id = Mongoose.Types.ObjectId(tag._id);
          return Q(tag);
        }
      })).
      then(function (results) {
        console.log(results);
        results.forEach(function (element) {
          if (element._doc != undefined) {
            for (var i = 0; i < resource.tags.length; ++i) {
              if (resource.tags[i].text == element._doc.text) {
                resource.tags[i]._id = element._doc._id;
              }
            }
          }
        });
        // Update resource
        if (resource._id != undefined) {
          Resource.findByIdAndUpdate(Mongoose.Types.ObjectId(resource._id), {
            contentType: resource.contentType,
            resourceType: resource.resourceType,
            title: resource.title,
            thumbnail: resource.thumbnail,
            description: resource.description,
            tags: resource.tags,
            date: resource.date,
            number: resource.number
          }, function (err, updatedResource) {
            if (!err) {
              updatedResource._doc.tags = resource.tags;
              res.send({ success: true, data: updatedResource._doc });
              console.log("Resource named " + req.body.title + " has been successfully updated!");
            } else {
              console.log(err);
            }
          });
        } else {
          // Insert resource
          new Resource({
            contentType: resource.contentType,
            resourceType: resource.resourceType,
            title: resource.title,
            thumbnail: resource.thumbnail,
            description: resource.description,
            tags: resource.tags,
            date: resource.date,
            number: resource.number
          }).save(function (err, savedResource) {
            if (!err) {
              savedResource._doc.tags = resource.tags;
              res.send({ success: true, data: savedResource._doc });
              console.log("Resource named " + req.body.title + " has been successfully saved!");
            } else {
              console.log(err);
            }
          });
        }
      });
    }, function (err) {
      console.log(err);
    });
  },

  delete : function(req, res){
    Resource.findByIdAndRemove(Mongoose.Types.ObjectId(req.params.id), function (err) {
      if (!err) {
        res.send({ success: true });
        console.log("Resource with id " + req.body.id + " has been successfully removed!");
      } else {
        console.log(err);
      }
    });
  },

  get : function(req, res){
    Resource.findById(Mongoose.Types.ObjectId(req.params.id), function (err, resource) {
      if (!err) {
        Q.all(resource._doc.tags.map(function (tag) {
          return Tag.findById(Mongoose.Types.ObjectId(tag._doc._id));
        })).then(function(results){
          var foundResource = resource.toObject();
          foundResource.tags = [];
          results.forEach(function (element) {
            foundResource.tags.push({ _id : element._doc._id, text : element._doc.text});
          });
          res.send({ success: true, data: foundResource });
          console.log("Resource with id " + req.body.id + " has been successfully found!");
        });
      } else {
        console.log(err);
      }
    });
  },

  list : function(req, res){
    var type = req.params.type[0].toUpperCase() + req.params.type.substring(1, req.params.type.length);
    switch(req.params.fields){
      case 'feed': { fields = 'thumbnail'; break; }
    };
    switch(type){
      case 'All': { criteria = {}; break; }
      case 'Activity': case 'Project': { criteria = { contentType: type }; break; }
      default: { criteria = { resourceType: type }; break; }
    };
    Resource.find(criteria).
    select(fields + ' contentType resourceType title date number').
    sort({date: -1}).
    paginate(req.params.page, parseInt(req.params.itemsperpage), function(err, resources, total) {
      if (!err){
        if (resources.length != 0){
          res.send({ success : true, data : { docs : resources, total : total, page : req.params.page } });
          console.log("Resource list has been successfully acquired!")
        } else {
          res.send({ success : false, data : { total : total, page : req.params.page } });
          console.log("No resources!")
        }
      } else {
        console.log(err);
      }
    });
  },

  next : function(req, res){
    Resource.find({'resourceType': req.params.type}).
    select('number').
    sort({number : -1}).
    limit(1).
    exec(function(err, result){
      if (!err){
        res.send({ success : true, data : (result.length == 0) ? 0 : (parseInt(result[0]._doc.number) + 1) });
        console.log("New " + req.params.type + "'s number acquired!");
      } else {
        console.log(err);
      }
    });
  },

  find : function(req, res){
    Tag.find({'text': req.params.text}, function(err, foundTags){
      Resource.find({'tags._id': Mongoose.Types.ObjectId(foundTags[0]._doc._id)}).paginate(req.params.page, parseInt(req.params.itemsperpage), function(err, resources, total) {
        if (!err){
          if (resources.length != 0){
            res.send({ success : true, data : { docs : resources, total : total, page : req.params.page } });
            console.log("Resource list has been successfully acquired!");
          } else {
            res.send({ success : false, data : { total : total, page : req.params.page } });
            console.log("No resources!");
          }
        } else {
          console.log(err);
        }
      });
    });
  }
}
