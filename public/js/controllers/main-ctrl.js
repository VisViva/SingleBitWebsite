angular.module('MainCtrl', []).controller('MainController', function($rootScope, $scope, UserInterface) {

  // Initialize user interface

  $scope.$on("$routeChangeError", function(evt,current,previous,rejection){
    switch(rejection){
      case '401':{
        $scope.gotoLocation('admin/authorize');
        break;
      }
      case 'already_authorized':{
        $scope.gotoLocation('admin/dashboard');
        break;
      }
    }
  });

  $scope.$on('$viewContentLoaded', function(){
    UserInterface.contentLoaded();
  });

  UserInterface.initializeService({
    desktopAbsolute:[
      ".da-100",
      ".da-90",
      ".da-60",
      ".da-45",
      ".da-30",
      ".da-20",
      ".da-10",
      ".da-5",
    ]
  });

  // Get current location and scroll if needed

  UserInterface.loadRequestedLocation();

  // Helper actions

  $scope.isViewSelected = function(view){
    return view == UserInterface.getSelectedView();
  }

  // Actions

  $scope.toggleSearch = function()
  {
    $scope.search =! $scope.search;
    UserInterface.hideMenu();
    $http.post('/activity', { title:"Test title", description:"Test description"}, null);
  }
  $scope.gotoLocation = function(location)
  {
    UserInterface.hideMenu();
    UserInterface.gotoLocation(location);
  }
})
