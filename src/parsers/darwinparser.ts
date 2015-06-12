/// <reference path="../../typings/tsd.d.ts" />

import wifiscanner = require("wifiscanner");

export default function parse(data) {
    var lines = data.split("\n");
    var headers = lines.shift();
    var indexOfMacAddress = headers.indexOf("BSSID");
    return lines.filter(filterBlanks).map(function(line){
        return parseLine(line, indexOfMacAddress);
    });
}

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

function parseLine(line, indexOfMacAddress): wifiscanner.IWirelessNetwork {
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

    return {
        ssid: ssid,
        mac: components[0].toLowerCase(),
        channel: components[2],
        security: components.splice(5).map(cleanSecurity).sort()
    };
}