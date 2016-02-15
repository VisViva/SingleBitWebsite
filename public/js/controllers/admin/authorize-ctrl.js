angular.module('AuthorizeCtrl', []).controller('AuthorizeController', ['$scope', 'Authorization', 'UserInterface', function($scope, Authorization, UserInterface) {

  // Initialization

  UserInterface.fillNavbar();
  $scope.user;

  // Actions

  $scope.login = function(){
    Authorization.register($scope.user).then(function(){
      UserInterface.gotoLocation('admin/resources');
    },function(){
      alert("Wrong username / password!");
    });
  };
}]);
