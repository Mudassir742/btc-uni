import React from 'react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fill?: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange, fill }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="bg-white border border-border rounded-xl flex flex-col items-start p-2" style={{ fill, width: '396px' }}>
      <label htmlFor="date-input" className="mb-1">{label}</label>
      <input 
        className="w-full bg-transparent focus:outline-none" 
        type="date" 
        value={value} 
        onChange={handleInputChange} 
        id="date-input"
      />
    </div>
  );
};

export default DateInput;
