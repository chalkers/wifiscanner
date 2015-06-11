import parse from "./parsers/linuxparser"
import WifiScanner from "./wifiscanner"

export default class LinuxWifiScanner extends WifiScanner {
    constructor(public options) {
        super(options);
        this.options.binaryPath = this.options.binaryPath || "/sbin/iwlist";
        this.options.args = this.options.args || "scan";
    }

    parse(data) {
       return parse(data);
    }

}