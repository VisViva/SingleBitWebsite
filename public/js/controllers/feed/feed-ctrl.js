angular.module('FeedCtrl', []).controller('FeedController', function($scope, $location, $routeParams, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.page = ($routeParams.page != undefined) ? $routeParams.page : 1;
  $scope.total = 1;
  $scope.itemsPerPage = 8;
  $scope.loading = true;

  // Get activities

  $scope.listWithThumbnails = function(page)
  {
    $location.search('page', page);
    Resource.listWithThumbnails(page, $scope.itemsPerPage).then(function(data){
      if (data.data.success == true){
        $scope.activities = data.data.data.docs;
        $scope.page = data.data.data.page;
        $scope.total = data.data.data.total;
        $scope.loading = false;
      } else {
        UserInterface.gotoLocation('404');
      }
    });
  }

  $scope.listWithThumbnails($scope.page);

  $scope.getPagesArray = function()
  {
    if ($scope.total == 0) return [];
    else return new Array(Math.floor($scope.total / $scope.itemsPerPage) + 1);
  }

  // Actions

  $scope.paginateTo = function(page){
    $scope.loading = true;
    $scope.listWithThumbnails(page);
  }

  $scope.openActivity = function(id){
    UserInterface.gotoLocation('feed/view/' + id);
  };
});
