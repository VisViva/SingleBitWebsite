angular.module('FeedCtrl', []).controller('FeedController', function($scope, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.activities = [];

  // Get activities

  Resource.list().then(function(data){
    $scope.activities = data.data.data;
  });

  // Actions

  $scope.openActivity = function(id){
    UserInterface.gotoLocation('feed/view/' + id);
  };
});
