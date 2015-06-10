/// <reference path="../typings/node/node.d.ts" />
var wifiscanner_1 = require("./wifiscanner");
var darwinscanner_1 = require("./darwinscanner");
var linuxscanner_1 = require("./linuxscanner");
function platform(options) {
    var platform;
    if (options && options.platform) {
        platform = options.platform;
        delete options.platform;
    }
    return platform || process.platform;
}
module.exports = function wifiscanner(options) {
    var platformScanner;
    switch (platform(options)) {
        case "linux":
            platformScanner = linuxscanner_1.default;
            break;
        case "darwin":
            platformScanner = darwinscanner_1.default;
            break;
        case "windows":
            //TODO implement this
            break;
    }
    var scanner = new platformScanner(options);
    return new wifiscanner_1.default(scanner);
};
