angular.module('DashboardCtrl', []).controller('DashboardController', function($scope, UserInterface, Authorization, Resource){

  // Initialize

  UserInterface.fillNavbar();
  $scope.resources = [];

  // Actions

  $scope.refreshList = function(){
    Resource.list().then(function(data){
      $scope.resources = data.data.data;
    });
  }

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
