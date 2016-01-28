angular.module('ContactCtrl', []).controller('ContactController', function($scope, UserInterface, Message) {

  // Initialize

  UserInterface.fillNavbar();
  $scope.message = {
    email : "",
    text : ""
  }

  // Actions

  $scope.send = function(){
    if (($scope.message.email != "") && ($scope.message.text != ""))
    {
      Message.save($scope.message).then(function(data){
        if (data.data.success == true){
          UserInterface.gotoLocation('home');
        }
      });
    };
  }
});
