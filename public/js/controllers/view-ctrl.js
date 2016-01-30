angular.module('ViewCtrl', []).controller('ViewController', ['$scope', '$routeParams', '$sce', 'UserInterface', 'Resource', 'Comment', 'History', function($scope, $routeParams, $sce, UserInterface, Resource, Comment, History) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.loading = true;
  $scope.loadingComments = true;
  $scope.comments = [];
  $scope.comment = {
    resource : $routeParams.id,
    sender : "",
    text : ""
  };

  // Get activity

  $scope.getComments = function(){
    Comment.list($routeParams.id).then(function(data){
      if (data.data.success == true){
        $scope.comments = data.data.data.docs;
      }
      $scope.loadingComments = false;
    });
  }

  if ($routeParams.id != undefined)
  {
    Resource.get($routeParams.id).then(function(data){
      $scope.resource = data.data.data;
      $scope.resource.description = $sce.trustAsHtml($scope.resource.description);
      $scope.loading = false;
    });
    $scope.getComments();
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

  $scope.submit = function(){
    if (($scope.comment.resource != undefined) && ($scope.comment.sender != "") && ($scope.comment.text != ""))
    {
      $scope.comment.date = Date.now();
      $scope.loadingComments = true;
      Comment.save($scope.comment).then(function(data){
        if (data.data.success == true){
          $scope.comment.sender = "";
          $scope.comment.text = "";
          $scope.getComments();
        }
      });
    };
  }
}]);
