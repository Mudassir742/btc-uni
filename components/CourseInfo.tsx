"use client"
import React, { useState } from 'react';
import { BeforeAndAfter, Categories, Category, Course, CourseChapter, Downloadable, Educator, EducatorAndTheirCourses, NewCourseHighlight, Testimonial, UsedProduct, UserSession } from '@/interfaces';
import ParagraphText from './text/Paragraph';
import CourseDescription from './CourseDescription';
import YouWillLearn from './YouWillLearn';
import Chapters from './Chapters';
import CourseHighlights from './CourseHighlights';
import FinishedLook from './FinishedLook';
import ProductsUsed from './ProductsUsed';
import Testimonials from './Testimonials';
import EducatorTeamName from './EducatorTeamName';
// import SaveCourse from './SaveCourse';
import ShareButton from './Share';
import H3Text from './text/H3Text';

interface CourseInfoProps {
  themeColor: string;
  trailerImage: string;
  level: string;
  series: string;
  categories: Category[];
  courseDescription: string;
  youWillLearnText: string;
  userCanViewMainContent: boolean;
  isCourseAvailableToBePurchasedOnlyALaCarte: boolean;
  isCourseAvailableToBePurchasedALaCarte: boolean;
  courseChapters: CourseChapter[];
  newCourseHighlights: NewCourseHighlight[];
  beforeandafter: BeforeAndAfter[];
  usedProducts: UsedProduct[];
  courseTestimonialsNew: Testimonial[];
  courseEducatorsAndTheirCourses: EducatorAndTheirCourses[];
  downloadableCards: React.JSX.Element[];
  userDataId: number;
  courseId: number;
  // isPinned: boolean;
  isSignedIn: boolean;
}


