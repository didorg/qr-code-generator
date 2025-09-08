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
        className='input resize-none'
      />
    </div>
  );
};
