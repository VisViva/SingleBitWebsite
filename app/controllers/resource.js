var Resource = require('../models/resource.js');
var Tag = require('../models/tag.js');
var Mongoose = require('mongoose');
var Q = require('q');
require('mongoose-pagination');

Mongoose.Promise = Q.Promise;

module.exports = {
  save : function (req, res) {
    var resource = req.body;

    if ((resource.tags == undefined) || (resource.tags == null)) resource.tags = [];

    // Check tags for existence

    Q.all(resource.tags.map(function (tag) {
      if (tag._id == undefined) {
        return Tag.Tag.findOne({text:tag.text});
      } else {
        return Q(tag);
      }
    })).then(function (results) {
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
    }).then(function(){

      // Insert tags

      Q.all(resource.tags.map(function (tag) {
        if (tag._id == undefined) {
          return new Tag.Tag({text: tag.text}).save();
        } else {
          tag._id = Mongoose.Types.ObjectId(tag._id);
          return Q(tag);
        }
      })).then(function (results) {
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
          Resource.Resource.findByIdAndUpdate(Mongoose.Types.ObjectId(resource._id), {
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
              res.send({
                success: true,
                message: "Resource named " + req.body.title + " has been successfully updated!",
                data: updatedResource._doc
              });
            }
          });
        } else {

          // Insert resource

          new Resource.Resource({
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
              res.send({
                success: true,
                message: "Resource named " + req.body.title + " has been successfully saved!",
                data: savedResource._doc
              });
              console.log("Resource named " + req.body.title + " has been successfully saved!");
            }
          });
        }
      });
    }, function (err) {
      console.log(err);
    });
  },

  delete : function(req, res){
    Resource.Resource.findByIdAndRemove(Mongoose.Types.ObjectId(req.params.id), function (err) {
      if (!err) {
        res.send({
          success: true,
          message: "Resource with id " + req.body.id + " has been successfully removed!"
        });
      }
    });
  },

  get : function(req, res){
    Resource.Resource.findById(Mongoose.Types.ObjectId(req.params.id), function (err, resource) {
      if (!err) {
        Q.all(resource._doc.tags.map(function (tag) {
          return Tag.Tag.findById(Mongoose.Types.ObjectId(tag._doc._id));
        })).then(function(results){
          var foundResource = {
            _id : resource._doc._id,
            contentType : resource._doc.contentType,
            date : resource._doc.date,
            description : resource._doc.description,
            thumbnail : resource._doc.thumbnail,
            resourceType : resource._doc.resourceType,
            title : resource._doc.title,
            tags : [],
            number: resource._doc.number
          };
          results.forEach(function (element) {
            foundResource.tags.push({
              _id : element._doc._id,
              text : element._doc.text
            });
          });
          res.send({
            success: true,
            message: "Resource with id " + req.body.id + " has been successfully found!",
            data: foundResource
          });
        });
      }
    });
  },

  list : function(req, res){
    var fields = '';
    switch(req.params.fields)
    {
      case 'feed':{
        fields = 'thumbnail';
        break;
      }
    };
    var type = {};
    switch(req.params.type)
    {
      case 'article':{
        criteria = {'resourceType':'Article'};
        break;
      }
      case 'diary':{
        criteria = {'resourceType':'Diary'};
        break;
      }
      case 'podcast':{
        criteria = {'resourceType':'Podcast'};
        break;
      }
      case 'blog':{
        criteria = {'resourceType':'Blog'};
        break;
      }
      case 'game':{
        criteria = {'resourceType':'Game'};
        break;
      }
      case '2d':{
        criteria = {'resourceType':'2D art'};
        break;
      }
      case '3d':{
        criteria = {'resourceType':'3D art'};
        break;
      }
      case 'music':{
        criteria = {'resourceType':'Music'};
        break;
      }
      case 'activity':{
        criteria = {'contentType':'Activity'};
        break;
      }
      case 'project':{
        criteria = {'contentType':'Project'};
        break;
      }
      default:{
        criteria = {};
        break;
      }
    };
    Resource.Resource.find(criteria, fields + ' contentType resourceType title date number', {sort: {date: -1}}).paginate(req.params.page, parseInt(req.params.itemsperpage), function(err, resources, total) {
      if (!err){
        if (resources.length != 0){
          res.send({
            success : true,
            message : "Resource list has been successfully acquired!",
            data : {
              docs : resources,
              total : total,
              page : req.params.page
            }
          });
        } else {
          res.send({
            success : false,
            message : "No resources!",
            data : {
              total : total,
              page : req.params.page
            }
          });
        }
      }
    });
  },

  next : function(req, res){
    var findQuery = Resource.Resource.find({'resourceType': req.params.type}, 'number').sort({number : -1}).limit(1);
    findQuery.exec(function(err, foundResource){
      if (!err){
        res.send({
          success : true,
          message : "New " + req.params.type + "'s number acquired!",
          data : (foundResource.length == 0) ? 0 : (parseInt(foundResource[0]._doc.number) + 1)
        });
      }
    });
  },

  find : function(req, res){
    Tag.Tag.find({'text': req.params.text}, function(err, foundTags){
      Resource.Resource.find({'tags._id': Mongoose.Types.ObjectId(foundTags[0]._doc._id)}).paginate(req.params.page, parseInt(req.params.itemsperpage), function(err, resources, total) {
        if (!err){
          if (resources.length != 0){
            res.send({
              success : true,
              message : "Resource list has been successfully acquired!",
              data : {
                docs : resources,
                total : total,
                page : req.params.page
              }
            });
          } else {
            res.send({
              success : false,
              message : "No resources!",
              data : {
                total : total,
                page : req.params.page
              }
            });
          }
        }
      });
    });
  }
}
