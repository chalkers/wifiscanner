# WiFi Scanner

[![Build Status](https://travis-ci.org/chalkers/wifiscanner.svg?branch=master)](https://travis-ci.org/chalkers/wifiscanner)
[![Dependency Status](https://david-dm.org/chalkers/wifiscanner.svg)](https://david-dm.org/chalkers/wifiscanner)
[![devDependency Status](https://david-dm.org/chalkers/wifiscanner/dev-status.svg)](https://david-dm.org/chalkers/wifiscanner#info=devDependencies)

A simple Node.js WiFi Scanner for Mac and Linux. Works great on embedded devices like the Raspberry Pi.

## Installation

```
npm install wifiscanner
```

## Basic Usage

1. Require `wifiscanner`
2. Create an instance of a `scanner`
3. Call `scan` with a callback with two parameters
4. Profit?

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

Network is an `Array` of nearby networks. Each network will have the following keys:

* ssid
* mac
* channel
* security (`Array` e.g `[ 'WPA', 'WPA2' ]`)


### JSON Sample Output

```
[
    {
        ssid: 'ACLCICHCGC',
        mac: '6c:b0:ce:44:e9:1e',
        channel: '1',
        security: [ 'WPA2' ]
    },
    {
        ssid: 'HOUSE-E5AD',
        mac: 'cc:03:fa:65:e5:1e',
        channel: '6',
        security: [ 'WPA', 'WPA2' ]
    },
    {
        ssid: 'freewifi',
        mac: 'ce:03:fa:65:e5:1e',
        channel: '6',
        security: [ 'None' ]
    },
    {
        ssid: 'insecure',
        mac: 'e6:3e:fc:db:fb:1e',
        channel: '1',
        security: [ 'None' ]
    },
    {
        ssid: 'myqeast9966',
        mac: '40:4a:03:be:53:1e',
        channel: '11',
        security: [ 'WPA', 'WPA2' ]
    },
    {
        ssid: 'pchome9',
        mac: 'e0:91:f5:af:8d:1e',
        channel: '2',
        security: [ 'WPA2' ]
    }
]
```

## Less Basic Usage

### Custom binaries and arguments

You can specify binary (`binaryPath`) and arguments (`args`) in a set of `options`.

```javascript
var wifiscanner = require("wifiscanner");


//Options
var options = {
    args: "wlan2 scan",
    binaryPath: "/path/to/iwlist"
}

var scanner = wifiscanner(options);

scanner.scan(function(error, networks){
    if(error) {
        console.error(error);
    } else {
        console.dir(networks);
    }
});

```

### Handling stderr

Standard error can is more of a warning. For example, if you're on Linux with `wlan0`, `en0` and `lo`
and you run the `iwlist scan` command you get both the `stdout` of the networks on the `wlan0` network interface
(which is parsed in to the `networks` `Array`) and the `stderr` of:

```
lo        Interface doesn't support scanning.

eth0      Interface doesn't support scanning.
```

The default behavior from this module is to do nothing. However, you can pass in a second _optional_ callback to the
scan method and do what you want with it.

```javascript
var wifiscanner = require("wifiscanner");


//Options
var options = {
    args: "wlan2 scan",
    binaryPath: "/path/to/iwlist"
}

var scanner = wifiscanner(options);

scanner.scan(function(error, networks){
    if(error) {
        console.error(error);
    } else {
        console.dir(networks);
    }
}, function(standardError){
    console.error(standardError);
});

```

## To dos

* Windows Support - windows adapter and parser