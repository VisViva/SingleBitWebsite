angular.module('AuthorizeCtrl', []).controller('AuthorizeController', function($scope, Authorization, UserInterface) {

  // Initialization

  $scope.user;

  // Actions

  $scope.login = function(){
    Authorization.isLoggedIn();
    //UserInterface.gotoLocation('admin/publish');
  };
});
