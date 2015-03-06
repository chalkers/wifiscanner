function binaryPath() {
    return this.options.binaryPath || "/sbin/iwlist";
}

function parser(data) {

}
function args() {
    return this.options.args || "scan";
}

module.exports = {
    binaryPath: binaryPath,
    parser: parser,
    args: args
};