angular.module('PublishCtrl', []).controller('PublishController', function($scope, $sce, UserInterface) {

  // Initialize

  $scope.activeTab = 0;
  $scope.description = "col-sm-12";
  $scope.resource = {
    title: "How to design achievements?",
    date: "13 January 2015",
    description: ''
  };
});
