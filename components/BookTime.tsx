"use client"
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { Button } from './ui/Button';
import BackWithOnClick from './buttons/BackWithOnClick';
import SH1Text from './text/SH1Text';
import FullBTCULogoSVG from './icons/FullBTCULogoSVG';
import SH2Text from './text/SH2Text';

const columnStyles = {
  borderRight: '1px solid #ccc',
  paddingRight: '1rem',
};

interface BookTimeProps {
  available: boolean;
  educatorName: string;
}

const BookTime: React.FC<BookTimeProps> = ({ educatorName, available }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setSelectedOption(''); 
  };

  const buttonText = available ? 'Book Time With Me' : 'Join Waitlist';

  return (
    <div>
      <div className="med-space" />
      <div>
        <Button variant='secondary' onClick={togglePopup}>{buttonText}</Button>
      </div>
      <div className='p-4'>
        <Dialog open={showPopup} onClose={togglePopup} maxWidth="md" fullWidth>
          <BackWithOnClick onClick={togglePopup} />
          <DialogContent className="flex-1 overflow-y-auto">
            <FullBTCULogoSVG height={'24'} />
            {available ? (
              <div>
                <SH1Text text='Book a video call' className='text-themeColor' />
                <Button onClick={() => setSelectedOption('15 minute session: Ask three or more questions, something, something, something.  Ideal for cut questions???')}>
                  15 min
                </Button>
                <Button onClick={() => setSelectedOption('30 min session: Ask three or more questions, something, something, something. Ideal for color questions???')}>
                  30 min
                </Button>
                <Button onClick={() => setSelectedOption('45 mins session: Ask five or more questions, something, something, something. Ideal for social media account reviews???')}>
                  45 min
                </Button>
                <Button onClick={() => setSelectedOption('60 min session: Ask eight or more questions, something, something, something. Ideal for ???')}>
                  60 min
                </Button>
                <Button onClick={() => setSelectedOption('75 min session: Ask nine or more questions, something, something, something. Ideal for ???')}>
                  75 min
                </Button>
                <Button onClick={() => setSelectedOption('90 min session: Ask ten or more questions, something, something, something. Ideal for ???')}>
                  90 min
                </Button>
                {selectedOption && (
                  <div>
                    What to expect:  {selectedOption}
                  </div>
                )}
                 <div className='calendar'>
                 <SH2Text text='calendar here' />
                </div>
                <div className='price'>
                <SH2Text text='price here, will update depending on video options above & price that educator adds in. ' />

                </div>
              
              </div>
            ) : (
              <div>

                <SH2Text text='Sessions sold out!' />
                <SH1Text
                  text={`Join the waitlist`}
                  className='text-themeColor'
                />
                <SH2Text
                  text={`Get priority access when ${educatorName} this expert unlocks new sessions!`}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BookTime;
