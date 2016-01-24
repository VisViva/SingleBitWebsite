angular.module('TypeCtrl', []).controller('TypeController', function($scope, $routeParams, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.loading = true;

  // Get activities

  Resource.list().then(function(data){
    $scope.projects = data.data.data;
    $scope.loading = false;
  });

  // Actions

  $scope.openProject = function(id){
    UserInterface.gotoLocation('projects/view/' + id);
  };
});
