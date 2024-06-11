import React from 'react';

interface SH4TextProps {
  text: string;
}



const SH4Text: React.FunctionComponent<SH4TextProps> = ({ text = '', }) => {
  const SH4stylesMobile: React.CSSProperties = {
  
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: '12px',
    // lineHeight: '14px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.04em',
 
  };

  const SH4stylesDesktop: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: '16px',
    // lineHeight: '14px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.04em',
  
  };



  return (
    <>
    <div className='hidden md:block'>
    <h2 className="" style={SH4stylesDesktop}>
        {text}
      </h2>
    </div>

    <div className='md:hidden'>
    <h2 className="" style={SH4stylesMobile}>
        {text}
      </h2>
    </div>

    
     
    </>
  );
};


export default SH4Text;






{/* <SH4Text text="Hello" /> */}