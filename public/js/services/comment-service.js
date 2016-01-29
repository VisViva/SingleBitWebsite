angular.module('CommentService', []).factory('Comment', ['$http', function($http) {

  var comment = this;

  comment.save = function(object){
    return $http.post('/api/comment', object);
  };

  comment.delete = function(id){
    return $http.delete('/api/comment/' + id);
  };

  comment.list = function(id){
    return $http.get('/api/comment/list/' + id);
  };

  return {

    // Interaction with comments

    save : function(object){
      return comment.save(object);
    },

    delete : function(id){
      return comment.delete(id);
    },

    list : function(id){
      return comment.list(id);
    }
  }
}]);
