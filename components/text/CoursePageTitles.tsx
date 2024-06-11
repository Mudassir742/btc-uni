import React from 'react';

interface CoursePageTitlesProps {
  text: string;
  color?: string; // Add color prop with a default value of "black"
}

const CoursePageTitles: React.FunctionComponent<CoursePageTitlesProps> = ({ text = '', color = 'black' }) => {
  const StylesMobile: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    color: color, 
    overflow: 'hidden',
     textOverflow: 'ellipsis',
  
  };

  const StylesDesktop: React.CSSProperties = {

    fontStyle: 'normal',
    fontWeight: '4000',
    fontSize: '26px',
    display: 'flex',
    alignItems: 'center',
    color: color, 
    overflow: 'hidden',
     textOverflow: 'ellipsis',
  

  };

  return (
    <>
      <div className='hidden md:block'>
        <p className="text-center" style={StylesDesktop}>
          {text}
        </p>
      </div>

      <div className='md:hidden'>
        <p className="text-center" style={StylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default CoursePageTitles;
