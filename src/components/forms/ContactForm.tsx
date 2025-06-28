import { ContactInfo } from '../../types/qr-types';

interface ContactFormProps {
  contact: ContactInfo;
  onChange: (contact: Partial<ContactInfo>) => void;
}

export const ContactForm = ({ contact, onChange }: ContactFormProps) => {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            First Name
          </label>
          <input
            type='text'
            value={contact.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
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
            value={contact.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
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
          value={contact.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
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
          value={contact.email}
          onChange={(e) => onChange({ email: e.target.value })}
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
          value={contact.organization}
          onChange={(e) => onChange({ organization: e.target.value })}
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
          value={contact.url}
          onChange={(e) => onChange({ url: e.target.value })}
          placeholder='https://example.com'
          className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
        />
      </div>
    </div>
  );
};
