var wifiscanner = require("./lib/wifiscanner");
var testOptions = {platform: "darwin", binaryPath: "cat", args:"./test/darwin.txt"}
var scanner = wifiscanner(testOptions);
var testOptions2 = {platform: "linux", binaryPath: "cat", args:"./test/linux.txt"}
var scanner2 = wifiscanner(testOptions2);
var scanner3 = wifiscanner();

function display(error, networks) {
    console.log("Error %s", error);

    function sortBySSIDs(network, otherNetowrk) {
        if (network.ssid < otherNetowrk.ssid)
            return -1;
        else if (network.ssid > otherNetowrk.ssid)
            return 1;
        else return 0;
    }
    console.dir(networks.sort(sortBySSIDs));
}

scanner.scan(display);
scanner2.scan(display);
scanner3.scan(display);

function sortBySSIDs(network,otherNetowrk) {
    if (network.ssid < otherNetowrk.ssid)
        return -1;
    else if (network.ssid > otherNetowrk.ssid)
        return 1;
    else return 0;
}
