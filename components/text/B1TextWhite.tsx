
import React from 'react';

interface B1TextWhiteProps {
  text: string;
  color: string;

}

const B1TextWhite: React.FunctionComponent<B1TextWhiteProps> = ({ text = '', color = 'white' }) => {
  const B1TextWhiteStylesMobile: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '150%',
    letterSpacing: '-0.015px',
    color: color,
  };

  const B1TextWhiteStylesDesktop: React.CSSProperties = {
  
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '-0.015em',
    color: color,
  };

  return (
    <>
      <div className='hidden md:block'>
        <p className="" style={B1TextWhiteStylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p className="" style={B1TextWhiteStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default B1TextWhite;



{/* 
<B1Text text="Hello" /> 
*/}