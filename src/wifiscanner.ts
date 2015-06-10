/// <reference path="../typings/node/node.d.ts" />
/// <reference path="interfaces/platformscanner.ts" />
var childProcess = require("child_process");

export default class WifiScanner {
	constructor(public platformScanner: PlatformScanner) {
		
	}	
	scan(callback, standardErrorCallback) {
        childProcess.exec(this.command,  (error, standardOut, standardError) => {
            if (typeof standardErrorCallback === "function" && standardError) {
                standardErrorCallback(standardError);
            }
            callback(error, this.platformScanner.parse(standardOut.toString()));
        });
    }
	
	get command() {
		return this.platformScanner.binaryPath + " " + this.platformScanner.args;
	}	
}