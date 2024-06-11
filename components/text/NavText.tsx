import React from 'react';

interface NavTextProps {
  text: string;
  color?: string; // Add color prop with a default value of "black"
  className?: string;
}

const NavText: React.FunctionComponent<NavTextProps> = ({ className, text = '', color = 'themeColor' }) => {
  const navTextStylesMobile: React.CSSProperties = {
   
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: 'normal',
    flex: 'none',
    // alignItems: 'center',
    // letterSpacing: '0.48px',
    color: color, 
  
  };

  const navTextStylesDesktop: React.CSSProperties = {
 
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: 'normal',
    flex: 'none',
    // alignItems: 'center',
    // letterSpacing: '0.48px',
    color: color, 
 
  };

  return (
    <>
      <div className='hidden md:block'>
      <p className={className} style={navTextStylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
      <p className={className} style={navTextStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default NavText;
