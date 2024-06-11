import React from 'react'; // Import useState for screen width state management
import H1Text from '../text/H1Text';
import Image from 'next/image';
import Link from 'next/link';
import CourseSubCallOut from '../CourseSubCallOut';
import SH1Text from '../text/SH1Text';
import Upcoming from '../Upcoming';
import { Course, Downloadable, HomePageDownloadablesAndTips, Tip, UserSession } from '@/interfaces';
import ParagraphText from '../text/Paragraph';
import TipCard from '../TipCard';
import { transformWpUrl } from '@/utils/url';
import TipParentHomeUnsubscribed from '../TipParentHomeUnsubscribed';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import DownloadablesHomePageNotSignedIn from './DownloadablesHomePageNotSignedIn';
import TipsHomePageNotSignedIn from './TipsHomePageNotSignedIn';
import FavColorHomePageNotSignedIn from './FavColorHomePageNotSignedIn';
import FavHaircuttingHomePageNotSignedIn from './FavHaircuttingHomePageNotSignedIn';
import FavStylingHomePageNotSignedIn from './FavStylingHomePageNotSignedIn';
import FavTextureHomePageNotSignedIn from './FavTextureHomePageNotSignedIn';
import FavMensHomePageNotSignedIn from './FavMensHomePageNotSignedIn';
import FavExtensionsHomePageNotSignedIn from './FavExtensionsHomePageNotSignedIn';
import UpcomingCoursesHomePageNotSignedIn from './UpcomingCoursesHomePageNotSignedIn';
import FavBusinessHomePageNotSignedIn from './FavBusinessHomePageNotSignedIn';



interface HomePageNotSignedInProps {
  // upcomingCourses: Course[];
  user: UserSession | null;
  themeColor: string;
  // tipsandDownloadables: HomePageDownloadablesAndTips;
  // userDownloadableAccessLevel: string;
}

// const HomePageNotSignedIn: React.FC<HomePageNotSignedInProps> = ({
//   // upcomingCourses,
//   user,
//   themeColor,
//   // tipsandDownloadables,
//   // userDownloadableAccessLevel
// }) => {

//   return (
//     <div className='w-full'>


//       <div>
//         {/* <div className="!w-full relative pb-[56.25%] h-0 overflow-hidden  xl:mt-0">
//           <iframe
//             src={`https://player.vimeo.com/video/${843945473}?`}
//             className="!w-full !h-full !absolute !top-0 !left-0 rounded-t-xl"
//             allow="fullscreen"
//           />
//         </div> */}
//       </div>

//       <div className="relative md:flex md:justify-center md:mx-auto bg-[#12120E]">

//         {/* Mobile */}
//         <div className='md:hidden'>
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/mobile-1.png")}
//             alt="btcu"
//             width={1000}
//             height={1000}
//           />
//         </div>

//         {/* Desktop */}
//         <div className='hidden md:block'>
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/desktop-1.png")}
//             alt="btcu"
//             width={1000}
//             height={1000}
//           />
//         </div>




//         {/* <H2Text
//           text="I've got a secret to tell..."
//           className="text-white absolute inset-0 flex items-center justify-center z-10"
//         /> */}
//       </div>


//       <div className='bg-[#AEA59A]'>
//         <div className='py-8'>


//           <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//             <Skeleton className="h-14" />
//             <Skeleton className="h-14" />
//             <Skeleton className="h-14" />
//           </div>}>
//             <DownloadablesHomePageNotSignedIn user={user}
//             />
//           </Suspense>



//         </div>
//       </div>


//       {/* 
//       <div className="flex relative py-[20px] md:container md:justify-center md:mx-auto">
//         <div className='w-[40%] container'>
//           <H2Text
//             text="Welcome to an all new BTC-U!"
//             className="text-themeColor"
//           />

//           <div>

//           </div>
//           <div className='pt-4 pb-6'>
//             <ParagraphText text='Build confidence & learn from the best in the business for only 33 cents a day.' />

//           </div>
//           <Button >
//             Subscribe
//           </Button>
//         </div>

//         <div className='w-[60%]'>
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/12/cja8si0q9fqk-o80qlfpqj1pa-blonde-shirt-4.jpg")}
//             alt="chris appleton loog and learn"
//             width={1000}
//             height={1000}
//           />
//         </div>
//       </div> */}



//       <div className='bg-transparent'>


//         <div className=''>

