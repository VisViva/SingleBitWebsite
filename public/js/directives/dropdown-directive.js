angular.module('DropdownDirective', []).directive('dropdown', function ($compile) {
  return {
    scope: {
      options: '=options',
      model: '=ngModel'
    },
    restrict: 'E',
    link: function(scope, element){
      scope.select = function(option)
      {
        scope.model = option;
      }
      var template = '<div class="btn-group full-width">\
                        <button type="button" class="btn btn-warning dropdown-toggle full-width" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                          <span class="pull-left" ng-bind="model"></span><span class="caret pull-right" style="margin-top: 8px;"></span>\
                        </button>\
                        <ul class="dropdown-menu full-width">\
                          <div ng-repeat="option in options">\
                            <li><span class="custom-dropdown-element" ng-click="select(option)" ng-bind="option"></span></li>\
                          </div>\
                        </ul>\
                      </div>';
      var content = $compile(template)(scope);
      element.append(content);
    }
  }
});
