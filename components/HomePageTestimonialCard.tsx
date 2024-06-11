import React from 'react';
import Stars from './icons/Stars';

import B1Text from './text/B1Text';
import { Rating } from '@mui/material';
const themeColor = "#523D34";
const HomePageTestimonialCard = () => {
  return (
    <div className="container mx-auto pr-5 pl-5 w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-4">
         {/* to do: i need to be initials. update, similar to the testimonials.  */}
        </div>
        <div className="flex justify-center">
        <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly style={{ color: themeColor }} />

        </div>
      
          <B1Text text="Body text goes here...blah blah blah. btcu is so cool!" />
        
      </div>
    </div>
  );
};

export default HomePageTestimonialCard;






// TO DO: dynamically pull in image, body, and rating