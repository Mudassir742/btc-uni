import { cn } from "@/utils/shadcn";
import React from 'react';
import styles from '@/styles/richText.module.css'


interface B1TextProps {
  text: string;

  className?: string;
}

const B1Text: React.FC<B1TextProps> = ({ className, text,  }) => {
  const B1stylesMobile = {

    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '150%',
    letterSpacing: '-0.015px',
  };

  const B1stylesDesktop = {

    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '-0.015em',
  };

  return (
    <>
      <div className="hidden md:block">
   
        <p className={cn(`${styles.postContent}`, className)} style={B1stylesDesktop} dangerouslySetInnerHTML={{ __html: text }}></p>
      </div>

      <div className="md:hidden">
        <p className={cn(`${styles.postContent}`, className)} style={B1stylesMobile} dangerouslySetInnerHTML={{ __html: text }}></p>
      </div>
    </>
  );
};

export default B1Text;