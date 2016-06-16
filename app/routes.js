var AccountController = require('./controllers/account');
var ResourceController = require('./controllers/resource');
var CommentController = require('./controllers/comment');
var MessageController = require('./controllers/message');
var TagController = require('./controllers/tag');
var Passport = require('passport');
var Router = require('express').Router();

module.exports = function(root){

  // Authentication

  Router.post('/api/register', AccountController.isAuthenticated, AccountController.register);
  Router.post('/api/login', Passport.authenticate('local'), AccountController.login);
  Router.get('/api/logout', AccountController.isAuthenticated, AccountController.logout);
  Router.get('/api/check', AccountController.check);

  // Resources

  Router.post('/api/resource/', AccountController.isAuthenticated, ResourceController.save);
  Router.delete('/api/resource/:id', AccountController.isAuthenticated, ResourceController.delete);
  Router.get('/api/resource/:id', ResourceController.get);
  Router.get('/api/resource/list/:type/:fields/:page/:itemsperpage', ResourceController.list);
  Router.get('/api/resource/next/:type', AccountController.isAuthenticated, ResourceController.next);
  Router.get('/api/resource/search/:text/:page/:itemsperpage', ResourceController.find);

  // Comments

  Router.post('/api/comment/', CommentController.save);
  Router.delete('/api/comment/:id', CommentController.delete);
  Router.get('/api/comment/list/:resource', CommentController.list);

  // Messages

  Router.post('/api/message/', MessageController.save);
  Router.delete('/api/message/:id', AccountController.isAuthenticated, MessageController.delete);
  Router.get('/api/message/:id', AccountController.isAuthenticated, MessageController.get);
  Router.get('/api/message/list/:page/:itemsperpage', AccountController.isAuthenticated, MessageController.list);

  // Tags

  Router.get('/api/tags/:query', TagController.suggest);

  // Live demos

  Router.get('/demos/gpu_accelerated_particles', function (req, res) {
    res.sendFile(root + '/public/views/demos/gpu_accelerated_particles/index.html');
  });

  // Single Page Application

  Router.get('*', function (req, res) {
    res.sendFile(root + '/public/views/index.html');
  });

  return Router;
}
