



import { cn } from '@/utils/shadcn';
import React from 'react';

interface H1TextProps {
  text: string;
  className?: string

}

const H1Text: React.FunctionComponent<H1TextProps> = ({ text = '', className = "text-themeColor", }) => {
  const H1TextStylesMobile: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '28px',
    lineHeight: '44px',
    display: 'flex',
    letterSpacing: '-1px',
    flex: 'none',
    order: 1,
    flexGrow: 0,
  };

  const H1TextStylesDesktop: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '42px',
    lineHeight: '44px',
    display: 'flex',
    letterSpacing: '-1px',
    flex: 'none',
    order: 1,
    flexGrow: 0,
  };

  return (
    <>
      <div className='hidden md:block'>
        <h1 className={cn("", className)} style={H1TextStylesDesktop}>
          {text}
        </h1>
      </div>

      <div className='md:hidden'>
        <h1 className={cn("", className)} style={H1TextStylesMobile}>
          {text}
        </h1>
      </div>
    </>
  );
};

export default H1Text;
