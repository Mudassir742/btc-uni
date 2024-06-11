"use client";
import React, { useState } from "react";
import WatchNext from "./WatchNext";
import ExitFlowSection1 from "./ExitFlowSection1";
import ExitFlowSection2 from "./ExitFlowSection2";
import { Course } from "@/interfaces";
import BackWithOnClick from "./buttons/BackWithOnClick";
import { Button } from "./ui/Button";
import CoursePageTitles from "./text/CoursePageTitles";
import { useMutation } from "@apollo/client";
import { CREATE_TESTIMONIAL_MUTATION } from "@/graphql/mutations";
import H3Text from "./text/H3Text";
import { useRouter } from "next/navigation";

interface ExitFlowProps {
  upcomingCourses: Course[];
  courseName: string;
  educatorHandles: string[];
  image: string;
  certificateimage: string;
  customeremail: string;
  themeColor: string;
  // coursesFromTheSameSeries: Course[]; // make sure current course is removed
  coursesFromTheSameEducator: Course[]; // make sure current course is removed
  relatedCourses: Course[]; // this should already have current course removed
  section: number;
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
  setSection: React.Dispatch<React.SetStateAction<number>>;
}

const NextButton = ({
  handleNext,
  text,
}: {
  handleNext: () => void;
  text?: string;
}) => (
  <div onClick={handleNext}>
    <Button className="px-2">Next</Button>
  </div>
);

const BackButton = ({
  handleExitBack,
  text,
}: {
  handleExitBack: () => void;
  text?: string;
}) => (
  <div onClick={handleExitBack} className="px-2">
    <Button>Back</Button>
  </div>
);

