angular.module('FeedCtrl', []).controller('FeedController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Initialize

  $scope.activities = [];

  // Execute when content is loaded

  $scope.$on('$viewContentLoaded', function(){
    spinnerService.hide('viewSpinner');
    UserInterface.updateService();
    UserInterface.setZoomEnabled();    
  });

  // Get activities

  for (var i = 0; i < 16; ++i)
  {
    $scope.activities.push({
      id: 15,
      title: "How to design achievements?",
      date: "13 January 2015",
      size: "5 minutes"
    });
  }

  // Actions

  $scope.openActivity = function(id)
  {
    UserInterface.zoomOut();
    $timeout(function()
    {
      spinnerService.show('viewSpinner');
      $location.path('/feed/view/' + id);
      UserInterface.updateService();
      if (UserInterface.mobile == true) UserInterface.scrollByPageNumber(1);
      UserInterface.zoomIn();
    }, 300);
  };
});
