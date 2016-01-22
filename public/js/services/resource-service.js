angular.module('ResourceService', []).factory('Resource', ['$timeout','$http','spinnerService', function($timeout, $http, spinnerService) {

  var resource = this;

  resource.save = function(object){
    return $http.post('/api/activity', object);
  }

  resource.list = function(){
    return $http.get('/api/activity');
  }

  return {

    // Interaction with resources

    save : function(object){
      return resource.save(object);
    },

    list : function(){
      return resource.list();
    }
  }
}]);
