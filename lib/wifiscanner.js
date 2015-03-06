var platformScan = require("./" + process.platform);

function WifiScanner(options) {
    this.options = options || {};
}

WifiScanner.prototype.platformScan = platformScan;

WifiScanner.prototype.scan = function() {
    this.platformScan(this.options);
};

module.exports = WifiScanner;