// import React from "react";
// import InputTextBold from "../text/InputTextBold";
// import SH1Text from "../text/SH1Text";
// import RecentlyReleased from "../RecentlyReleased";
// import Link from "next/link";
// import { ChevronRight } from 'lucide-react';
// import { AccessedCourse, Course, Educator, UserSession } from "@/interfaces";
// import Upcoming from "../Upcoming";
// import CoursesStarted from "../CoursesStarted";
// import RecommendedCourses from "../RecommendedCourses";
// import CoursesFromEducatorsYouFollow from "../CoursesFromEducatorsYouFollow";
// import CoursesYouBookmarked from "../CoursesYouBookmarked";
// import EducatorsYouFollow from "../EducatorsYourFollow";
// import { Suspense } from "react";
// import { Skeleton } from "@/components/ui/Skeleton";
// import UserFirstNameHomePage from "./UserFirstNameHomePage";
// import UpcomingCoursesHomePage from "./UpcomingCoursesHomePage";
// import RecentlyReleasedHomePage from "./RecentlyReleasedHomePage";
// import CoursesStartedHomePage from "./CoursesStartedHomePage";
// import EducatorsFollowedHomePage from "./EducatorsFollowedHomePage";
// import CoursesBookmarkedHomePage from "./CoursesBookmarkedHomePage";
// import CoursesFromEducatorsFollowedHomePage from "./CoursesFromEducatorsFollowedHomePage";
// import { Button } from "../ui/Button";

// // const createCourseCards = (courses: Course[], courseName: string) => courses
// // .filter((course: Course) => {
// //   return course.tags.nodes.slice(0, 5).some((tag) => tag.slug.toLowerCase() === courseName);
// // })
// // .map((course: Course) => (
// //   <CourseCard key={course.uri} course={course} />
// // ));

// interface DashboardPageProps {
//   // firstname: string;
//   // heroTitle: string;
//   // recentlyReleasedCourses: Course[];
//   // upcomingCourses: Course[];
//   themeColor: string;
//   // userDataAccessedCourses: AccessedCourse[];
//   // coursesStartedAndNotFinished: Course[];
//   // recommendedCourses: Course[];
//   // coursesFromEducatorsYouFollow: Course[];
//   // educatorsYouFollow: Educator[];
//   // coursesYouBookmarked: Course[];
//   user: UserSession | null;
// }

// const DashboardPage: React.FC<DashboardPageProps> = ({
//   // firstname,
//   // heroTitle,
//   // recentlyReleasedCourses,
//   // upcomingCourses,
//   themeColor,
//   // userDataAccessedCourses,
//   // coursesStartedAndNotFinished,
//   // recommendedCourses,
//   // coursesFromEducatorsYouFollow,
//   // educatorsYouFollow,
//   // coursesYouBookmarked,
//   user
// }) => {

//   // Create an array of active states, one for each button
//   // const [activeStates, setActiveStates] = useState<boolean[]>([
//   //   false,
//   //   false,
//   //   false,
//   //   false,
//   // ]);

//   // Function to toggle the active state of a button at a specific index
//   // const toggleInterest = (index: number) => {
//   //   const newActiveStates = [...activeStates];
//   //   newActiveStates[index] = !newActiveStates[index];
//   //   setActiveStates(newActiveStates);
//   // };

//   // above commented out on jan 18. these were not in use and component had to be client because of them

//   return (
//     <main >


//       <div className="space-under-category-titles" />
//       <div className="slider-container ">
//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//           <Skeleton className="h-14" />
//         </div>}>
//           <UserFirstNameHomePage user={user}
//           />
//         </Suspense>
//       </div>

//       <div className="space-under-category-titles" /> 
//       <div className="container flex">
       
//           <Link href="/profile?q=certificates" className="pr-4">
//         <Button >
//                     View Certificates
//                  </Button>
//         </Link>

//               <Link href="/profile" >
//         <Button>
    
//             My Profilefdgdfg
       
//         </Button>
//         </Link>

//       </div>



//       <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//       </div>}>
//         <UpcomingCoursesHomePage themeColor={themeColor}
//         />
//       </Suspense>


//       <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//       </div>}>
//         <RecentlyReleasedHomePage themeColor={themeColor} user={user}
//         />
//       </Suspense>


//       {/* <Tip heroTitle={heroTitle} tipVideos={[]} /> */}
//       <div >

//       <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//       </div>}>
//         <CoursesStartedHomePage themeColor={themeColor} user={user}
//         />
//       </Suspense>



//         {/* {recommendedCourses.length > 0 && (
//           <div>
//             <div className="space-between-categories" />
//             <RecommendedCourses
//               recommendedCourses={recommendedCourses}
//               userDataAccessedCourses={userDataAccessedCourses}
//               themeColor={themeColor}
//             />
//           </div>
//         )} */}
//         {/* make above server component in suspense once we decide what courses to fetch TO DO after launch */}


//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//       </div>}>
//         <CoursesFromEducatorsFollowedHomePage
//           themeColor={themeColor}
//           user={user}
//         />
//       </Suspense>



//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//       </div>}>
//         <EducatorsFollowedHomePage user={user}
//         />
//       </Suspense>

//         <div className="space-between-categories" />

//         <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//         <Skeleton className="h-14" />
//       </div>}>
//         <CoursesBookmarkedHomePage themeColor={themeColor} user={user}
//         />
//       </Suspense>

//       </div>




//       {/* Left Column - Container 1 */}
//       <div className="order-2 md:order-1 md:pl-[10%] md:bg-themecolor-50">
//         <div className="md:w-[336px] ">
   

       
//         </div>
//       </div>

//     </main>
//   );
// };

// export default DashboardPage;
