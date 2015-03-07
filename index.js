var wifiscanner = require("./lib/wifiscanner");
var testOptions = {platform: "darwin", binaryPath: "cat", args:"./test/darwin.txt"}
var scanner = wifiscanner(testOptions);
var testOptions2 = {platform: "linux", binaryPath: "cat", args:"./test/linux.txt"}
var scanner2 = wifiscanner(testOptions2);

scanner.scan(function(error, networks) {
    console.log("Error %s", error);
    console.dir(networks);
});

scanner2.scan(function(error, networks) {
    console.log("Error %s", error);
    console.dir(networks);
});
