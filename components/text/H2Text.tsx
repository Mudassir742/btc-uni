
{/* <H2Text text="Hello" /> */}


import React from 'react';

interface H2TextProps {
  text: string;
  className?: string;
}

const H2Text: React.FunctionComponent<H2TextProps> = ({ className, text = '' }) => {
  const H2TextStylesMobile: React.CSSProperties = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '120%',
    display: 'flex',
    alignItems: 'center',
    flex: 'none',
  };

  const H2TextStylesDesktop: React.CSSProperties = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '32px',
    lineHeight: '120%',
    display: 'flex',
    alignItems: 'center',  
    flex: 'none',
  };

  return (
    <>
      <div className='hidden md:block'>
        <h2 className={className} style={H2TextStylesDesktop}>
          {text}
        </h2>
      </div>

      <div className='md:hidden'>
        <h2 className={className} style={H2TextStylesMobile}>
          {text}
        </h2>
      </div>
    </>
  );
};

export default H2Text;
