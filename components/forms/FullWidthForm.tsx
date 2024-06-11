import React, { ReactNode, useState } from 'react';
import B1Text from '../text/B1Text';

interface FullWidthFormProps {
  placeholder: string;
  fill?: string;
  icon?: React.ReactNode;
  borderColor?: string;
  type?: string;
  name?: string;
  defaultValue?: string;
  autoComplete?: string;
}

const FullWidthForm = ({
  placeholder,
  fill,
  icon,
  borderColor,
  type = 'text',
  name = '',
  defaultValue = '',
  autoComplete = '',
}: FullWidthFormProps) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [hasInput, setHasInput] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setHasInput(newValue !== ''); // Set hasInput based on whether there's any input
  };

  return (
    <div className='justify-center items-center'>
      <form 
        id="full-width-form"
        className='p-3 flex appearance-none h-14 w-full max-w-[395.154px] border-solid border border-border'
      >
        <div className='relative flex items-center'>
          {icon && <div className='mr-1'>{icon}</div>}
          <input
            type={type}
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            autoComplete={autoComplete}
            className={`border-none outline-none w-full`}
            placeholder={placeholder}
          />
        </div>
      </form>
    </div>
  );
};

export default FullWidthForm;






{/* <FullWidthForm
        placeholder="Enter something"
        borderColor="blue" // You can specify the border color here
        icon={<i className="fas fa-search"></i>} // Example icon using Font Awesome
        type="text" // Default type is text, so you can omit this line
        name="searchInput"
        defaultValue="Hello, world!"
        autoComplete="off" // Example, you can set the desired autocomplete behavior
      /> */}



{/* <FullWidthForm
  placeholder="Enter something"
  icon={<Search />}
  name="searchInput"
/> */}