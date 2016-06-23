var Config = require('../config/config');
var FileSystem = require('fs');

function Pad(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

module.exports = {
  upload : function (root, req, res) {
    // On windows
    //var path = root + '\\public' + Config.images_relative_url.split('/').join('\\');
    // On linux
    var path = root + '/public' + Config.images_relative_url;

    var file = req.body;
    var extension = '.' + file.contents.substring(11, file.contents.indexOf(';base64'));
    file.contents = file.contents.slice(18 + extension.length);
    var buffer = new Buffer(file.contents, 'base64');
    var now = new Date();
    file.name = [Pad(now.getDate()), Pad(now.getMonth() + 1), now.getFullYear(), Pad(now.getHours()), Pad(now.getMinutes()), Pad(now.getSeconds())].join('') + extension;
    FileSystem.writeFile(path + file.name, buffer, 'base64', function(err) {
      if (err) {
        res.send({ success: false });
        console.log(err);
      } else {
        res.send({ success: true, path: Config.images_relative_url + file.name });
        console.log("File named " + file.name + " has been successfully saved to " + path);
      }
    });
  }
};
