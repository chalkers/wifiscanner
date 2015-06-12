/// <reference path="../typings/tsd.d.ts"/>

import wifiscanner = require("wifiscanner");
import DarwinWifiScanner from "./scanners/darwinscanner"
import LinuxWifiScanner from "./scanners/linuxscanner"

function platformSelect(options): string {
    var platform: string;
    if(options && options.platform) {
        platform = options.platform;
        delete options.platform;
    }
    return platform || process.platform;
}

export = function(options): wifiscanner.IWifiScannerOptions {
    
    var platformScanner;
    switch(platformSelect(options)) {
        case "linux":
            platformScanner = LinuxWifiScanner;
        break;        
        case "darwin":
            platformScanner = DarwinWifiScanner;
        break;
        case "windows":
        //TODO implement this
        break;
    }
    
    return new platformScanner(options);
};