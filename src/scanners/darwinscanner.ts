///<reference path="../../typings/tsd.d.ts" />

import wifiscanner = require("wifiscanner");
import parse from "./../parsers/darwinparser"
import WifiScanner from "./wifiscanner"

export default class DarwinWifiScanner extends WifiScanner {
    constructor(options: wifiscanner.IWifiScannerOptions) {
        super(options);
        this.options.binaryPath = this.options.binaryPath || "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
        this.options.args = this.options.args || "-s";
    }

    parse(data): wifiscanner.IWirelessNetwork[] {
        return parse(data);
    }

}