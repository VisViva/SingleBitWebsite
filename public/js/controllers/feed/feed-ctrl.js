angular.module('FeedCtrl', []).controller('FeedController', function($scope, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.loading = true;

  // Get activities

  Resource.listWithThumbnails().then(function(data){
    $scope.activities = data.data.data;
    $scope.loading = false;
  });

  // Actions

  $scope.openActivity = function(id){
    UserInterface.gotoLocation('feed/view/' + id);
  };
});
