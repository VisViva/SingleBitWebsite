angular.module('MainCtrl', []).controller('MainController', function($scope, Slider, LayoutEngine) {

    // Initialize slider

    Slider.initializeSlider([
        '#home',
        '#feed',
        '#projects',
        '#about',
        '#contact',
        '#footer'
    ], function(currentPage)
    {
        $scope.selectedPage = currentPage;
        $scope.$apply();
    });

    // Initialize layout engine

    LayoutEngine.initializeLayoutEngine([
        {className:"viewport-100", height:100},
        {className:"overlay-100", height:100},
        {className:"viewport-90", height:90},
        {className:"viewport-20", height:20},
        {className:"viewport-10", height:10},
    ]);

    // Defaults

    $scope.selectedPage = 0;
    $scope.scrollTo = function(id)
    {
        Slider.scrollTo(id);
    }
});