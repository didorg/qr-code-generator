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
          className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg'
        >
          <Download className='w-4 h-4' />
          Download
        </button>

        <button
          onClick={onCopy}
          className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium'
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
        <div className='bg-gray-100 rounded-lg p-3 text-xs text-gray-600 max-h-32 overflow-y-auto'>
          <pre className='whitespace-pre-wrap break-words'>{qrResult.data}</pre>
        </div>
      </div>
    </>
  );
};
