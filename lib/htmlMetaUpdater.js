var fs = require('fs');
var path = require('path');

var pretty = require('./pretty');
var commandStack = require('./commandStack');


exports.setMeta = function (name, content) {
    _dig('.', name, content);
    commandStack.resume();
};

function _dig(dir, name, content) {
    var files = fs.readdirSync(dir);
    for(var i = 0; i < files.length; i++) {
        var file = files[i];
        var filePath = path.join(dir, file);
        var stat = fs.statSync(filePath);
        if(stat.isDirectory()) {
            _dig(filePath, name, content);
        } else if(stat.isFile()) {
            if(file.match(/\.html?$/)) {
                var data = fs.readFileSync(filePath).toString();
                var re = new RegExp("<meta\\s+name\\s*=\\s*[\"']" + name + "[\"'][^>]*>");
                console.log(re);
                if(data.match(re)) {
                    fs.writeFileSync(filePath, data.replace(re, '<meta name="' + name + '" content="' + content + '">'));
                    pretty.log("    # successfully updated " + filePath, pretty.CYAN);
                } else {
                    pretty.log("    # no build meta found (<meta name='build'>) in " + filePath, pretty.CYAN);
                }
            }
        }
    }
}
