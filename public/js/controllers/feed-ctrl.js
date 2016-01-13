angular.module('FeedCtrl', []).controller('FeedController', function($scope, $location, $timeout, UserInterface, spinnerService) {

    // Execute when content is loaded

    $scope.$on('$viewContentLoaded', function(){
        spinnerService.hide('viewSpinner');
        UserInterface.updateService();
        UserInterface.setZoomEnabled();
    });

    // Get activities

    $scope.activities = [];
    for (var i = 0; i < 16; ++i)
    {
        $scope.activities.push({
            title: "How to design achievements?",
            type: 0,
            date: "13 January 2015",
            size: "5 minutes"
        });
    }

    // Actions

    $scope.openActivity = function()
    {
        UserInterface.zoomOut();
        $timeout(function()
        {
            spinnerService.show('viewSpinner');
            $location.path('/feed/view');
            UserInterface.zoomIn();
        }, 300);
    };
});