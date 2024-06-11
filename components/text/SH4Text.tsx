import React from 'react';

interface SH4TextProps {
  text: string;
  color?: string; // Add color prop with a default value of "black"
}

const SH4Text: React.FunctionComponent<SH4TextProps> = ({ text = '', color = 'black' }) => {
  const SH4stylesMobile: React.CSSProperties = {
 
    fontWeight: '900',
    fontSize: '12px',
    flex: 'none',
    alignItems: 'center',
    letterSpacing: '0.64px',
    color: color, // Use the color prop here
    paddingTop: '1px',
    width: '41px',
  };

  const SH4stylesDesktop: React.CSSProperties = {

    fontWeight: '900',
    fontSize: '16px',
    flex: 'none',
    alignItems: 'center',
    letterSpacing: '0.64px',
    color: color, // Use the color prop here
    paddingTop: '1px',
    width: '41px',
  };

  return (
    <>
      <div className='hidden md:block'>
        <p  style={SH4stylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p  style={SH4stylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default SH4Text;
