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
      <div className='flex gap-4 w-full max-w-sm'>
        <button
          onClick={onDownload}
          className='flex-1 flex items-center justify-center gap-2 px-7 py-4 bg-coral-red text-white rounded-full font-montserrat hover:shadow-lg transition'
        >
          <Download className='w-4 h-4' />
          Download
        </button>

        <button
          onClick={onCopy}
          className='flex-1 flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-coral-red text-coral-red rounded-xl hover:bg-coral-red hover:text-white transition font-montserrat'
        >
          {copied ? (
            <>
              <Check className='w-4 h-4 text-green-600' />
              Copied!
            </>
          ) : (
            <>
              <Copy className='w-4 h-4' />
              Copy Data
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
