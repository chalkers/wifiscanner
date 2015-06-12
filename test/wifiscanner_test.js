var assert = require("chai").assert;

var wifiscanner = require("../lib/");

var NETWORKS = [
    {   ssid: 'ACLCICHCGC',
        mac: '6c:b0:ce:44:e9:1e',
        channel: '1',
        security: [ 'WPA2' ] },
    {   ssid: 'HOUSE-E5AD',
        mac: 'cc:03:fa:65:e5:1e',
        channel: '6',
        security: [ 'WPA', 'WPA2' ] },
    {   ssid: 'freewifi',
        mac: 'ce:03:fa:65:e5:1e',
        channel: '6',
        security: [ 'None' ] },
    {   ssid: 'insecure',
        mac: 'e6:3e:fc:db:fb:1e',
        channel: '1',
        security: [ 'None' ] },
    {   ssid: 'myqeast9966',
        mac: '40:4a:03:be:53:1e',
        channel: '11',
        security: [ 'WPA', 'WPA2' ] },
    {
        ssid: "PP-Print-11-Officejet Pro 8600",
        mac: "e4:5d:36:3f:71:19",
        channel: "6",
        security: [ "None" ] },
    {   ssid: 'pchome9',
        mac: 'e0:91:f5:af:8d:1e',
        channel: '2',
        security: [ 'WPA2' ] } ];

function sortBySSIDs(network,otherNetowrk) {
    if (network.ssid < otherNetowrk.ssid)
        return -1;
    else if (network.ssid > otherNetowrk.ssid)
        return 1;
    else return 0;
}

function crossPlatformTest(error, networks, done) {
    assert.isArray(networks, "should be an array");
    assert.lengthOf(networks, 7, "The networks array should be 7 in length");
    assert.deepEqual(networks.sort(sortBySSIDs), NETWORKS.sort(sortBySSIDs), "Networks were not as expected");
    done();
}

describe("WifiScanner", function(){
    describe("scan", function() {
        it("on a mac", function(done){
            var scanner = wifiscanner({platform: "darwin", args:"./test/darwin.txt", binaryPath: "cat"});

            scanner.scan(function(error, networks) {
                crossPlatformTest(error, networks, done)
            });
        });

        it("on a linux", function(done){
            var scanner = wifiscanner({platform: "linux", args:"./test/linux.stdout.txt", binaryPath: "cat"});

            scanner.scan(function(error, networks) {
                crossPlatformTest(error, networks, done)
            });
        });

        it("should handle standard errors", function(done){
            var scanner = wifiscanner({platform: "linux", binaryPath: "./test/iwlist_mock.js"});
            scanner.scan(function(error, networks) {

            }, function(standardError){
                assert.typeOf(standardError, 'string');
                done();
            });
        });
    });
});
