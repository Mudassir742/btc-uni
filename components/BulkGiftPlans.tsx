
"use client";
import React, { useState } from 'react';
import B1Text from './text/B1Text';
import Down from './icons/Down';
interface BulkGiftPlansProps {
  setSelectedPlan: React.Dispatch<React.SetStateAction<string | null>>;
}
function BulkGiftPlans({ setSelectedPlan }: BulkGiftPlansProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(() => option);
    setSelectedPlan(option);
  };
  return (
    <div>
      <div className="text-left">
        <ul className="list-none space-y-4">
          <li
            onClick={() => handleOptionClick('Option 1')}
            className="flex items-center"
          >
            <span
              className={`mr-2 text-${selectedOption === 'Option 1' ? '[#C3A08D]' : 'black'
                }`}
            >
              {selectedOption === 'Option 1' ? '●' : '○'}
            </span>
            <B1Text text='Gift An Annual Subscription' />
          </li>
          <li
            onClick={() => handleOptionClick('Option 2')}
            className="flex items-center"
          >
            <span
              className={`mr-2 text-${selectedOption === 'Option 2' ? '[#C3A08D]' : 'black'
                }`}
            >
              {selectedOption === 'Option 2' ? '●' : '○'}
            </span>
            <B1Text text='Purchase Bulk Subscription' />
          </li>
          <li>
          <label htmlFor="bulksubamount" className='invisible'>Specialty</label>
        <select
          id="bulksubamount"
          name="bulksubamount"
              className='appearance-none h-14 p-2.5 border-solid border border-border font-sans text-sm bg-pressedGrey text-themeColor focus:text-themeColor cursor-pointer'>
              <option value='' className='text-sm font-sans text-themeColor'>2 Subscriptions ($99 each) </option>
          <option value="2" className='text-sm font-sans text-themeColor'>3 Subscriptions ($99 each) </option>
          <option value="3" className='text-sm font-sans text-themeColor'>4 Subscriptions ($99 each)</option>
          <option value="4" className='text-sm font-sans text-themeColor'>5 Subscriptions ($99 each)</option>
        </select>
          </li>

        </ul>

      </div>
      <div>

      </div>
    </div>

  );
}

export default BulkGiftPlans;


// TO DO: MAKE THE OPTIONS ACTUALLY TALK TO STRIPE
        {/* insert a drop down... drop down will become clickable only if bulk sub is selected...  */}

