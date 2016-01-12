angular.module('MainCtrl', []).controller('MainController', function($scope, $location, PageNavigation, UserInterface) {

    // Initialize slider

    PageNavigation.initializeService([
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

    UserInterface.initializeService([
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

    // Get current location and scroll if needed

    switch ($location.path())
    {
        case '/home':
        {
            PageNavigation.scrollByPageNumber(0);
            break;
        }
        case '/about':
        {
            PageNavigation.scrollByPageNumber(2);
            break;
        }
        case '/contact':
        {
            PageNavigation.scrollByPageNumber(4);
            break;
        }
        case '/feed':
        {
            PageNavigation.selectedView = 'feed';
            PageNavigation.scrollByPageNumber(1);
            break;
        }
        case '/projects':
        {
            PageNavigation.selectedView = 'projects';
            PageNavigation.scrollByPageNumber(1);
            break;
        }
    }

    // Helper actions

    $scope.isPageSelected = function(page)
    {
        return page == PageNavigation.getSelectedPage();
    }
    $scope.isViewSelected = function(view)
    {
        return view == PageNavigation.selectedView;
    }
    $scope.scrollByPageNumber = function(pageNumber)
    {
        PageNavigation.scrollByPageNumber(pageNumber);
        UserInterface.hideMenu();
    }

    // Actions

    $scope.toggleSearch = function()
    {
        $scope.search =! $scope.search;
        UserInterface.hideMenu();
    }
    $scope.gotoHome = function()
    {
        $location.path('/home');
        if (!$scope.isPageSelected(0)) $scope.scrollByPageNumber(0);
    }
    $scope.gotoFeed = function()
    {
        $location.path('/feed');
        PageNavigation.selectedView = 'feed';
        $scope.scrollByPageNumber(1);
    }
    $scope.gotoProjects = function()
    {
        $location.path('/projects');
        PageNavigation.selectedView = 'projects';
        $scope.scrollByPageNumber(1);
    }
    $scope.gotoAbout = function()
    {
        $location.path('/about');
        if (!$scope.isPageSelected(2)) $scope.scrollByPageNumber(2);
    }
    $scope.gotoContact = function()
    {
        $location.path('/contact');
        if (!(($scope.isPageSelected(3)) || ($scope.isPageSelected(4)))) $scope.scrollByPageNumber(4);
    }
})

