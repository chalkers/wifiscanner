var exec = require("child_process").exec;
var specificPlatformImplementations = require("./" + process.platform);

function WifiScanner(options) {
    this.options = options || {};
}

for(var method in specificPlatformImplementations) {
    WifiScanner.prototype[method] = specificPlatformImplementations[method];
}

WifiScanner.prototype.scan = function(callback) {
    exec(this.command(), function(error, standardOut, standardError){
        if(error) {
            callback(error, null);
        } else if(standardOut) {
            callback(null, standardOut);
        } else {
            callback(standardError, null);
        }
    });

};

WifiScanner.prototype.command = function () {
    return this.binaryPath() + " " + this.args();
};

module.exports = WifiScanner;