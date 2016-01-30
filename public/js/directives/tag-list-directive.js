angular.module('TagListDirective', []).directive('tagList', ['$compile', function ($compile){
  return {
    scope: {
      model: '=ngModel',
      onClick: '&'
    },
    restrict: 'E',
    link: function(scope, element){
      scope.clicked = function(index){
        scope.onClick({query : scope.model[index].text});
      };
      var template = '<div class="text-center center">\
                        <div class="custom-link view-tag" ng-repeat="tag in model" ng-click="clicked($index)">\
                          <i class="fa fa-tag" style="font-size:11px"></i><span class="custom-link" style="font-size:12px" ng-bind="' + "' '" + '+ tag.text"></span>\
                        </div>\
                      </div>';
      var content = $compile(template)(scope);
      element.append(content);
    }
  }
}]);
