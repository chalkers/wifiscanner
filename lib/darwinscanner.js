/// <reference path="./interfaces/platformscanner" />
var DarwinWifiScanner = (function () {
    function DarwinWifiScanner(options) {
        this.options = options;
    }
    Object.defineProperty(DarwinWifiScanner.prototype, "binaryPath", {
        get: function () {
            return this.options.binaryPath || "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
        },
        enumerable: true,
        configurable: true
    });
    ;
    DarwinWifiScanner.prototype.parse = function (data) {
        var lines = data.split("\n");
        var headers = lines.shift();
        var indexOfMacAddress = headers.indexOf("BSSID");
        var networks = lines.filter(filterBlanks).map(function (line) {
            return parseLine(line, indexOfMacAddress);
        });
        return networks;
    };
    ;
    Object.defineProperty(DarwinWifiScanner.prototype, "args", {
        get: function () {
            return this.options.args || "-s";
        },
        enumerable: true,
        configurable: true
    });
    ;
    return DarwinWifiScanner;
})();
exports.default = DarwinWifiScanner;
function cleanSecurity(security) {
    if (security.toLowerCase() === "none") {
        return "None";
    }
    else {
        return security.split("(")[0];
    }
}
function filterBlanks(line) {
    return line.replace(/\s+/g, "").length !== 0;
}
function parseLine(line, indexOfMacAddress) {
    var ssid = line.substr(0, indexOfMacAddress).trim();
    line = line.substr(indexOfMacAddress, line.length - indexOfMacAddress);
    var components = line.replace(/\s{1,}/g, " ").trim().split(" ");
    //[0] SSID
    //[1] MAC
    //[2] RSSI
    //[3] CHANNEL
    //[4] HT
    //[5] CC
    //[6..x] SECURITY (auth/unicast/group)
    var network = {
        ssid: ssid,
        mac: components[0].toLowerCase(),
        channel: components[2],
        security: components.splice(5).map(cleanSecurity).sort()
    };
    return network;
}
