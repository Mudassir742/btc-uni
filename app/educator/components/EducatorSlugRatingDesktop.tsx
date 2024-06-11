import React from "react";
import { Rating } from "@mui/material";
import { extractEducatorAll, getEducatorAll } from "../helper";
import ParagraphText from "@/components/text/Paragraph";
import { Testimonial } from "@/interfaces";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import TestimonialsCard from "@/components/TestimonialsCard";
import H4Text from "@/components/text/H4Text";
import CourseTitle from "@/components/text/CourseTitle";

interface EducatorSlugRatingDesktopProps {
  params: { slug: string };
  themeColor: string;
}

const EducatorSlugRatingDesktop: React.FC<
  EducatorSlugRatingDesktopProps
> = async ({ params, themeColor }) => {
  // const educatorAllProm = getEducatorAll(params);
  // const educatorAll = await educatorAllProm;
  // const { educatorAverageRating, educatorNoOfTestimonials } = extractEducatorAll(educatorAll)
  // TO DO AFTER LAUNCH Mihai/Hamzah: add educatorAverageRating and educatorNoOfTestimonials php functions, then fetch them via the GET_EDUCATOR_BY_SLUG_FOR_EDU_SLUG_PAGE query
  // Mihai Update on Mar 9th 2024: updated without educatorAverageRating and educatorNoOfTestimonials php funcs below as the number of educator testimonials is very low and this is only fetched in the slug page where we will probably need to fetch all testimonials later
  // educatorAverageRating and educatorNoOfTestimonials php funcs should be added when or if we will need stars in all-educators page

  const educatorAllProm = getEducatorAll(params);
  const educatorAll = await educatorAllProm;
  const { educatorTestimonials } = extractEducatorAll(educatorAll);

  const totalNoOfTestimonials = educatorTestimonials?.length || 0;
  const totalNoOfTestimonialsWithRating = educatorTestimonials.filter(
    (testimonial: Testimonial) =>
      (testimonial?.testimonialMetadata?.educatorrating || 0) !== 0
  ).length;

  const averageRating =
    totalNoOfTestimonials > 0
      ? educatorTestimonials.reduce(
        (sum, testimonial) =>
          sum + (testimonial?.testimonialMetadata?.educatorrating || 5),
        0
      ) / totalNoOfTestimonials
      : 0;

  let adjustedAverageRating = (averageRating / 100) * 5 || 5;

  // Ratings summary
  // general variables (we can make it so that we display only 1 or 2 star reviews when user clicks 1 or 2 stars)
  let oneStarReviews = educatorTestimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 20);
  let oneStarReviewsLength = oneStarReviews.length;
  let twoStarReviews = educatorTestimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 40);
  let twoStarReviewsLength = twoStarReviews.length;
  let threeStarReviews = educatorTestimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 60);
  let threeStarReviewsLength = threeStarReviews.length;
  let fourStarReviews = educatorTestimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 80);
  let fourStarReviewsLength = fourStarReviews.length;
  let fiveStarReviews = educatorTestimonials.filter((testimonial: Testimonial) => (testimonial?.testimonialMetadata?.rating || 0) === 100);
  let fiveStarReviewsLength = fiveStarReviews.length;

  // overall ratings
  let oneStarPercentage = ((oneStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";
  let twoStarPercentage = ((twoStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";
  let threeStarPercentage = ((threeStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";
  let fourStarPercentage = ((fourStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";
  let fiveStarPercentage = ((fiveStarReviewsLength / totalNoOfTestimonialsWithRating) * 100).toString() + "%";

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center py-2">
          <Rating
            name="half-rating-read"
            defaultValue={adjustedAverageRating > 3.9 ? adjustedAverageRating : 5}
            precision={0.5}
            readOnly
            style={{ color: themeColor }}
          />
          {educatorTestimonials.length > 5 && adjustedAverageRating > 3.9 && (
            <div className="px-2 flex">
              <ParagraphText text="(" className="text-themeColor" />
              <ParagraphText
                text={totalNoOfTestimonials.toString()}
                className="text-themeColor"
              />
              <ParagraphText text=")" className="text-themeColor" />
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="h-[400px] !overflow-y-scroll scrollbar-hide">
          <div className="flex justify-between mt-5 mb-3">
            <H4Text text='Educator Reviews' />
            <div className="flex items-center py-2">
              <Rating
                name="half-rating-read"
                defaultValue={adjustedAverageRating > 3.9 ? adjustedAverageRating : 5}
                precision={0.5}
                readOnly
                style={{ color: themeColor }}
              />
              {educatorTestimonials.length > 5 && adjustedAverageRating > 3.9 && (
                <div className="px-2 flex">
                  <ParagraphText text="(" className="text-themeColor" />
                  <ParagraphText
                    text={totalNoOfTestimonials.toString()}
                    className="text-themeColor"
                  />
                  <ParagraphText text=")" className="text-themeColor" />
                </div>
              )}
            </div>
          </div>

          <div className=" mb-3">
            <CourseTitle text="Overall Rating" />

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

          {educatorTestimonials.map((testimonial, index) => (
            <TestimonialsCard
              key={index}
              firstname={testimonial?.testimonialMetadata?.firstname || ""}
              lastname={testimonial?.testimonialMetadata?.lastname || ""}
              rating={testimonial?.testimonialMetadata?.rating || 0}
              date={testimonial?.testimonialMetadata?.timestamp || ""}
              body={testimonial?.content || ""}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EducatorSlugRatingDesktop;
