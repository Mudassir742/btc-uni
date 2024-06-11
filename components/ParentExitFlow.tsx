"use client";
import React, { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import ExitFlow from "./ExitFlow";
import { Course } from "@/interfaces";
import BackWithOnClick from "./buttons/BackWithOnClick";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { XCircle } from "lucide-react";
import { Button } from './ui/Button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Skeleton } from "@/components/ui/Skeleton";
import { ScrollArea } from "@/components/ui/ScrollArea";
import ButtonText from "./text/ButtonText";
interface ParentExitFlowProps {
  upcomingCourses: Course[];
  courseName: string;
  educatorHandles: string[];
  image: string;
  customeremail: string;
  certificateimage: string;
  themeColor: string;
  // coursesFromTheSameSeries: Course[]; // make sure current course is removed
  coursesFromTheSameEducator: Course[]; // make sure current course is removed
  relatedCourses: Course[]; // this should already have current course removed
  isExitFlowVisible: boolean; // this will be updated via the callback function below
  hasPreviouslyPostedTestimonial: boolean;
  isSignedIn: boolean;
  courseId: number;
  accessedCourseId: number;
  educatorIds: number[];
  userId: number;
  // firstname: string;
  // lastname: string;
  fullname: string;
  userDataId: string;
  updateExitFlowVisible: (newValue: boolean) => void; // Callback function to update video position
}

const ParentExitFlow: React.FC<ParentExitFlowProps> = ({
  certificateimage,
  customeremail,
  image,
  upcomingCourses,
  courseName,
  educatorHandles,
  themeColor,
  // coursesFromTheSameSeries,
  coursesFromTheSameEducator,
  relatedCourses,
  isExitFlowVisible,
  hasPreviouslyPostedTestimonial,
  isSignedIn,
  courseId,
  accessedCourseId,
  educatorIds,
  userId,
  userDataId,
  // firstname,
  // lastname,
  fullname,
  updateExitFlowVisible
}) => {
  const pathname = usePathname();
  // const [isExitFlowVisible, setIsExitFlowVisible] = useState(false);

  const openExitFlow = () => {
    updateExitFlowVisible(true);
  };

  const closeExit = () => {
    updateExitFlowVisible(!isExitFlowVisible);
  };

  const BackButton = ({
    handleExitBack,
    text,
  }: {
    handleExitBack: () => void;
    text?: string;
  }) => <BackWithOnClick onClick={handleExitBack} />;

  const [section, setSection] = useState(1);

  // const handleNext = () => {
  //   setSection(section + 1);
  // };

  const handleExitBack = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  return (
    <div className="flex justify-end">
      {" "}
      {/* Use 'justify-end' to align content to the right */}
      <Dialog key="" open={isExitFlowVisible} onOpenChange={closeExit}>
        {!isExitFlowVisible && (
          <div>
            {/* Content of the parent component when ExitFlow is not visible */}
            <DialogTrigger className="w-fit px-2">
              <div
                className="flex items-center "
                // onClick={openMyInfoModal}
              >
                <button
                  onClick={openExitFlow}
                >
                  <Button variant={'secondary'}

                    className='border-white bg-white text-themeColor' >
                    <CheckCircle />

                  </Button>

                  
                
                </button>
              </div>
            </DialogTrigger>
          </div>
        )}

        {isExitFlowVisible && (
          <div className=" ">
            {" "}
            {/* Use 'items-end' to align items to the right */}
     
            {/* <div className='w-screen flex justify-end fixed top-16 right-6'>
  <button onClick={closeExitFlow} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
<XCircle />
  </button> 
</div> */}
            <DialogContent className="min-h-fit py-4">
              <DialogHeader >
                <button className={`absolute bg-white top-5 left-5 flex ${section==1&&'hidden'}`} onClick={handleExitBack}>
                  <ChevronLeft size='24' className='text-themeColor pr-1' />
                  <div className=' items-center'>
                    <ButtonText text='Back' className='pr-2 text-themeColor ' />
                  </div>
                </button>
                <DialogTitle className="px-4 mt-5"></DialogTitle>
                <Suspense
                  fallback={
                    <div className="flex flex-col w-full gap-y-6">
                      <Skeleton className="h-14" />
                      <Skeleton className="h-14" />
                      <Skeleton className="h-14" />
                    </div>
                  }
                >
                  <ScrollArea >
                    <ExitFlow
                      upcomingCourses={upcomingCourses}
                      courseName={courseName}
                      educatorHandles={educatorHandles}
                      image={image}
                      certificateimage={certificateimage}
                      customeremail={customeremail}
                      themeColor={themeColor}
                      coursesFromTheSameEducator={coursesFromTheSameEducator}
                      relatedCourses={relatedCourses}
                      section={section}
                      hasPreviouslyPostedTestimonial={hasPreviouslyPostedTestimonial}
                      isSignedIn={isSignedIn} 
                      courseId={courseId} 
                      accessedCourseId={accessedCourseId} 
                      educatorIds={educatorIds} 
                      userId={userId} 
                      // firstname={firstname} 
                      // lastname={lastname} 
                      fullname={fullname} 
                      setSection={setSection} 
                      userDataId={userDataId}
                    />
                  </ScrollArea>
                </Suspense>
              </DialogHeader>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ParentExitFlow;
