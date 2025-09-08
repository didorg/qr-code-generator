interface URLFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const URLForm = ({ value, onChange }: URLFormProps) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        Website URL
      </label>
      <input
        type='url'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='example.com or https://example.com'
        className='input'
      />
      <p className='text-xs text-slate-gray mt-1'>
        Enter a website URL. If you don't include http://, we'll add https://
        automatically.
      </p>
    </div>
  );
};