//           {/* <div className='slider-container '>
//             <H1Text
//               text="What's New?"
//               className="text-themeColor"
//             />
//           </div> */}
//           <div className='space-between-categories' />



//           {/* <RecentlyReleased recentlyReleasedCourses={} heroTitle={} userDataAccessedCourses={} themeColor={themeColor} /> */}

//           <div>


//             <div>



//               <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//                 <Skeleton className="h-14" />
//                 <Skeleton className="h-14" />
//                 <Skeleton className="h-14" />
//               </div>}>
//                 <TipsHomePageNotSignedIn user={user}
//                 />
//               </Suspense>

//             </div>


//           </div>


//           {/* <div className="small-space" /> */}
//           {/* <div className='flex overflow-x-auto space-x-4 slider-container'>

     


//             <div className='rounded-xl border-border  border-[1px]'>
//               <div style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
//                 <Image
//                   src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/06/btcu2after-2023-12-14T163714.831.png"
//                   alt='buttons-whats new  btcu'
//                   width={imageWidth}
//                   height={imageHeight}
//                   className="w-full h-full object-cover rounded-t-xl"
//                 />

//               </div>
//             </div>
//             <div className='rounded-xl border-border  border-[1px]'>
//               <div style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
//                 <Image
//                   src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/06/btcu2after-2023-12-14T163714.831.png"
//                   alt='buttons-whats new  btcu'
//                   width={imageWidth}
//                   height={imageHeight}
//                   className="w-full h-full object-cover rounded-t-xl"
//                 />

//               </div>
//             </div>
//             <div className='rounded-xl border-border  border-[1px]'>
//               <div style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
//                 <Image
//                   src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/06/btcu2after-2023-12-14T163714.831.png"
//                   alt='buttons-whats new  btcu'
//                   width={imageWidth}
//                   height={imageHeight}
//                   className="w-full h-full object-cover rounded-t-xl"
//                 />

//               </div>
//             </div>
//             <div className='rounded-xl border-border  border-[1px]'>
//               <div style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
//                 <Image
//                   src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/06/btcu2after-2023-12-14T163714.831.png"
//                   alt='buttons-whats new  btcu'
//                   width={imageWidth}
//                   height={imageHeight}
//                   className="w-full h-full object-cover rounded-t-xl"
//                 />

//               </div>
//             </div>
//           </div> */}

//         </div>

//       </div>
//       <div className='space-between-categories' />
//       <div className='text-themeColor slider-container text-[28px] tracking-[-1px]'>
//         Favorite Courses
//       </div> 

//       <div className="space-under-category-titles" /> 
    
//       <div className='favorites'>


//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//         </div>}>
//           <FavColorHomePageNotSignedIn />
//         </Suspense>

//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//         </div>}>
//           <FavHaircuttingHomePageNotSignedIn />
//         </Suspense>

//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//         </div>}>
//           <FavStylingHomePageNotSignedIn />
//         </Suspense>

//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//         </div>}>
//           <FavTextureHomePageNotSignedIn />
//         </Suspense>

//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//         </div>}>
//           <FavMensHomePageNotSignedIn />
//         </Suspense>

//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//         </div>}>
//           <FavExtensionsHomePageNotSignedIn />
//         </Suspense>


//       </div>

//       <div className='hidden bg-themecolor-50'>


//         <div className='py-8  md:justify-center md:mx-auto'>

//           <div className='slider-container'>
//             <SH1Text
//               text="The Industry's Best in Every Category"
//               className="text-themeColor"
//             />
//             <ParagraphText
//               text="Explore our most popular categories and dive into new classes, timesaving techniques and world-class education."
//             />
//           </div>
//           <div className="small-space" />



//           <div className='grid grid-cols-2 md:flex md:px-[6%] gap-4'>
//             <div className='mx-auto'>
//               <Link href='/haircolor'>
//                 <div className='flex flex-col items-center'>
//                   <div className='rounded-xl border-border  border-[1px] '>
//                     {/* Mobile */}
//                     <div className='md:hidden'>
//                       <Image
//                         src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Hair-Color.png")}
//                         alt='buttons-whats new  btcu'
//                         width='155'
//                         height='155'
//                         className="w-full h-full object-cover rounded-t-xl"
//                       />
//                     </div>


//                     {/* Desktop */}
//                     <div className='hidden md:block'>
//                       <Image
//                         src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Hair-Color.png")}
//                         alt='buttons-whats new  btcu'
//                         width='300'
//                         height='300'
//                         className="w-full h-full object-cover rounded-t-xl"
//                       />
//                     </div>



