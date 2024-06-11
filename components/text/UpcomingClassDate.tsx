import React from 'react';
import SH2Text from './SH2Text';

interface UpComingClassDateProps {
  date: string;
}

const UpComingClassDate: React.FC<UpComingClassDateProps> = ({ date }) => {
  return (
    <div className="text-themeColor text-sm font-semibold leading-[150%]">

    {date}
       
   
    </div>
  );
};

export default UpComingClassDate;






// to do: dynamically pull this in, also this should dispear once date has passed