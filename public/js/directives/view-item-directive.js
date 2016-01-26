angular.module('ViewItemDirective', []).directive('viewItem', function ($compile) {
  return {
    scope: {
      model: '=ngModel',
    },
    restrict: 'E',
    link: function(scope, element){
      scope.showIf = function(type){
        return (scope.model.resourceType == type);
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
                            <img ng-src="{{model.thumbnail}}" class="img-responsive full-width" alt="...">\
                            <div style="top: 100%; transform: translateY(-100%); position: absolute; width: 100px;">\
                              <i ng-show="showIf(' + "'Music'" + ')"class="fa fa-music" style="color: #FFF;z-index:0;margin-left: 15px;margin-bottom: 3px;height: 60px;width: 60px;font-size: 50px;padding:0px;border:none;text-shadow: 1px 1px 1px #000;"></i>\
                              <i ng-show="showIf(' + "'Diary'" + ')"class="fa fa-youtube" style="color: #FFF;z-index:0;margin-left: 10px;margin-bottom: 10px;height: 60px;width: 60px;font-size: 60px;padding:0px;border:none;text-shadow: 1px 1px 1px #000;"></i>\
                              <i ng-show="showIf(' + "'Blog'" + ')"class="fa fa-rss" style="color: #FFF;z-index:0;margin-left: 15px;margin-bottom: 5px;height: 60px;width: 60px;font-size: 60px;padding:0px;border:none;text-shadow: 1px 1px 1px #000;"></i>\
                              <i ng-show="showIf(' + "'Podcast'" + ')"class="fa fa-microphone" style="color: #FFF;z-index:0;margin-left: 15px;margin-bottom: 8px;height: 60px;width: 60px;font-size: 60px;padding:0px;border:none;text-shadow: 1px 1px 1px #000;"></i>\
                              <i ng-show="showIf(' + "'Article'" + ')"class="fa fa-newspaper-o" style="color: #FFF;z-index:0;margin-left: 15px;margin-bottom: -3px;height: 60px;width: 60px;font-size: 50px;padding:0px;border:none;text-shadow: 1px 1px 1px #000;"></i>\
                              <i ng-show="showIf(' + "'Game'" + ')"class="fa fa-gamepad" style="color: #FFF;z-index:0;margin-left: 15px;margin-bottom: -3px;height: 60px;width: 60px;font-size: 50px;padding:0px;border:none;text-shadow: 1px 1px 1px #000;"></i>\
                              <i ng-show="showIf(' + "'2D art'" + ')"class="fa fa-paint-brush" style="color: #FFF;z-index:0;margin-left: 15px;margin-bottom: 2px;height: 60px;width: 60px;font-size: 50px;padding:0px;border:none;text-shadow: 1px 1px 1px #000;"></i>\
                              <i ng-show="showIf(' + "'3D art'" + ')"class="fa fa-cube" style="color: #FFF;z-index:0;margin-left: 15px;margin-bottom: 3px;height: 60px;width: 60px;font-size: 50px;padding:0px;border:none;text-shadow: 1px 1px 1px #000;"></i>\
                            </div>\
                          </a>\
                        </div>\
                      </div>';
      var content = $compile(template)(scope);
      element.append(content);
    }
  }
});
