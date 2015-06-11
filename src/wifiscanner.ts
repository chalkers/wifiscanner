/// <reference path="../typings/node/node.d.ts" />

var childProcess = require("child_process");

export default class WifiScanner implements PlatformScanner {
	constructor(public options: WifiScannerOptions) {
        this.options = options || {};
	}	
	scan(callback, standardErrorCallback) {
        childProcess.exec(this.command,  (error, standardOut, standardError) => {
            if (typeof standardErrorCallback === "function" && standardError) {
                standardErrorCallback(standardError);
            }
            callback(error, this.parse(standardOut.toString()));
        });
    }
	
	get command() {
		return this.binaryPath + " " + this.args;
	}

    get binaryPath() {
        return this.options.binaryPath;
    }

    get args() {
        return this.options.args;
    }

    parse(data) {
        return [];
    }
}