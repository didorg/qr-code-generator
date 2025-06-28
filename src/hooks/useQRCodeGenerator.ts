import { useState, useEffect } from 'react';
import {
  QRCodeResult,
  QRCodeColors,
  QRCodeType,
  FormData,
} from '../types/qr-types';
import { QRCodeService } from '../services/qrCodeService';
import { formatUrl, generateVCard, hasContactData } from '../utils/formatters';
import { DEFAULT_COLORS } from '../constants/tabs';

export const useQRCodeGenerator = (
  activeTab: QRCodeType,
  formData: FormData
) => {
  const [qrResult, setQrResult] = useState<QRCodeResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [colors, setColors] = useState<QRCodeColors>(DEFAULT_COLORS);

  const qrService = QRCodeService.getInstance();

  const generateQRData = (): string => {
    switch (activeTab) {
      case 'url':
        return formatUrl(formData.url);
      case 'text':
        return formData.text;
      case 'contact':
        return hasContactData(formData.contact)
          ? generateVCard(formData.contact)
          : '';
      default:
        return '';
    }
  };

  const generateQRCode = async () => {
    const data = generateQRData();

    if (!data.trim()) {
      setQrResult(null);
      return;
    }

    setIsGenerating(true);
    try {
      const result = await qrService.generateQRCode(data, colors);
      setQrResult(result);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      setQrResult({
        imageUrl: '',
        data,
        error: 'Failed to generate QR code. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const updateColors = (newColors: Partial<QRCodeColors>) => {
    setColors((prev) => ({ ...prev, ...newColors }));
  };

  const resetColors = () => {
    setColors(DEFAULT_COLORS);
  };

  const downloadQRCode = () => {
    if (!qrResult?.imageUrl) return;

    const link = document.createElement('a');
    link.download = `qr-code-${activeTab}.png`;
    link.href = qrResult.imageUrl;
    link.click();
  };

  // Regenerate QR code when dependencies change
  useEffect(() => {
    generateQRCode();
  }, [activeTab, formData, colors]);

  return {
    qrResult,
    isGenerating,
    colors,
    updateColors,
    resetColors,
    downloadQRCode,
    regenerateQR: generateQRCode,
  };
};
