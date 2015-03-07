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

function filterBlanks(line) {
    return line.replace(/\s+/g,"").length !== 0;
}

function parseLine(line) {
    var components = line.replace(/\s{1,}/g, " ").trim().split(" ");
    //[0] SSID
    //[1] MAC
    //[2] RSSI
    //[3] CHANNEL
    //[4] HT
    //[5] CC
    //[6..x] SECURITY (auth/unicast/group)
    var network = {};
    network.ssid = components[0];
    network.mac = components[1].toLowerCase();
    network.channel = components[3];
    network.security = components.splice(6).map(cleanSecurity).sort();
    return network;
}


DarwinWifiScanner.prototype.binaryPath = function binaryPath() {
    return this.options.binaryPath || "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
};

DarwinWifiScanner.prototype.parse = function parse(data) {
    var lines = data.split("\n");
    var headers = lines.shift();
    var networks = lines.filter(filterBlanks).map(parseLine);
    return networks;
};

DarwinWifiScanner.prototype.args = function args() {
    return this.options.args || "-s";
};

module.exports = DarwinWifiScanner;
