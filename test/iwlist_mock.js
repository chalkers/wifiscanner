#!/usr/bin/env node
var fs = require("fs");

["out", "err"].forEach(function(type){
    var std = "std" + type;
    fs.readFile('./test/linux.' + std + '.txt', function (err, data) {
        if (err) throw err;
        process[std].write(data);
    });
});