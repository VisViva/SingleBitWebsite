var Resource = require('../models/resource.js');
var Tag = require('../models/tag.js');
var Mongoose = require('mongoose');
var Q = require('q');

Mongoose.Promise = Q.Promise;

module.exports = {

    save : function (req, res) {
        var resource = req.body;
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

            if (resource._id != undefined) {
                Resource.Resource.findByIdAndUpdate(Mongoose.Types.ObjectId(resource._id), {
                    title: resource.title,
                    description: resource.description,
                    tags: resource.tags,
                    date: resource.date
                }, function (err, updatedResource) {
                    if (!err) {
                        updatedResource._doc.tags = resource.tags;
                        res.send({
                            success: true,
                            message: "Resource named " + req.body.title + " has been updated successfully!",
                            data: updatedResource._doc
                        });
                    }
                });
            } else {
                new Resource.Resource({
                    title: resource.title,
                    description: resource.description,
                    tags: resource.tags,
                    date: resource.date
                }).save(function (err, savedResource) {
                        if (!err) {
                            savedResource._doc.tags = resource.tags;
                            res.send({
                                success: true,
                                message: "Resource named " + req.body.title + " has been saved successfully!",
                                data: savedResource._doc
                            });
                            console.log("Resource named " + req.body.title + " has been saved successfully!");
                        }
                    });
            }
        }, function (err) {
            console.log(err);
        });
    },

    list : function(req, res){
        Resource.Resource.find(function(err, activities){
            if (!err) {
                res.send({
                    success : true,
                    message : "Resource list has been acquired successfully!",
                    data : activities
                });
            }
        });
    }
}
