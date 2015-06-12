/// <reference path="../../typings/tsd.d.ts" />

import wifiscanner = require("wifiscanner");
var childProcess = require("child_process");

export default class WifiScanner implements wifiscanner.IPlatformScanner {
	options: wifiscanner.IWifiScannerOptions;
    constructor(options: wifiscanner.IWifiScannerOptions) {
        this.options = options || {};
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

    parse(data) {
        throw Error("Please override this in 'subclass'.");
        return [];
    }
}