angular.module('FeedCtrl', []).controller('FeedController', function($scope, UserInterface, spinnerService) {

    // Execute when content is loaded
    $scope.$on('$viewContentLoaded', function(){
        spinnerService.hide('viewSpinner');
        UserInterface.updateService();
        UserInterface.setZoomEnabled();
    });
});