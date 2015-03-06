var exec = require("child_process").exec;

function WifiScanner(options) {
    this.options = options || {};
}

require("./" + process.platform)(WifiScanner);

WifiScanner.prototype.scan = function(callback) {

    var scanner = this;

    exec(scanner.command(), function(error, standardOut, standardError){

        if(error || standardError) {
            callback(error || standardError, null);
        } else {
            callback(null, scanner.parse(standardOut));
        }

    });

};

WifiScanner.prototype.command = function () {
    return this.binaryPath() + " " + this.args();
};

module.exports = WifiScanner;