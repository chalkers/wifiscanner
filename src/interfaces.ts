interface WifiScannerOptions {
    binaryPath?: string,
    args?:string
}

interface PlatformScanner {
    options: Object;
    binaryPath: string;
    parse(data: string): Array<WirelessNetwork>;
    args: string;
}

interface WirelessNetwork {
    ssid: string;
    mac: string;
    channel: string;
    security: Array<string>;
}