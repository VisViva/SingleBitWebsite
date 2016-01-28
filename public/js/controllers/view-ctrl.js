angular.module('ViewCtrl', []).controller('ViewController', function($scope, $routeParams, $sce, UserInterface, Resource, History) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.loading = true;

  // Get activity

  if ($routeParams.id != undefined)
  {
    Resource.get($routeParams.id).then(function(data){
      $scope.resource = data.data.data;
      $scope.resource.description = $sce.trustAsHtml($scope.resource.description);
      $scope.loading = false;
    });
  }

  // Actions

  $scope.searchByTag = function(query){
    UserInterface.gotoLocation('search/' + query + '/1');
  }

  $scope.goBack = function(){
    var location = '';

    if (History.historyExists() == true){
      location = History.getLastRoute();
    } else {
      if (!angular.isUndefined($scope.resource))
      {
        switch($scope.resource.contentType)
        {
          case 'Activity':{
            location = 'feed';
            break;
          }
          case 'Project':{
            location = 'projects/type/' + $scope.resource.resourceType.toLowerCase().split(' ')[0];
            break;
          }
        }
      }
    }
    UserInterface.gotoLocation(location);
  };
});
