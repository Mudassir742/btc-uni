"use client"
import React, { useEffect, useState } from 'react';
import CoursePageTitles from './text/CoursePageTitles';
import { Button } from './ui/Button';
import BackButton from './buttons/BackButton';
import SH1Text from './text/SH1Text';
import Link from 'next/link';
import ParagraphText from './text/Paragraph';
import CourseTitle from './text/CourseTitle';
import ParagraphSmall from './text/ParagraphSmall';
import H3Text from './text/H3Text';
import H4Text from './text/H4Text';
import { Course, Downloadable, Educator, UserSession } from '@/interfaces';
import YouTubeVideoCard from './YouTubeVideoCard';
import { getCourse } from '@/app/helper';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import CourseHeroReviews from './CourseHeroReviews';
import CourseHeroReviewsComplete from './CourseHeroReviewsComplete';
import CourseSlugEducators from '@/app/courses/components/CourseSlugEducators';
import CourseSlugCourseDescription from '@/app/courses/components/CourseSlugCourseDescription';
import WelcomeCourseCard from './WelcomeCourseCard';
import CourseCard from './CourseCard';
import { cn } from '@/utils/shadcn';
import { getDownloadableAll } from '@/app/resources/helper';
import DownloadableCard from './DownloadableCard';
import { themeColor } from '@/lib/constants';


interface WelcomeComponentProps {
  email: string;
  customerName: string;
  type?: string;
  user?: UserSession;
}

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ customerName, email, type, user, }) => {
  const sp = useSearchParams();
  const courseSlug = sp?.get('courseSlug');
  const redirectType = sp?.get('redirectType');
  const [course, setCourse] = useState<Course | null>(null)
  const [resource, setResource] = useState<Downloadable | null>(null)


  // const { data: courseID } = useQuery({
  //   queryKey: ['courseID', { slug: courseSlug }],
  //   refetchOnMount: true,
  //   queryFn: async () => {
  //     const courseIDProm = getCogetCourseurseID(courseSlug);
  //     const courseID = await courseIDProm as number
  //     return courseID
  //   },
  // })

  // const [expanded, setExpanded] = useState(false); // Start with content collapsed

  // const toggleExpansion = () => {
  //   setExpanded(!expanded);
  // };

  // above was not used and causing issue in vercel cause it was useState within WelcomeComponent, which is rendered conditionally
  // commented out by mihai on feb 8

  useEffect(() => {
    if (courseSlug && !redirectType) {
      const fetchCourse = async () => {
        const courseProm = getCourse({ slug: courseSlug })
        const [course] = await Promise.all([courseProm])
        setCourse(course)
      }
      fetchCourse()
    } else if (courseSlug && redirectType === "resources") {
      (async () => {
        const fetchResource = await getDownloadableAll({ slug: courseSlug })
        setResource(fetchResource)
      })()
    }
  }, [courseSlug, redirectType])


  if (type !== "single-subscription") {
    return <></>
  }

  return (
    <div className='px-4'>
      {/* <BackButton /> */}




      <div className="relative">
        <div className='flex justify-center'>
          <H3Text
            text={`Welcome to BTC University, ${customerName}!`}
            className="!text-themeColor"
          />
        </div>

        <div className="space-under-category-titles" />

        <div className="!w-full relative pb-[56.25%] h-0 overflow-hidden md:mt-3 xl:mt-0">
          <iframe
            src={`https://player.vimeo.com/video/843945473?autoplay=1`}
            className="!w-full !h-full !absolute !top-0 !left-0 rounded-xl"
          />
        </div>

        <div className="space-under-category-titles" />
        <div className='container md:px-0'>


          <div className='flex flex-wrap'>
            <span className='font-semibold text-themeColor text-[14px] md:text-[16px]'>
              Congratulations on joining BTC University—your gateway to&nbsp;

              <span className='font-semibold italic text-themeColor text-[14px] md:text-[16px] md:inline'>
                unlimited success&nbsp;
              </span>
              behind the chair!

            </span>
          </div>


          {/* <div className='flex flex-col lg:flex-row justify-center gap-x-5 gap-y-6 my-5'> */}
          <div className={cn([`grid grid-cols-1 md:grid-cols-3 gap-5 my-5`])}>
            <div className={cn(['md:col-span-2'], {
              "md:col-span-3": !courseSlug
            })}>
              <div className='text-themecolor-500 bg-themecolor-50 p-5 rounded-xl'>
                {/* <div className="space-under-category-titles" /> */}
                <CourseTitle className='mb-4' text={`Action Required: Set Up Your Password`} />
                <ParagraphText text={`Before you dive into the wealth of knowledge waiting for you, please take a moment to finish setting up your account by creating a password. Check your ${email} inbox for instructions.`} />
                <div className="space-under-category-titles" />
                <ParagraphText text={`Didn’t receive an email? If the email address above is correct, check spam.`} />
                <div>
                  <div className="space-under-category-titles" />
                  <div>
                    <ParagraphText text={`If the wrong email address is shown above, reach out to our customer service team and we will fix it for you!`} />
                  </div>
                </div>
              </div>
            </div>
            {/* Resource Card */}
            {resource && user?.userDataId && <>
              <div className=''>
                <DownloadableCard
                  // variant='secondary'
                  key={resource.databaseId}
                  slug={resource.slug}
                  text={resource?.title || ""}
                  link={resource?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
                  description={resource?.content || ""}
                  // canDownload={userIsCurrentlySubscribed}
                  downloadImage={resource?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""}
                  accessLevel={resource.downloadablemetadata.accessLevel}
                  themecolor={themeColor}
                />
              </div>
            </>
            }
            {/* Course Card */}
            {course && user?.userDataId &&
              <>
                <div className=''>
                  <Link href={`/courses/${courseSlug}`}>
                    <Button size={'w-full'} className='mb-8'>Take me back to my course</Button>
                  </Link>
                  {/* <CourseCard variant2={true} course={course} /> */}
                  <YouTubeVideoCard classname='!p-0'
                    educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")}
                    course={{ ...course, slug: courseSlug! }}
                    completed={false} themeColor='#523D34' userDataBaseId={`${user?.userDataId}`} />
                </div>
              </>
            }
            {/* {
              course && courseSlug && user &&
              <div className='flex-1 border rounded-2xl border-secondarythemecolor p-4'>
                <CourseSlugEducators
                  params={{ slug: 'hybrid-toning-gray-coverage' }}
                  user={user}
                  variant2={true}
                />
                <WelcomeCourseCard params={{ slug: 'hybrid-toning-gray-coverage' }} /> */}
            {/* <CourseSlugCourseDescription
                  params={{ slug: 'hybrid-toning-gray-coverage' }}
                  className="px-3 lg:px-0"
                /> */}
            {/* <div className='w-100 border rounded-2xl border-secondarythemecolor my-3' />
                <div className='flex justify-center'>
                  <Button size={'sm'}>Take me back to my course</Button>
                </div>
              </div>
            } */}

          </div>

          <div className=''>

            <CourseTitle text={`Your Journey To Success Starts Here`} />
            <ParagraphText text={`At BTC-U, we understand the importance of continued education in our ever-evolving industry. That’s why our platform is designed to empower you with the tools and techniques you need to level up in your career. Remember, the more you learn, the more you earn!`} />

          </div>

          <div className="space-under-category-titles" />

          <ParagraphText text={` Welcome to our community! We can’t wait to see your confidence grow behind the chair!`} />
        </div>


        <div className="space-under-category-titles" />

      </div>


      <div className='space-between-categories' />

    </div >

  );
};

export default WelcomeComponent;
