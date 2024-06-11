"use client"
import React, { useState } from 'react';

import { ChevronRight } from 'lucide-react';
import SH2Text from '@/components/text/SH2Text';
import Down from '@/components/icons/Down';
import SH1Text from '@/components/text/SH1Text';

const Completed = () => {
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);

  const handleCertificateClick = () => {
    setIsCertificateOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleCompletedClick = () => {
    setIsCompletedOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
     
      <div className='p-2'>
        <SH1Text text="Favorite Courses" />
        <div className="flex items-center pt-2 pb-2" onClick={handleCertificateClick}>
          <SH2Text text='ALL'  />
          {isCertificateOpen ? <Down fill={'black'} /> : <ChevronRight />}
        </div>
        {isCertificateOpen && (
          <div className="mt-4 flex pb-2">
            <div className="flex flex-wrap gap-4 justify-center"> {/* Use 'gap-4' class for padding between cards */}
      fav courses here
            </div>
          </div>
        )}
      </div>
      <div className="p-2">
        <SH1Text text="Favorite Educators" />
        <div className="flex items-center pt-2 pb-2" onClick={handleCompletedClick}>
          <SH2Text text='ALL'  />
          {isCompletedOpen ? <Down fill={'black'} /> : <ChevronRight />}
        </div>
        {isCompletedOpen && (
          <div className="mt-4 flex pb-2">
            <div className="flex flex-wrap gap-4 justify-center"> {/* Use 'gap-4' class for padding between cards */}
           

    fav educators here
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Completed;



// to do: dynamically pull completed courses. also this should direct user to the login page if not signed in. 
// update: show all completled courses here and just show based on last completeed. completed means they recieved a Certificate, which is important to note because eventually we will be requiring quizes to get a certificate

