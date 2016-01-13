angular.module('ProjectsCtrl', []).controller('ProjectsController', function($scope, $location, $timeout, UserInterface, spinnerService) {

    // Execute when content is loaded

    $scope.$on('$viewContentLoaded', function(){
        spinnerService.hide('viewSpinner');
        UserInterface.updateService();
        UserInterface.setZoomEnabled();
    });

    // Actions

    $scope.openProjectsOfType = function()
    {
        UserInterface.zoomOut();
        $timeout(function()
        {
            spinnerService.show('viewSpinner');
            $location.path('/projects/type');
            UserInterface.zoomIn();
        }, 300);
    };
});