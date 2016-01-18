angular.module('PublishCtrl', []).controller('PublishController', function($scope, $sce, UserInterface) {

  // Initialize
  $scope.activeTab = 0;
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
  }

  $scope.resource = {
    title: "How to design achievements?",
    date: "13 January 2015",
    description: ''
  };
});

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(window.jQuery);
  }
}(function ($) {
  $.extend($.summernote.plugins, {
    'soundcloud': function (context) {
      var self = this;
      var ui = $.summernote.ui;
      context.memo('button.soundcloud', function () {
        var button = ui.button({
          contents: '<i class="fa fa-soundcloud"/>',
          tooltip: 'Sound / Music',
          click: context.createInvokeHandler('soundcloudDialog.show')
        });
        var $soundcloud = button.render();
        return $soundcloud;
      });
    },
  });
}));

var soundcloudDialog = function (context) {};
