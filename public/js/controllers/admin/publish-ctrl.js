angular.module('PublishCtrl', []).controller('PublishController', ['$scope', '$timeout', '$routeParams', 'UserInterface', 'Resource', function($scope, $timeout, $routeParams, UserInterface, Resource){

  // Initialize

  UserInterface.fillNavbar();

  $scope.contentTypes = [
    "Activity",
    "Project"
  ];

  $scope.resourceTypes = [
    "Article",
    "Tutorial",
    "Podcast",
    "Blog"
  ];

  $scope.resource = {
    contentType : $scope.contentTypes[0],
    resourceType : $scope.resourceTypes[0],
    date : Date.now()
  };

  $scope.summernote = {
    options : {
      height: 800,
      dialogsInBody: true,
      dialogsFade: true,
      toolbar: [
        ['edit',['undo','redo']],
        ['headline', ['style']],
        ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
        ['fontface', ['fontname']],
        ['textsize', ['fontsize']],
        ['fontclr', ['color']],
        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link','picture','soundcloud','video','hr']],
        ['view', ['codeview']]
      ]
    }
  };

  // Helper methods

  $scope.getNextNumber = function(){
    Resource.next($scope.resource.resourceType).then(function(data){
      $scope.resource.number = data.data.data;
    });
  };

  // Get resource for editing

  if ($routeParams.id != undefined)
  {
    $scope.loading = true;
    Resource.get($routeParams.id).then(function(data){
      $scope.loading = false;
      $scope.resource = data.data.data;
    });
  } else {
    $scope.getNextNumber();
  }

  // Actions

  $scope.contentTypeChanged =  function(){
    $timeout(function(){
      switch($scope.resource.contentType)
      {
        case 'Activity':
        {
          $scope.resourceTypes = [
            "Article",
            "Tutorial",
            "Podcast",
            "Blog"
          ];
          break;
        }
        case 'Project':
        {
          $scope.resourceTypes = [
            "Software",
            "Game",
            "2D art",
            "3D art",
            "Music"
          ];
          break;
        }
      }
      $scope.resource.resourceType = $scope.resourceTypes[0];
      $scope.getNextNumber();
    });
  };

  $scope.resourceTypeChanged =  function(){
    $timeout(function(){
      $scope.getNextNumber();
    });
  };

  $scope.loadTagSuggestions = function(query){
    return Resource.loadTagSuggestions(query);
  };

  $scope.save = function(){
    Resource.save($scope.resource).then(function(){
      UserInterface.gotoLocation('admin/resources');
    },function(){
      alert("Resource has not been saved, something went wrong!");
    });
  };

  $scope.goBack = function(){
    UserInterface.gotoLocation('admin/resources');
  };

  $scope.performClick = function(id){
    var elem = document.getElementById(id);
    if(elem && document.createEvent) {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);
    }
  }

  $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
    $timeout(function(){
      $scope.resource.thumbnail = 'data:' + $scope.thumbnail.filetype + ';base64,' + $scope.thumbnail.base64;
    });
  };
}]);
