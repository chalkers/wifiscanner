/// <reference path="../../typings/node/node.d.ts" />

var childProcess = require("child_process");

export default class WifiScanner implements PlatformScanner {
	options: WifiScannerOptions;
    constructor(options: WifiScannerOptions) {
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