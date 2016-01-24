angular.module('ResourceService', []).factory('Resource', ['$q', '$timeout','$http','spinnerService', function($q, $timeout, $http, spinnerService) {

  var resource = this;

  resource.save = function(object){
    var deferred = $q.defer();
    $http.post('/api/resource/save', object).then(function(data){
      object._id = data.data.data._id;
      object.tags = data.data.data.tags;
      deferred.resolve(data.data.data);
    });
    return deferred.promise;
  };

  resource.delete = function(id){
    return $http.delete('/api/resource/delete/' + id);
  };

  resource.list = function(){
    return $http.get('/api/resource/list');
  };

  resource.loadTagSuggestions = function(query){
    var deferred = $q.defer();
    $http.get('/api/tags/' + query).then(function(data){
      deferred.resolve(data.data);
    });
    return deferred.promise;
  };

  return {

    // Interaction with resources

    save : function(object){
      return resource.save(object);
    },

    delete : function(id){
      return resource.delete(id);
    },

    list : function(){
      return resource.list();
    },

    loadTagSuggestions : function(query){
      return resource.loadTagSuggestions(query);
    }
  }
}]);
