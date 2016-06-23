var FileSystem = require('fs');

function Pad(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

module.exports = {
  upload : function (root, req, res) {
    var url = '/files/images/';
    var path = root + '\\public\\files\\images\\';
    var file = req.body;
    var matches = file.contents.match(/^data:.+\/(.+);base64,(.*)$/);
    var extension = '.' + matches[1];
    var base64_data = matches[2];
    var buffer = new Buffer(base64_data, 'base64');
    var now = new Date();
    file.name = [Pad(now.getDate()), Pad(now.getMonth() + 1), now.getFullYear(), Pad(now.getHours()), Pad(now.getMinutes()), Pad(now.getSeconds())].join('') + extension;

    FileSystem.writeFile(path + file.name, buffer, 'base64', function(err) {
      if (err) {
        res.send({ success: false });
        console.log(err);
      } else {
        res.send({ success: true, path: url + file.name });
        console.log("File named " + file.name + " has been successfully saved to " + path);
      }
    });
  }
};
