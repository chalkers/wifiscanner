/// <reference path="./interfaces/platformscanner" />

import parse from "./parsers/linuxparser"
import WifiScanner from "./wifiscanner"

export default class LinuxWifiScanner extends WifiScanner {
    constructor(public options) {
        super(options)
    }
    
    get binaryPath() {
        return this.options.binaryPath || "/sbin/iwlist";
    }
    
    parse(data) {
       return parse(data);
    }
    
    get args() {
        return this.options.args || "scan";
    }
}