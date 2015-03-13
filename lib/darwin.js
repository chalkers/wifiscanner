var CoreScanner = require("./core");

function DarwinWifiScanner(options) {
    this.options = options || {};
}

DarwinWifiScanner.prototype = Object.create(CoreScanner.prototype);

function cleanSecurity(security) {
    if(security.toLowerCase() === "none") {
        return "None";
    } else {
        return security.split("(")[0];
    }
}

DarwinWifiScanner.prototype.binaryPath = function binaryPath() {
    return this.options.binaryPath || "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
};

DarwinWifiScanner.prototype.parse = function parse(data) {
    var lines = data.split("\n");
    var headers = lines.shift();
    var indexOfMacAddress = headers.indexOf("BSSID");
    var networks = lines.filter(filterBlanks).map(function(line){
        return parseLine(line, indexOfMacAddress);
    });
    return networks;
};

DarwinWifiScanner.prototype.args = function args() {
    return this.options.args || "-s";
};

module.exports = DarwinWifiScanner;

function filterBlanks(line) {
    return line.replace(/\s+/g,"").length !== 0;
}

function parseLine(line, indexOfMacAddress) {
    var network = {};
    network.ssid = line.substr(0, indexOfMacAddress).trim();
    line = line.substr(indexOfMacAddress,line.length - indexOfMacAddress);

    var components = line.replace(/\s{1,}/g, " ").trim().split(" ");
    //[0] SSID
    //[1] MAC
    //[2] RSSI
    //[3] CHANNEL
    //[4] HT
    //[5] CC
    //[6..x] SECURITY (auth/unicast/group)
    network.mac = components[0].toLowerCase();
    network.channel = components[2];
    network.security = components.splice(5).map(cleanSecurity).sort();
    return network;
}
