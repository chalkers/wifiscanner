/// <reference path="../../typings/tsd.d.ts" />

import wifiscanner = require("wifiscanner");
var childProcess = require("child_process");

export default class WifiScanner {
	
    constructor(public options: wifiscanner.IWifiScannerOptions, private parser) {

	}	
    
	scan(callback, standardErrorCallback) {
        childProcess.exec(this.command,  (error, standardOut, standardError) => {
            if (standardError && typeof standardErrorCallback === "function") {
                standardErrorCallback(standardError);
            }
            callback(error, this.parse(standardOut.toString()));
        });
    }
	
	get command() {
		return this.options.binaryPath + " " + this.options.args;
	}

    parse(data): wifiscanner.IWirelessNetwork[] {

        return this.parser(data);
    }
}