import { Palette } from 'lucide-react';
import { QRCodeColors } from '../types/qr-types';

interface ColorCustomizerProps {
  colors: QRCodeColors;
  onChange: (colors: Partial<QRCodeColors>) => void;
}

export const ColorCustomizer = ({ colors, onChange }: ColorCustomizerProps) => {
  return (
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
              value={colors.foreground}
              onChange={(e) => onChange({ foreground: e.target.value })}
              placeholder='#000000'
              className='w-full pl-4 pr-16 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono'
            />
            <input
              type='color'
              value={colors.foreground}
              onChange={(e) => onChange({ foreground: e.target.value })}
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
              value={colors.background}
              onChange={(e) => onChange({ background: e.target.value })}
              placeholder='#ffffff'
              className='w-full pl-4 pr-16 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono'
            />
            <input
              type='color'
              value={colors.background}
              onChange={(e) => onChange({ background: e.target.value })}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-8 rounded-lg border border-gray-300 cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
