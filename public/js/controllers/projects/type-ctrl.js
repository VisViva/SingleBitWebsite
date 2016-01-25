angular.module('TypeCtrl', []).controller('TypeController', function($scope, $routeParams, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.page = 1;
  $scope.total = 1;
  $scope.itemsPerPage = 8;
  $scope.loading = true;

  // Get activities

  $scope.listWithThumbnails = function(page)
  {
    Resource.listWithThumbnails(page, $scope.itemsPerPage).then(function(data){
      $scope.projects = data.data.data.docs;
      $scope.page = data.data.data.page;
      $scope.total = data.data.data.total;
      $scope.loading = false;
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

  $scope.openProject = function(id){
    UserInterface.gotoLocation('projects/view/' + id);
  };
});
