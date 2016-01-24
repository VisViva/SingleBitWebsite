angular.module('DashboardCtrl', []).controller('DashboardController', function($scope, UserInterface, Resource){

  // Initialize

  // Actions

  $scope.newResource = function(){
    UserInterface.loadRequestedLocation().then(function(){
      UserInterface.gotoLocation('admin/dashboard');
    },function(){
      UserInterface.gotoLocation('admin/authorize');
    });
  };

  $scope.back = function(){
    UserInterface.gotoLocation('home');
  };
});
