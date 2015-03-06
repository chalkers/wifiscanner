function binaryPath() {
    return this.options.binaryPath || "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
}

function parser(data) {

}

function args() {
    return this.options.args || "-s";
}

module.exports = {
    binaryPath: binaryPath,
    parser: parser,
    args: args
};