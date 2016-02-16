angular.module('CommentsCtrl', []).controller('CommentsController', ['$scope', '$routeParams', 'UserInterface', 'Authorization', 'Comment', function($scope, $routeParams, UserInterface, Authorization, Comment){

  // Initialize

  UserInterface.fillNavbar();
  $scope.comments = [];
  $scope.loading = true;

  // Get user name

  Authorization.check().then(function(data){
    $scope.currentUser = data.data.data;
  });

  // Comments

  $scope.getComments = function(){
    Comment.list($routeParams.id).then(function(data){
      if (data.data.success == true){
        $scope.comments = data.data.data.docs;
      } else {
        $scope.comments = [];
      }
      $scope.loading = false;
    });
  }

  $scope.delete = function(id){
    Comment.delete(id).then(function(){
      $scope.getComments();
    });
  }

  // Pagination

  $scope.gotoResources = function(){
    UserInterface.gotoLocation('admin/resources');
  }

  $scope.gotoMessages = function(){
    UserInterface.gotoLocation('admin/messages');
  }

  // Authorization

  $scope.logout = function(){
    Authorization.logout().then(function(){
      UserInterface.gotoLocation('home');
    },function(){
      alert("Something went wrong!");
    });
  };

  // Get List

  $scope.getComments();
}]);
