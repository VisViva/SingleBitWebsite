angular.module('AuthorizationService', []).factory('Authorization', ['$timeout','$http','spinnerService', function($timeout, $http, spinnerService) {

  var authorization = this;

  authorization.register = function(user){
    $http.post('/api/register', user).then(function(response){
      // Success
      alert(response.data.message);
    }, function(){
      // Error
      alert("Error!");
    });
  }

  authorization.login = function(user){
    $http.post('/api/login', user).then(function(response){
      // Success
      alert(response.data.message);
    }, function(){
      // Error
      alert("Error!");
    });
  }

  authorization.isLoggedIn = function(){
    $http.get('/api/isloggedin').then(function(response){
      // Success
      alert(response.data.message);
    }, function(){
      // Error
      alert("Error!");
    });
  }

  return {

    // Interaction with resources

    register : function(user){
      authorization.register(user);
    },

    login : function(user){
      authorization.login(user);
    },

    isLoggedIn : function(){
      authorization.isLoggedIn();
    }
  }
}]);
