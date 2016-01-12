angular.module('FeedCtrl', []).controller('FeedController', function($scope, UserInterface) {
    UserInterface.reinitializeLayoutEngine();
});