angular.module('DashboardCtrl', []).controller('DashboardController', function($scope, $location, $routeParams, UserInterface, Authorization, Resource){

  // Initialize

  UserInterface.fillNavbar();
  $scope.page = $routeParams.page;
  $scope.total = 1;
  $scope.itemsPerPage = 8;
  $scope.loading = true;

  // Get user name

  Authorization.check().then(function(data){
    $scope.currentUser = data.data.data;
  });

  // Get activities

  $scope.listWithoutThumbnails = function(page)
  {
    Resource.listWithoutThumbnails(page, $scope.itemsPerPage).then(function(data){
      if (data.data.success == true){
        $scope.resources = data.data.data.docs;
        $scope.page = data.data.data.page;
        $scope.total = data.data.data.total;
        $scope.loading = false;
      } else {
        if ($scope.page != 1) UserInterface.gotoLocation('admin/dashboard');
        else UserInterface.gotoLocation('404');
      }
    });
  }

  $scope.getPagesArray = function()
  {
    var count = Math.ceil($scope.total / $scope.itemsPerPage);
    if (count < 2) return [];
    else return new Array(count);
  }

  // Actions

  $scope.paginateTo = function(page){
    if (page != $scope.page) UserInterface.gotoLocation('admin/dashboard/' + page);
  }

  $scope.refreshList = function(){
    $scope.listWithoutThumbnails($scope.page);
  }

  $scope.editResource = function(id){
    UserInterface.gotoLocation('admin/publish/' + id);
  };

  $scope.deleteResource = function(id){
    Resource.delete(id).then(function(){
      $scope.refreshList();
    });
  }

  $scope.newResource = function(){
    UserInterface.gotoLocation('admin/publish');
  };

  $scope.logout = function(){
    Authorization.logout().then(function(){
      UserInterface.gotoLocation('home');
    },function(){
      alert("Something went wrong!");
    });
  };

  // Get List

  $scope.refreshList();
});
