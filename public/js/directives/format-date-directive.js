angular.module('FormatDateDirective', []).directive('formatDate', function (){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModel){
      function toUser(text){
        if (text == null) return text;
        else return moment(text).format(attr['formatDate']);
      }
      ngModel.$formatters.push(toUser);
      ngModel.$parsers.push(function (text){
        var m = moment(text, attr['formatDate']);
        if (m.isValid()){
          return m.toDate();
        } else {
          return undefined;
        }
      });
    }
  };
});
