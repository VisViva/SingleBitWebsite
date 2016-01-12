angular.module('MainCtrl', []).controller('MainController', function($scope, $location, Slider, UserInterface) {

    // Initialize slider

    Slider.initializeSlider([
        '#home',
        '#view',
        '#about',
        '#contact',
        '#footer'
    ], function()
    {
        $scope.$apply();
    });

    // Initialize layout engine

    UserInterface.initializeLayoutEngine([
        {type: "spc", className:"viewport-100", height:100},
        {type: "spc", className:"viewport-90", height:90},
        {type: "spc", className:"viewport-80", height:80},
        {type: "spc", className:"viewport-70", height:70},
        {type: "spc", className:"viewport-60", height:60},
        {type: "spc", className:"viewport-50", height:50},
        {type: "spc", className:"viewport-40", height:40},
        {type: "spc", className:"viewport-30", height:30},
        {type: "spc", className:"viewport-20", height:20},
        {type: "spc", className:"viewport-15", height:15},
        {type: "spc", className:"viewport-10", height:10},
        {type: "spc", className:"viewport-5", height:5},
        {type: "img", className:"img-viewport-20", height:20}
    ]);

    // Actions

    $scope.isPageSelected = function(page)
    {
        return page == Slider.getSelectedPage();
    }
    $scope.isViewSelected = function(view)
    {
        return view == Slider.selectedView;
    }

    $scope.toggleSearch = function()
    {
        $scope.search =! $scope.search;
        UserInterface.hideMenu();
    }

    $scope.scrollTo = function(id)
    {
        Slider.scrollTo(id);
        UserInterface.hideMenu();
    }
    $scope.gotoFeed = function()
    {
        $location.path('/feed');
        if ((!$scope.isPageSelected(1)) && ($scope.isViewSelected('feed'))) $scope.scrollTo(1);
    }
    $scope.gotoProjects = function()
    {
        $location.path('/projects');
        if ((!$scope.isPageSelected(1)) && ($scope.isViewSelected('projects'))) $scope.scrollTo(1);
    }
})

