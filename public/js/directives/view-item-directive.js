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
                              <i class="fa fa-arrow-right"></i>\
                            </div>\
                            <div ng-show="showThumbnailIfExists();" style="position:relative;padding-bottom:76%;border-radius: 7px;">\
                              <div class="view-item-background" style="position:absolute;z-index:100;padding-bottom:76%;width:100%;"></div>\
                              <img ng-src="{{model.thumbnail}}" style="position:absolute;z-index:200;border-radius: 7px;" class="img-responsive full-width">\
                            </div>\
                            <div ng-hide="showThumbnailIfExists();" style="position:relative;padding-bottom:76%;">\
                              <div class="view-item-background" style="position:absolute;z-index:100;padding-bottom:76%;width:100%;"></div>\
                              <img ng-src="{{placeholder}}" style="position:absolute;z-index:200;border-radius: 7px;" class="img-responsive full-width">\
                            </div>\
                            <div class="view-item-icon-container">\
                              <span ng-show="showIf(' + "'Software'" + ')"class="fa fa-code software-fix"></span>\
                              <span ng-show="showIf(' + "'Music'" + ')"class="fa fa-music music-fix"></span>\
                              <span ng-show="showIf(' + "'Tutorial'" + ')"class="fa fa-youtube tutorial-fix"></span>\
                              <span ng-show="showIf(' + "'Blog'" + ')"class="fa fa-rss blog-fix"></span>\
                              <span ng-show="showIf(' + "'Podcast'" + ')"class="fa fa-microphone podcast-fix"></span>\
                              <span ng-show="showIf(' + "'Article'" + ')"class="fa fa-newspaper-o article-fix"></span>\
                              <span ng-show="showIf(' + "'Game'" + ')"class="fa fa-gamepad game-fix"></span>\
                              <span ng-show="showIf(' + "'2D art'" + ')"class="fa fa-paint-brush brush-fix"></span>\
                              <span ng-show="showIf(' + "'3D art'" + ')"class="fa fa-cube cube-fix"></span>\
                            </div>\
                            <div ng-bind="' + "'#'" + ' + model.number" class="view-item-number">\
                            </div>\
                          </a>\
                        </div>\
                      </div>';
      var content = $compile(template)(scope);
      element.append(content);
    }
  }
}]);
