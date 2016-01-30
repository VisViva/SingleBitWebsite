angular.module('MessagesCtrl', []).controller('MessagesController', ['$scope', '$routeParams', 'UserInterface', 'Authorization', 'Message', function($scope, $routeParams, UserInterface, Authorization, Message){

  // Initialize

  UserInterface.fillNavbar();
  $scope.page = $routeParams.page;
  $scope.total = 0;
  $scope.itemsPerPage = 8;
  $scope.loading = true;

  // Get user name

  Authorization.check().then(function(data){
    $scope.currentUser = data.data.data;
  });

  // Messages

  $scope.delete = function(id){
    Message.delete(id).then(function(){
      $scope.refresh();
    });
  }

  $scope.view = function(id){
    UserInterface.gotoLocation('admin/messages/view/' + id);
  };

  $scope.list = function(page){
    Message.list(page, $scope.itemsPerPage).then(function(data){
      if (data.data.success == true){
        $scope.messages = data.data.data.docs;
        $scope.page = data.data.data.page;
        $scope.total = data.data.data.total;
      } else {
        if ($scope.page != 1) UserInterface.gotoLocation('admin/messages');
        else $scope.total = 0;
      }
      $scope.loading = false;
    });
  }

  // Pagination

  $scope.refresh = function(){
    $scope.list($scope.page);
  }

  $scope.getPagesArray = function()
  {
    var count = Math.ceil($scope.total / $scope.itemsPerPage);
    if (count < 2) return [];
    else return new Array(count);
  }

  $scope.paginateTo = function(page){
    if (page != $scope.page) UserInterface.gotoLocation('admin/messages/' + page);
  }

  $scope.gotoResources = function(){
    UserInterface.gotoLocation('admin/resources');
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

  $scope.refresh();
}]);
