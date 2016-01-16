angular.module('ProjectsCtrl', []).controller('ProjectsController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Actions

  $scope.openProjectsOfType = function(type){
      UserInterface.gotoLocation('/projects/type/' + type);
  };
});
