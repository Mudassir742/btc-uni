import React from 'react';

interface DashboardTitleProps {
  text: string;
  color: string;
}

const DashboardTitle: React.FunctionComponent<DashboardTitleProps> = ({ text = '', color = 'var(--white, #FFF)' }) => {
  const DashboardTitleStylesMobile: React.CSSProperties = {
    
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '22px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.64px',
    flex: 'none',
    color: color,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as 'nowrap',
  };

  const DashboardTitleStylesDesktop: React.CSSProperties = {
    
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '22px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.64px',
    flex: 'none',
    color: color,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as 'nowrap',
  };

  return (
    <>
      <div className='hidden md:block'>
        <p className="" style={DashboardTitleStylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p className="" style={DashboardTitleStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default DashboardTitle;
