import { QrCode } from 'lucide-react';
import { QRCodeResult } from '../types/qr-types';

interface QRCodeDisplayProps {
  qrResult: QRCodeResult | null;
  isGenerating: boolean;
}

export const QRCodeDisplay = ({
  qrResult,
  isGenerating,
}: QRCodeDisplayProps) => {
  const renderContent = () => {
    if (qrResult?.error) {
      return (
        <div className='text-center py-8'>
          <div className='text-red-500 mb-2 font-semibold'>
            Failed to generate QR code
          </div>
          <div className='text-sm text-gray-500 mb-2'>{qrResult.error}</div>
          <div className='text-xs text-gray-400'>Data: {qrResult.data}</div>
        </div>
      );
    }

    if (qrResult?.imageUrl) {
      return (
        <img
          src={qrResult.imageUrl}
          alt='Generated QR Code'
          className='w-full h-auto rounded-xl shadow-lg max-w-[300px]'
        />
      );
    }

    if (isGenerating) {
      return (
        <div className='text-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2'></div>
          <p className='text-gray-500 text-sm'>Generating QR code...</p>
        </div>
      );
    }

    return (
      <div className='text-center py-16'>
        <QrCode className='w-16 h-16 text-gray-300 mx-auto mb-4' />
        <p className='text-gray-500'>
          Fill in the form to generate your QR code
        </p>
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center space-y-6'>
      <h2 className='text-2xl font-semibold text-gray-800'>
        Generated QR Code
      </h2>

      <div className='bg-gray-50 rounded-2xl p-8 w-full max-w-sm'>
        <div className='text-center'>
          <div className='flex justify-center min-h-[200px] items-center'>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
