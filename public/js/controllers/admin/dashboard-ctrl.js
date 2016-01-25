angular.module('DashboardCtrl', []).controller('DashboardController', function($scope, UserInterface, Authorization, Resource){

  // Initialize

  UserInterface.fillNavbar();

  // Get user name

  Authorization.check().then(function(data){
    $scope.currentUser = data.data.data;
  });

  // Actions

  $scope.refreshList = function(){
    $scope.loading = true;
    Resource.listWithTypes().then(function(data){
      $scope.resources = data.data.data;
      $scope.loading = false;
    });
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
