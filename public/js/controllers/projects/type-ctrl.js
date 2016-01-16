angular.module('TypeCtrl', []).controller('TypeController', function($scope, $location, $routeParams, $timeout, UserInterface, spinnerService) {

  // Initialize

  $scope.projects = [];
  $scope.type = $routeParams.type;

  // Get activities

  for (var i = 0; i < 8; ++i)
  {
    $scope.projects.push({
      id: 15,
      type: "game",
      title: "Project #1",
      date: "13 January 2015"
    });
  }

  // Actions

  $scope.openProject = function(id){
    UserInterface.gotoLocation('/projects/view/' + id);
  };
});
