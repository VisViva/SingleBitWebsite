angular.module('ProjectsCtrl', []).controller('ProjectsController', function($scope, UserInterface, PageNavigation) {
    UserInterface.updateService();
    PageNavigation.updateService();
});