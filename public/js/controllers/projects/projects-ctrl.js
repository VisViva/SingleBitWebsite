angular.module('ProjectsCtrl', []).controller('ProjectsController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Execute when content is loaded

  $scope.$on('$viewContentLoaded', function(){
    spinnerService.hide('viewSpinner');
    UserInterface.updateService();
    UserInterface.setZoomEnabled();
  });

  // Actions

  $scope.openProjectsOfType = function(type)
  {
    UserInterface.zoomOut();
    $timeout(function()
    {
      spinnerService.show('viewSpinner');
      $location.path('/projects/type/' + type);
      UserInterface.updateService();
      if (UserInterface.isMobile()) UserInterface.scrollByPageNumber(1);
      UserInterface.zoomIn();
    }, UserInterface.isMobile() ? 0 : 300);
  };
});
