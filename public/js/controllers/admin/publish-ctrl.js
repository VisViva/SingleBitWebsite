angular.module('PublishCtrl', []).controller('PublishController', function($scope, $sce, UserInterface) {

  // Initialize

  $scope.activeTab = 0;
  $scope.options = {
    height: 200,
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
            ['insert', ['link','picture','video','hr']],
            ['view', ['codeview']]
        ]
  };
  $scope.resource = {
    title: "How to design achievements?",
    date: "13 January 2015",
    description: ''
  };
});
