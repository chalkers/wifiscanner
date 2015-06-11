interface WifiScannerOptions {
    binaryPath?: string,
    args?:string
}

interface PlatformScanner {
    parse: (data: string) => Array<WirelessNetwork>;
}

interface WirelessNetwork {
    ssid: string;
    mac: string;
    channel: string;
    security: Array<string>;
}