//                     <div className='bg-black rounded-b-xl flex items-center justify-center opacity-70'>
//                       <div className='py-[10px] text-[12px] text-white'>
//                         Hair Color
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>



//             <div className='mx-auto'>
//               <Link href='/haircutting'>
//                 <div className='flex flex-col items-center'>
//                   <div className='rounded-xl border-border  border-[1px] '>
//                     {/* Mobile */}
//                     <div className='md:hidden'>
//                       <Image
//                         src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Haircutting.png")}
//                         alt='buttons-whats new  btcu'
//                         width='155'
//                         height='155'
//                         className="w-full h-full object-cover rounded-t-xl"
//                       />
//                     </div>


//                     {/* Desktop */}
//                     <div className='hidden md:block'>
//                       <Image
//                         src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Haircutting.png")}
//                         alt='buttons-whats new  btcu'
//                         width='300'
//                         height='300'
//                         className="w-full h-full object-cover rounded-t-xl"
//                       />
//                     </div>

//                     <div className='bg-black rounded-b-xl flex items-center justify-center opacity-70'>
//                       <div className='py-[10px] text-[12px] text-white'>
//                         Haircutting
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             <div className='mx-auto'>
//               <Link href='/business'>
//                 <div className='flex flex-col items-center'>
//                   <div className='rounded-xl border-border  border-[1px] '>
//                     {/* Mobile */}
//                     <div className='md:hidden'>
//                       <Image
//                         src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Business.png")}
//                         alt='buttons-whats new  btcu'
//                         width='155'
//                         height='155'
//                         className="w-full h-full object-cover rounded-t-xl"
//                       />
//                     </div>


//                     {/* Desktop */}
//                     <div className='hidden md:block'>
//                       <Image
//                         src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Business.png")}
//                         alt='buttons-whats new  btcu'
//                         width='300'
//                         height='300'
//                         className="w-full h-full object-cover rounded-t-xl"
//                       />
//                     </div>



//                     <div className='bg-black rounded-b-xl flex items-center justify-center opacity-70'>
//                       <div className='py-[10px] text-[12px] text-white'>
//                         Business
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className='mx-auto'>


//               <Link href='/texture'>
//                 <div className='flex flex-col items-center'>
//                   <div className='rounded-xl border-border  border-[1px] '>
//                     {/* Mobile */}
//                     <div className='md:hidden'>
//                       <Image
//                         src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Texture.png")}
//                         alt='buttons-whats new  btcu'
//                         width='155'
//                         height='155'
//                         className="w-full h-full object-cover rounded-t-xl"
//                       />
//                     </div>


//                     {/* Desktop */}
//                     <div className='hidden md:block'>
//                       <Image
//                         src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Texture.png")}
//                         alt='buttons-whats new  btcu'
//                         width='300'
//                         height='300'
//                         className="w-full h-full object-cover rounded-t-xl"
//                       />
//                     </div>

//                     <div className='bg-black rounded-b-xl flex items-center justify-center opacity-70'>
//                       <div className='py-[10px] text-[12px] text-white'>
//                         Texture
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>



//         </div>

//       </div>


//       <div className="small-space" />
//       <div className="">

//       </div>



//       <div className="pb-6 md:container md:mx-auto">


//         {/* <div className=" space-between-categories" />
//         // <StudentsAreViewing /> */}

// <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//         </div>}>
//           <UpcomingCoursesHomePageNotSignedIn themeColor={themeColor} />
//         </Suspense>


//         <CourseSubCallOut />
//       </div>
//     </div>
//   );
// }

