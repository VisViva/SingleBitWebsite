angular.module('DateFilter', []).filter('Date', function (){
  return function(unformatted, includeTime, onlyYear){
    if (unformatted){
      if (onlyYear){
        return moment(unformatted).format("YYYY");
      } else {
        if (includeTime){
          return moment(unformatted).format("DD.MM.YYYY HH.mm");
        } else {
          return moment(unformatted).format("DD.MM.YYYY");
        }
      }
    }
  };
});
