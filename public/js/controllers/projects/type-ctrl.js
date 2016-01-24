angular.module('TypeCtrl', []).controller('TypeController', function($scope, $routeParams, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.projects = [];
  $scope.type = $routeParams.type;

  // Get activities

  Resource.list().then(function(data){
    $scope.projects = data.data.data;
  });

  // Actions

  $scope.openProject = function(id){
    UserInterface.gotoLocation('projects/view/' + id);
  };
});
