angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Initialize user interface

  UserInterface.initializeService([
    'home',
    'view',
    'about',
    'contact'
  ],[
    ".s-viewport-100",
    ".s-viewport-90",
    ".s-viewport-60",
    ".s-viewport-40",
    ".s-viewport-30",
    ".s-viewport-10",
    ".s-viewport-3",
    ".i-viewport-20",
  ], function(){
    $scope.$apply();
  });

  // Get current location and scroll if needed

  var location = $location.path().split('/')[1];

  switch (location)
  {
    case 'feed':
    {
      UserInterface.setSelectedView('feed');
      UserInterface.scrollByPageNumber(1);
      $timeout(function(){UserInterface.zoomIn();}, 300);
      break;
    }
    case 'projects':
    {
      UserInterface.setSelectedView('projects');
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
      UserInterface.scrollByPageNumber(3);
      break;
    }
    default:
    {
      UserInterface.zoomOut();
      UserInterface.scrollByPageNumber(0);
      break;
    }
  }

  // Helper actions

  $scope.isPageSelected = function(page){
    return page == UserInterface.getSelectedPage();
  }
  $scope.isViewSelected = function(view){
    return view == UserInterface.getSelectedView();
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
    UserInterface.gotoPage(0);
  }
  $scope.gotoFeed = function()
  {
    UserInterface.hideMenu();
    UserInterface.gotoPage(1, 'feed');
  }
  $scope.gotoProjects = function()
  {
    UserInterface.hideMenu();
    UserInterface.gotoPage(1, 'projects');
  }
  $scope.gotoAbout = function()
  {
    UserInterface.hideMenu();
    UserInterface.gotoPage(2);
  }
  $scope.gotoContact = function()
  {
    UserInterface.hideMenu();
    UserInterface.gotoPage(3);
  }
})
