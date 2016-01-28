angular.module('MessageCtrl', []).controller('MessageController', function($scope, $location, $routeParams, $sce, UserInterface, Authorization, Message){

  // Initialize

  UserInterface.fillNavbar();
  $scope.loading = true;

  // Get message

  if ($routeParams.id != undefined)
  {
    Message.get($routeParams.id).then(function(data){
      $scope.message = data.data.data;
      $scope.message.text = $sce.trustAsHtml($scope.message.text);
      $scope.loading = false;
    });
  }

  $scope.goBack = function(){
    UserInterface.gotoLocation('admin/messages');
  }
});
