var fs = require('fs');

var pretty = require('./pretty');
var commandStack = require('./commandStack');
var semVer = require('./semVer');
var SemVer = semVer.constructor;


exports.getVersion = function () {
    _load(function() {
        exports.version = new SemVer(exports.package.version);
        pretty.log("    # current version: " + exports.version, pretty.MAGENTA);
        commandStack.resume();
    });
};

function _load(callback) {
    if(exports.package) {
        callback();
    } else {
        fs.readFile('package.json', function (err, data) {
            if(err) {
                throw err;
            }
            exports.package = JSON.parse(data);
            callback();
        });
    }
};

exports.save = function () {
    fs.writeFile('package.json', JSON.stringify(exports.package, null, '  '), function (err) {
        pretty.log("    # successfully updated package.json", pretty.MAGENTA);
        commandStack.resume();
    });
}