angular.module('MainCtrl', []).controller('MainController', function($scope, $timeout, $location, PageNavigation, UserInterface, spinnerService) {

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
            UserInterface.zoomOut();
            PageNavigation.scrollByPageNumber(0);
            break;
        }
        case '/feed':
        {
            PageNavigation.selectedView = 'feed';
            PageNavigation.scrollByPageNumber(1);
            $timeout(function(){UserInterface.zoomIn();}, 300);
            break;
        }
        case '/projects':
        {
            PageNavigation.selectedView = 'projects';
            PageNavigation.scrollByPageNumber(1);
            $timeout(function(){UserInterface.zoomIn();}, 300);
            break;
        }
        case '/about':
        {
            UserInterface.zoomOut();
            PageNavigation.scrollByPageNumber(2);
            break;
        }
        case '/contact':
        {
            UserInterface.zoomOut();
            PageNavigation.scrollByPageNumber(4);
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
    }

    // Actions

    $scope.toggleSearch = function()
    {
        $scope.search =! $scope.search;
        UserInterface.hideMenu();
    }
    $scope.gotoHome = function()
    {
        UserInterface.hideMenu();
        if ($scope.isPageSelected(1)) {
            UserInterface.zoomOut();
            $timeout(function () {
                $location.path('/home');
                if (!$scope.isPageSelected(0)) $scope.scrollByPageNumber(0);
            }, 300);
        }
        else{
            $location.path('/home');
            if (!$scope.isPageSelected(0)) $scope.scrollByPageNumber(0);
        }
    }
    $scope.gotoFeed = function()
    {
        UserInterface.hideMenu();
        if ($scope.isPageSelected(1))
        {
            if (PageNavigation.selectedView != 'feed')
            {
                UserInterface.zoomOut();
                $timeout(function()
                {
                    spinnerService.show('viewSpinner');
                    $location.path('/feed');
                    PageNavigation.selectedView = 'feed';
                    UserInterface.zoomIn(); // Try zooming in until zoomed in
                }, 300);
            }
        }
        else
        {
            spinnerService.show('viewSpinner');
            $location.path('/feed');
            PageNavigation.selectedView = 'feed';
            $scope.scrollByPageNumber(1);
            $timeout(function(){
                UserInterface.zoomIn(); // Try zooming in until zoomed in
            }, 400);
        }
    }
    $scope.gotoProjects = function()
    {
        UserInterface.hideMenu();
        if ($scope.isPageSelected(1))
        {
            if (PageNavigation.selectedView != 'projects')
            {
                UserInterface.zoomOut();
                $timeout(function ()
                {
                    spinnerService.show('viewSpinner');
                    $location.path('/projects');
                    PageNavigation.selectedView = 'projects';
                    UserInterface.zoomIn(); // Try zooming in until zoomed in
                }, 300);
            }
        }
        else
        {
            spinnerService.show('viewSpinner');
            $location.path('/projects');
            PageNavigation.selectedView = 'projects';
            $scope.scrollByPageNumber(1);
            $timeout(function () {
                UserInterface.zoomIn(); // Try zooming in until zoomed in
            }, 400);
        }
    }
    $scope.gotoAbout = function()
    {
        UserInterface.hideMenu();
        if ($scope.isPageSelected(1)) {
            UserInterface.zoomOut();
            $timeout(function(){
                $location.path('/about');
                if (!$scope.isPageSelected(2)) $scope.scrollByPageNumber(2);
            }, 300);
        }
        else {
            $location.path('/about');
            if (!$scope.isPageSelected(2)) $scope.scrollByPageNumber(2);
        }
    }
    $scope.gotoContact = function()
    {
        UserInterface.hideMenu();
        if ($scope.isPageSelected(1)) {
            UserInterface.zoomOut();
            $timeout(function () {
                $location.path('/contact');
                if (!(($scope.isPageSelected(3)) || ($scope.isPageSelected(4)))) $scope.scrollByPageNumber(4);
            }, 300);
        }
        else {
            $location.path('/contact');
            if (!$scope.isPageSelected(3)) $scope.scrollByPageNumber(3);
        }
    }
})

