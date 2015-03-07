function wifiscanner(options) {
    var moduleToRequire;
    if(options && options.platform) {
        moduleToRequire = options.platform;
        delete options.platform;
    }
    moduleToRequire = moduleToRequire || process.platform;
    var Scanner = require("./" + moduleToRequire);
    return new Scanner(options);
}

module.exports = wifiscanner;