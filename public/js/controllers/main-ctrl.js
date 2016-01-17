angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Initialize user interface

  $scope.$on('$viewContentLoaded', function(){
    UserInterface.contentLoaded();
  });

  UserInterface.initializeService([
    'home',
    'view'
  ],{
    desktopAbsolute:[
      ".da-100",
      ".da-90",
      ".da-30",
      ".da-20",
      ".da-10",
      ".da-5",
    ]
  });

  // Get current location and scroll if needed

  UserInterface.loadRequestedLocation();

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
    UserInterface.contentLoaded();
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
    UserInterface.gotoPage(1, 'about');
  }
  $scope.gotoContact = function()
  {
    UserInterface.hideMenu();
    UserInterface.gotoPage(1, 'contact');
  }
})
