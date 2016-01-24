var AccountController = require('./controllers/account');
var ResourceController = require('./controllers/resource');
var TagController = require('./controllers/tag');
var Passport = require('passport');
var Router = require('express').Router();



module.exports = function(root){

  // Authentication

  Router.post('/api/register', AccountController.register);
  Router.post('/api/login', Passport.authenticate('local'), AccountController.login);
  Router.get('/api/logout', AccountController.logout);
  Router.get('/api/check', AccountController.check);

  // Resources

  Router.post('/api/resource/', ResourceController.save);
  Router.delete('/api/resource/:id', ResourceController.delete);
  Router.get('/api/resource/:id', ResourceController.get);
  Router.get('/api/resource/', ResourceController.list);

  // Tags

  Router.get('/api/tags/:query', TagController.suggest);

  // Single Page Application

  Router.get('*', function (req, res) {
    res.sendFile(root + '/public/views/index.html');
  });

  return Router;
}
