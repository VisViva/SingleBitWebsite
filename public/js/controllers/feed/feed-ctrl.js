angular.module('FeedCtrl', []).controller('FeedController', function($scope, $location, $routeParams, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.type = $routeParams.type;
  $scope.page = $routeParams.page;
  $scope.total = 1;
  $scope.itemsPerPage = 8;
  $scope.loading = true;

  // Get activities

  Resource.listWithThumbnails($scope.type, $scope.page, $scope.itemsPerPage).then(function(data){
    if (data.data.success == true){
      $scope.activities = data.data.data.docs;
      $scope.page = data.data.data.page;
      $scope.total = data.data.data.total;
      $scope.loading = false;
    } else {
      if ($scope.page != 1) UserInterface.gotoLocation('feed/' + $scope.type + '/1');
      else UserInterface.gotoLocation('404');
    }
  });

  $scope.getPagesArray = function()
  {
    var count = Math.ceil($scope.total / $scope.itemsPerPage);
    if (count < 2) return [];
    else return new Array(count);
  }

  // Actions

  $scope.paginateTo = function(page){
    if (page != $scope.page) UserInterface.gotoLocation('feed/' + $scope.type + '/' + page);
  }

  $scope.openActivity = function(id){
    UserInterface.gotoLocation('view/' + id);
  };

  $scope.changeType = function(type){
    UserInterface.gotoLocation('feed/' + type + '/' + 1);
  };
});
