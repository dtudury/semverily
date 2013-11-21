var MAJOR = exports.MAJOR = "major";
var MINOR = exports.MINOR = "minor";
var PATCH = exports.PATCH = "patch";
var PRERELEASE = exports.PRERELEASE = "prerelease";
var BUILD = exports.BUILD = "build";

function SemVer(str) {
    var self = this;
    self.version = [];
    self.prerelease = "";
    self.build = "";
    self.valid;


    self.clone = function () {
        return new SemVer(self.toString());
    }


    self.toString = function () {
        var version = self.versionString();
        if (self.prerelease) {
            version += "-" + self.prerelease;
        }
        if (self.build) {
            version += "+" + self.build;
        }
        return version;
    };


    self.versionString = function () {
        return self.version.join(".");
    };


    self.bump = function (part) {
        self.version[0] = self.version[0] || 0;
        self.version[1] = self.version[1] || 0;
        self.version[2] = self.version[2] || 0;
        switch (part) {
            case MAJOR:
                self.version[0]++;
                self.version[1] = 0;
                self.version[2] = 0;
                self.prerelease = "";
                self.build = "";
                break;
            case MINOR:
                self.version[1]++;
                self.version[2] = 0;
                self.prerelease = "";
                self.build = "";
                break;
            case PATCH:
                self.version[2]++;
                self.prerelease = "";
                self.build = "";
                break;
            case PRERELEASE:
                switch (self.prerelease.toUpperCase()) {
                    case "DEV":
                        self.prerelease = "prealpha";
                        break;
                    case "PREALPHA":
                        self.prerelease = "alpha";
                        break;
                    case "ALPHA":
                        self.prerelease = "beta";
                        break;
                    case "BETA":
                        self.prerelease = "rc1";
                        break;
                    default:
                        var prMatch;
                        if (prMatch = self.prerelease.match(/^(.*[^\d]+)(\d+)$/)) {
                            self.prerelease = prMatch[1] + (parseInt(prMatch[2]) + 1);
                        } else {
                            self.prerelease = "dev";
                        }
                }
                break;
            case BUILD:
            default:
                var bMatch;
                if (bMatch = self.build.match(/^(.*-)(\d+)$/)) {
                    self.build = bMatch[1] + (parseInt(bMatch[2]) + 1)
                } else if (self.build) {
                    self.build += "-1";
                } else {
                    self.build = "build";
                }
                break;
        }
        self.valid = true;
    };


    self.parse = function (str) {
        var match = str.match(/^(\d+)\.(\d+)\.(\d+)([-+].*)?/);
        if (match) {
            self.version = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
            var meta = match[4];
            if (meta) {
                var preMatch = meta.match(/-([^+]+)/);
                if (preMatch) {
                    self.prerelease = preMatch[1];
                }
                var buildMatch = meta.match(/\+(.+)/);
                if (buildMatch) {
                    self.build = buildMatch[1];
                }
            }
            self.valid = true;
        }
    };

    if (str !== undefined) {
        self.parse(str);
    }
}

exports.constructor = SemVer;

