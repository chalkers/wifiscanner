var WifiScanner = require("./lib/wifiscanner");
w = new WifiScanner();
w.scan(function(error, networks) {
    console.log(error);
    console.log(networks);
});