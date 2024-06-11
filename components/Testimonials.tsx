"use client"
import React, { useState } from 'react';
import TestimonialsCard from './TestimonialsCard';
import SH1Text from './text/SH1Text';
import { Testimonial } from '@/interfaces';
import { Rating, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { themeColor } from '@/app/courses/helper';
import InputTextBold from './text/InputTextBold';
import { Button } from './ui/Button';
import CoursePageTitles from './text/CoursePageTitles';
import ParagraphText from './text/Paragraph';
import H3Text from './text/H3Text';
import H4Text from './text/H4Text';
import H5Text from './text/H5Text';
import CourseTitle from './text/CourseTitle';

interface TestimonialsProps {
  testimonials: Testimonial[];
  courseId: number;
  userDataBaseId: string;

}


const columnStyles = {
  borderRight: '1px solid #ccc', // Border on the right side for all columns
  paddingRight: '1rem',          // Right padding for all columns
};

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, courseId, userDataBaseId }) => {
  const [showPopup, setShowPopup] = useState(false);

  const sortedTestimonials = testimonials.sort((a, b) => {
    const dateA = new Date(a?.testimonialMetadata?.timestamp).getTime();
    const dateB = new Date(b?.testimonialMetadata?.timestamp).getTime();
    return dateB - dateA; // For descending order
  });
  
  const totalNoOfTestimonials = testimonials?.length || 0;
  const totalNoOfTestimonialsWithRating = (testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) !== 0)).length;
  // const totalNoOfEducatorTestimonials = (testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.educatorrating || 0) !== 0)).length;
  // const totalNoOfContentTestimonials = (testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.contentrating || 0) !== 0)).length;
  // const totalNoOfDifficultyTestimonials = (testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.difficultyRating || "") !== "")).length;
  // Briana, Swap the above 3 with the ones below to test how having 4 columns will look like (also kept hardcoded values for the other 3 columns, 
  // so you would just need to swap the hardcoded percentages with the educator, content, and difficulty ratings below) - Mihai
  const totalNoOfEducatorTestimonials = 2;
  const totalNoOfContentTestimonials = 3;
  const totalNoOfDifficultyTestimonials = 5;

  const averageRating = totalNoOfTestimonials > 0
    ? testimonials.reduce((sum, testimonial) => sum + (testimonial?.testimonialMetadata?.rating || 5), 0) / totalNoOfTestimonials
    : 0;
  let adjustedAverageRating = (averageRating / 100) * 5 || 5;

  // Ratings summary
  // general variables (we can make it so that we display only 1 or 2 star reviews when user clicks 1 or 2 stars)
  let oneStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 20);
  let oneStarReviewsLength = oneStarReviews.length;
  let twoStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 40);
  let twoStarReviewsLength = twoStarReviews.length;
  let threeStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 60);
  let threeStarReviewsLength = threeStarReviews.length;
  let fourStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 80);
  let fourStarReviewsLength = fourStarReviews.length;
  let fiveStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 100);
  let fiveStarReviewsLength = fiveStarReviews.length;
  // overall ratings
  let oneStarPercentage = ((oneStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";
  let twoStarPercentage = ((twoStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";
  let threeStarPercentage = ((threeStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";
  let fourStarPercentage = ((fourStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";
  let fiveStarPercentage = ((fiveStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";


  // CONTENT RATINGS TEMPORARILY DEPRECATED
  // educator variables (we can make it so that we display only 1 or 2 star reviews when user clicks 1 or 2 stars)
  // let eduOneStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.educatorrating || 0) === 20);
  // let eduOneStarReviewsLength = eduOneStarReviews.length;
  // let eduTwoStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.educatorrating || 0) === 40);
  // let eduTwoStarReviewsLength = eduTwoStarReviews.length;
  // let eduThreeStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.educatorrating || 0) === 60);
  // let eduThreeStarReviewsLength = eduThreeStarReviews.length;
  // let eduFourStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.educatorrating || 0) === 80);
  // let eduFourStarReviewsLength = eduFourStarReviews.length;
  // let eduFiveStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.educatorrating || 0) === 100);
  // let eduFiveStarReviewsLength = eduFiveStarReviews.length;
  // educator ratings
  // let eduOneStarPercentage = ((eduOneStarReviewsLength / totalNoOfEducatorTestimonials) * 100).toString() + "%";
  // let eduTwoStarPercentage = ((eduTwoStarReviewsLength / totalNoOfEducatorTestimonials) * 100).toString() + "%";
  // let eduThreeStarPercentage = ((eduThreeStarReviewsLength / totalNoOfEducatorTestimonials) * 100).toString() + "%";
  // let eduFourStarPercentage = ((eduFourStarReviewsLength / totalNoOfEducatorTestimonials) * 100).toString() + "%";
  // let eduFiveStarPercentage = ((eduFiveStarReviewsLength / totalNoOfEducatorTestimonials) * 100).toString() + "%";

  // CONTENT RATINGS DEPRECATED
  // content variables (we can make it so that we display only 1 or 2 star reviews when user clicks 1 or 2 stars)
  // let contentOneStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.contentrating || 0) === 20);
  // let contentOneStarReviewsLength = contentOneStarReviews.length;
  // let contentTwoStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.contentrating || 0) === 40);
  // let contentTwoStarReviewsLength = contentTwoStarReviews.length;
  // let contentThreeStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.contentrating || 0) === 60);
  // let contentThreeStarReviewsLength = contentThreeStarReviews.length;
  // let contentFourStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.contentrating || 0) === 80);
  // let contentFourStarReviewsLength = contentFourStarReviews.length;
  // let contentFiveStarReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.contentrating || 0) === 100);
  // let contentFiveStarReviewsLength = contentFiveStarReviews.length;
  // content ratings
  // let contentOneStarPercentage = ((contentOneStarReviewsLength / totalNoOfContentTestimonials) * 100).toString() + "%";
  // let contentTwoStarPercentage = ((contentTwoStarReviewsLength / totalNoOfContentTestimonials) * 100).toString() + "%";
  // let contentThreeStarPercentage = ((contentThreeStarReviewsLength / totalNoOfContentTestimonials) * 100).toString() + "%";
  // let contentFourStarPercentage = ((contentFourStarReviewsLength / totalNoOfContentTestimonials) * 100).toString() + "%";
  // let contentFiveStarPercentage = ((contentFiveStarReviewsLength / totalNoOfContentTestimonials) * 100).toString() + "%";
  // difficulty variables (we can make it so that we display only 1 or 2 star reviews when user clicks 1 or 2 stars)


  // DIFFICULTY RATINGS TEMPORARILY DEPRECATED
  // let beginnerReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.difficultyRating || "") === "Easy");
  // let beginnerReviewsLength = beginnerReviews.length;
  // let intermediateReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.difficultyRating || "") === "Intermediate");
  // let intermediateReviewsLength = intermediateReviews.length;
  // let hardReviews = testimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.difficultyRating || "") === "Hard");
  // let hardReviewsLength = hardReviews.length;
  // let beginnerPercentage = ((beginnerReviewsLength / totalNoOfDifficultyTestimonials) * 100).toString() + "%";
  // let intermediatePercentage = ((intermediateReviewsLength / totalNoOfDifficultyTestimonials) * 100).toString() + "%";
  // let hardPercentage = ((hardReviewsLength / totalNoOfDifficultyTestimonials) * 100).toString() + "%";

  const overallRatingBarClass = (totalNoOfEducatorTestimonials + totalNoOfContentTestimonials + totalNoOfDifficultyTestimonials) === 0 ? "w-96" : "w-6";
  // const overallRatingColSpanClass = (totalNoOfEducatorTestimonials + totalNoOfContentTestimonials + totalNoOfDifficultyTestimonials) === 0 ? "md:col-span-6" : "md:col-span-1";
  // const gridColSpanClass = (totalNoOfEducatorTestimonials + totalNoOfContentTestimonials + totalNoOfDifficultyTestimonials) === 0 ? "md:grid-cols-1" : "md:grid-cols-6";
  const overallRatingColSpanClass = "";
  const gridColSpanClass = "";

  // Determine if we should use the full width for the overall rating bar
  const shouldExpandOverallRatingBar = (totalNoOfEducatorTestimonials + totalNoOfContentTestimonials + totalNoOfDifficultyTestimonials) === 0;

  // Decide the container class based on whether we should expand the overall rating bar
  const containerClass = shouldExpandOverallRatingBar ? "pl-4 flex-col md:flex-row" : "pl-4 flex flex-col md:flex-row";


  if (!testimonials) {
    return null;
  }
  
  if (totalNoOfTestimonials === 0) {
    return null; // Don't render anything if there are no testimonials
  }

  const createTestimonialCards = (testimonials: Testimonial[], limit: number) =>
    testimonials.slice(0, limit).map((testimonial: Testimonial, index) => (
      <TestimonialsCard
        key={index}
        firstname={testimonial?.testimonialMetadata?.firstname || ""}
        lastname={testimonial?.testimonialMetadata?.lastname || ""}
        rating={testimonial?.testimonialMetadata?.rating || 0}
        date={testimonial?.testimonialMetadata?.timestamp || ""}
        body={testimonial?.content || ""}
      />
    ));

  const testimonialCards = createTestimonialCards(sortedTestimonials, showPopup ? totalNoOfTestimonials : 1);

  const togglePopup = () => {
    (window as any).dataLayer.push({
      event: "clickedShowAllReviews",

      onPageOfCourse: courseId.toString(),
      userDataId: userDataBaseId,

      timestamp: new Date().toISOString(),
    });
    setShowPopup(!showPopup);
  };

  return (
    <div>
      {totalNoOfTestimonials > 5 && (
   
    <div className={`min-w-[327px] w-full md:w-[370px]`} >


      {totalNoOfTestimonials > 5 && (
        <div className='p-4 relative items-center  border-[1px] border-border rounded-xl'>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <H4Text text='Course Reviews' />

              <div className="flex flex-grow justify-end items-center pl-4">
                <div className='flex items-center'>

                  <Rating name="half-rating-read" size='small' defaultValue={adjustedAverageRating} precision={0.5} readOnly style={{ color: themeColor }} />
                  <div className="pl-2 flex">
                    <ParagraphText text="(" className="text-themeColor" />
                    <ParagraphText text={totalNoOfTestimonials.toString()} className="text-themeColor underline" />
                    <ParagraphText text=")" className="text-themeColor" />
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='grey-line' />

          <div className="max-w-[690px] overflow-y-auto">
            
            <div className="grid grid-cols-1 ">
              {testimonialCards}
              <div >
               



                <Button id="See-All-Testimonials-Button" onClick={togglePopup} variant="secondary">Show All {totalNoOfTestimonials.toString()}  Reviews</Button>



              </div>
            </div>
          </div>
        </div>
      )}
      <div className='p-4'>

        <Dialog open={showPopup} onClose={togglePopup} maxWidth="md" fullWidth>
          <div className='md:px-12 rounded-xl'>
            
         
          <div className='p-4 flex items-center'>
            <H4Text text='Course Reviews&nbsp;' /> 
            <div className='flex flex-grow justify-end items-center '>
              <Rating name="half-rating-read" defaultValue={adjustedAverageRating} precision={0.5} readOnly style={{ color: themeColor }} />
              <ParagraphText text={`(${totalNoOfTestimonials.toString()})`} className='underline' />

            </div>
          
          </div>

          {/* <div className={containerClass}> */}

          <div className='p-4'>
            {/* Adjust the grid-cols-* class dynamically based on the presence of testimonials */}

            {/* <div className={`flex overflow-x-auto md:grid ${gridColSpanClass} gap-2`}> */}
            {/* UI changed as we're only showing overall ratings */}
            <div>

              {/* Column 1 - Overall Rating */}
              {/* <div className={`${overallRatingColSpanClass}`} style={columnStyles}> */}
              <div className="flex flex-col">
                <CourseTitle text="Overall Rating" />
                <div >
                  {/* Adjust the bars to sit next to the numbers */}
                  <div className="flex items-center">
                    <div className="mr-2">5</div>
                    <div className="flex-grow h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: fiveStarPercentage }}></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">4</div>
                    <div className="flex-grow h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: fourStarPercentage }}></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">3</div>
                    <div className="flex-grow h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: threeStarPercentage }}></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">2</div>
                    <div className="flex-grow h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: twoStarPercentage }}></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">1</div>
                    <div className="flex-grow h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: oneStarPercentage }}></div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Column 2 - Educator Rating */}
              {/* this will only show when there are educator ratings */}
              {totalNoOfEducatorTestimonials > 0 && (
                <div></div>
                // <div className="col-span-1" style={columnStyles}>
                //   <InputTextBold text="Educator Rating" />
                //   <div >
                //     <div className="flex items-center">
                //       <div className="w-6">5</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '80%' }}></div>
                //       </div>
                //     </div>
                //     <div className="flex items-center">
                //       <div className="w-6">4</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '60%' }}></div>
                //       </div>
                //     </div>
                //     <div className="flex items-center">
                //       <div className="w-6">3</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '40%' }}></div>
                //       </div>
                //     </div>
                //     <div className="flex items-center">
                //       <div className="w-6">2</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '20%' }}></div>
                //       </div>
                //     </div>
                //     <div className="flex items-center">
                //       <div className="w-6">1</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '10%' }}></div>
                //       </div>
                //     </div>
                //   </div>
                // </div>
              )}

              {/* Column 3 - Content Rating */}
              {/* this will only show when there are content ratings */}
              {totalNoOfContentTestimonials > 0 && (
                <div></div>
                // <div className="col-span-1" style={columnStyles}>
                //   <InputTextBold text='Content Rating' />
                //   <div >
                //     <div className="flex items-center">
                //       <div className="w-6">5</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '80%' }}></div>
                //       </div>
                //     </div>
                //     <div className="flex items-center">
                //       <div className="w-6">4</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '60%' }}></div>
                //       </div>
                //     </div>
                //     <div className="flex items-center">
                //       <div className="w-6">3</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '40%' }}></div>
                //       </div>
                //     </div>
                //     <div className="flex items-center">
                //       <div className="w-6">2</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '20%' }}></div>
                //       </div>
                //     </div>
                //     <div className="flex items-center">
                //       <div className="w-6">1</div>
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '10%' }}></div>
                //       </div>
                //     </div>
                //   </div>
                // </div>
              )}

              {/* Column 4 - Difficulty */}
              {/* this will only show when there are difficulty ratings */}
              {totalNoOfDifficultyTestimonials > 0 && (
                <div></div>
                // <div className="col-span-2" style={columnStyles}> {/* Adjusted col-span to 1.5 */}
                //   <InputTextBold text='Difficulty' />
                //   <div >
                //     <div className="inline md:flex items-center">
                //       <div className="w-22 text-sm">Beginner</div> {/* Adjusted width and font size */}
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '40%' }}></div>
                //       </div>
                //     </div>
                //     <div className="inline md:flex items-center">
                //       <div className="w-22 text-sm">Intermediate</div> {/* Adjusted width and font size */}
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '20%' }}></div>
                //       </div>
                //     </div>
                //     <div className="inline md:flex items-center">
                //       <div className="w-22 text-sm">Advanced</div> {/* Adjusted width and font size */}
                //       <div className="relative flex-grow h-3 bg-gray-200 rounded-full ml-2">
                //         <div className="h-full bg-black rounded-full" style={{ width: '10%' }}></div>
                //       </div>
                //     </div>
                //   </div>
                // </div>
              )}







            </div>
            {/* End of columns */}
          </div>


          <DialogContent className="flex-1 overflow-y-auto">
            {createTestimonialCards(testimonials, totalNoOfTestimonials)}
          </DialogContent>
          <div className="sticky bottom-0 bg-white p-4 justify-center">
            <Button onClick={togglePopup}>
              Close
            </Button>
          </div>
          </div>
        </Dialog>
      </div>
      </div>
       )}
    </div>
  );
};

export default Testimonials;

