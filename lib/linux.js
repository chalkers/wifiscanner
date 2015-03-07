var CoreScanner = require("./core");

function LinuxWifiScanner(options) {
    this.options = options || {};
}

LinuxWifiScanner.prototype = Object.create(CoreScanner.prototype);

LinuxWifiScanner.prototype.binaryPath = function binaryPath() {
    return this.options.binaryPath || "/sbin/iwlist";
};

//TODO implement parsers
LinuxWifiScanner.prototype.parse = function parse(data) {
    //return data;
    return [];
};

LinuxWifiScanner.prototype.args = function args() {
    return this.options.args || "scan";
};

module.exports = LinuxWifiScanner;
