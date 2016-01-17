angular.module('PublishCtrl', []).controller('PublishController', function($scope, $location, $routeParams, $sce, $timeout, UserInterface, spinnerService) {

  // Actions

  $scope.goBack = function(){
    UserInterface.gotoLocation('/' + UserInterface.getSelectedView());
  };
});
