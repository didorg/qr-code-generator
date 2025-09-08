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
    <div className='min-h-screen bg-gradient-to-br from-white via-pale-blue/80 to-primary/30 p-4 py-12'>
      <div className='max-container'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-300 via-coral-red/80 to-coral-red rounded-2xl mb-4'>
            <QrCode className='w-10 h-10 text-white' />
          </div>
          <h1 className='font-palanquin text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2'>
            QR Code Generator
          </h1>
          <p className='font-montserrat font-medium text-xl md:text-2xl text-slate-gray'>
            Generate QR codes for URLs, text, and contact information
          </p>
        </div>

        <div className='bg-white rounded-3xl shadow-3xl overflow-hidden'>
          {/* Tab Navigation */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className='p-8'>
            <div className='grid lg:grid-cols-2 gap-8'>
              {/* Input Section */}
              <div className='space-y-6'>
                <h2 className='font-palanquin text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
                  {getFormTitle()}
                </h2>

                {renderForm()}

                <button
                  onClick={handleReset}
                  className='w-full border-2 border-coral-red text-coral-red rounded-xl px-5 py-2.5 hover:bg-coral-red hover:text-white transition font-montserrat'
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

        <div className='text-center mt-8 text-slate-gray text-sm'>
          <p>Generate QR codes instantly • No data stored • Free to use</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
