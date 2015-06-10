/// <reference path="wirelessnetwork.ts" />

interface PlatformScanner {
    options: Object;
    binaryPath: string;    
    parse(data: string): Array<WirelessNetwork>;
    args: string;
}