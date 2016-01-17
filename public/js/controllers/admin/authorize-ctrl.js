angular.module('AuthorizeCtrl', []).controller('AuthorizeController', function($scope, $location, $routeParams, $sce, $timeout, UserInterface, spinnerService) {

  // Actions

  $scope.goBack = function(){
    UserInterface.gotoLocation('/' + UserInterface.getSelectedView());
  };
});
