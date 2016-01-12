angular.module('FeedCtrl', []).controller('FeedController', function($scope, UserInterface, PageNavigation, spinnerService) {

    // Execute when content is loaded
    $scope.$on('$viewContentLoaded', function(){
        UserInterface.updateService();
        PageNavigation.updateService();
        spinnerService.hide('viewSpinner');
        UserInterface.setZoomEnabled();
    });
});