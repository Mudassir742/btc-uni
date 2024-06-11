import React from 'react';

interface InputTextProps {
  text: string;
  color?: string; 
  className?: string;
}

const InputTextBold: React.FunctionComponent<InputTextProps> = ({ text, color, className = "text-themeColor", }) => {
  const InputTextStylesMobile: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    color: color, 
    overflow: 'hidden',
     textOverflow: 'ellipsis', 
     whiteSpace: 'nowrap',
  };

  const InputTextStylesDesktop: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    color: color, 
    overflow: 'hidden',
     textOverflow: 'ellipsis',
     whiteSpace: 'nowrap',

  };

  return (
    <>
      <div className='hidden md:block'>
        <p className={className} style={InputTextStylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p className={className} style={InputTextStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default InputTextBold;
