angular.module('ProjectsCtrl', []).controller('ProjectsController', function($scope, UserInterface) {

  // Actions

  $scope.openProjectsOfType = function(type){
      UserInterface.gotoLocation('projects/type/' + type);
  };
});
