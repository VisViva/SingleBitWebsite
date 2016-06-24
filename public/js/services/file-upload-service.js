angular.module('FileUploadService', []).factory('FileUpload', function() {

  // Initialize

  var initialize = function(id, folder, onload){

    // Get element

    var file_input = document.getElementById(id);

    // Add event handlers

    file_input.addEventListener("change", function (event) {

      // Get file

      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var contents = event.target.result;
          var request = new XMLHttpRequest();
          request.open('POST', '/api/file/upload');
          request.setRequestHeader('Content-Type', 'application/json');
          request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
              var data = JSON.parse(request.responseText);
              if (data.success == true){
                onload(data);
              } else {
                console.log("Error: Failed to upload the file!");
              }
            }
          }
          request.send(JSON.stringify({contents: contents, folder: folder}));
          file_input.value ='';
        }
        reader.readAsDataURL(file);
      } else {
        console.log("Error: Failed to load the file!");
      }
    })
  }

  return {
    initialize : initialize
  }
});
