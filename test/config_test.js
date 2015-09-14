var assert = require("chai").assert;
var nconf = require("nconf");

describe("Config files", function(){
    describe("linux", function(){
       it("should contain the correct default configuration for platform", function(){
           nconf.file(__dirname + "/../config/linux.json");
           assert.equal(nconf.get("binaryPath"),"/sbin/iwlist");
           assert.equal(nconf.get("args"),"scan");
       });
    });

    describe("darwin", function(){
        it("should contain the correct default configuration for platform", function(){
            nconf.file(__dirname + "/../config/darwin.json");
            assert.equal(nconf.get("binaryPath"),"/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport");
            assert.equal(nconf.get("args"),"-s");
        });
    });

    describe("windows", function(){
        it("should contain the correct default configuration for platform", function(){
            nconf.file(__dirname + "/../config/windows.json");
            assert.equal(nconf.get("binaryPath"),"{{SystemPath}}\\System32\\netsh.exe");
            assert.equal(nconf.get("args"),"wlan show networks mode=Bssid");
        });
    });
});