angular.module('ProjectsCtrl', []).controller('ProjectsController', function($scope, UserInterface) {
  
  // Initialize

  UserInterface.fillNavbar();

  // Actions

  $scope.openProjectsOfType = function(type){
      UserInterface.gotoLocation('projects/type/' + type);
  };
});
