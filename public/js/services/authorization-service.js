angular.module('AuthorizationService', []).factory('Authorization', ['$timeout','$http','$q','spinnerService', function($timeout, $http, $q, spinnerService) {

  var authorization = this;

  authorization.register = function(user){
    return $http.post('/api/register', user);
  };

  authorization.login = function(user){
    return $http.post('/api/login', user);
  };

  authorization.check = function(){
    return $http.get('/api/check');
  };

  authorization.logout = function(){
    return $http.get('/api/logout');
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

    // Interaction with authorization

    register : function(user){
      return authorization.register(user);
    },

    login : function(user){
      return authorization.login(user);
    },

    check : function(){
      return authorization.check();
    },

    logout : function(){
      return authorization.logout();
    },

    proceedIfLoggedIn : function(){
      return authorization.proceedIfLoggedIn();
    },

    gotoDashboardIfLoggedIn : function(){
      return authorization.gotoDashboardIfLoggedIn();
    }
  }
}]);
