var child_process = require('child_process');
var pretty = require('./pretty');
var commandStack = require('./commandStack');


function _handleCBArgs(err, stdout, stderr, ignoreErrors) {
    if (stderr) {
//        process.stdout.write(stderr);
    }
    if (stdout) {
//        process.stdout.write(stdout);
    }
    if (!ignoreErrors && err) {
        throw err;
    }
}


function _runCommand(command, callback, resume, ignoreErrors) {
    pretty.log(command, pretty.BLUE);
    if (resume === undefined) {
        resume = true;
    }
    child_process.exec(command, function (err, stdout, stderr) {
        _handleCBArgs(err, stdout, stderr, ignoreErrors);
        pretty.log("    # " + command + " # (complete)", pretty.YELLOW);
        if (callback) {
            callback(stdout);
        }
        if (resume) {
            commandStack.resume();
        }
    });
}

exports.fetch = function () {
    _runCommand("git fetch");
};

exports.getLocalGitTags = function () {
    _runCommand("git tag", function (stdout) {
        exports.localTags = stdout.split(/\r\n|\r|\n/);
    });
};

exports.getRemoteGitTags = function () {
    _runCommand("git ls-remote --tags origin", function (stdout) {
        exports.remoteTags = stdout.split(/\r\n|\r|\n/);
    });
};

exports.isUniqueVersion = function (semVer) {
    var str = semVer.toString();
    return (exports.remoteTags.indexOf(str) === -1) && (exports.localTags.indexOf(str) === -1);
};

exports.getBranch = function () {
    _runCommand("git rev-parse --abbrev-ref HEAD", function (stdout) {
        exports.branch = stdout.split(/\r\n|\r|\n/)[0];
        pretty.log("    # current branch: " + exports.branch, pretty.MAGENTA);
    });
};

exports.deleteDuplicateTags = function (semVer) {
    var str = semVer.toString();
    if(exports.localTags.indexOf(str) !== -1) {
        _runCommand("git tag -d " + str, function () {
            _deleteRemoteTag(str);
        }, false);
    } else {
        _deleteRemoteTag(str);
    }
};

function _deleteRemoteTag(str) {
    if(exports.remoteTags.indexOf(str) !== -1) {
        _runCommand("git push --delete origin " + str);
    } else {
        commandStack.resume();
    }
}

exports.commit = function (message) {
    var command = "git commit -am \"" + message + "\" --no-verify";
    _runCommand(command, null, true, true); //ignore errors (--force may cause a "nothing to commit" error)
};

exports.push = function () {
    _runCommand("git push origin head");
};

exports.tag = function () {
    _runCommand("git tag -a " + nextBuild + " -m \"auto incremented\"");
};

exports.pushTags = function () {
    _runCommand("git push origin head --tags");
};

