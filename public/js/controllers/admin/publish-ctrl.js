angular.module('PublishCtrl', []).controller('PublishController', function($scope, UserInterface, Resource) {

  // Initialize

  $scope.contentTypes = [
    "Activity",
    "Project"
  ];

  $scope.activityTypes = [
    "Article",
    "Diary",
    "Podcast",
    "Blog"
  ];

  $scope.content = {
    contentType : $scope.contentTypes[0],
    resource : {
      activityType : $scope.activityTypes[0]
    }
  };

  $scope.activeTab = 0;
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

  $scope.save = function()
  {
    Resource.save($scope.resource);
  }
});
