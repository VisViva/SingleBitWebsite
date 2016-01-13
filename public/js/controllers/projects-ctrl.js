angular.module('ProjectsCtrl', []).controller('ProjectsController', function($scope, UserInterface, spinnerService) {

    // Execute when content is loaded
    $scope.$on('$viewContentLoaded', function(){
        spinnerService.hide('viewSpinner');
        UserInterface.updateService();
        UserInterface.setZoomEnabled();
    });
});