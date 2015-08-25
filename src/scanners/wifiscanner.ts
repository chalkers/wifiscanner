/// <reference path="../../typings/tsd.d.ts" />

import wifiscanner = require("wifiscanner");
import childProcess = require("child_process");
import events = require("events");

export default class WifiScanner extends events.EventEmitter {
	
    constructor(public options: wifiscanner.IWifiScannerOptions, private parser) {
        super();
	}	
    
	scan() {
        childProcess.exec(this.command, this.handleExec.bind(this));
        return this;
    }
	
	private get command() {
		return this.options.binaryPath + " " + this.options.args;
	}

    private parse(data: string): wifiscanner.IWirelessNetwork[] {
        return this.parser(data);
    }
    
    private handleExec(error, standardOut, standardError) {                      
        if(error) {
            this.emit("error", error);
        } else {
            if (standardError !== "") {
                this.emit("warning", standardError);
            }
            this.emit("end", this.parse(standardOut.toString()));
        } 
    }
}