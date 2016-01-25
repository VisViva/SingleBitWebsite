angular.module('DashboardCtrl', []).controller('DashboardController', function($scope, UserInterface, Authorization, Resource){

  // Initialize

  UserInterface.fillNavbar();
  $scope.page = 1;
  $scope.total = 1;
  $scope.itemsPerPage = 8;
  $scope.loading = true;

  // Get user name

  Authorization.check().then(function(data){
    $scope.currentUser = data.data.data;
  });

  // Get activities

  $scope.listWithTypes = function(page)
  {
    Resource.listWithTypes(page, $scope.itemsPerPage).then(function(data){
      $scope.resources = data.data.data.docs;
      $scope.page = data.data.data.page;
      $scope.total = data.data.data.total;
      $scope.loading = false;
    });
  }

  $scope.getPagesArray = function()
  {
    if ($scope.total == 0) return [];
    else return new Array(Math.floor($scope.total / $scope.itemsPerPage) + 1);
  }

  // Actions

  $scope.paginateTo = function(page){
    $scope.loading = true;
    $scope.listWithTypes(page);
  }

  $scope.refreshList = function(){
    $scope.paginateTo($scope.page);
  }

  $scope.editResource = function(id){
    UserInterface.gotoLocation('admin/publish/' + id);
  };

  $scope.deleteResource = function(id){
    Resource.delete(id).then(function(){
      $scope.refreshList();
    });
  }

  $scope.newResource = function(){
    UserInterface.gotoLocation('admin/publish');
  };

  $scope.logout = function(){
    Authorization.logout().then(function(){
      UserInterface.gotoLocation('home');
    },function(){
      alert("Something went wrong!");
    });
  };

  // Get List

  $scope.refreshList();
});
