angular.module('ResourcesCtrl', []).controller('ResourcesController', ['$scope', '$routeParams', 'UserInterface', 'Authorization', 'Resource', function($scope, $routeParams, UserInterface, Authorization, Resource){

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

  // Resources

  $scope.create = function(){
    UserInterface.gotoLocation('admin/publish');
  };

  $scope.edit = function(id){
    UserInterface.gotoLocation('admin/publish/' + id);
  };

  $scope.delete = function(id){
    Resource.delete(id).then(function(){
      $scope.refresh();
    });
  }

  $scope.list = function(page){
    Resource.listWithoutThumbnails(page, $scope.itemsPerPage).then(function(data){
      if (data.data.success == true){
        $scope.resources = data.data.data.docs;
        $scope.page = data.data.data.page;
        $scope.total = data.data.data.total;
        $scope.loading = false;
      } else {
        if ($scope.page != 1) UserInterface.gotoLocation('admin/messages');
        else $scope.total = 0;
      }
      $scope.loading = false;
    });
  }

  $scope.editComments = function(id){
    UserInterface.gotoLocation('admin/comments/' + id);
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
    if (page != $scope.page) UserInterface.gotoLocation('admin/resources/' + page);
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

  $scope.refresh();

}]);
