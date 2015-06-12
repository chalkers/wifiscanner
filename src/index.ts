/// <reference path="../typings/tsd.d.ts"/>
import nconf = require("nconf");
import wifiscanner = require("wifiscanner");
import Scanner from "./scanners/wifiscanner"
import darwinparser from "./parsers/darwinparser"
import linuxparser from "./parsers/linuxparser"

function platformSelect(options): string {
    var platform: string;
    if(options && options.platform) {
        platform = options.platform;
        delete options.platform;
    }
    return platform || process.platform;
}

export = function(options: wifiscanner.IWifiScannerOptionsWithPlatform): Scanner {
    options = options || {}
    var platform = platformSelect(options);
    nconf.file(`${__dirname}/../config/${platform}.json`);
    
    var platformScanner: (data:string) => wifiscanner.IWirelessNetwork[];
    switch(platform) {
        case "linux":
            platformScanner = linuxparser;
        break;        
        case "darwin":
            platformScanner = darwinparser;
        break;
        case "windows":
        //TODO implement this
        break;
    }
    
    var scannerOptions: wifiscanner.IWifiScannerOptions = {
        binaryPath: options.binaryPath || nconf.get("binaryPath"),
        args: options.args || nconf.get("args"),
    }
    
    return new Scanner(scannerOptions, platformScanner);
};