var exec = require("child_process").exec;

function CoreScanner() {
}

CoreScanner.prototype.scan = function(callback) {
    var scanner = this;
    exec(scanner.command(), function(error, standardOut, standardError){

        if(error || standardError) {
            callback(error || standardError, null);
        }

        callback(null, scanner.parse(standardOut));
    });

};

CoreScanner.prototype.command = function () {
    return this.binaryPath() + " " + this.args();
};


module.exports = CoreScanner;
