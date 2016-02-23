angular.module('PluralFilter', []).filter('Plural', function (){
  return function(input){
    var output = input;
    if (output[output.length - 1] == 'y'){
      output = output.substring(0, output.length - 1) + 'ies';
    } else {
      if (input == 'blog')
      {
        output += 'blog entries';
      }
      else {
        output += 's';
      }      
    }

    return output;
  };
});
