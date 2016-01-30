angular.module('AboutCtrl', []).controller('AboutController', ['$scope', 'UserInterface', function($scope, UserInterface) {

  // Initialize

  UserInterface.fillNavbar();
}]);
