angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Initialize user interface

  UserInterface.initializeService([
    '#home',
    '#view',
    '#about',
    '#contact',
    '#footer'
  ], function()
  {
    $scope.$apply();
  },[
    {type: "spc", className:"viewport-100", height:100},
    {type: "spc", className:"viewport-90", height:90},
    {type: "spc", className:"viewport-60", height:60},
    {type: "spc", className:"viewport-40", height:40},
    {type: "spc", className:"viewport-30", height:30},
    {type: "spc", className:"viewport-10", height:10},
    {type: "spc", className:"viewport-3", height:3},
    {type: "img", className:"img-viewport-20", height:20}
  ]);

  // Get current location and scroll if needed

  var location = $location.path().split('?')[0].split('/')[1];

  switch (location)
  {
    case 'feed':
    {
      UserInterface.selectedView = 'feed';
      UserInterface.scrollByPageNumber(1);
      $timeout(function(){UserInterface.zoomIn();}, 300);
      break;
    }
    case 'projects':
    {
      UserInterface.selectedView = 'projects';
      UserInterface.scrollByPageNumber(1);
      $timeout(function(){UserInterface.zoomIn();}, 300);
      break;
    }
    case 'about':
    {
      UserInterface.zoomOut();
      UserInterface.scrollByPageNumber(2);
      break;
    }
    case 'contact':
    {
      UserInterface.zoomOut();
      UserInterface.scrollByPageNumber(4);
      break;
    }
    default: // Home
    {
      UserInterface.zoomOut();
      UserInterface.scrollByPageNumber(0);
      break;
    }
  }

  // Helper actions

  $scope.isPageSelected = function(page)
  {
    return page == UserInterface.getSelectedPage();
  }
  $scope.isViewSelected = function(view)
  {
    return view == UserInterface.selectedView;
  }
  $scope.scrollByPageNumber = function(pageNumber)
  {
    UserInterface.scrollByPageNumber(pageNumber);
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
      if (UserInterface.selectedView != 'feed')
      {
        UserInterface.zoomOut();
        $timeout(function()
        {
          spinnerService.show('viewSpinner');
          $location.path('/feed');
          UserInterface.selectedView = 'feed';
          UserInterface.zoomIn(); // Try zooming in until zoomed in
        }, 300);
      }
    }
    else
    {
      spinnerService.show('viewSpinner');
      $location.path('/feed');
      UserInterface.selectedView = 'feed';
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
      if (UserInterface.selectedView != 'projects')
      {
        UserInterface.zoomOut();
        $timeout(function ()
        {
          spinnerService.show('viewSpinner');
          $location.path('/projects');
          UserInterface.selectedView = 'projects';
          UserInterface.zoomIn(); // Try zooming in until zoomed in
        }, 300);
      }
    }
    else
    {
      spinnerService.show('viewSpinner');
      $location.path('/projects');
      UserInterface.selectedView = 'projects';
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
