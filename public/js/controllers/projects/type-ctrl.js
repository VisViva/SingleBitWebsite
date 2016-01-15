angular.module('TypeCtrl', []).controller('TypeController', function($scope, $location, $routeParams, $timeout, UserInterface, spinnerService) {

  // Initialize

  $scope.projects = [];
  $scope.type = $routeParams.type;

  // Execute when content is loaded

  $scope.$on('$viewContentLoaded', function(){
    spinnerService.hide('viewSpinner');
    UserInterface.updateService();
    UserInterface.setZoomEnabled();
  });

  // Get activities

  for (var i = 0; i < 16; ++i)
  {
    $scope.projects.push({
      id: 15,
      type: "game",
      title: "Project #1",
      date: "13 January 2015"
    });
  }

  // Actions

  $scope.openProject = function(id)
  {
    UserInterface.zoomOut();
    $timeout(function()
    {
      spinnerService.show('viewSpinner');
      $location.path('/projects/view/' + id);
      UserInterface.updateService();
      if (UserInterface.mobile == true) UserInterface.scrollByPageNumber(1);
      UserInterface.zoomIn();
    }, 300);
  };
});
