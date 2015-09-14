/// <reference path="../typings/tsd.d.ts"/>
import nconf = require("nconf");
import wifiscanner = require("wifiscanner");
import WiFiScanner from "./scanners/wifiscanner";
import darwinparser from "./parsers/darwinparser";
import linuxparser from "./parsers/linuxparser";
import windowsparser from "./parsers/windowsparser";

function platformSelect(options): string {
    let platform: string;
    if(options && options.platform) {
        platform = options.platform;
        delete options.platform;
    }
    return platform || process.platform;
}

function scanner(options: wifiscanner.IWifiScannerOptionsWithPlatform): WiFiScanner {
    options = options || {};
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
            parser = windowsparser;
            break;
    }

    //If Windows is on another drive, or pick C:\Windows by default.
    //Darwin and Linux don't have a {{SystemRoot}} variable in their configuration file.
    let systemRoot =  process.env.SystemRoot || "C:\\Windows";

    let scannerOptions: wifiscanner.IWifiScannerOptions = {
        binaryPath: options.binaryPath || nconf.get("binaryPath").replace("{{SystemRoot}}", systemRoot),
        args: options.args || nconf.get("args"),
    };

    return new WiFiScanner(scannerOptions, parser);
}

export = scanner;