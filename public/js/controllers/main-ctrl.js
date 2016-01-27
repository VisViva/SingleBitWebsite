angular.module('MainCtrl', []).controller('MainController', function($rootScope, $scope, UserInterface) {

  // Initialize user interface

  $scope.$on("$routeChangeError", function(evt,current,previous,rejection){
    switch(rejection){
      case '401':{
        $scope.gotoLocation('admin/authorize');
        break;
      };
      case 'already_authorized':{
        $scope.gotoLocation('admin/dashboard');
        break;
      };
    };
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
      ".da-35",
      ".da-30",
      ".da-20",
      ".da-10",
      ".da-5",
    ]
  });

  $scope.searchText = "";

  // Get current location and scroll if needed

  UserInterface.loadRequestedLocation();

  // Helper actions

  $scope.isViewSelected = function(view){
    return view == UserInterface.getSelectedView();
  };

  // Actions

  $scope.toggleSearch = function(){
    UserInterface.hideMenu();
    $scope.search =! $scope.search;
    if (($scope.search == false) && ($scope.isViewSelected('search'))){
      UserInterface.gotoLocation('home');
    }
  };

  $scope.gotoLocation = function(location){
    UserInterface.hideMenu();
    UserInterface.gotoLocation(location);
  };

  $scope.searchIfEnter = function(event){
    UserInterface.hideMenu();
    if (event.keyCode == 13){
      UserInterface.gotoLocation('search/' + $scope.searchText + '/1');
    };
  };
});
