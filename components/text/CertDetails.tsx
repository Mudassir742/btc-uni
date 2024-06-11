
import React from 'react';

interface CertDetailsProps {
  text: string;
}

const CertDetails: React.FunctionComponent<CertDetailsProps> = ({ text = '' }) => {
  const CertDetailsStylesMobile: React.CSSProperties = {
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    color: 'var(--Rich-Black, #000)',
  
    justifyContent: 'center', // Center horizontally
  };

  const CertDetailsStylesDesktop: React.CSSProperties = {
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    color: 'var(--Rich-Black, #000)',
  
    justifyContent: 'center', // Center horizontally
  };

  return (
    <>
      <div className='hidden md:block'>
        <p className="" style={CertDetailsStylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p className="" style={CertDetailsStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default CertDetails;


{/* 
<CertDetails text="Hello" /> 
*/}
