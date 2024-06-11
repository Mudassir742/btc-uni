

import React from 'react';

interface CertClassTitleProps {
  text: string;
}

const CertClassTitle: React.FunctionComponent<CertClassTitleProps> = ({ text = '' }) => {
  const CertClassTitleStylesMobile: React.CSSProperties = {

    fontSize: '64px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    color: 'var(--Rich-Black, #000)',
    textAlign: 'center',
  };

  const CertClassTitleStylesDesktop: React.CSSProperties = {
   
    fontSize: '64px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    color: 'var(--Rich-Black, #000)',
    textAlign: 'center',
  };

  return (
    <>
  <div className='hidden md:block'>
        <p className="" style={CertClassTitleStylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p className="" style={CertClassTitleStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default CertClassTitle;
