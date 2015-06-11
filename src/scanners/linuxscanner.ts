/// <reference path="../interfaces" />

import parse from "./../parsers/linuxparser"
import WifiScanner from "./wifiscanner"

export default class LinuxWifiScanner extends WifiScanner {
    constructor(public options: WifiScannerOptions) {
        super(options);
        this.options.binaryPath = this.options.binaryPath || "/sbin/iwlist";
        this.options.args = this.options.args || "scan";
    }

    parse(data): Array<WirelessNetwork> {
       return parse(data);
    }

}