var CoreScanner = require("./core");

function LinuxWifiScanner(options) {
    this.options = options || {};
}

LinuxWifiScanner.prototype = Object.create(CoreScanner.prototype);

LinuxWifiScanner.prototype.binaryPath = function binaryPath() {
    return this.options.binaryPath || "/sbin/iwlist";
};

LinuxWifiScanner.prototype.parse = function parse(data) {
    var cells = data.split(/Cell \d{2} - /g);
    if(~cells[0].toLocaleLowerCase().indexOf("scan complete")) {
        cells.shift();
    }
    var networks = cells.map(parseCell);
    return networks;
};

LinuxWifiScanner.prototype.args = function args() {
    return this.options.args || "scan";
};

module.exports = LinuxWifiScanner;

function cleanCellLine(cellLine) {
    return cellLine.trim();
}

function parseCell(cell){
    var cellLines = cell.split("\n").map(cleanCellLine);

    var network = {};
    network.ssid = cellLines.filter(findSsid).map(extractSsid)[0];
    network.mac = cellLines.filter(findMac).map(extractMac)[0];
    network.channel = cellLines.filter(findChannel).map(extractChannel)[0]
    //network.security = components.splice(6).map(cleanSecurity).sort();

    return network;
}

function findMac(line){
    var macPattern = /([0-9A-F]{2}[:-]){5}([0-9A-F]{2})/ig;
    return macPattern.test(line.toLowerCase());
}

function extractMac(line) {
    var macPattern = /([0-9A-F]{2}[:-]){5}([0-9A-F]{2})/ig;
    return macPattern.exec(line.toLowerCase())[0];
}

function findSsid(line) {
    return ~line.toLowerCase().indexOf("essid");
}

function extractSsid(line) {
    var ssidPattern = /\essid:"(.*)\"/gi;
    return ssidPattern.exec(line)[1];
}

function findChannel(line) {
    var channelPattern  = /Channel (\d+)/gi;
    return channelPattern.test(line);
}

function extractChannel(line) {
    var channelPattern  = /Channel (\d+)/gi;
    return channelPattern.exec(line)[1];
}

function findSecurity(line) {
    //TODO parse the security
}

function extractSecurity(line){
    //TODO parse the security
}