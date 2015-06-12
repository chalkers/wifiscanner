/// <reference path="../typings/tsd.d.ts"/>
import nconf = require("nconf");
import wifiscanner = require("wifiscanner");
import WiFiScanner from "./scanners/wifiscanner"
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

function scanner(options: wifiscanner.IWifiScannerOptionsWithPlatform): WiFiScanner {
    options = options || {}
    var platform = platformSelect(options);
    nconf.file(`${__dirname}/../config/${platform}.json`);
    
    var parser: (data:string) => wifiscanner.IWirelessNetwork[];
    switch(platform) {
        case "linux":
            parser = linuxparser;
        break;        
        case "darwin":
            parser = darwinparser;
        break;
        case "windows":
            //TODO implement this
        break;
    }
    
    var scannerOptions: wifiscanner.IWifiScannerOptions = {
        binaryPath: options.binaryPath || nconf.get("binaryPath"),
        args: options.args || nconf.get("args"),
    }
    
    return new WiFiScanner(scannerOptions, parser);
};

export = scanner;