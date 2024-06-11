"use client"
import { useState } from 'react';

function FooterFAQ() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFAQ = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='relative p-0'>
      <div className="flex items-center pt-2 pb-0">
        <span className=''>FAQ</span>
        <div
          className='ml-auto transform -translate-y-1/2'
          onClick={toggleFAQ}
        >
          {/* this is the little arrow thing */}
          <svg
            className={`h-5 w-5 ${isExpanded ? 'transform rotate-90' : ''}`}
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M9 5l7 7-7 7' />
          </svg>
        </div>
      </div>
      {isExpanded && (
        <div className='text-white text-sm mt-2 p-2 pb-2'>
          <p>insert stuff here!</p>
        </div>
      )}
    </div>
  );
}

export default FooterFAQ;
