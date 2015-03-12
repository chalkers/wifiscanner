var exec = require("child_process").exec;

function CoreScanner() {
}

CoreScanner.prototype.scan = function(callback, standardErrorCallback) {
    var scanner = this;
    exec(scanner.command(), function(error, standardOut, standardError){

        if(typeof standardErrorCallback === "function" && standardError) {
            standardErrorCallback(standardError);
        }

        callback(error, scanner.parse(standardOut));
    });

};

CoreScanner.prototype.command = function () {
    return this.binaryPath() + " " + this.args();
};


module.exports = CoreScanner;
