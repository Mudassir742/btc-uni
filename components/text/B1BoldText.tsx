

import React from 'react';

interface B1BoldTextProps {
  text: string;
}

const B1BoldText: React.FunctionComponent<B1BoldTextProps> = ({ text = '' }) => {
  const B1BoldTextStylesMobile: React.CSSProperties = {
   
    fontWeight: 'bold',
  
    fontStyle: 'normal',
    
    fontSize: '13px',
    lineHeight: '150%',
    letterSpacing: '-0.015px',
    color: '#000000',
  };

  const B1BoldTextStylesDesktop: React.CSSProperties = {
    fontWeight: 'bold',
  
    fontStyle: 'normal',
    
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '-0.015px',
    color: '#000000',
  };

  return (
    <>
      <div className='hidden md:block'>
        <h2 className="" style={B1BoldTextStylesDesktop}>
          {text}
        </h2>
      </div>

      <div className='md:hidden'>
        <h2 className="" style={B1BoldTextStylesMobile}>
          {text}
        </h2>
      </div>
    </>
  );
};

export default B1BoldText;


{/* 
<B1BoldText text="Hello" /> 
*/}