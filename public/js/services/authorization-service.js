angular.module('AuthorizationService', []).factory('Authorization', ['$timeout','$http','spinnerService', function($timeout, $http, spinnerService) {

  var authorization = this;

  authorization.register = function(user){
    return $http.post('/api/register', user);
  }

  authorization.login = function(user){
    return $http.post('/api/login', user);
  }

  authorization.isLoggedIn = function(){
    return $http.get('/api/isloggedin');
  }

  return {

    // Interaction with resources

    register : function(user){
      return authorization.register(user);
    },

    login : function(user){
      return authorization.login(user);
    },

    isLoggedIn : function(){
      return authorization.isLoggedIn();
    }
  }
}]);
