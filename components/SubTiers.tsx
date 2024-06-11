// TO DO: MAKE THE OPTIONS ACTUALLY TALK TO STRIPE

"use client";
import React, { useState } from 'react';
import Down from './icons/Down';

interface SubTiersProps {
  setSelectedPlan: React.Dispatch<React.SetStateAction<string | null>>;
}

function SubTiers({ setSelectedPlan }: SubTiersProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to track the visibility of the dropdown

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setSelectedPlan(option);
    setDropdownVisible(false); // Hide the dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible); // Toggle the dropdown visibility
  };

  return (
    <div>
    
            <label htmlFor="change-plan" className='invisible'>Annual Plan</label>
        <select
          id="change-plan"
          name="specialty"
        className='appearance-none h-14 p-2.5 border-solid border border-border font-sans text-sm bg-pressedGrey text-themeColor/50 focus:text-themeColor cursor-pointer'>
        <option value='' className='text-sm font-sans text-themeColor'>  <Down fill={'black'} /> </option>

        <option value='1' className='text-sm font-sans text-themeColor'>Annual Plan $9.99/month (Billed Annually)</option>
          <option value="2" className='text-sm font-sans text-themeColor'>Bi-Annual Plan $9.99/month (Billed Every 6 Months)</option>
          <option value="3" className='text-sm font-sans text-themeColor'>Monthly Plan $14.99/month</option>
          <option value="4" className='text-sm font-sans text-themeColor'>Basic Plan $0/mo.&nbsp;</option>
        </select>

   
    </div>
  );
}

export default SubTiers;



   {/* <div className="text-left">
        <ul className="list-none space-y-4">
          <li
            onClick={() => handleOptionClick('Option 1')}
            className="flex items-center"
          >
            <span
              className={`mr-2 text-${selectedOption === 'Option 1' ? '[#C3A08D]' : 'black'}`}
            >
              {selectedOption === 'Option 1' ? '●' : '○'}
            </span>
            <B1Text text='Basic Plan $0/mo.&nbsp; ' />
            <B1BoldText text='$0/mo.&nbsp;' />
            <B1Text text='(Limited Access)' />

          </li>
          <li
            onClick={() => handleOptionClick('Option 2')}
            className="flex items-center"
          >
            <span
              className={`mr-2 text-${selectedOption === 'Option 2' ? '[#C3A08D]' : 'black'}`}
            >
              {selectedOption === 'Option 2' ? '●' : '○'}
            </span>

            <B1Text text='Monthly Plan&nbsp;' />
            <B1BoldText text='$14.99/mo.' />

          </li>
          <li
            onClick={() => handleOptionClick('Option 3')}
            className="flex items-center"
          >
            <span
              className={`mr-2 text-${selectedOption === 'Option 3' ? '[#C3A08D]' : 'black'}`}
            >
              {selectedOption === 'Option 3' ? '●' : '○'}
            </span>
            <B1Text text='Bi-Annual Plan' />
            <B1BoldText text='&nbsp;$9.99/mo.&nbsp;' />
            <B1Text text='(Billed Every 6 Months)' />


          </li>
          <li
            onClick={() => handleOptionClick('Option 4')}
            className="flex items-center"
          >
            <span
              className={`mr-2 text-${selectedOption === 'Option 4' ? '[#C3A08D]' : 'black'}`}
            >
              {selectedOption === 'Option 4' ? '●' : '○'}
            </span>
            <B1Text text='Annual Plan' />
            <B1BoldText text='&nbsp;$9.99/mo.&nbsp;' />
            <B1Text text='(Billed Annually)' />

          </li>

        </ul> */}
      {/* </div> */}