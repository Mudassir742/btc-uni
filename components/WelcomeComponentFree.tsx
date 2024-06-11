"use client"
import React, { useEffect, useState } from 'react';

import SH1Text from './text/SH1Text';

import ParagraphText from './text/Paragraph';
import CourseTitle from './text/CourseTitle';

import { Course, Downloadable, Educator, UserSession } from '@/interfaces';
import Link from 'next/link';
import H3Text from './text/H3Text';
import { useSearchParams } from 'next/navigation';
import { getCourse } from '@/app/helper';
import { getDownloadableAll } from '@/app/resources/helper';
import { cn } from '@/utils/shadcn';
import { Button } from './ui/Button';
import DownloadableCard from './DownloadableCard';
import { themeColor } from '@/lib/constants';
import YouTubeVideoCard from './YouTubeVideoCard';


interface WelcomeComponentFreeProps {
  email: string;
  customerName: string;
  type?: string;
  user?: UserSession;
}

const WelcomeComponentFree: React.FC<WelcomeComponentFreeProps> = ({ customerName, email, type, user }) => {
  const sp = useSearchParams();
  const courseSlug = sp?.get('courseSlug');
  const redirectType = sp?.get('redirectType');
  const [course, setCourse] = useState<Course | null>(null)
  const [resource, setResource] = useState<Downloadable | null>(null);



  useEffect(() => {
    if (courseSlug && !redirectType) {
      console.log(courseSlug)
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


  if (type !== "free-subscription") {
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
        <div className=''>



          <div className='flex flex-wrap'>
            <span className='font-semibold text-themeColor text-[14px] md:text-[16px]'>
              Congratulations on joining BTC University—your gateway to&nbsp;

              <span className='font-semibold italic text-themeColor text-[14px] md:text-[16px] md:inline'>
                unlimited success&nbsp;
              </span>
              behind the chair!

            </span>
          </div>





          <div className="space-under-category-titles" />
          <div className={cn([`grid grid-cols-1 md:grid-cols-3 gap-5 my-5`])}>
            <div className={cn(['md:col-span-2'], {
              "md:col-span-3": !courseSlug
            })}>
              <div className='text-themecolor-500 bg-themecolor-50 p-5 rounded-xl'>

                <CourseTitle text={`Action Required: Set Up Your Password`} />

                <ParagraphText text={`Before you dive in, please take a moment to finish setting up your account by creating a password. We have sent instructions to ${email}.`} />

                <div className="space-under-category-titles" />
                <ParagraphText text={`If you don’t receive an email and the email address above is correct, check spam. `} />

                <div className="space-under-category-titles" />

                <div>
                  <div className="space-under-category-titles" />
                  <div>
                    <ParagraphText text={`If the wrong email address is shown above, reach out to our customer service team at membership@btcuniversity.com and we will fix it for you!`} />
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
          </div>
          <div className=''>

            <CourseTitle text={`Your Journey To Success Starts Here`} />
            <ParagraphText text={`At BTC-U, we understand the importance of continued education in our ever-evolving industry. That’s why our platform is designed to empower you with the tools and techniques you need to level up in your career. Remember, the more you learn, the more you earn!`} />

          </div>


        </div>


        <div className="space-under-category-titles" />

      </div>
      <ParagraphText text={` Welcome to our community! We can’t wait to see your confidence grow behind the chair!`} />

      <div className='space-between-categories' />
      <div className='flex flex-wrap'>


        <ParagraphText text={`If you would like to upgrade your account at any time and get access to 250+ classes and our entire Downloadable Library, please visit `} />
        <Link href='/subscribe'>
          <ParagraphText text={`btcuniversity.com/subscribe`} className='text-themeColor underline' />
        </Link>

      </div>
      <div className='space-between-categories' />


      <div className='space-between-categories' />
    </div>

  );
};

export default WelcomeComponentFree;
