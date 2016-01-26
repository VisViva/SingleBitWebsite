angular.module('TypeCtrl', []).controller('TypeController', function($scope, $location, $routeParams, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.page = $routeParams.page;
  $scope.total = 1;
  $scope.itemsPerPage = 8;
  $scope.loading = true;

  // Get activities

  Resource.listWithThumbnails($routeParams.type, $scope.page, $scope.itemsPerPage).then(function(data){
    if (data.data.success == true){
      $scope.projects = data.data.data.docs;
      $scope.page = data.data.data.page;
      $scope.total = data.data.data.total;
      $scope.loading = false;
    } else {
      if ($scope.page != 1) UserInterface.gotoLocation('projects/type/' + $routeParams.type + '/1');
      else UserInterface.gotoLocation('404');
    }
  });

  $scope.getPagesArray = function(){
    if ($scope.total == 0) return [];
    else return new Array(Math.ceil($scope.total / $scope.itemsPerPage));
  }

  // Actions

  $scope.paginateTo = function(page){
    UserInterface.gotoLocation('projects/type/' + $routeParams.type + '/' + page);
  }

  $scope.openProject = function(id){
    UserInterface.gotoLocation('view/' + id);
  };
});
