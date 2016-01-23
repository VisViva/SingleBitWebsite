var Activity = require('../models/activity.js');
var Tag = require('../models/tag.js');
var mongoose = require('mongoose');
var q = require('q');

mongoose.Promise = q.Promise;

module.exports = {

    save : function (req, res) {
        var activity = req.body;
        q.all(activity.tags.map(function (tag) {
            if (tag._id == undefined) {
                return new Tag.Tag({text: tag.text}).save();
            } else {
                tag._id = mongoose.Types.ObjectId(tag._id);
                return q(tag);
            }
        })).then(function (results) {
            console.log(results);
            results.forEach(function (element) {
                if (element._doc != undefined) {
                    for (var i = 0; i < activity.tags.length; ++i) {
                        if (activity.tags[i].text == element._doc.text) {
                            activity.tags[i]._id = element._doc._id;
                        }
                    }
                }
            });

            if (activity._id != undefined) {
                Activity.Activity.findByIdAndUpdate(mongoose.Types.ObjectId(activity._id), {
                    title: activity.title,
                    description: activity.description,
                    tags: activity.tags,
                    date: activity.date
                }, function (err, updatedActivity) {
                    if (!err) {
                        updatedActivity._doc.tags = activity.tags;
                        res.send({
                            success: true,
                            message: "Activity named " + req.body.title + " has been updated successfully!",
                            data: updatedActivity._doc
                        });
                    }
                });
            } else {
                new Activity.Activity({
                    title: activity.title,
                    description: activity.description,
                    tags: activity.tags,
                    date: activity.date
                }).save(function (err, savedActivity) {
                        if (!err) {
                            savedActivity._doc.tags = activity.tags;
                            res.send({
                                success: true,
                                message: "Activity named " + req.body.title + " has been saved successfully!",
                                data: savedActivity._doc
                            });
                            console.log("Activity named " + req.body.title + " has been saved successfully!");
                        }
                    });
            }
        }, function (err) {
            console.log(err);
        });
    },

    list : function(req, res){
        Activity.Activity.find(function(err, activities){
            if (!err) {
                res.send({
                    success : true,
                    message : "Activity list has been acquired successfully!",
                    data : activities
                });
            }
        });
    }
}