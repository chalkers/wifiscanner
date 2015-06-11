import parse from "./parsers/darwinparser"
import WifiScanner from "./wifiscanner"

export default class DarwinWifiScanner extends WifiScanner {

    constructor(public options) {
        super(options);
        options.binaryPath = options.binaryPath || "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
        options.args = options.args || "-s";
    }

    parse(data) {
        return parse(data);
    }

}