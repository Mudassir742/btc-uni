import React from 'react';
import SH4Text from '../text/SH4Text';

interface NextButtonProps {
  handleNext: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ handleNext }) => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleNext}
        className="inline-flex justify-center text-white border-white bg-black box-border flex-row items-center p-6 w-48 h-14 gap-2  border-[1px] rounded-xl"
        style={{
    
          fontStyle: 'normal',
          fontWeight: '900',
          fontSize: '12px',
          lineHeight: '14px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          letterSpacing: '0.04em',
          flex: 'none',
          order: 0,
          flexGrow: 0,
          boxSizing: 'border-box',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: '24px',
          width: '192px',
          height: '60px',
          gap: '10px',
          borderRadius: '8px',
        }}
      >
             <SH4Text text='NEXT'/>

      </button>
    </div>
  );
};

export default NextButton;