const HomePageNotSignedIn: React.FC<HomePageNotSignedInProps> = ({
  // upcomingCourses,
  user,
  themeColor,
  // tipsandDownloadables,
  // userDownloadableAccessLevel
}) => {

  return (
    <div className='w-full'>


      <div>
        {/* <div className="!w-full relative pb-[56.25%] h-0 overflow-hidden  xl:mt-0">
          <iframe
            src={`https://player.vimeo.com/video/${843945473}?`}
            className="!w-full !h-full !absolute !top-0 !left-0 rounded-t-xl"
            allow="fullscreen"
          />
        </div> */}
      </div>

      <div className="relative md:flex md:justify-center md:mx-auto bg-[#12120E]">

        {/* Mobile */}
        <div className='md:hidden'>
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/mobile-1.png"}
            alt="btcu"
            width={1000}
            height={1000}
          />
        </div>

        {/* Desktop */}
        <div className='hidden md:block'>
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/desktop-1.png"}
            alt="btcu"
            width={1000}
            height={1000}
          />
        </div>




        {/* <H2Text
          text="I've got a secret to tell..."
          className="text-white absolute inset-0 flex items-center justify-center z-10"
        /> */}
      </div>


      <div className='bg-[#A79995]'>
        <div className='py-8'>


          <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>}>
            <Link href={'/downloadables'} className='mx-auto'>
              

            {/* Mobile */}
            <div className='md:hidden'>
              <Image
                  src={"http://cms.btcuniversity.com/wp-content/uploads/2024/02/BTC-U-Downloadable-Library-Homepage-Graphic-for-Mobile-4.png"}
                alt="btcu"
                width={1000}
                  height={1000}
                  className='mx-auto'
              />
            </div>

            {/* Desktop */}
            <div className='hidden md:block'>
              <Image
                  src={"http://cms.btcuniversity.com/wp-content/uploads/2024/02/BTC-U-Downloadable-Library-Homepage-Graphic-for-Desktop-3.png"}
                alt="btcu"
                width={1000}
                  height={1000}
                  className='mx-auto'

              />
            </div>
            </Link>
            {/* <DownloadablesHomePageNotSignedIn user={user}
            /> */}
          </Suspense>



        </div>
      </div>


      {/* 
      <div className="flex relative py-[20px] md:container md:justify-center md:mx-auto">
        <div className='w-[40%] container'>
          <H2Text
            text="Welcome to an all new BTC-U!"
            className="text-themeColor"
          />

          <div>

          </div>
          <div className='pt-4 pb-6'>
            <ParagraphText text='Build confidence & learn from the best in the business for only 33 cents a day.' />

          </div>
          <Button >
            Subscribe
          </Button>
        </div>

        <div className='w-[60%]'>
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/12/cja8si0q9fqk-o80qlfpqj1pa-blonde-shirt-4.jpg"}
            alt="chris appleton loog and learn"
            width={1000}
            height={1000}
          />
        </div>
      </div> */}



      <div className='bg-transparent'>


        <div className=''>

          {/* <div className='slider-container '>
            <H1Text
              text="What's New?"
              className="text-themeColor"
            />
          </div> */}
          <div className='space-between-categories' />



          {/* <RecentlyReleased recentlyReleasedCourses={} heroTitle={} userDataAccessedCourses={} themeColor={themeColor} /> */}

          <div>


            <div>



              <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>}>
                <TipsHomePageNotSignedIn user={user}
                />
              </Suspense>

           

            </div>


          </div>


          {/* <div className="small-space" /> */}
          {/* <div className='flex overflow-x-auto space-x-4 slider-container'>

     


            <div className='rounded-xl border-border  border-[1px]'>
              <div style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
                <Image
                  src={"https://cms.btcuniversity.com/wp-content/uploads/2023/06/btcu2after-2023-12-14T163714.831.png"
                  alt='buttons-whats new  btcu'
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-full object-cover rounded-t-xl"
                />

              </div>
            </div>
            <div className='rounded-xl border-border  border-[1px]'>
              <div style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
                <Image
                  src={"https://cms.btcuniversity.com/wp-content/uploads/2023/06/btcu2after-2023-12-14T163714.831.png"
                  alt='buttons-whats new  btcu'
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-full object-cover rounded-t-xl"
                />

              </div>
            </div>
            <div className='rounded-xl border-border  border-[1px]'>
              <div style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
                <Image
                  src={"https://cms.btcuniversity.com/wp-content/uploads/2023/06/btcu2after-2023-12-14T163714.831.png"
                  alt='buttons-whats new  btcu'
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-full object-cover rounded-t-xl"
                />

              </div>
            </div>
            <div className='rounded-xl border-border  border-[1px]'>
              <div style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}>
                <Image
                  src={"https://cms.btcuniversity.com/wp-content/uploads/2023/06/btcu2after-2023-12-14T163714.831.png"
                  alt='buttons-whats new  btcu'
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-full object-cover rounded-t-xl"
                />

              </div>
            </div>
          </div> */}

        </div>

      </div>
    

      <div className='text-themeColor slider-container text-[28px] tracking-[-1px]'>
        Favorite Courses
      </div> 

      <div className="space-under-category-titles" /> 
    
      <div className='favorites'>


        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <FavColorHomePageNotSignedIn />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <FavHaircuttingHomePageNotSignedIn />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <FavBusinessHomePageNotSignedIn />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <FavStylingHomePageNotSignedIn />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <FavTextureHomePageNotSignedIn />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <FavMensHomePageNotSignedIn />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <FavExtensionsHomePageNotSignedIn />
        </Suspense>


      </div>

      <div className='hidden bg-themecolor-50'>


        <div className='py-8  md:justify-center md:mx-auto'>

          <div className='slider-container'>
            <SH1Text
              text="The Industry's Best in Every Category"
              className="text-themeColor"
            />
            <ParagraphText
              text="Explore our most popular categories and dive into new courses, timesaving techniques and world-class education."
            />
          </div>
          <div className="small-space" />



          <div className='grid grid-cols-2 md:flex md:px-[6%] gap-4'>
            <div className='mx-auto'>
              <Link href='/haircolor'>
                <div className='flex flex-col items-center'>
                  <div className='rounded-xl border-border  border-[1px] '>
                    {/* Mobile */}
                    <div className='md:hidden'>
                      <Image
                        src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Hair-Color.png"}
                        alt='buttons-whats new  btcu'
                        width='155'
                        height='155'
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>


                    {/* Desktop */}
                    <div className='hidden md:block'>
                      <Image
                        src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Hair-Color.png"}
                        alt='buttons-whats new  btcu'
                        width='300'
                        height='300'
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>



                    <div className='bg-black rounded-b-xl flex items-center justify-center opacity-70'>
                      <div className='py-[10px] text-[12px] text-white'>
                        Hair Color
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>



            <div className='mx-auto'>
              <Link href='/haircutting'>
                <div className='flex flex-col items-center'>
                  <div className='rounded-xl border-border  border-[1px] '>
                    {/* Mobile */}
                    <div className='md:hidden'>
                      <Image
                        src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Haircutting.png"}
                        alt='buttons-whats new  btcu'
                        width='155'
                        height='155'
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>


                    {/* Desktop */}
                    <div className='hidden md:block'>
                      <Image
                        src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Haircutting.png"}
                        alt='buttons-whats new  btcu'
                        width='300'
                        height='300'
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>

                    <div className='bg-black rounded-b-xl flex items-center justify-center opacity-70'>
                      <div className='py-[10px] text-[12px] text-white'>
                        Haircutting
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className='mx-auto'>
              <Link href='/business'>
                <div className='flex flex-col items-center'>
                  <div className='rounded-xl border-border  border-[1px] '>
                    {/* Mobile */}
                    <div className='md:hidden'>
                      <Image
                        src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Business.png"}
                        alt='buttons-whats new  btcu'
                        width='155'
                        height='155'
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>


                    {/* Desktop */}
                    <div className='hidden md:block'>
                      <Image
                        src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Business.png"}
                        alt='buttons-whats new  btcu'
                        width='300'
                        height='300'
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>



                    <div className='bg-black rounded-b-xl flex items-center justify-center opacity-70'>
                      <div className='py-[10px] text-[12px] text-white'>
                        Business
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className='mx-auto'>


              <Link href='/texture'>
                <div className='flex flex-col items-center'>
                  <div className='rounded-xl border-border  border-[1px] '>
                    {/* Mobile */}
                    <div className='md:hidden'>
                      <Image
                        src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Texture.png"}
                        alt='buttons-whats new  btcu'
                        width='155'
                        height='155'
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>


                    {/* Desktop */}
                    <div className='hidden md:block'>
                      <Image
                        src={"https://cms.btcuniversity.com/wp-content/uploads/2024/01/Homepage-Texture.png"}
                        alt='buttons-whats new  btcu'
                        width='300'
                        height='300'
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>

                    <div className='bg-black rounded-b-xl flex items-center justify-center opacity-70'>
                      <div className='py-[10px] text-[12px] text-white'>
                        Texture
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
         
            
            
          </div>

    

        </div>
     
      </div>


      <div className="small-space" />
      <div className="">

      </div>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <UpcomingCoursesHomePageNotSignedIn themeColor={themeColor} userDataBaseId={(user?.userDataId || 0).toString()} />
      </Suspense>


      <div className="pb-6 md:container md:mx-auto">






        <CourseSubCallOut />
      </div>
    </div>
  );
}

export default HomePageNotSignedIn;