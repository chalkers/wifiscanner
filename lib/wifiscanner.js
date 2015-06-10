/// <reference path="../typings/node/node.d.ts" />
/// <reference path="interfaces/platformscanner.ts" />
var childProcess = require("child_process");
var WifiScanner = (function () {
    function WifiScanner(platformScanner) {
        this.platformScanner = platformScanner;
    }
    WifiScanner.prototype.scan = function (callback, standardErrorCallback) {
        var _this = this;
        childProcess.exec(this.command, function (error, standardOut, standardError) {
            if (typeof standardErrorCallback === "function" && standardError) {
                standardErrorCallback(standardError);
            }
            callback(error, _this.platformScanner.parse(standardOut.toString()));
        });
    };
    ;
    Object.defineProperty(WifiScanner.prototype, "command", {
        get: function () {
            return this.platformScanner.binaryPath + " " + this.platformScanner.args;
        },
        enumerable: true,
        configurable: true
    });
    return WifiScanner;
})();
exports.default = WifiScanner;
