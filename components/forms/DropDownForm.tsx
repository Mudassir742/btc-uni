import React, { ReactNode, useState } from 'react';
import B1Text from '../text/B1Text';
import Down from '../icons/Down';

interface DropDownFormProps {
  placeholder: string;
  fill?: string;
  borderColor?: string;
  name?: string;
  defaultValue?: string;
  options?: string[]; // Add options prop
}

const DropDownForm = ({
  placeholder,
  fill,
  borderColor,
  name = '',
  defaultValue = '',
  options = [], // Initialize options as an empty array
}: DropDownFormProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
  };

  return (
    <div className="relative">
      <select
        name={name}
        value={selectedOption || defaultValue}
        onChange={handleSelectChange}
        className={`appearance-none  w-full max-w-[395.154px] h-14 p-2.5 border-solid border border-border font-sans text-sm text-themeColor focus:text-themeColor cursor-pointer relative z-10`}
      >
        <option value='' className='text-sm font-sans text-themeColor'>
        {selectedOption || defaultValue || placeholder} 
           <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <Down fill='black'/>
        </div>
        
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
            className='text-sm font-sans text-themeColor'
          >
           
            {option}
          </option>
      
        ))}
      </select>

    </div>
  );
};

export default DropDownForm;
