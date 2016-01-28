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
  };

  resource.get = function(id){
    return $http.get('/api/resource/' + id);
  };

  resource.delete = function(id){
    return $http.delete('/api/resource/' + id);
  };

  resource.list = function(type, fields, page, itemsPerPage){
    return $http.get('/api/resource/list/' + type + '/' + fields + '/' + page + '/' + itemsPerPage);
  };

  resource.next = function(type){
    return $http.get('/api/resource/next/' + type);
  };

  resource.find = function(text, page, itemsPerPage){
    return $http.get('/api/resource/search/' + text + '/' + page + '/' + itemsPerPage);
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

    get : function(id){
      return resource.get(id);
    },

    delete : function(id){
      return resource.delete(id);
    },

    listWithoutThumbnails : function(page, itemsPerPage){
      return resource.list('all', 'none', page, itemsPerPage);
    },

    listWithThumbnails : function(type, page, itemsPerPage){
      return resource.list(type, 'feed', page, itemsPerPage);
    },

    next : function(type){
      return resource.next(type);
    },

    findByTagWithThumbnails : function(text, page, itemsPerPage){
      return resource.find(text, page, itemsPerPage);
    },

    loadTagSuggestions : function(query){
      return resource.loadTagSuggestions(query);
    }
  }
}]);
