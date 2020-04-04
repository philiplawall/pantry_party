import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BarcodeScanner, ScanOptions, ScanResult } from "nativescript-barcodescanner";

@Component({
  selector: "ns-scan-selector",
  templateUrl: "./scan-selector.component.html",
  styleUrls: ["./scan-selector.component.scss"]
})
export class ScanSelectorComponent {
  @Output() scanResults = new EventEmitter<ScanResult>();
  @Output() scannerClosed = new EventEmitter<void>();

  scannerSettings: ScanOptions = {
      formats: "QR_CODE, EAN_13, UPC_A, UPC_E",
      beepOnScan: true,
      reportDuplicates: true,
      preferFrontCamera: false,
      closeCallback: () => this.scannerClosed.emit(),
      showTorchButton: true,
      showFlipCameraButton: true,
      resultDisplayDuration: 0
  };

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  scanOnce(): void {
    this.barcodeScanner.scan(this.scannerSettings)
    .then((r) => this.scanResults.emit(r))
    .catch((error) => console.log(error));
  }

  scanContiniously(): void {
    this.barcodeScanner.scan({
      ...this.scannerSettings,
      continuousScanCallback: (r) => this.scanResults.emit(r)
    })
    .catch((error) => console.log(error));
  }
}