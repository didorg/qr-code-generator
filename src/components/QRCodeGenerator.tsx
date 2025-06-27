import { useState, useEffect } from 'react';
import {
  QrCode,
  Link,
  MessageSquare,
  User,
  Download,
  Copy,
  Check,
  Palette,
} from 'lucide-react';

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  url: string;
}

const QRCodeGenerator = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [qrData, setQrData] = useState('');
  const [copied, setCopied] = useState(false);

  // Color customization state
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  // QR display state
  const [qrImageSrc, setQrImageSrc] = useState('');
  const [qrError, setQrError] = useState('');

  // Form states for different types
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    url: '',
  });

  // QR Code generation using QRious library via CDN
  const generateQRCode = async (text: string) => {
    if (!text.trim()) {
      setQrImageSrc('');
      setQrError('');
      return;
    }

    setQrError('');

    try {
      // Load QRious library dynamically if not already loaded
      if (!window.QRious) {
        const script = document.createElement('script');
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js';
        script.onload = () => {
          createQR(text);
        };
        script.onerror = (error) => {
          console.error('Failed to load QRious library:', error);
          generateFallbackQR(text);
        };
        document.head.appendChild(script);
      } else {
        createQR(text);
      }
    } catch (error) {
      console.error('Error in QR generation:', error);
      generateFallbackQR(text);
    }
  };

  const createQR = (text: string) => {
    try {
      // Create canvas element
      const canvas = document.createElement('canvas');

      // Generate QR code with custom colors
      new window.QRious({
        element: canvas,
        value: text,
        size: 300,
        background: backgroundColor,
        foreground: foregroundColor,
        level: 'M',
      });

      // Convert canvas to image data URL
      const dataURL = canvas.toDataURL();
      setQrImageSrc(dataURL);
    } catch (error) {
      console.error('Error creating QR code with QRious:', error);
      generateFallbackQR(text);
    }
  };

  const generateFallbackQR = (text: string) => {
    try {
      const encodedData = encodeURIComponent(text);

      // Start with simple Google Charts API (most reliable)
      const googleChartsUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodedData}&choe=UTF-8`;

      // Test if the URL is accessible
      const img = new Image();
      img.onload = () => {
        setQrImageSrc(googleChartsUrl);
      };
      img.onerror = () => {
        console.error('Google Charts API failed, trying QR Server');

        // Try QR Server API as backup
        const qrServerUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedData}&format=png`;
        const backupImg = new Image();
        backupImg.onload = () => {
          setQrImageSrc(qrServerUrl);
        };
        backupImg.onerror = () => {
          console.error('All QR APIs failed');
          setQrError(
            'Failed to generate QR code. Please check your internet connection.'
          );
        };
        backupImg.src = qrServerUrl;
      };
      img.src = googleChartsUrl;
    } catch (error) {
      console.error('Error in fallback QR generation:', error);
      setQrError('Failed to generate QR code. Please try again.');
    }
  };

  const formatUrl = (url: string) => {
    if (!url.trim()) return '';

    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  const generateVCard = (contact: ContactInfo) => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName} ${contact.lastName}
