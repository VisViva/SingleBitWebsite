angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Initialize user interface

  UserInterface.initializeService([
    'home',
    'view',
    'about',
    'contact'
  ],[
    ".m-persistent-100",
    ".m-persistent-30",
    ".m-persistent-20",
    ".s-viewport-100",
    ".s-viewport-90",
    ".s-viewport-70",
    ".s-viewport-65",
    ".s-viewport-60",
    ".s-viewport-40",
    ".s-viewport-30",
    ".s-viewport-10",
    ".s-viewport-3",
    ".p-percentage-15",
    ".p-percentage-30",
    ".p-percentage-20",
    ".p-percentage-10",
    ".p-percentage-2",
    ".p-percentage-13",
    ".p-percentage-60",
    ".p-percentage-66",
    ".i-viewport-20",
    ".e-ender-100",
    ".e-ender-50"
  ], function(){
    $scope.$apply();
  });

  // Get current location and scroll if needed

  var location = $location.path().split('/')[1];

  switch (location)
  {
    case 'feed': case 'projects':
    {
      UserInterface.setSelectedView(location);
      UserInterface.scrollByPageName('view');
      $timeout(function(){UserInterface.zoomIn();}, 300);
      break;
    }
    case 'home': case 'about': case 'contact':
    {
      UserInterface.zoomOut();
      UserInterface.scrollByPageName(location);
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
