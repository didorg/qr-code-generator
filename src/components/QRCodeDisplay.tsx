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
          <div className='text-sm text-slate-gray mb-2'>{qrResult.error}</div>
          <div className='text-xs text-gray-400'>Data: {qrResult.data}</div>
        </div>
      );
    }

    if (qrResult?.imageUrl) {
      return (
        <img
          src={qrResult.imageUrl}
          alt='Generated QR Code'
          className='block mx-auto w-[300px] max-w-full h-auto rounded-xl shadow-lg'
        />
      );
    }

    if (isGenerating) {
      return (
        <div className='text-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-coral-red mx-auto mb-2'></div>
          <p className='text-slate-gray text-sm'>Generating QR code...</p>
        </div>
      );
    }

    return (
      <div className='text-center py-16'>
        <QrCode className='w-16 h-16 text-gray-300 mx-auto mb-4' />
        <p className='text-slate-gray'>
          Fill in the form to generate your QR code
        </p>
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center space-y-6'>
      <h2 className='font-palanquin text-2xl font-bold text-gray-800'>
        Generated QR Code
      </h2>

      <div className='bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 w-full max-w-sm'>
        <div className='text-center'>
          <div className='flex justify-center min-h-[200px] items-center'>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
