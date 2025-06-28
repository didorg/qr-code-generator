interface TextFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextForm = ({ value, onChange }: TextFormProps) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        Text Content
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Enter any text to generate QR code...'
        rows={4}
        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none'
      />
    </div>
  );
};
