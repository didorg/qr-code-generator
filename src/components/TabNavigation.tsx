import { QRCodeType } from '../types/qr-types';
import { TAB_CONFIGS } from '../constants/tabs';

interface TabNavigationProps {
  activeTab: QRCodeType;
  onTabChange: (tab: QRCodeType) => void;
}

export const TabNavigation = ({
  activeTab,
  onTabChange,
}: TabNavigationProps) => {
  return (
    <div className='border-b border-gray-200'>
      <nav className='flex'>
        {TAB_CONFIGS.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
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
  );
};
