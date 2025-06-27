// Global type declarations for dynamically loaded libraries

declare global {
  interface Window {
    QRious: new (options: {
      element: HTMLCanvasElement;
      value: string;
      size: number;
      background: string;
      foreground: string;
      level: string;
    }) => void;
  }
}

export {};
