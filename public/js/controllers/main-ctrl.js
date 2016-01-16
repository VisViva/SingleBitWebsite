angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $timeout, UserInterface, spinnerService) {

  // Initialize user interface

  UserInterface.initializeService([
    'home',
    'view',
    'about',
    'contact'
  ],{
    persistentAbsolute:[
      ".pa-100",
      ".pa-30",
      ".pa-20"
    ],
    persistentImages:[
      ".i-20"
    ],
    desktopAbsolute:[
      ".da-100",
      ".da-90",
      ".da-70",
      ".da-60",
      ".da-65",
      ".da-40",
      ".da-30",
      ".da-10",
      ".da-5"
    ],
    desktopRelative:[
      ".dr-20",
      ".dr-15",
      ".dr-13",
      ".dr-10",
      ".dr-5"
    ],
    mobilePixels:[
      ".mp-150",
      ".mp-100",
      ".mp-50",
      ".mp-30"
    ]}, function(){
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
