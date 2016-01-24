angular.module('PublishCtrl', []).controller('PublishController', function($scope, $timeout, $routeParams, UserInterface, Resource, Authorization){

  // Initialize

  UserInterface.fillNavbar();

  $scope.contentTypes = [
    "Activity",
    "Project"
  ];

  $scope.resourceTypes = [
    "Article",
    "Diary",
    "Podcast",
    "Blog"
  ];

  $scope.resource = {
    contentType : $scope.contentTypes[0],
    resourceType : $scope.resourceTypes[0]
  };

  $scope.summernote = {
    options : {
      height: 100,
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

  // Get resource for editing

  if ($routeParams.id != undefined)
  {
    Resource.get($routeParams.id).then(function(data){
      $scope.resource = data.data.data;
    });
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
            "Diary",
            "Podcast",
            "Blog"
          ];
          break;
        }
        case 'Project':
        {
          $scope.resourceTypes = [
            "Game",
            "2D art",
            "3D art",
            "Music"
          ];
          break;
        }
      }
      $scope.resource.resourceType = $scope.resourceTypes[0];
    });
  };

  $scope.loadTagSuggestions = function(query){
    return Resource.loadTagSuggestions(query);
  };

  $scope.save = function(){
    Resource.save($scope.resource).then(function(){
      alert('Resource has been saved successfully!');
    },function(){
      alert("Resource has not been saved, something went wrong!");
    });
  };

  $scope.goBack = function(){
    UserInterface.gotoLocation('admin/dashboard');
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
});
