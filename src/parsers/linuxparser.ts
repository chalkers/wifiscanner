/// <reference path="../../typings/tsd.d.ts" />

import wifiscanner = require("wifiscanner");

export default function parse(data): wifiscanner.IWirelessNetwork[] {
    var cells = data.split(/Cell \d{2} - /g);
    if(~cells[0].toLocaleLowerCase().indexOf("scan complete")) {
        cells.shift();
    }
    return cells.map(parseCell);
}

function cleanCellLine(cellLine) {
    return cellLine.trim();
}

function parseCell(cell): wifiscanner.IWirelessNetwork {
    var cellLines = cell.split("\n").map(cleanCellLine);

    return {
        ssid:       cellLines.filter(findSsid).map(extractSsid)[0],
        mac:        cellLines.filter(findMac).map(extractMac)[0],
        channel:    cellLines.filter(findChannel).map(extractChannel)[0],
        security:   cellLines.filter(findSecurity).map(extractSecurity)
    };
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
    var encryptionPattern = /(encryption key:off|wpa(\d)? version|wep)/gi;
    return encryptionPattern.test(line);
}

function extractSecurity(line){
    var noEncryption = /Encryption key:off/gi;
    var wpa1 = /wpa version/gi;
    var wpa2 = /wpa2 version/gi;

    if(noEncryption.test(line))
        return "None";
    else if(wpa1.test(line))
        return "WPA";
    else if(wpa2.test(line))
        return "WPA2";
    else
        return "WEP";
}