angular.module('MessageService', []).factory('Message', ['$http', function($http) {

  var message = this;

  message.save = function(object){
    return $http.post('/api/message', object);
  };

  message.delete = function(id){
    return $http.delete('/api/message/' + id);
  };

  message.list = function(page, itemsPerPage){
    return $http.get('/api/message/list/' + page + '/' + itemsPerPage);
  };

  return {

    // Interaction with resources

    save : function(object){
      return message.save(object);
    },

    delete : function(id){
      return message.delete(id);
    },

    list : function(page, itemsPerPage){
      return message.list(page, itemsPerPage);
    }
  }
}]);
