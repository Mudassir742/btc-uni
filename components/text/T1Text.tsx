


{/* <T1Text text="Hello" /> */}
import React from 'react';

interface T1TextProps {
  text: string;
}

const T1Text: React.FunctionComponent<T1TextProps> = ({ text = '' }) => {
  const T1TextStylesMobile: React.CSSProperties = {
  
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '100%',
    margin: '0', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const T1TextStylesDesktop: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '100%',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      <div className='hidden md:block'>
        <p  style={T1TextStylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p  style={T1TextStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};
 
export default T1Text;
