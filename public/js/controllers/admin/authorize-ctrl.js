angular.module('AuthorizeCtrl', []).controller('AuthorizeController', function($scope, UserInterface) {

  // Actions

  $scope.login = function(){
    UserInterface.gotoLocation('admin/publish');
  };
});
