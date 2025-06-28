export interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  url: string;
}

export type QRCodeType = 'url' | 'text' | 'contact';

export interface QRCodeColors {
  foreground: string;
  background: string;
}

export interface QRCodeConfig {
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
}

export interface QRCodeResult {
  imageUrl: string;
  data: string;
  error?: string;
}

export interface TabConfig {
  id: QRCodeType;
  label: string;
  icon: any; // Lucide icon component
}

export interface FormData {
  url: string;
  text: string;
  contact: ContactInfo;
}

export interface QRCodeGeneratorState {
  activeTab: QRCodeType;
  formData: FormData;
  colors: QRCodeColors;
  qrResult: QRCodeResult | null;
  isGenerating: boolean;
}
