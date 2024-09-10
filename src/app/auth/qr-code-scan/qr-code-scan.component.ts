import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';
import { Html5QrcodeScanner } from 'html5-qrcode'; // Import HTML5 QR code scanner

@Component({
  selector: 'app-qr-code-scan',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './qr-code-scan.component.html',
  styleUrls: ['./qr-code-scan.component.scss']
})
export class QrCodeScanComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('qrCodeContainer', { static: false }) qrCodeContainer!: ElementRef; // For web QR code scanner
  scanResult: string | null = null;
  isSupported = false;
  isScanning = false; // Track scanning state
  html5QrCodeScanner: Html5QrcodeScanner | null = null; // For web scanning

  constructor() {}

  async ngOnInit() {
    // Check platform and permissions
    if (this.isNativePlatform()) {
      try {
        const status = await BarcodeScanner.checkPermissions();
        this.isSupported = status.camera === 'granted'; // Adjust according to actual property names
      } catch (error) {
        console.error('Error checking permissions:', error);
        this.isSupported = false;
      }
    }
  }

  // Now using ngAfterViewInit to access the ViewChild
  ngAfterViewInit() {
    if (!this.isNativePlatform()) {
      // Browser fallback for web platform
      setTimeout(() => {
        this.setupWebQrCodeScanner(); // Ensure ViewChild is available
      }, 0);
    }
  }

  // Initialize the web-based QR code scanner
  setupWebQrCodeScanner() {
    if (!this.qrCodeContainer || !this.qrCodeContainer.nativeElement) {
      console.error('QR Code container not found.');
      return;
    }

    this.isSupported = true;

    this.html5QrCodeScanner = new Html5QrcodeScanner(
      this.qrCodeContainer.nativeElement.id,
      { fps: 10, qrbox: 250 },
      false
    );

    this.html5QrCodeScanner.render(
      (result: string) => {
        // Successful scan
        this.scanResult = result;
        this.html5QrCodeScanner?.clear();
        console.log('Scan result:', result);
      },
      (error: any) => {
        // Error or scanning not successful
        console.warn('QR Code scan failed', error);
      }
    );
  }

  async startScan() {
    if (!this.isSupported) {
      console.error('Barcode scanner is not supported.');
      return;
    }

    if (this.isNativePlatform()) {
      // Native platform scanning
      try {
        this.isScanning = true;
        document.querySelector('body')?.classList.add('scanner-active');

        // Use a type assertion here if you are sure of the return type
        const result: any = await BarcodeScanner.startScan();

        document.querySelector('body')?.classList.remove('scanner-active');
        this.isScanning = false;

        if (result && typeof result === 'object' && 'content' in result) {
          this.scanResult = result.content;
          console.log('Scan result:', this.scanResult);
        } else {
          console.log('No QR code content detected.');
        }
      } catch (error) {
        console.error('Error during scan:', error);
        this.isScanning = false;
        await this.stopScan();
      }
    }
  }

  async stopScan() {
    if (this.isNativePlatform()) {
      try {
        await BarcodeScanner.stopScan();
        document.querySelector('body')?.classList.remove('scanner-active');
        this.isScanning = false;
      } catch (error) {
        console.error('Error stopping scan:', error);
      }
    }
  }

  // Clean up resources
  ngOnDestroy() {
    if (this.isNativePlatform()) {
      this.stopScan();
    }
    if (this.html5QrCodeScanner) {
      this.html5QrCodeScanner.clear();
    }
  }

  // Check if the app is running on a native platform
  private isNativePlatform(): boolean {
    const platform = Capacitor.getPlatform();
    return platform === 'ios' || platform === 'android';
  }
}
