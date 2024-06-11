import React from 'react';

import { TestimonialMetadata } from '@/interfaces';
import RatingStar from './RatingStar';
import { Course } from '@/interfaces';
import ParagraphSmall from './text/ParagraphSmall';
import CourseTitle from './text/CourseTitle';

interface TestimonialsCardProps {
  firstname: string;
  lastname: string;
  rating: number;
  date: string;
  body: string;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({
  firstname,
  lastname,
  rating,
  date,
  body
}) => {
  if (typeof rating !== 'number' || rating < 0 || rating > 100) {
    console.error("Invalid rating value:", rating);
    return null; // or render some error state
  }

  // Convert the rating from a scale of 0-100 to a scale of 0-5.
  const theRating = Math.round((rating === 0 ? 100 : rating) / 20);
  const filledStarsCount = Math.min(5, theRating);
  const emptyStarsCount = 5 - filledStarsCount;

  const filledStars = Array(filledStarsCount).fill(true);
  const emptyStars = Array(emptyStarsCount).fill(false);
  const name = firstname + " " + lastname;

  // Format the date prop
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Extract the person's initials
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');

  return (






    <div className='testimonial-card'>



      <div className="max-w-[400px] md:max-w-[688px] overflow-y-auto">
        <div >
          <div className="flex">
            <div className="mr-4 flex justify-center items-center  ">
              <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center text-white">
                {initials}
              </div>
            </div>
            <div className="flex flex-col max-w-[577px]">
              <div className="items-center  text-themeColor">
                <div className="flex items-center">
                  <CourseTitle text={`${firstname} ${lastname}`} />

                  <div className="flex flex-grow justify-end  items-center pl-3">
                    {filledStars.map((_, idx) => (
                      <RatingStar key={idx} fill="#523D34" stroke="#523D34" size={16} />
                    ))}
                    {emptyStars.map((_, idx) => (
                      <RatingStar key={idx + filledStarsCount} fill="white" stroke="black" size={16} />
                    ))}
                  </div>
                </div>




                <ParagraphSmall text={formattedDate} className='text-secondarythemecolor' />

              </div>
             

            
              {/* <div className="flex items-center mt-2">
                    <div className="flex">
                      <B1Text text={`${firstname} ${lastname}`} /> &nbsp;|&nbsp; <B1Text text={formattedDate} />
                    </div>
                  </div> */}

            </div>
          </div>
          <div className="text-secondary font-poppins text-xs md:text-sm font-normal text-secondarythemecolor pt-[10px]">
            <ParagraphSmall text={body} className='text-secondarythemecolor' />

        
          </div>
          <div className='pt-1'>
            {/* <hr className="w-full border-t border-dashed border-border" /> */}
            <div className='grey-line' />
          </div>
        </div>
      </div>
    </div>





  );
}


export default TestimonialsCard;

