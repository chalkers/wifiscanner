# WiFi Scanner

[![Build Status](https://travis-ci.org/chalkers/wifiscanner.svg?branch=master)](https://travis-ci.org/chalkers/wifiscanner)
[![Dependency Status](https://david-dm.org/chalkers/wifiscanner.svg)](https://david-dm.org/chalkers/wifiscanner)
[![devDependency Status](https://david-dm.org/chalkers/wifiscanner/dev-status.svg)](https://david-dm.org/chalkers/wifiscanner#info=devDependencies)

A simple Node.js WiFi Scanner for Mac and Linux. Works great on embedded devices like the Raspberry Pi.

## Usage

```javascript
var wifiscanner = require("wifiscanner");

//Returns appropriate instance of a wifi scanner
var scanner = wifiscanner();

scanner.scan(function(error, networks){
    if(error) {
        console.error(error);
    } else {
        console.dir(networks);
    }
});

```

## To dos

* Windows Support - windows adapter and parser