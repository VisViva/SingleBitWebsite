angular.module('PublishCtrl', []).controller('PublishController', function($scope, $timeout, UserInterface, Resource, Authorization){

  // Initialize

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

  $scope.back = function(){

  };
});
