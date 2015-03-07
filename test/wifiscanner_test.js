var assert = require("chai").assert;

var wifiscanner = require("../lib/wifiscanner"),
    DarwinWifiScanner = require("../lib/darwin"),
    LinuxWifiScanner = require("../lib/linux");

var NETWORKS = [ 'ACLCICHC', 'HOME-E5AD', 'freewifi', 'freewifi', 'myqeast9966', 'pchome9' ];

function collectSSIDs(network) {
    return network.ssid;
}

function crossPlatformTest(error, networks, done) {
    assert.isArray(networks, "should be an array");
    assert.lengthOf(networks, 6, "The networks array should be 6 in length");
    assert.deepEqual(networks.map(collectSSIDs).sort(), NETWORKS, "SSIDs don't match");
    done();
}

describe("WifiScanner", function(){
    describe("scan", function() {
        it("on a mac", function(done){
            var scanner = wifiscanner({platform: "darwin", args:"./test/darwin.txt", binaryPath: "cat"});

            assert.isTrue(scanner instanceof DarwinWifiScanner, "Scanner returned by wifiscanner should be a DawrinWifiScanner");

            scanner.scan(function(error, networks) {
                crossPlatformTest(error, networks, done)
            });
        });

        it("on a linux", function(done){
            var scanner = wifiscanner({platform: "linux", args:"./test/linux.txt", binaryPath: "cat"});

            assert.isTrue(scanner instanceof LinuxWifiScanner, "Scanner returned by wifiscanner should be a DawrinWifiScanner");

            scanner.scan(function(error, networks) {
                crossPlatformTest(error, networks, done)
            });
        });
    });
});