N:${contact.lastName};${contact.firstName};;;
ORG:${contact.organization}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.url}
END:VCARD`;
    return vcard;
  };

  useEffect(() => {
    let data = '';

    switch (activeTab) {
      case 'url':
        data = formatUrl(urlInput);
        break;
      case 'text':
        data = textInput;
        break;
      case 'contact':
        if (
          contactInfo.firstName ||
          contactInfo.lastName ||
          contactInfo.phone ||
          contactInfo.email
        ) {
          data = generateVCard(contactInfo);
        }
        break;
      default:
        data = '';
    }

    setQrData(data);
    generateQRCode(data);
  }, [
    activeTab,
    urlInput,
    textInput,
    contactInfo,
    foregroundColor,
    backgroundColor,
  ]);

  const downloadQRCode = () => {
    if (!qrImageSrc) return;

    const link = document.createElement('a');
    link.download = `qr-code-${activeTab}.png`;
    link.href = qrImageSrc;
    link.click();
  };

  const copyToClipboard = async () => {
    if (qrData) {
      try {
        await navigator.clipboard.writeText(qrData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const resetForm = () => {
    setUrlInput('');
    setTextInput('');
    setContactInfo({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      organization: '',
      url: '',
    });
    setQrData('');
    setForegroundColor('#000000');
    setBackgroundColor('#ffffff');
    setQrImageSrc('');
    setQrError('');
  };

  const tabs = [
    { id: 'url', label: 'URL', icon: Link },
    { id: 'text', label: 'Text', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: User },
  ];

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
          <div className='border-b border-gray-200'>
            <nav className='flex'>
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className='w-4 h-4' />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className='p-8'>
            <div className='grid lg:grid-cols-2 gap-8'>
              {/* Input Section */}
              <div className='space-y-6'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                  {activeTab === 'url' && 'Enter URL'}
                  {activeTab === 'text' && 'Enter Text'}
                  {activeTab === 'contact' && 'Contact Information'}
                </h2>

                {/* URL Input */}
                {activeTab === 'url' && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Website URL
                    </label>
                    <input
                      type='url'
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder='example.com or https://example.com'
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                    />
                    <p className='text-xs text-gray-500 mt-1'>
                      Enter a website URL. If you don't include http://, we'll
                      add https:// automatically.
                    </p>
                  </div>
                )}

                {/* Text Input */}
                {activeTab === 'text' && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Text Content
                    </label>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder='Enter any text to generate QR code...'
                      rows={4}
                      className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none'
                    />
                  </div>
                )}

                {/* Contact Input */}
                {activeTab === 'contact' && (
                  <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          First Name
                        </label>
                        <input
                          type='text'
                          value={contactInfo.firstName}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              firstName: e.target.value,
                            })
                          }
                          placeholder='John'
                          className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Last Name
                        </label>
                        <input
                          type='text'
                          value={contactInfo.lastName}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              lastName: e.target.value,
                            })
                          }
                          placeholder='Doe'
                          className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            phone: e.target.value,
                          })
                        }
                        placeholder='+1 (555) 123-4567'
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder='john.doe@example.com'
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Organization
                      </label>
                      <input
                        type='text'
                        value={contactInfo.organization}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            organization: e.target.value,
                          })
                        }
                        placeholder='Company Name'
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Website
                      </label>
                      <input
                        type='url'
                        value={contactInfo.url}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            url: e.target.value,
                          })
                        }
                        placeholder='https://example.com'
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={resetForm}
                  className='w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium'
                >
                  Clear All Fields
                </button>
              </div>

              {/* QR Code Display Section */}
              <div className='flex flex-col items-center space-y-6'>
                <h2 className='text-2xl font-semibold text-gray-800'>
                  Generated QR Code
                </h2>

                <div className='bg-gray-50 rounded-2xl p-8 w-full max-w-sm'>
                  <div className='text-center'>
                    <div className='flex justify-center min-h-[200px] items-center'>
                      {qrError ? (
                        <div className='text-center py-8'>
                          <div className='text-red-500 mb-2 font-semibold'>
                            Failed to generate QR code
                          </div>
                          <div className='text-sm text-gray-500 mb-2'>
                            {qrError}
                          </div>
                          <div className='text-xs text-gray-400'>
                            Data: {qrData}
                          </div>
                        </div>
                      ) : qrImageSrc ? (
                        <img
                          src={qrImageSrc}
                          alt='Generated QR Code'
                          className='w-full h-auto rounded-xl shadow-lg max-w-[300px]'
                        />
                      ) : !qrData ? (
                        <div className='text-center py-16'>
                          <QrCode className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                          <p className='text-gray-500'>
                            Fill in the form to generate your QR code
                          </p>
                        </div>
                      ) : (
                        <div className='text-center py-8'>
                          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2'></div>
                          <p className='text-gray-500 text-sm'>
                            Generating QR code...
                          </p>
                        </div>
                      )}
                    </div>
                    {qrImageSrc && !qrError && (
                      <p className='text-sm text-gray-600 mt-4'>
                        Scan this QR code with your device
                      </p>
                    )}
                  </div>
                </div>

                {/* Color Customization Section */}
                <div className='w-full max-w-sm'>
                  <div className='flex items-center gap-2 mb-4'>
                    <Palette className='w-5 h-5 text-purple-600' />
                    <h3 className='text-lg font-semibold text-gray-800'>
                      Customize Colors
                    </h3>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Foreground Color
                      </label>
                      <div className='relative'>
                        <input
                          type='text'
                          value={foregroundColor}
                          onChange={(e) => setForegroundColor(e.target.value)}
                          placeholder='#000000'
                          className='w-full pl-4 pr-16 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono'
                        />
                        <input
                          type='color'
                          value={foregroundColor}
                          onChange={(e) => setForegroundColor(e.target.value)}
                          className='absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-8 rounded-lg border border-gray-300 cursor-pointer'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Background Color
                      </label>
                      <div className='relative'>
                        <input
                          type='text'
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          placeholder='#ffffff'
                          className='w-full pl-4 pr-16 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono'
                        />
                        <input
                          type='color'
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className='absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-8 rounded-lg border border-gray-300 cursor-pointer'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {qrImageSrc && !qrError && (
                  <div className='flex gap-4 w-full max-w-sm'>
                    <button
                      onClick={downloadQRCode}
                      className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg'
                    >
                      <Download className='w-4 h-4' />
                      Download
                    </button>

                    <button
                      onClick={copyToClipboard}
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
                )}

                {qrData && (
                  <div className='w-full max-w-sm'>
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                      QR Code Data:
                    </h3>
                    <div className='bg-gray-100 rounded-lg p-3 text-xs text-gray-600 max-h-32 overflow-y-auto'>
                      <pre className='whitespace-pre-wrap break-words'>
                        {qrData}
                      </pre>
                    </div>
                  </div>
                )}
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
