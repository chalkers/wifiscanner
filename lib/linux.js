module.exports = function bindPlatformSpecificMethods(WifiScanner) {

    WifiScanner.prototype.binaryPath = function binaryPath() {
        return this.options.binaryPath || "/sbin/iwlist";
    };

    //TODO implement parsers
    WifiScanner.prototype.parse = function parse(data) {
        return data;
    };

    WifiScanner.prototype.args = function args() {
        return this.options.args || "scan";
    }

};