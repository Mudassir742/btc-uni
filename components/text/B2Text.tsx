
import { cn } from "@/utils/shadcn";


import React from 'react';

interface B2TextProps {
  text: string;
  className?: string;
}

const B2Text: React.FunctionComponent<B2TextProps> = ({ className, text = '' }) => {
  const StylesMobile: React.CSSProperties = {
   
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '200%',
    letterSpacing: '-0.015em',

    margin: '0',
  };

  const StylesDesktop: React.CSSProperties = {
   
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '200%',
    letterSpacing: '-0.015em',

    margin: '0',
  };

  return (
    <>
      <div className="hidden md:block">
        <p className={cn("", className)} style={StylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden">
        <p className={cn("", className)} style={StylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default B2Text;
