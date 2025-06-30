import { QRCodeColors, QRCodeConfig, QRCodeResult } from '../types/qr-types';
import { QR_CONFIG } from '../constants/tabs';

// Extend Window interface for QRious
declare global {
  interface Window {
    QRious: new (options: {
      element: HTMLCanvasElement;
      value: string;
      size: number;
      background: string;
      foreground: string;
      level: string;
      padding?: number;
    }) => void;
  }
}

export class QRCodeService {
  private static instance: QRCodeService;
  private qriousLoaded = false;

  static getInstance(): QRCodeService {
    if (!QRCodeService.instance) {
      QRCodeService.instance = new QRCodeService();
    }
    return QRCodeService.instance;
  }

  async generateQRCode(
    text: string,
    colors: QRCodeColors,
    config: QRCodeConfig = QR_CONFIG
  ): Promise<QRCodeResult> {
    if (!text.trim()) {
      return { imageUrl: '', data: text };
    }

    try {
      // Try QRious library first (best quality)
      if (await this.ensureQriousLoaded()) {
        return this.generateWithQRious(text, colors, config);
      }

      // Fallback to external APIs
      return await this.generateWithFallback(text);
    } catch (error) {
      console.error('Error in QR generation:', error);
      return {
        imageUrl: '',
        data: text,
        error: 'Failed to generate QR code. Please try again.',
      };
    }
  }

  private async ensureQriousLoaded(): Promise<boolean> {
    if (this.qriousLoaded && window.QRious) {
      return true;
    }

    return new Promise((resolve) => {
      if (window.QRious) {
        this.qriousLoaded = true;
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js';

      script.onload = () => {
        this.qriousLoaded = true;
        resolve(true);
      };

      script.onerror = () => {
        console.error('Failed to load QRious library');
        resolve(false);
      };

      document.head.appendChild(script);
    });
  }

  private generateWithQRious(
    text: string,
    colors: QRCodeColors,
    config: QRCodeConfig
  ): QRCodeResult {
    try {
      const canvas = document.createElement('canvas');

      new window.QRious({
        element: canvas,
        value: text,
        size: config.size,
        background: colors.background,
        foreground: colors.foreground,
        level: config.level,
        padding: 10,
      });

      const imageUrl = canvas.toDataURL();
      return { imageUrl, data: text };
    } catch (error) {
      console.error('Error creating QR code with QRious:', error);
      throw error;
    }
  }

  private async generateWithFallback(text: string): Promise<QRCodeResult> {
    const encodedData = encodeURIComponent(text);

    // Try Google Charts API first
    try {
      const googleChartsUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodedData}&choe=UTF-8`;

      if (await this.testImageUrl(googleChartsUrl)) {
        return { imageUrl: googleChartsUrl, data: text };
      }
    } catch (error) {
      console.error('Google Charts API failed:', error);
    }

    // Try QR Server API as backup
    try {
      const qrServerUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedData}&format=png`;

      if (await this.testImageUrl(qrServerUrl)) {
        return { imageUrl: qrServerUrl, data: text };
      }
    } catch (error) {
      console.error('QR Server API failed:', error);
    }

    throw new Error('All QR generation methods failed');
  }

  private testImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
}