const ExitFlow: React.FC<ExitFlowProps> = ({
  customeremail,
  certificateimage,
  image,
  upcomingCourses,
  courseName,
  educatorHandles,
  themeColor,
  // coursesFromTheSameSeries,
  coursesFromTheSameEducator,
  relatedCourses,
  section,
  hasPreviouslyPostedTestimonial,
  isSignedIn,
  courseId,
  accessedCourseId,
  educatorIds,
  userId,
  // firstname,
  // lastname,
  fullname,
  userDataId,
  setSection,
}) => {
  // State variables to hold values from ExitFlowSection1
  const [classRating, setClassRating] = useState(0);
  const [classFeedback, setClassFeedback] = useState("");
  const [educatorRating, setEducatorRating] = useState(0);
  const [educatorFeedback, setEducatorFeedback] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [hasCreatedTestimonial, setHasCreatedTestimonial] = useState(false);

  // splitting name here instead of fetching just for this in coursehero
  const nameParts = fullname.split(" ");
  const firstname = nameParts[0];
  const lastname = nameParts.slice(1).join(" ");

  const router = useRouter();

  const hasMultipleEducators = educatorIds.length > 1;

  // Define mutation for submitting feedback => 3 mutations in 1 php function
  // 0. check it in the back-end as well before step 1 (as step 0) // NOT NEEDED, checking accessed courses
  // 1. create testimonial
  // 2. add testimonial to course
  // 3. add testimonial to user data // NOT NEEDED, making hasUserPostedTestimonialAlready in AccessedCourse true whenever they post
  // const [submitFeedback, { data, loading, error }] = useMutation(CREATE_TESTIMONIAL_MUTATION);
  const [createTestimonial] = useMutation(CREATE_TESTIMONIAL_MUTATION);

  // const handleNext = () => {
  //   setSection(section + 1);
  // }; // upgraded on jan 2

  const today = new Date();
  function formatDate(date: Date) {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // +1 because months are 0-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const formattedDate = formatDate(today);

  const markPostedTestimonialInsideAccessedCourse = true;

  const handleCreateTestimonial = async () => {
    if (
      !hasCreatedTestimonial &&
      !hasPreviouslyPostedTestimonial &&
      isSignedIn &&
      (classRating ||
        classFeedback ||
        educatorRating ||
        educatorFeedback ||
        selectedDifficulty)
    ) {
      // send to GA
      (window as any).dataLayer.push({
        event: "submittedReview",

        onPageOfCourse: courseId.toString(),
        userDataId: userDataId,

        courseRating: classRating,
        courseReview: classFeedback,
        educatorRating: educatorRating,
        educatorReview: educatorFeedback,
        courseDifficulty: selectedDifficulty,

        timestamp: new Date().toISOString(),
      });

      await createTestimonial({
        variables: {
          input: {
            courseId: courseId, // we need to pass the id here in order to update the Course by adding testimonial to is courseTestimonialsNew field
            accessedCourseId: accessedCourseId, // we need to pass the id here in order to update the accessedCourse object by setting hasPostedTestimonial to true
            classRating: classRating * 20, // because we inherited TI 100 points max system instead of 5 points max
            classFeedback: classFeedback,
            educatorRating: educatorRating * 20, // to align with TI inherited class ratings
            educatorFeedback: educatorFeedback,
            selectedDifficulty: selectedDifficulty,
            courseName: courseName,
            educatorIds: educatorIds,
            userId: userId,
            firstname: firstname,
            lastname: lastname,
            creationDate: formattedDate,
            postedTestimonial: markPostedTestimonialInsideAccessedCourse,
          },
        },
      });

      // await createAccessedCourse({
      //   variables: {
      //     input: {
      //       isCompleted: isCompleteOnStart,
      //       userId: userId,
      //       userDataId: userDataId,
      //       courseId: courseId,
      //       startdate: formattedDate,
      //       status: "seen",
      //       endedAtChapter: 1,
      //     },
      //   },
      // });

      setHasCreatedTestimonial(true); // Set flag to prevent future executions
      router.refresh();
    }
  };

  const handleNext = () => {
    if (section === 1) {
      handleCreateTestimonial();
    }
    if (section === 2) {
      // send to GA
      (window as any).dataLayer.push({
        event: "clickedNextInCertificateModal",
    
        onPageOfCourse: courseId.toString(),
        userDataId: userDataId,
    
        timestamp: new Date().toISOString(),
      });
    }

    // other logic for handleNext
    setSection(section + 1);
  };

  const handleExitBack = () => {
    if (section > 1) {
      setSection(section - 1);
    }
  };

  return (
    <main className="z-90 overflow-y-auto scrollbar-none">
      <div className=" ">
        <div>
          {/* <div className=''>
 {section > 1 && <BackButton handleExitBack={handleExitBack} />}
 </div> */}
        </div>
        <div>
          <div className="space-under-category-titles" />

          {section === 1 && (
            <div>
              {hasPreviouslyPostedTestimonial && (
                <div>You already reviewed this course.</div>
              )}
              {!hasPreviouslyPostedTestimonial && (
                <div>
                  <ExitFlowSection1
                    courseName={courseName}
                    educatorHandles={educatorHandles}
                    image={image}
                    hasMultipleEducators={hasMultipleEducators}
                    onClassRatingChange={setClassRating}
                    onClassFeedbackChange={setClassFeedback}
                    onEducatorRatingChange={setEducatorRating}
                    onEducatorFeedbackChange={setEducatorFeedback}
                    onSelectedDifficultyChange={setSelectedDifficulty}
                  />
                </div>
              )}

              <div className="flex flex-col items-center justify-center">
                <div className="space-between-categories" />
                <NextButton handleNext={handleNext} text={undefined} />

                <div className="space-between-categories" />
              </div>
            </div>
          )}

          {section === 2 && (
            <div>
              <ExitFlowSection2
                certificateimage={certificateimage}
                customeremail={customeremail}
                courseId={courseId}
                userDataId={userDataId}
              />
              <div className="flex flex-col items-center justify-center">
                <div className="space-under-category-titles" />
                <div className="flex max-w-lg mx-auto text-center">
                  {/* <BackButton handleExitBack={handleExitBack} /> */}

                  <NextButton handleNext={handleNext} text={undefined} />
                </div>
                <div className="space-under-category-titles" />
              </div>
            </div>
          )}

          {section === 3 && (
            <div>
              <div className="flex items-center">
                <H3Text text="Want to keep learning?" />
              </div>

              <div className="space-between-categories" />
              <div>
                <WatchNext
                  upcomingCourses={upcomingCourses}
                  themeColor={themeColor}
                  coursesFromTheSameEducator={coursesFromTheSameEducator}
                  relatedCourses={relatedCourses}
                  educatorname={educatorHandles}
                  userDataBaseId={userId.toString()}
                />
              </div>

              <div className="max-w-lg mx-auto text-center">
                {/* <BackButton handleExitBack={handleExitBack}/> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ExitFlow;

// once there is a quiz, it'll appear before the exit survey.
