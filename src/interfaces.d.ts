declare module "wifiscanner" {
    module wifiscanner {
        interface IWifiScannerOptionsWithPlatform{
            binaryPath?: string,
            args?: string,
            platform?: string
        }
        
        interface IWifiScannerOptions {
            binaryPath: string,
            args: string
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