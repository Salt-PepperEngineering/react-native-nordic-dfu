declare module "react-native-nordic-dfu" {
  export class NordicDFU {
    /**
     * Start the DFU process
     * @param config - DFU configuration object
     * @param config.deviceAddress - Device MAC address (Android) or UUID (iOS)
     * @param config.deviceName - Optional device name for notification
     * @param config.filePath - Path to firmware .zip file
     * @param config.alternativeAdvertisingNameEnabled - iOS only: Send unique name before bootloader mode (default: true)
     * @param config.packetReceiptNotificationParameter - PRN value: Lower (1-6) = slower/reliable, Higher (10-15) = faster. Use 1 for Legacy DFU. (default: 12)
     * @param config.retries - Android only: Number of connection retries (default: 3)
     * @param config.maxMtu - Android only: Maximum MTU size (default: 23)
     * @param config.forceDfu - Android only: Force DFU mode for Legacy DFU bootloaders like Adafruit (default: false)
     * @returns Promise that resolves with device address on success
     */
    static startDFU({
      deviceAddress,
      deviceName,
      filePath,
      alternativeAdvertisingNameEnabled,
      packetReceiptNotificationParameter,
      retries,
      maxMtu,
      forceDfu,
    }: {
      deviceAddress: string;
      deviceName?: string;
      filePath: string | null;
      alternativeAdvertisingNameEnabled?: boolean;
      packetReceiptNotificationParameter?: number;
      retries?: number;
      maxMtu?: number;
      forceDfu?: boolean;
    }): Promise<string>;
  }

  export interface IDfuUpdate {
    percent?: number;
    currentPart?: number;
    partsTotal?: number;
    avgSpeed?: number;
    speed?: number;
    state?: string;
  }

  export class DFUEmitter {
    static addListener(
      name: "DFUProgress" | "DFUStateChanged",
      handler: (update: IDfuUpdate) => void
    ): void;

    static removeAllListeners(name: "DFUProgress" | "DFUStateChanged"): void;
  }
}