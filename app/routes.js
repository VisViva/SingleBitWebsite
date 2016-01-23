var AccountController = require('./controllers/account');
var ResourceController = require('./controllers/resource');
var TagController = require('./controllers/tag');
var Passport = require('passport');

module.exports = function(app, root){

  // Authentication

  app.post('/api/register', AccountController.register);
  app.post('/api/login', Passport.authenticate('local'), AccountController.login);
  app.get('/api/loggedin', AccountController.check);

  // Activities

  app.post('/api/resource', ResourceController.save);
  app.get('/api/resource', ResourceController.list);

  // Tags

  app.post('/api/tags', TagController.suggest);

  // Single Page Redirection

  app.get('*', function (req, res) {
    res.sendFile(root + '/public/views/index.html');
  });
}
