/// <reference path="../../typings/tsd.d.ts" />

import wifiscanner = require("wifiscanner");
import parse from "./../parsers/linuxparser"
import WifiScanner from "./wifiscanner"

export default class LinuxWifiScanner extends WifiScanner {
    constructor(options: wifiscanner.IWifiScannerOptions) {
        super(options);
        this.options.binaryPath = this.options.binaryPath || "/sbin/iwlist";
        this.options.args = this.options.args || "scan";
    }

    parse(data): wifiscanner.IWirelessNetwork[] {
       return parse(data);
    }

}