import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('qrCodeContainer') qrCodeContainer!: ElementRef<HTMLDivElement>;

  private codeReader = new BrowserMultiFormatReader();
  scanResult: string | null = null;
  isScanning = false;

  async ngAfterViewInit() {
    if (this.isNativePlatform()) {
      await this.startCamera();
    } else {
      this.setupWebQrCodeScanner();
    }
  }

  async startCamera() {
    try {
      await Camera.requestPermissions({
        permissions: ['camera']
      });

      const video = this.videoElement.nativeElement;
      video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
      video.setAttribute('playsinline', 'true');
      video.play();

      this.codeReader.decodeFromVideoDevice(null, video, (result: Result | null, error: any) => {
        if (result) {
          this.scanResult = result.getText(); // Use getText() method
          console.log('QR Code scanned:', this.scanResult);
          this.stopCamera();
        } else if (error) {
          console.error('QR Scanner error:', error);
        }
      });
    } catch (e) {
      console.error('Camera error:', e);
    }
  }

  setupWebQrCodeScanner() {
    if (!this.qrCodeContainer.nativeElement) {
      console.error('QR Code container not found.');
      return;
    }

    console.log('Web QR Code Scanner setup');
  }

  startScan() {
    this.isScanning = true;
    if (this.isNativePlatform()) {
      this.startCamera();
    } else {
      this.setupWebQrCodeScanner();
    }
  }

  stopScan() {
    this.stopCamera();
  }

  stopCamera() {
    if (this.videoElement.nativeElement.srcObject) {
      const stream = this.videoElement.nativeElement.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    this.videoElement.nativeElement.srcObject = null;
    this.isScanning = false;
  }

  isNativePlatform(): boolean {
    const platform = navigator.userAgent.toLowerCase();
    return platform.includes('ios') || platform.includes('android');
  }
}
