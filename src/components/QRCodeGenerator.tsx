import { useState } from 'react';
import { QrCode } from 'lucide-react';

// Hooks
import { useFormData } from '../hooks/useFormData';
import { useQRCodeGenerator } from '../hooks/useQRCodeGenerator';
import { useClipboard } from '../hooks/useClipboard';

// Components
import { TabNavigation } from './TabNavigation';
import { URLForm, TextForm, ContactForm } from './forms';
import { QRCodeDisplay } from './QRCodeDisplay';
import { ColorCustomizer } from './ColorCustomizer';
import { QRCodeActions } from './QRCodeActions';

// Types
import { QRCodeType } from '../types/qr-types';

const QRCodeGenerator = () => {
  const [activeTab, setActiveTab] = useState<QRCodeType>('url');

  // Custom hooks
  const { formData, updateUrl, updateText, updateContact, resetForm } =
    useFormData();
  const {
    qrResult,
    isGenerating,
    colors,
    updateColors,
    resetColors,
    downloadQRCode,
  } = useQRCodeGenerator(activeTab, formData);
  const { copied, copyToClipboard } = useClipboard();

  const handleReset = () => {
    resetForm();
    resetColors();
  };

  const handleCopy = () => {
    if (qrResult?.data) {
      copyToClipboard(qrResult.data);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'url':
        return <URLForm value={formData.url} onChange={updateUrl} />;
      case 'text':
        return <TextForm value={formData.text} onChange={updateText} />;
      case 'contact':
        return (
          <ContactForm contact={formData.contact} onChange={updateContact} />
        );
      default:
        return null;
    }
  };

  const getFormTitle = () => {
    switch (activeTab) {
      case 'url':
        return 'Enter URL';
      case 'text':
        return 'Enter Text';
      case 'contact':
        return 'Contact Information';
      default:
        return '';
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4'>
            <QrCode className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2'>
            QR Code Generator
          </h1>
          <p className='text-gray-600 text-lg'>
            Generate QR codes for URLs, text, and contact information
          </p>
        </div>

        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
          {/* Tab Navigation */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className='p-8'>
            <div className='grid lg:grid-cols-2 gap-8'>
              {/* Input Section */}
              <div className='space-y-6'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                  {getFormTitle()}
                </h2>

                {renderForm()}

                <button
                  onClick={handleReset}
                  className='w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium'
                >
                  Clear All Fields
                </button>
              </div>

              {/* QR Code Display Section */}
              <div className='flex flex-col items-center space-y-6'>
                <QRCodeDisplay
                  qrResult={qrResult}
                  isGenerating={isGenerating}
                />

                {/* Color Customization */}
                <ColorCustomizer colors={colors} onChange={updateColors} />

                {/* Action Buttons and Data Display */}
                <QRCodeActions
                  qrResult={qrResult}
                  copied={copied}
                  onDownload={downloadQRCode}
                  onCopy={handleCopy}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='text-center mt-8 text-gray-500 text-sm'>
          <p>Generate QR codes instantly • No data stored • Free to use</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
