angular.module('AuthorizeCtrl', []).controller('AuthorizeController', function($scope, Authorization, UserInterface) {

  // Initialization

  UserInterface.fillNavbar();
  $scope.user;

  // Actions

  $scope.login = function(){
    Authorization.login($scope.user).then(function(){
      UserInterface.gotoLocation('admin/resources');
    },function(){
      alert("Wrong username / password!");
    });
  };
});
