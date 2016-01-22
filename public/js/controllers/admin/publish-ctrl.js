angular.module('PublishCtrl', []).controller('PublishController', function($scope, UserInterface, Resource) {

  // Initialize

  $scope.contentTypes = [
    "Activity",
    "Project"
  ];

  $scope.types = [
    "Article",
    "Diary",
    "Podcast",
    "Blog"
  ];

  $scope.tags = [
    { id: 'dafadgasg43grf', text: 'just' },
    { id: 'dsadjfasg44grf', text: 'some' },
    { id: 'dsafasdsg443gf', text: 'cool' },
    { id: 'dsafdfg54t5grf', text: 'tags' }
  ];

  $scope.content = {
    contentType : $scope.contentTypes[0],
    resource : {
      type : $scope.types[0]
    }
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
  }

  // Actions

  $scope.contentTypeChanged =  function()
  {
    switch($scope.content.contentType)
    {
      case 'Activity':
      {
        $scope.types = [
          "Article",
          "Diary",
          "Podcast",
          "Blog"
        ];
        break;
      }
      case 'Project':
      {
        $scope.types = [
          "Game",
          "2D art",
          "3D art",
          "Music"
        ];
        break;
      }
    }
    $scope.content.resource.type = $scope.types[0]
  }

  $scope.save = function()
  {
    Resource.save($scope.resource);
  }
});
