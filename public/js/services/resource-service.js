angular.module('ResourceService', []).factory('Resource', ['$q', '$timeout','$http','spinnerService', function($q, $timeout, $http, spinnerService) {

  var resource = this;

  resource.save = function(object){
    var deferred = $q.defer();
    $http.post('/api/resource', object).then(function(data){
      object._id = data.data.data._id;
      object.tags = data.data.data.tags;
      deferred.resolve(data.data.data);
    });
    return deferred.promise;
  }

  resource.list = function(){
    return $http.get('/api/resource');
  }

  resource.loadTagSuggestions = function(query){
    var deferred = $q.defer();
    $http.post('/api/tags', {query:query}).then(function(data){
      deferred.resolve(data.data);
    });
    return deferred.promise;
  }

  return {

    // Interaction with resources

    save : function(object){
      return resource.save(object);
    },

    list : function(){
      return resource.list();
    },

    loadTagSuggestions : function(query){
      return resource.loadTagSuggestions(query);
    }
  }
}]);
