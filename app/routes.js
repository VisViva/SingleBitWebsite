var AccountController = require('./controllers/account');
var ActivityController = require('./controllers/activity');
var TagController = require('./controllers/tag');
var Passport = require('passport');

module.exports = function(app){

  // Authentication

  app.post('/api/register', AccountController.register);
  app.post('/api/login', Passport.authenticate('local'), AccountController.login);
  app.get('/api/loggedin', AccountController.check);

  // Activities

  app.post('/api/activity', ActivityController.save);
  app.get('/api/activity', ActivityController.list);

  // Tags

  app.post('/api/tags', TagController.suggest);

  // Single Page Redirection

  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
}
