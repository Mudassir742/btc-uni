import React from 'react';
import Image from 'next/image';

import { Course, Educator } from '@/interfaces';
import Link from 'next/link';

import CardTitle from './text/CardTitle';
import CardHandle from './text/CardHandle';

interface SearchResultCourseCardSearchProps {
  course: Course;
}

const completed = false

const SearchResultCourseCard: React.FC<SearchResultCourseCardSearchProps> = ({ course }) => {
  
  const price = course?.courseMetadata?.price?.toString() ?? "";
  const isCourseFree = price === "0";

  // Check if educator or educatorMetaData is undefined
  if (!course || !course.courseMetadata) {
    return null; // Return null or a placeholder for the card
  }

  const mediaItemUrl = course.courseMetadata?.courseThumbnailPicture?.mediaItemUrl || "/placeholder.png";
  const educators = (course.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "");

  // DEPRECATED Oct 2 - Calculate the average rating from testimonials
  // const testimonials = course.courseMetadata?.courseTestimonialsNew || [];
  // const averageRating = testimonials.length > 0
  //   ? testimonials.reduce((sum, testimonial) => sum + testimonial.testimonialMetadata.rating, 0) / testimonials.length
  //   : 0;
  // let adjustedAverageRating = (averageRating / 100) * 5 || 5;
  // DEPRECATED Oct 2 - Get total number of reviews
  // const amountOfReviews = course.courseMetadata.courseTestimonialsNew?.length || 0
  // Star color
  const customColor = "#C4A18D";

  return (
  <main className='py-[10px] '>
      
   <Link href={`/courses/${course.slug}`} >
     
      <div className="flex items-center h-[106.22951px] w-full  bg-themecolor-50 rounded-xl">
        {/* <div style={{ position: 'relative', width: '124px', height: '164px' }}> */}
        <div className='relative w-[80px] '>

          <Image
            src={mediaItemUrl}
            alt={course.title}
            width={80}
            height={106.22951}
            className="h-[106.22951px] w-[80px] object-cover"
          />
          </div>
          <div className=' mr-auto pl-4 justify-start text-left'>
  

    <CardTitle text={course.title} />
  
    {/* <CardHandle text={course.courseMetadata?.maineducatorinstahandl || ""} /> */}
    {educators.length > 0 && (
              <CardHandle text={educators.join(', ')} className="text-secondarythemecolor" />
    )}
  </div>
  
          {/* <Duration /> */}

          {/* <FreeText price={price} />
          {completed && (
            <div
              style={{
                zIndex: '2',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                borderColor: 'white',
                backgroundColor: 'white', // Set background color to white
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Checkmark fill={'#C4A18D'} width={40} height={40} />
            </div>
          )} */}
      
     

            {/* MIHAI NOTE !!! (to do if below will be needed again): add back averageRating and noOfTestimonials to SEARCH_QUERY_COURSES query */}
            {/* {course.courseMetadata.noOfTestimonials && course.courseMetadata.noOfTestimonials > 0 && (
              <div className="flex">
                <Rating name="half-rating-read" defaultValue={course.courseMetadata?.averageRating || 0} precision={0.5} readOnly style={{ color: customColor }} />
              </div>
            )}
            {course.courseMetadata.noOfTestimonials && course.courseMetadata.noOfTestimonials > 0 && (
              <div className="flex">
                <B1Text text={(course.courseMetadata?.noOfTestimonials || 0).toString()} />
                <B1Text text="&nbsp;reviews" />
              </div>
            )} */}
       

     
      </div>
    </Link>
    </main> 
  );
}

export default SearchResultCourseCard;





