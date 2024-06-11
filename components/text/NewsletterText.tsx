


{/* 
<NewsletterText text="Hello" /> 
*/}

import React from 'react';

interface NewsletterTextProps {
  text: string;
}

const NewsletterText: React.FunctionComponent<NewsletterTextProps> = ({ text = '' }) => {
  const NewsletterTextStylesMobile: React.CSSProperties = {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '125%',
    letterSpacing: '0.64px',
    color: '#FFF',
  };

  const NewsletterTextStylesDesktop: React.CSSProperties = {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '125%',
    letterSpacing: '0.64px',
    color: '#FFF',
  };

  return (
    <>
      <div className='hidden md:block'>
        <p className="" style={NewsletterTextStylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p className="" style={NewsletterTextStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default NewsletterText;
