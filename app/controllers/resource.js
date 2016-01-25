var Resource = require('../models/resource.js');
var Tag = require('../models/tag.js');
var Mongoose = require('mongoose');
var Q = require('q');
require('mongoose-pagination');

Mongoose.Promise = Q.Promise;

module.exports = {
  save : function (req, res) {
    var resource = req.body;

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
          date: resource.date
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
          date: resource.date
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
    }, function (err) {
      console.log(err);
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
            tags : []
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

  list : function(req, res){
    var fields = '';
    switch(req.params.type)
    {
      case 'dashboard':{
        fields = 'contentType resourceType';
        break;
      }
      case 'feed':{
        fields = 'thumbnail';
        break;
      }
    };
    Resource.Resource.find({}, fields + ' title date').paginate(req.params.page, req.params.itemsperpage, function(err, resources, total) {
      if (!err){
        res.send({
          success : true,
          message : "Resource list has been successfully acquired!",
          data : {
            docs : resources,
            total : total,
            page : req.params.page
          }
        });
      }
  });
  }
}
