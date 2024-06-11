import React from 'react';
import SH4Text from './SH4Text';
import SH2Text from './SH2Text';

interface LiveTextProps {
  textColor: string;
  themeColor: string;
}

const LiveText: React.FunctionComponent<LiveTextProps> = ({ themeColor, textColor }) => {
  const StylesMobile: React.CSSProperties = {
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '125%',
    display: 'flex',
    textTransform: 'none',
    letterSpacing: '0.04em',
    color: textColor,
 
    textAlign: 'center',
  };

  const StylesDesktop: React.CSSProperties = {
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '125%',
    display: 'flex',
    textTransform: 'none',
    letterSpacing: '0.04em',
    color: textColor,
    textAlign: 'center',
  };

  return (
    <>
 {/* Mobile */}
<div className='md:hidden py-2'>
<div className={`rounded-xl h-[35px] flex justify-center items-center`} style={{ background: themeColor }}>
  <p className="px-2 items-center justify-center" style={StylesMobile}>
    <SH2Text
      text='LIVE:'
    />
  </p>
</div>
  </div>


  {/* Desktop */}
<div className='hidden md:block'>
<div className={`rounded-xl h-[35px] flex justify-center items-center`} style={{ background: themeColor }}>
  <p className="px-2 items-center justify-center" style={StylesDesktop}>
    <SH2Text
      text='LIVE:'
    />
  </p>
</div>
  </div>







     
    </>
  );
};

export default LiveText;
