import React from 'react';
import CourseFormulasCard from './CourseFormulasCard';
import SH1Text from './text/SH1Text';
import { Rating } from '@mui/material';
import { Educator, SpecialReview } from '@/interfaces';
import ReviewsTestimonials from './text/ReviewsTestimonials';
import Image from 'next/image';
import EducatorTeamCard from './EducatorTeamCard';
import Link from 'next/link';
import { Button } from './ui/Button';
import TrailerVideoPlayer from './TrailerVideoPlayer';
import Herotext from './text/Hero';
import H1Text from './text/H1Text';



interface CourseSpotlightProps {
  courseTitle: string;
  courseSlug: string;
  courseTrailerId: string;
  courseDetailImage: string;
  educators: Educator[];
  specialReviews: SpecialReview[];
}



const themeColor = "#523D34";
const trailerStartTime = 0;
// const review1 = 'orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque posuere vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in morem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque posuere vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in m'
// const review1Name = 'Briana S.'
// const review2 = 'oie vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in morem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque posuere vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in m'
// const review2Name = 'Mila S.'
// const review3 = 't. Aliquam scelerisque posuere vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in morem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque posuere vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in m'
// const review3Name = 'Jen B.'

interface ReviewCardProps {
  reviewText: string;
  reviewName: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewText, reviewName }) => (
  <div className='review-card px-4 gap-4'>
    <div className='py-6 px-4 w-[310px]  bg-white rounded-2xl'>
      <div className='max-h-[156px] '>
        <ReviewsTestimonials text={reviewText} />
      </div>
      <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly style={{ color: themeColor }} />
      <div className='max-h-[26px]'>
        <ReviewsTestimonials text={reviewName} className='text-[#808080]' />
      </div>
    </div>
  </div>
);



const CourseSpotlight: React.FC<CourseSpotlightProps> = ({
  courseTitle,
  courseSlug,
  educators,
  courseTrailerId,
  courseDetailImage,
  specialReviews }) => {

  // create the educator cards -- DEPRECATED because Vercel was giving me Error: Missing "key" prop for element in iterator  react/jsx-key
  // const createEducatorCards = (educators: Educator[]) => {
  //   if (!Array.isArray(educators)) {
  //     // Handle the case where educators is not an array, e.g., return null or an empty array
  //     return null; // or []
  //   }

  //   return educators.map((educator: Educator, index) => (
  //     <EducatorTeamCard
  //       key={index} educator={educator} numberOfCourses={(educator.educatorMetaData?.courses || []).length}
  //     />
  //   ));
  // };
  // const educatorHorizontalCards = createEducatorCards(educators);

  // create the special review cards -- DEPRECATED because Vercel was giving me Error: Missing "key" prop for element in iterator  react/jsx-key
  // const createReviewCards = (specialReviews: SpecialReview[]) => {
  //   if (!Array.isArray(specialReviews)) {
  //     // Handle the case where educators is not an array, e.g., return null or an empty array
  //     return null; // or []
  //   }

  //   return specialReviews.map((specialReview: SpecialReview, index) => (
  //     <div>
  //       <ReviewCard key={index} reviewText={specialReview.content} reviewName={specialReview.reviewerName} />
  //     </div>
  //   ));
  // };

  // const reviewCards = createReviewCards(specialReviews);


  return (
    <div className="bg-themecolor-50 w-full">
      {/* Mobile */}
      <div className='md:hidden'>
        <div className="med-space" />

        <H1Text
          text="Course Spotlight"
          className="text-themeColor container"
        />
        <div className='space-under-category-titles' />
        {courseTrailerId === "" ? (

          <Image
            src={courseDetailImage}
            alt={courseTitle}
            width="1000"  // Set width to 100% to take up full width
            height="1000" // Set height to auto to maintain aspect ratio
            className="object-cover"

          />
        ) : (
          <TrailerVideoPlayer
            videoId={courseTrailerId}
          // startTime={trailerStartTime} 
          />
        )}

        <div className='space-under-category-titles' />

        <Herotext
          text={courseTitle}
          className='container'
        />
        <div className='space-under-category-titles' />
        <div className=' w-full container' >
          {/* {educatorHorizontalCards} */}
          {educators?.map((educator: Educator, index) => (
            <EducatorTeamCard
              key={index} educator={educator} numberOfCourses={(educator.educatorMetaData?.courses || []).length}
            />
          ))}
        </div>
        <div className="med-space" />
        <div className='container'>
          <Link href={`/courses/${courseSlug}`}>
            <Button >Course Details</Button>
          </Link>
        </div>

        <div className='mx-auto'>
          <div className="med-space" />
          <SH1Text
            text="Read the Reviews"
            className="!text-themeColor container"
          />
          <div className="space-under-category-titles" /> 
          <div className='flex overflow-x-scroll custom-scrollbar slider-container'>


            {/* <div>
  <ReviewCard reviewText={review1} reviewName={review1Name} />
</div>
<div>
  <ReviewCard reviewText={review2} reviewName={review2Name} />
</div>
<div>
  <ReviewCard reviewText={review3} reviewName={review3Name} />
</div> */}
            {/* {reviewCards} */}
            {specialReviews?.map((specialReview: SpecialReview, index) => (
              <ReviewCard key={index} reviewText={specialReview.content} reviewName={specialReview.reviewerName} />
            ))}
          </div>
          <div className="med-space" />

          <div className=' container '>
       

            <Link href={`/courses/${courseSlug}`}>
              <Button variant={'secondary'}> Read All Reviews</Button>
            </Link>
          </div>

        </div>


        <div className="med-space" />
        <div className="med-space" />
      </div>


    </div>


  );
}

export default CourseSpotlight;




