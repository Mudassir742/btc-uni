import React from "react";
import { Rating } from "@mui/material";
import ParagraphText from "@/components/text/Paragraph";
import { extractEducatorAll, getEducatorAll } from "../helper";
import { Testimonial } from "@/interfaces";

interface EducatorSlugRatingMobileProps {
  params: { slug: string };
  themeColor: string;
}

const EducatorSlugRatingMobile: React.FC<
  EducatorSlugRatingMobileProps
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

  return (
    <div>
      <div className="flex ">
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
    </div>
  );
};

export default EducatorSlugRatingMobile;
