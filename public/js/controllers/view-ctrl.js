angular.module('ViewCtrl', []).controller('ViewController', function($scope, $routeParams, $sce, UserInterface, Resource) {

  // Initialize

  UserInterface.fillNavbar();

  // Get activity

  if ($routeParams.id != undefined)
  {
    Resource.get($routeParams.id).then(function(data){
      $scope.resource = data.data.data;
      $scope.resource.description = $sce.trustAsHtml($scope.resource.description);
    });
  }

  // Actions

  $scope.goBack = function(){
    UserInterface.gotoLocation(UserInterface.getSelectedView());
  };
});
