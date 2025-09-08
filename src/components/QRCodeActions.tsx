import { Download, Copy, Check } from 'lucide-react';
import { QRCodeResult } from '../types/qr-types';

interface QRCodeActionsProps {
  qrResult: QRCodeResult | null;
  copied: boolean;
  onDownload: () => void;
  onCopy: () => void;
}

export const QRCodeActions = ({
  qrResult,
  copied,
  onDownload,
  onCopy,
}: QRCodeActionsProps) => {
  if (!qrResult?.imageUrl || qrResult.error) {
    return null;
  }

  return (
    <>
      {/* Action Buttons */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm'>
        <button
          onClick={onDownload}
          aria-label='Download QR code'
          className='w-full inline-flex items-center justify-center gap-2 h-12 sm:h-12 px-4 bg-coral-red text-white rounded-xl font-montserrat text-sm sm:text-base shadow-sm hover:shadow-md active:translate-y-px transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-red/60'
        >
          <Download className='w-5 h-5' />
          <span>Download</span>
        </button>

        <button
          onClick={onCopy}
          aria-label='Copy QR data'
          className='w-full inline-flex items-center justify-center gap-2 h-12 sm:h-12 px-4 border-2 border-coral-red text-coral-red rounded-xl font-montserrat text-sm sm:text-base hover:bg-coral-red hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-red/60'
        >
          {copied ? (
            <>
              <Check className='w-5 h-5 text-green-600' />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className='w-5 h-5' />
              <span>Copy Data</span>
            </>
          )}
        </button>
      </div>

      {/* QR Data Display */}
      <div className='w-full max-w-sm'>
        <h3 className='text-sm font-medium text-gray-700 mb-2'>
          QR Code Data:
        </h3>
        <div className='bg-gray-100 rounded-lg p-3 text-xs text-slate-gray max-h-32 overflow-y-auto'>
          <pre className='whitespace-pre-wrap break-words'>{qrResult.data}</pre>
        </div>
      </div>
    </>
  );
};
