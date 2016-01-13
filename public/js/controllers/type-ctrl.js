angular.module('TypeCtrl', []).controller('TypeController', function($scope, $location, $timeout, UserInterface, spinnerService) {

    // Execute when content is loaded

    $scope.$on('$viewContentLoaded', function(){
        spinnerService.hide('viewSpinner');
        UserInterface.updateService();
        UserInterface.setZoomEnabled();
    });

    // Get activities

    $scope.projects = [];
    for (var i = 0; i < 16; ++i)
    {
        $scope.projects.push({
            title: "Project #1",
            type: 0,
            date: "13 January 2015"
        });
    }

    // Actions

    $scope.openProject = function()
    {
        UserInterface.zoomOut();
        $timeout(function()
        {
            spinnerService.show('viewSpinner');
            $location.path('/projects/view');
            UserInterface.zoomIn();
        }, 300);
    };
});