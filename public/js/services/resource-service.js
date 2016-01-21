angular.module('ResourceService', []).factory('Resource', ['$timeout','$http','spinnerService', function($timeout, $http, spinnerService) {

  var resource = this;

  resource.save = function(object){
    $http.post('/api/activity', object).then(function(response){
      // Success
      alert(response.data.message);
    }, function(){
      // Error
      alert("Error!");
    });
  }

  resource.list = function(){
    $http.get('/api/activity').then(function(response){
      // Success
      alert(response.data.message);
    }, function(){
      // Error
      alert("Error!");
    });
  }

  return {

    // Interaction with resources

    save : function(object){
      resource.save(object);
    },

    list : function(){
      resource.list();
    }
  }
}]);
