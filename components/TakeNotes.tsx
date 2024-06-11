"use client"
import React, { useState } from 'react';
import SH1Text from './text/SH1Text';
import Certificate from './icons/Certificate';
import Formulas from './icons/Formulas';
import SH4Text from './text/SH4Text';
import CertificateIcon from './icons/CertificateIcon';
import B1Text from './text/B1Text';
import B2Text from './text/B2Text';
import { Button } from './ui/Button';

const TakeNotes = () => {
  // Step 1: Create state to store user's input text and save date
  const [userText, setUserText] = useState('');
  const [saveDate, setSaveDate] = useState('Last Saved');

  // Step 2: Create a function to handle text input changes
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(event.target.value);
  };

  // Step 3: Create a function to handle save button click
  const handleSaveClick = () => {
    // Update the save date with the current date and time
    const currentDateTime = new Date().toLocaleString();
    setSaveDate(currentDateTime);
  };

  return (
    <div className='border max-w-[994px] '>
      <div className='bg-gray-300 border h-[38px] md:h-[43px] px-3 flex items-center'>
       <SH4Text text='MY NOTES'/>
       
      </div>
      <div className='px-[16px]'>
        <textarea
          value={userText}
          onChange={handleTextChange}
          placeholder="Type your notes here..."
          className="w-full min-h-[30px] resize-y p-2"
        />
      </div>
      <div className='flex justify-between p-4 items-center'>
        <button onClick={handleSaveClick}>
          <Button>
            Save
          </Button>
        </button>
        <div className='text-right'>
         <B2Text text={saveDate}/> 
        </div>
      </div>
      
    </div>
  );
};

export default TakeNotes;
