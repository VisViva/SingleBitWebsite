angular.module('AuthorizationService', []).factory('Authorization', ['$timeout','$http','$q','UserInterface','spinnerService', function($timeout, $http, $q, UserInterface, spinnerService) {

  var authorization = this;

  authorization.register = function(user){
    return $http.post('/api/register', user);
  };

  authorization.login = function(user){
    return $http.post('/api/login', user);
  };

  authorization.proceedIfLoggedIn = function(){
    var defer = $q.defer();
    $http.get('/api/check').then(function(response){
      if (response.data.success == true){
        defer.resolve();
      } else {
        defer.reject('401');
      }
    });
    return defer.promise;
  };

  authorization.gotoDashboardIfLoggedIn = function(){
    var defer = $q.defer();
    $http.get('/api/check').then(function(response){
      if (response.data.success == true){
        defer.reject('already_authorized');
      } else {
        defer.resolve();
      }
    });
    return defer.promise;
  };

  return {

    // Interaction with resources

    register : function(user){
      return authorization.register(user);
    },

    login : function(user){
      return authorization.login(user);
    },

    proceedIfLoggedIn : function(){
      return authorization.proceedIfLoggedIn();
    },

    gotoDashboardIfLoggedIn : function(){
      return authorization.gotoDashboardIfLoggedIn();
    }
  }
}]);
