module.exports = function bindPlatformSpecificMethods(WifiScanner) {

    WifiScanner.prototype.binaryPath = function binaryPath() {
        return this.options.binaryPath || "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
    };

    WifiScanner.prototype.parse = function parse(data) {
        return data;
    };

    WifiScanner.prototype.args = function args() {
        return this.options.args || "-s";
    }

};