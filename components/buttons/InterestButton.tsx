import React from 'react';
import NavText from '../text/NavText';

interface InterestButtonProps {
  isActive: boolean; // Define the type for isActive prop
  onClick: () => void; // Define the type for onClick prop
  text: string;
}

function InterestButton({ isActive, onClick, text }: InterestButtonProps) {
  return (
    <div className='p-1'>

   
    <button
      className={`
        flex h-[36px] min-w-[84px] items-center
        bg-orange text-white ${isActive ? 'bg-themeColor  border-[1px] border-themeColor' : 'bg-gray-300  border-[1px] border-themeColor'} 
        hover:bg-themeColor rounded-[93px]
      `}
      onClick={onClick}
    >
      <div className='flex justify-center'>
        <NavText text={text} color='white' className='' />
      </div>
    </button>
    </div>
  );
}

export default InterestButton;
