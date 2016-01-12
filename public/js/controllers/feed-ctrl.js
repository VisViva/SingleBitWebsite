angular.module('FeedCtrl', []).controller('FeedController', function($scope, UserInterface, PageNavigation) {
    UserInterface.updateService();
    PageNavigation.updateService();
});