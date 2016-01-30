angular.module('SearchPaneDirective', []).directive('searchPane', ['$compile', '$timeout', function ($compile, $timeout) {
  return {
    scope: {
      model: '=ngModel',
      onSubmit: '&',
      loadSuggestions: '&'
    },
    restrict: 'E',
    link: function(scope, element){

      scope.open = false;
      scope.autocomplete = [];

      scope.searchIfEnter = function(event){
        if (event.keyCode == 13){
          if (scope.autocomplete.length != 0){
            $timeout(function(){
              scope.model = scope.autocomplete[0].text;
              scope.onSubmit({query : scope.autocomplete[0].text});
              document.activeElement.blur();
            });
          }
        };
      };

      scope.searchChanged = function(){
        if (scope.model == '') scope.open = false;
        else $timeout(function(){
          scope.loadSuggestions({query : scope.model}).then(function(results){
            scope.autocomplete = results.data;
            if (scope.autocomplete.length > 0) scope.open = true;
            else scope.open = false;
          });
        });

      }

      scope.applyText = function(index){
        $timeout(function(){
          scope.model = scope.autocomplete[index].text;
          scope.onSubmit({query : scope.model});
        });
      }

      var template = '<div class="btn-group" ng-class="(open == true) ? ' + "'open'" + ' : ' + "''" + '" >\
                        <input ng-model="model" type="text" class="form-control search-pane" placeholder="Search" ng-keyup="searchIfEnter($event)" ng-focus="searchChanged()" ng-change="searchChanged()" ng-blur="open = false;">\
                        <ul class="dropdown-menu search-pane-dropdown">\
                          <div ng-repeat = "tag in autocomplete">\
                            <li><span class="custom-dropdown-element orange-border" ng-mousedown="applyText($index)" ng-bind="tag.text"></span></li>\
                          </div>\
                        </ul>\
                      </div>';
      var content = $compile(template)(scope);
      element.append(content);
    }
  }
}]);
