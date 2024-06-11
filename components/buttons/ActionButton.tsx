import React from 'react';
import Link from 'next/link';
import ButtonText from '../text/ButtonText';
import { cn } from '@/utils/shadcn';
 
type ActionButtonProps = {
  text: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  className?: string,
  icon?: React.ReactNode;
  link: string;
};

const ActionButton = ({
  text,
  textColor = 'white',
  borderColor = 'themeColor',
  backgroundColor = 'themeColor',
  className,
  icon,
  link,
}: ActionButtonProps) => {
  return (
    <>
      {/* Visible on Mobile */}
      <Link href={link}>
        <div className="md:hidden">
          <div className='pt-[12px] pb-[0px] pr-[8px] pl-[8px]'>
            <div
              className={cn(`inline-flex justify-center items-center text-${textColor} border-[2px] border-${borderColor} bg-${backgroundColor}`, className)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px 24px',
                width: '200px',
                height: '48px',
                // background: backgroundColor,
                borderRadius: '90px',
                flex: 'none',
                order: 0,
                flexGrow: 0,
                gap: '12px',
              }}
            >
              {icon}
              <ButtonText text={text} color={textColor} />
            </div>
          </div>
        </div>
      </Link>

      <Link href={link}>

        {/* Visible on Desktop */}
        <div className="hidden md:block">
          <div className='pt-[12px] pb-[0px] pr-[8px] pl-[8px]'>
            <div
              className={cn(`inline-flex justify-center items-center text-${textColor} border-[2px] border-${borderColor} bg-${backgroundColor}`, className)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px 24px',
                width: '200px',
                height: '48px',
                // background: backgroundColor,
                borderRadius: '90px',
                flex: 'none',
                order: 0,
                flexGrow: 0,
                gap: '12px',
              }}
            >
              {icon}
              <ButtonText text={text} color={textColor} />
            </div>
          </div>
        </div >
      </Link>
    </>
  );
};

export default ActionButton;