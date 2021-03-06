angular.module('ViewItemDirective', []).directive('viewItem', ['$compile', function ($compile) {
  return {
    scope: {
      model: '=ngModel',
      placeholder: '@placeholder'
    },
    restrict: 'E',
    link: function(scope, element){
      scope.showIf = function(type){
        return (scope.model.resourceType == type);
      }
      scope.showThumbnailIfExists = function(){
        return (angular.isUndefined(scope.model.thumbnail) || (scope.model.thumbnail == null)) ? false : ((scope.model.thumbnail.length == 0) ? false : true);
      }
      var template = '<div class="view-item">\
                        <div class="hover-bg">\
                          <a href="#">\
                            <div class="hover-text">\
                              <h4 ng-bind="model.title"></h4>\
                              <small ng-bind="model.date | Date"></small>\
                              <div class="clearfix"></div>\
                              <div ng-bind="' + "'#'" + ' + model.number" class="view-item-number"></div>\
                                <i ng-show="showIf(' + "'Software'" + ')"class="fa fa-code"></i>\
                                <i ng-show="showIf(' + "'Music'" + ')"class="fa fa-music"></i>\
                                <i ng-show="showIf(' + "'Tutorial'" + ')"class="fa fa-youtube"></i>\
                                <i ng-show="showIf(' + "'Blog'" + ')"class="fa fa-rss"></i>\
                                <i ng-show="showIf(' + "'Podcast'" + ')"class="fa fa-microphone"></i>\
                                <i ng-show="showIf(' + "'Article'" + ')"class="fa fa-newspaper-o"></i>\
                                <i ng-show="showIf(' + "'Game'" + ')"class="fa fa-gamepad"></i>\
                                <i ng-show="showIf(' + "'2D art'" + ')"class="fa fa-paint-brush"></i>\
                                <i ng-show="showIf(' + "'3D art'" + ')"class="fa fa-cube"></i>\
                            </div>\
                            <div class="view-item-image-container">\
                              <div ng-show="showThumbnailIfExists();">\
                                <div class="view-item-background"></div>\
                                <img ng-src="{{model.thumbnail}}" class="img-responsive full-width view-item-thumbnail">\
                              </div>\
                              <div ng-hide="showThumbnailIfExists();">\
                                <div class="view-item-background"></div>\
                                <img ng-src="{{placeholder}}" class="img-responsive full-width view-item-thumbnail">\
                              </div>\
                            </div>\
                          </a>\
                        </div>\
                      </div>';
      var content = $compile(template)(scope);
      element.append(content);
    }
  }
}]);