const CourseInfo: React.FC<CourseInfoProps> = ({
  themeColor,
  trailerImage,
  youWillLearnText, // i have func
  courseDescription, // i have func
  series,// i have func
  categories,// i have func
  courseChapters,// i have func
  newCourseHighlights,// i have func
  beforeandafter, // getCourseBeforeAndAfter
  usedProducts,// i have func
  courseEducatorsAndTheirCourses,// i have func
  courseTestimonialsNew,// i have func
  // course basicsandlevel
  level,
  isCourseAvailableToBePurchasedOnlyALaCarte,
  isCourseAvailableToBePurchasedALaCarte,
  // user
  userCanViewMainContent,
  downloadableCards,
  userDataId,
  courseId,
  // isPinned,
  isSignedIn,
 }) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
  };
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  let categoryText = "Category:"

  if (categories.length > 1) {
    categoryText = "Categories:"
  }

  return (

    <div className=' rounded-[15px] rounded-tl-none rounded-tr-none'>

      {/* <InputTextBold text='Specifics' /> */}


      {/* {courseDuration !== "" && (
        <div className='h-6 py-1 ' style={containerStyle}>
          <ParagraphText text={convertTimeToMinutes(courseDuration)} fontWeight={600} color='black' />
        </div>
      )} */}



      {/* <button
        className='bg-white absolute right-3 mt-[-10px] mr-2' // Apply absolute positioning and adjust top, right, margin values
        onClick={toggleExpansion}
      >
        {isExpanded ? (
          <div className='text-sm'>
            ...less
          </div>
        ) : (
          <div className='text-sm'>
            ...more
          </div>
        )}
      </button> */}


      <div >
        <div className="container pt-4">


          {courseEducatorsAndTheirCourses.length > 0 && (

            <EducatorTeamName courseEducatorsAndTheirCourses={courseEducatorsAndTheirCourses} />


          )}

        </div>


        {isExpanded ? (
          <div>
            <div className='container'>
              <div className="flex items-center">

                {/* <SaveCourse /> */}
                {/* dec 19 savecourse deprecated and replaced with pushpinoncoursepage */}
                {/* <PushPinOnCoursePage userDataId={userDataId} courseId={courseId} isPinned={isPinned} isSignedIn={isSignedIn} /> */}

                <ShareButton shareText={courseDescription} shareImg={trailerImage} />

              </div>
              {/* <div className='h-6 py-1' style={containerStyle}>
                <ParagraphText text={categoryText} color='black' /><ParagraphText text="&nbsp; " />
                <div className='truncate'>
                  <ParagraphText text={filteredCategories.map(category => ((category.name === "Hair-Color") ? "Hair Color" : category.name)).join(', ')} fontWeight={600} color='black' />

                </div>
              </div> */}
            
              <div className="med-space" />

              {series && (series !== "0 parts") && (
                <div className='h-6 py-1' style={containerStyle}>
                  <ParagraphText text="Series:" />
                  <div className='flex'>

                    <ParagraphText text='&nbsp;' />
                    <ParagraphText text={series} fontWeight={600} />
                  </div>
                </div>
              )}




              {/* {level && (level !== "undefined") && (
                <div className='h-6 py-1' style={containerStyle}>
                  <ParagraphText text="Level:" />
                  <div className='flex'>

                    <ParagraphText text='&nbsp;' />
                    <ParagraphText text={level} fontWeight={600} />
                  </div>

                </div>
              )} */}


            </div>
            <div className='container'>
              {/* <div >
          {upcoming ? (
            <div >

              <SaveMySpotButton
                theCourseTitle={theCourseTitle}
                courseLink={courseLink}
                formattedLaunchDate={formattedLaunchDate} />
            </div>
          ) : (
            <div className="md:flex ">

              {userCanViewMainContent ? (
                <PlayButton
                  vimeoIds={vimeoIdStrings}
                  liveVideoId={liveVideoId}
                  courseID={courseID}
                  accessedCourseDBId={accessedCourseDBId}
                  userDataDBId={userDataDatabaseId}
                  startChapter={startChapter}
                  isPartOfAccessedCourses={isPartOfAccessedCourses}
                  startTime={startTime}
                  canWatchMainContent={canWatchMainContent}
                  courseIsLive={isLive}
                  courseChapters={theCourseChapters}
                  courseFormulas={theCourseFormulas}
                  courseTitle={theCourseTitle}
                  courseEducators={theCourseEducators}
                  shareText={shareText}
                  coursePinned={pinned}
                  downloadables={downloadables}
                  usedProducts={usedProducts}
                  mediaItemUrl={mediaItemUrl}
                  upcomingCourses={upcomingCourses}
                  educatorName={educatorName}
                  isSignedIn={isSignedIn}
                />
              ) : (<div></div>)}

              {isCourseFree ? (
                <WatchForFREEButton
                  vimeoIds={vimeoIdStrings}
                  liveVideoId={liveVideoId}
                  courseID={courseID}
                  accessedCourseDBId={accessedCourseDBId}
                  userDataDBId={userDataDatabaseId}
                  startChapter={startChapter}
                  isPartOfAccessedCourses={isPartOfAccessedCourses}
                  startTime={startTime}
                  canWatchMainContent={canWatchMainContent}
                  courseIsLive={isLive}
                  courseChapters={theCourseChapters}
                  courseFormulas={theCourseFormulas}
                  courseTitle={theCourseTitle}
                  courseEducators={theCourseEducators}
                  shareText={shareText}
                  coursePinned={pinned}
                  downloadables={downloadables}
                  usedProducts={usedProducts}
                  mediaItemUrl={mediaItemUrl}
                  upcomingCourses={upcomingCourses}
                  educatorName={educatorName}
                  isSignedIn={isSignedIn}
                />
              ) : (<div></div>)}

              {(!isCourseFree && !userCanViewMainContent && !isCourseAvailableToBePurchasedOnlyALaCarte) ? (
                <Link href='/subscribe'>
                  <Button variant="primary" size="default">Subscribe Now</Button>
                </Link>
              ) : (<div></div>)}

              {isCourseAvailableToBePurchasedALaCarte && !userCanViewMainContent && (
                <div className="py-2 md:py-0 px-0 md:px-3">




                  <Link href="/checkout">
                    {price !== "0" && price !== "" && <Button variant="primary" size="default"><div className='px-3'>Or Buy Course ${price}
                    </div></Button>}
                  </Link>
                </div>
              )}

            </div>
          )}


        </div> */}

              <ParagraphText text={courseDescription} />
              <div className="med-space" /> 

              <YouWillLearn youWillLearn={youWillLearnText} />
              {/* <CourseAnchor text={"Formulas"} scrollToId={""} number={""} /> */}

              {downloadableCards.length > 0 && (
                <div className="downloadables">
                  <div>
                    <div className="flex items-center justify-between ">
                      <div className="flex  items-center">
                        <H3Text text='Course Resources' />
                    
                      </div>
            
                    </div>
                    <div className="space-under-category-titles" /> 
                    <div className="flex overflow-x-auto">
                      {downloadableCards}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-white"></div>
                  <div className='space-between-categories'/>
                </div>
              )}
              {/* <WhatsIncluded hasDownloadables={hasDownloadables} hasFormulas={hasFormulas} themecolor={themeColor} hasProducts={hasProducts} /> */}

              {(courseChapters.length > 0) && (
                <Chapters courseChapters={courseChapters} themeColor={themeColor} />
              )}

{/* <CourseSlugDownloadables
                  params={params}
                  user={user} /> */}
              {/* mihai's note to briana: we can't use a server component here so what we'll do is get the stuff via props for now */}
           

              <div>
              </div>
            </div>




            <div className=''>

              {/* {newCourseHighlights.length > 0 && (
                <CourseHighlights
                  courseHighlights={newCourseHighlights}
                  canWatch={userCanViewMainContent}
                  isPurchasableALaCarte={isCourseAvailableToBePurchasedALaCarte}
                  isPurchasableOnlyALaCarte={isCourseAvailableToBePurchasedOnlyALaCarte} />
              )} */}
            </div>
            <div >
              {beforeandafter.length > 0 && (
                <div>


                  <FinishedLook finishedLooks={beforeandafter} userDataId={userDataId.toString()} courseId={courseId} />
                </div>
              )}

              {/* {usedProducts.length > 0 && (
                <div className='container'>

                  <ProductsUsed productsUsed={usedProducts} productTitleTextColor={themeColor} />
               
                </div>
              )} */}

              {/* {downloadables && (downloadables.length > 0) && ( 

<div className="downloadables pb-4">
<div>
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
              <CoursePageTitles text='Downloadables' color='white'/>

      <button onClick={toggleExpansion}>
        {isExpanded ? (
          <Collapse fill={'white'} width={'30'} height={'30'} />
        ) : (
          <Plus fill={'white'} width={'30'} height={'30'} />
        )}
      </button>
    </div>
  </div>
  {isExpanded ? (
    <div className="md:flex">
    
      {downloadableCards}
    </div>
  ) : null}
</div>
<div className="w-full h-[1px] bg-white my-8"></div>
</div>
)} */}


              {/* <div className='container'>

                <Testimonials testimonials={courseTestimonialsNew} />
              </div> */}
            </div>
          </div>
        ) : null}
      </div>

    </div>
  );
};

export default CourseInfo;

// Feb 23 note by Mihai: I commented out some sections from Course Info in past days like Testimonials, Course Highlights, Products Used as its no longer used





