angular.module('SearchCtrl', []).controller('SearchController', ['$scope', '$routeParams', 'UserInterface', 'Resource', 'History', function($scope, $routeParams, UserInterface, Resource, History) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.text = $routeParams.text;
  $scope.page = $routeParams.page;
  $scope.total = 1;
  $scope.itemsPerPage = 8;
  $scope.loading = true;

  // Get resources

  Resource.findByTagWithThumbnails($scope.text, $scope.page, $scope.itemsPerPage).then(function(data){
    if (data.data.success == true){
      $scope.resources = data.data.data.docs;
      $scope.page = data.data.data.page;
      $scope.total = data.data.data.total;
      $scope.loading = false;
    } else {
      if ($scope.page != 1) UserInterface.gotoLocation('search/' + $scope.text + '/1');
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
    if (page != $scope.page) UserInterface.gotoLocation('search/' + $scope.text + '/' + page);
  }

  $scope.openResource = function(id){
    History.saveAsLastRoute();
    UserInterface.gotoLocation('view/' + id);
  };
}]);
