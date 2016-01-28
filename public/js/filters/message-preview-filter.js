angular.module('MessagePreviewFilter', []).filter('MessagePreview', function (){
  return function(input, length){
    var output = input;
    if (output.length > length){
      output = output.substring(0, length) + '...';
    }
    return output;
  };
});
