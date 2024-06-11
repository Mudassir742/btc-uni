import React, { ReactNode, useState } from 'react';
import { Search } from 'lucide-react';



interface FullWidthFormSearchProps {

  onSearch: (value: string) => void; // New prop to pass search term
}
 
const FullWidthFormSearch = ({ onSearch }: FullWidthFormSearchProps) => {
  const [value, setValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSearch(newValue); // Send search term back to parent component
  };

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <form className='bg-white rounded-xl' id='full-width-form-search'>
        <div className='flex items-center'>
          <input
            type='text'
            value={value}
            onChange={handleInputChange}
            className='border-none outline-none px-2'
            placeholder='Search...'
          />
          <button type="submit">
            <Search color='white' />

          </button>
        </div>
      </form>
    </div>
  );
};

export default FullWidthFormSearch;



