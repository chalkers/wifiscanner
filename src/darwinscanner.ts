/// <reference path="./interfaces/platformscanner" />

import parse from "./parsers/darwinparser"
import WifiScanner from "./wifiscanner"

export default class DarwinWifiScanner extends WifiScanner {

    constructor(public options) {
        super(options);
    }
    get binaryPath() {
        return this.options.binaryPath || "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
    }
    
    parse(data) {
        return parse(data);
    }
    
    get args() {
        return this.options.args || "-s";
    }
}