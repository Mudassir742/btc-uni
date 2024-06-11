import React from 'react';
import { getCategoryPageSpotlight } from '../helper';
import CourseSpotlight from '@/components/CourseSpotlight';
import { transformWpUrl } from '@/utils/url';

const LanguagesSpotlight: React.FC = async () => {

    const spotlightCategoryDataPromise = getCategoryPageSpotlight("433293");
    const spotlightCategoryData = await spotlightCategoryDataPromise;
    const spotlightCourseTitle = spotlightCategoryData?.courseSpotlight?.title || "";
    const courseSlug = spotlightCategoryData?.courseSpotlight?.slug || "";
    const courseTrailerId = spotlightCategoryData?.courseSpotlight?.courseMetadata?.vimeoPromoId || "";
    // const courseDetailImage = spotlightCategoryData?.courseSpotlight?.courseMetadata?.courseDetailPicture?.mediaItemUrl || transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png");
    const courseDetailImage = spotlightCategoryData?.courseSpotlight?.courseMetadata?.courseDetailPicture?.mediaItemUrl || "https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png";
    const courseSpecialReviews = spotlightCategoryData?.specialReviewsForCourseSpotlight || [];
    const spotlightCourseEducators = spotlightCategoryData?.courseSpotlight?.courseMetadata?.educators || [];

    return (
        <div>
            {/* {spotlightCourseTitle !== "" && (
                <div>

            <CourseSpotlight
                courseTitle={spotlightCourseTitle}
                courseSlug={courseSlug}
                educators={spotlightCourseEducators}
                courseTrailerId={courseTrailerId}
                courseDetailImage={courseDetailImage}
                        specialReviews={courseSpecialReviews} />
                    <div className='space-between-categories' />
                    </div>
            )} */}
        </div>
    );
}

export default LanguagesSpotlight;