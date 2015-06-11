/// <reference path="../typings/node/node.d.ts" />
///<reference path="interfaces.ts"/>

import DarwinWifiScanner from "./darwinscanner"
import LinuxWifiScanner from "./linuxscanner"

function platformSelect(options): string {
    var platform: string;
    if(options && options.platform) {
        platform = options.platform;
        delete options.platform;
    }
    return platform || process.platform;
}

export = function wifiscanner(options): PlatformScanner {
    
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
}
