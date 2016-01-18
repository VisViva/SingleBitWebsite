angular.module('ViewCtrl', []).controller('ViewController', function($scope, $routeParams, $sce, UserInterface) {

  // Get activity

  $scope.resource = {
    id: $routeParams.id,
    title: "How to design achievements?",
    date: "13 January 2015",
    description: '<h2 style="text-align: center;"><b>lorem ipsum</b></h2><h3 style="text-align: center;"><span>Lorem Ipsum</span></h3><div style="text-align: center;"><span><br></span></div><div style="text-align: center;"><span></span></div><p style="text-align: center;">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure<br><br><iframe width="100%" height="150" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240233680&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=true"></iframe>Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections<b>sad</b>1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p><p style="text-align: center;"><br></p><div style="text-align: center;"><br><iframe width="100%" height="500px" src="https://www.youtube.com/embed/lllGkKX6WXc" frameborder="0" allowfullscreen></iframe><br></div><div style="text-align: center;"><br></div><p style="text-align: center;">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p><p style="text-align: center;"><br></p><p style="text-align: center;">Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br></p><p style="text-align: center;"><br></p><p style="text-align: center;"><a href="https://soundcloud.com/stream" target="">https://soundcloud.com/stream</a><br></p><div style="text-align: center;"><br></div><div style="text-align: center;"><br></div><div style="text-align: center;"><span><br></span></div>'
  };
  $scope.resource.description = $sce.trustAsHtml($scope.resource.description);

  // Actions

  $scope.goBack = function(){
    UserInterface.gotoLocation(UserInterface.getSelectedView());
  };
});
