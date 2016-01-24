angular.module('ViewItemDirective', []).directive('viewItem', function ($compile) {
  return {
    scope: {
      model: '=ngModel',
    },
    restrict: 'E',
    link: function(scope, element){
      var template = '<div class="view-item">\
                        <div class="hover-bg">\
                          <a href="#">\
                            <div class="hover-text">\
                              <h4 ng-bind="model.title"></h4>\
                              <small ng-bind="model.date | Date"></small>\
                              <div class="clearfix"></div>\
                              <i class="fa fa-arrow-right"></i>\
                            </div>\
                            <img ng-src="{{model.thumbnail}}" class="img-responsive" alt="...">\
                          </a>\
                        </div>\
                      </div>';
      var content = $compile(template)(scope);
      element.append(content);
    }
  }
});
