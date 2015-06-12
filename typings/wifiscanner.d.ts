declare module "wifiscanner" {
    module wifiscanner {
        interface IWifiScannerOptions {
            binaryPath?: string,
            args?: string
        }
        
        interface IPlatformScanner {
            parse: (data: string) => IWirelessNetwork[];
        }
        
        interface IWirelessNetwork {
            ssid: string;
            mac: string;
            channel: string;
            security: string[];
        }
    }
    export = wifiscanner;
}