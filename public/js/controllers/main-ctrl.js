angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Initialize user interface

  UserInterface.initializeService([
    '#home',
    '#view',
    '#about',
    '#contact'
  ],[
    ".s-viewport-100",
    ".s-viewport-90",
    ".s-viewport-60",
    ".s-viewport-40",
    ".s-viewport-30",
    ".s-viewport-10",
    ".s-viewport-3",
    ".i-viewport-20",
  ]);

  // Get current location and scroll if needed

  var location = $location.path().split('/')[1];

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
        if (!$scope.isPageSelected(0)) UserInterface.scrollByPageNumber(0);
      }, 300);
    }
    else{
      $location.path('/home');
      if (!$scope.isPageSelected(0)) UserInterface.scrollByPageNumber(0);
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
      UserInterface.scrollByPageNumber(1);
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
      UserInterface.scrollByPageNumber(1);
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
        if (!$scope.isPageSelected(2)) UserInterface.scrollByPageNumber(2);
      }, 300);
    }
    else {
      $location.path('/about');
      if (!$scope.isPageSelected(2)) UserInterface.scrollByPageNumber(2);
    }
  }
  $scope.gotoContact = function()
  {
    UserInterface.hideMenu();
    if ($scope.isPageSelected(1)) {
      UserInterface.zoomOut();
      $timeout(function () {
        $location.path('/contact');
        if (!(($scope.isPageSelected(3)) || ($scope.isPageSelected(4)))) UserInterface.scrollByPageNumber(4);
      }, 300);
    }
    else {
      $location.path('/contact');
      if (!$scope.isPageSelected(3)) UserInterface.scrollByPageNumber(3);
    }
  }
})
