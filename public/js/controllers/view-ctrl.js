angular.module('ViewCtrl', []).controller('ViewController', function($scope, $location, $timeout, UserInterface, spinnerService) {

    // Execute when content is loaded

    $scope.$on('$viewContentLoaded', function(){
        spinnerService.hide('viewSpinner');
        UserInterface.updateService();
        UserInterface.setZoomEnabled();
    });

    // Actions

    $scope.goBack = function()
    {
        UserInterface.zoomOut();
        $timeout(function()
        {
            spinnerService.show('viewSpinner');
            $location.path('/' + UserInterface.selectedView);
            UserInterface.zoomIn();
        }, 300);
    };
});