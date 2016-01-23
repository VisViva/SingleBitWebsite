var Account = require('../models/account');
var Passport = require('passport');

module.exports = {
    register : function(req, res){
        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account){
            if (err){
                res.send({
                    success : false,
                    message : "Error registering user " + req.body.username + "!"
                });
            }
            Passport.authenticate('local')(req, res, function(){
                res.send({
                    success : true,
                    message : "Success registering user " + req.body.username + "!",
                    data : account
                });
            });
        });
    },

    login : function(req, res){
        res.send({
            success : true,
            message : "Logged in as " + req.user.username,
            data : req.user.username
        });
    },

    check : function(req, res) {
        if (req.user) {
            res.send({
                success : true,
                message : "Logged in as " + req.user.username,
                data : req.user.username
            });
        } else {
            res.send({
                success : false,
                message : "You have no permissions to access this page!"
            });
        }
    }
};