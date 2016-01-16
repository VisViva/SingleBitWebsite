angular.module('FeedCtrl', []).controller('FeedController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Initialize

  $scope.activities = [];

  // Get activities

  for (var i = 0; i < 8; ++i)
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
    UserInterface.gotoLocation('/feed/view/' + id);
  };
});
