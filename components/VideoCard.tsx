"use client"
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import ParentExitFlow from './ParentExitFlow';
import { Course, CourseChapter, Downloadable, Educator, UsedProduct } from '@/interfaces';
import LiveVideoPlayer from './LiveVideoPlayer';
import VideoPlayer from './VideoPlayer';
import ChaptersClickable from './ChaptersClickable';
import SH1Text from './text/SH1Text';
import CardHandle from './text/CardHandle';
import ProductsUsed from './ProductsUsed';
import CourseFormulas from './CourseFormulas';
import ActionButtonPDFs from './buttons/ActionButtonPDFs';
import NotePad from './NotePad';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/Button';
import CoursePageTitles from './text/CoursePageTitles';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo } from 'react';
import H3Text from './text/H3Text';
import { useMutation } from '@apollo/client';
import { CREATE_ACCESSED_COURSE_MUTATION, UPDATE_ACCESSED_COURSE } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import DownloadableCard from './DownloadableCard';
import H5Text from './text/H5Text';
import H4Text from './text/H4Text';

interface NoteData {
  note: string;
  lastSavedOn: string;
}

interface VideoCardProps {

  vimeoIds: string[];
  liveVideoId: string;
  courseID: number;
  accessedCourseDBId: number;
  userDataDBId: number;
  userId: number;
  isSignedIn: boolean;
  startChapter: number;
  isPartOfAccessedCourses: boolean;
  hasCompletedCourse: boolean; // Whether user has an AccessedCourse object with isCompleted === true for this course
  startTime: number;
  courseIsLive: boolean;
  courseChapters: CourseChapter[];
  courseFormulas: string;
  courseTitle: string;
  courseEducators: Educator[];
  downloadables: Downloadable[];
  usedProducts: UsedProduct[];
  upcomingCourses: Course[];
  educatorHandles: string[];
  // canDownload: boolean;
  // isPurchasableALaCarte: boolean;
  // isPurchasableOnlyALaCarte: boolean;
  courseCardImage: string;
  customeremail: string;
  certificateimage: string;
  themeColor: string;
  // coursesFromTheSameSeries: Course[]; // make sure current course is removed
  coursesFromTheSameEducator: Course[]; // make sure current course is removed
  relatedCourses: Course[]; // this should already have current course removed
  hasPreviouslyPostedTestimonial: boolean;
  // firstname: string;
  // lastname: string;
  fullname: string;
  note: string;
  lastSavedOn: string;
  // userDownloadableAccessLevel: string;
  noteData: NoteData;
  onNoteUpdate: (newNote: string, newLastSavedOn: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  vimeoIds,
  liveVideoId,
  customeremail,
  courseID,
  certificateimage,
  accessedCourseDBId,
  userDataDBId,
  userId,
  isSignedIn,
  startChapter,
  isPartOfAccessedCourses,
  hasCompletedCourse,
  // startTime, deprecated, to do after launch
  courseIsLive,
  courseChapters,
  courseFormulas,
  courseTitle,
  courseEducators,
  downloadables,
  usedProducts,
  upcomingCourses,
  courseCardImage,
  educatorHandles,
  // canDownload,
  // isPurchasableALaCarte,
  // isPurchasableOnlyALaCarte,
  // userDownloadableAccessLevel,
  themeColor,
  // coursesFromTheSameSeries,
  coursesFromTheSameEducator,
  relatedCourses,
  hasPreviouslyPostedTestimonial,
  // firstname,
  // lastname,
  fullname,
  note,
  lastSavedOn,
  
  noteData,
  onNoteUpdate,
 }) => {
  
  const router = useRouter();

  let startTime = 0;

  const [isExitFlowVisible, setExitFlowVisible] = useState(false);
  const parentExitFlowRef = useRef(null); // Create a ref here to trigger exitflow on video end

  const [isExpanded, setIsExpanded] = useState(false);
  let [hasPreviousChapter, setHasPreviousChapter] = useState(false);
  let [hasNextChapter, setHasNextChapter] = useState(false);
  const [videoPosition, setVideoPosition] = useState(startChapter - 1);
  const [chapterPosition, setChapterPosition] = useState(startChapter - 1);
  const [chapterPositionFromCard, setChapterPositionFromCard] = useState(startChapter - 1);
  const [chapterPositionFromVimeo, setChapterPositionFromVimeo] = useState(startChapter - 1);
  const [secondsFromVimeo, setSecondsFromVimeo] = useState(startTime);
  const [sectionTitle, setSectionTitle] = useState(courseChapters[startChapter - 1]?.chapterName || "");
  const [updatedStartTime, setUpdatedStartTime] = useState(startTime);
  const [selectedChapter, setSelectedChapter] = useState(courseChapters[startChapter - 1]?.chapterName || "");
  const [selectedChapterIndexInChaptersClickable, setSelectedChapterIndexInChaptersClickable] = useState(0);
  const [hasUpdatedAccessedCourse, setHasUpdatedAccessedCourse] = useState(false);
  const [hasCreatedAccessedCourse, setHasCreatedAccessedCourse] = useState(false);
  const [updateAccessedCourse] = useMutation(UPDATE_ACCESSED_COURSE);
  const [createAccessedCourse] = useMutation(CREATE_ACCESSED_COURSE_MUTATION);
  // const [selectedChapterIndex, setSelectedChapterIndex] = useState(courseChapters[startChapter - 1]?.chapterName || "");

  // Effect to add event listener for scroll events
  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom) {
        // Send to GA
        (window as any).dataLayer.push({
          event: "scrolledToSeeAllFormulas",
    
          onPageOfCourse: courseID.toString(),
          userDataId: userDataDBId.toString(),
    
          timestamp: new Date().toISOString(),
        });
      } else {
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // jan 21
  const [noteState, setNoteState] = useState({
    note: note,
    lastSavedOn: lastSavedOn
  });

  const handleNoteUpdate = (newNote: string, newLastSavedOn: string) => {
    setNoteState({ note: newNote, lastSavedOn: newLastSavedOn });
  };

  const userClickedEducator = (educatorName: string, educatorInstaHandle: string) => {
    (window as any).dataLayer.push({
        event: "clickedEducatorInVideoModal",

        onPageOfCourse: courseID.toString(),
        userDataId: userDataDBId.toString(),

        educatorName: educatorName,
        educatorHandle: educatorInstaHandle,

        timestamp: new Date().toISOString(),
    });
  }
  

  const educatorIds = courseEducators.map(educator => educator.databaseId);

  function formatDate(date: Date) {
    const pad = (num: number) => num.toString().padStart(2, '0');
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);  // +1 because months are 0-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const today = new Date();
  const formattedDate = formatDate(today);

  const handleUpdateAccessedCourse = async (accessedCourseId: number, isCompleted: boolean, completionDate: string) => {

    await updateAccessedCourse({
      variables: {
        input: {
          accessedCourseId: accessedCourseId,
          isCompleted: isCompleted,
          completionDate: completionDate,
        },
      },
    });
  };

  // const createActionCards = (downloadables: Downloadable[] = [], userDownloadableAccessLevel: string) => (downloadables ?? []).map(
  //   (downloadable: Downloadable) => (
  //     <ActionButtonPDFs
  //       key={downloadable.databaseId}
  //       text={downloadable?.title || ""}
  //       link={downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
  //       description={downloadable?.content || ""}
  //       textColor={'black'}
  //       borderColor={'black'}
  //       // canDownload={userIsCurrentlySubscribed}
  //       downloadableAccessLevel={downloadable?.downloadablemetadata?.accessLevel}
  //       userDownloadableAccessLevel={userDownloadableAccessLevel}
  //       isPurchasableALaCarte={false} // only needed for individual courses, not categories
  //       isPurchasableOnlyALaCarte={false} // only needed for individual courses, not categories
  //       downloadImage={downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""} 
  //       themecolor={themeColor} 
  //     />
  //   )
  // );
  // above deprecared by mihai on feb 7 2024 and replaced with link action cards that take to the downloadables page
  const createActionCards = (downloadables: Downloadable[] = []) => (downloadables ?? []).map(
      (downloadable: Downloadable) => (
          <DownloadableCard
              key={downloadable.databaseId}
              slug={downloadable.slug}
              text={downloadable?.title || ""}
              link={downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
              description={downloadable?.content || ""}
              // canDownload={userIsCurrentlySubscribed}
              downloadImage={downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""}
              themecolor={themeColor}
          />
      )
  );

  const downloadableCards = createActionCards(
    downloadables, 
    // userDownloadableAccessLevel
    );

  // const toggleExitFlow = () => {
  //   setExitFlowVisible(!isExitFlowVisible);
  // };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const timeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(':').map(part => parseInt(part, 10));
    if (parts.length === 3) {
      // hours:minutes:seconds format
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // minutes:seconds format
      return parts[0] * 60 + parts[1];
    } else {
      // Invalid format
      console.error("Invalid time format:", timeStr);
      return 0;
    }
  }

  const hasMultipleVideos = (vimeoIds?.length || 0) > 1;
  const hasMultipleChapters = (courseChapters?.length || 0) > 1;

  const isCompleteOnStart = false;


  const handleCreateAccessedCourse = async () => {
    if (!hasCreatedAccessedCourse && !isPartOfAccessedCourses && isSignedIn) {

      await createAccessedCourse({
        variables: {
          input: {
            isCompleted: isCompleteOnStart,
            userId: userId,
            userDataId: userDataDBId,
            courseId: courseID,
            startdate: formattedDate,
            status: "seen",
            endedAtChapter: 1,
          },
        },
      });

      setHasCreatedAccessedCourse(true); // Set flag to prevent future executions
      router.refresh();
    }
  };

  useEffect(() => {
    handleCreateAccessedCourse();
  }, []);

  useEffect(() => {
    setHasPreviousChapter(videoPosition > 0);
    setHasNextChapter(videoPosition < ((courseChapters?.length || 0) - 1));
  }, [videoPosition, courseChapters]);

  useEffect(() => {
    setHasPreviousChapter(chapterPosition > 0);
    setHasNextChapter(chapterPosition < ((courseChapters?.length || 0) - 1));
  }, [chapterPosition, courseChapters]);

  const updateSectionTitle = (newValue: string) => {
    // Update the chapter aka section title in VideoCard
    setSectionTitle(newValue);
  };

  // when the video ends
  const updateVideoPosition = (newChapter: number) => {
    // Update the video position in VideoCard
    setVideoPosition(newChapter);
  };

  // when the chapter ends i.e. time reaches the start time of the next chapter
  const updateChapterPositionFromCard = useCallback((newValue: number) => {
    // Update the video position in VideoCard
    setChapterPositionFromCard(newValue);
  }, []);
  
  const updateChapterPositionFromVimeo = (newValue: number) => {
    // Update the video position in VideoCard
    setChapterPositionFromVimeo(newValue);
  };

  const updateSecondsFromVimeo = (newValue: number) => {
    // Update the video position in VideoCard
    setSecondsFromVimeo(newValue);
  };

  // when the chapter ends i.e. time reaches the start time of the next chapter
  const updateChapterPosition = (newValue: number) => {
    // Update the video position in VideoCard
    setChapterPosition(newValue);
  };

  const updateStartAtTime = (newValue: number) => {
    // Update the video position in VideoCard
    setUpdatedStartTime(newValue);
  };

  const updateSelectedChapter = (newChapter: string) => {
    // Update the video position in VideoCard
    setSelectedChapter(newChapter);
  };

  

  // Function to trigger ParentExitFlow on course completion
  const triggerParentExitFlow = (newValue: boolean) => {
    setExitFlowVisible(newValue);
    if (!hasCompletedCourse && !hasUpdatedAccessedCourse && isPartOfAccessedCourses && isSignedIn) {
      handleUpdateAccessedCourse(accessedCourseDBId, true, formattedDate); // update the iscompleted and end time in AccessedCourse
      setHasUpdatedAccessedCourse(true); // Set flag to prevent future executions
    }
  };

  const updateExitFlowVisible = (newValue : boolean) => {
    setExitFlowVisible(newValue);
    if (!hasCompletedCourse && !hasUpdatedAccessedCourse && isPartOfAccessedCourses && isSignedIn) {
      handleUpdateAccessedCourse(accessedCourseDBId, true, formattedDate); // update the iscompleted and end time in AccessedCourse
      setHasUpdatedAccessedCourse(true); // Set flag to prevent future executions
    }
  }

  // useEffect(() => {
  //   // This will run whenever videoPosition changes -- used for cases with 1-chapter videos
  //   setSectionTitle(courseChapters[videoPosition]?.chapterName || "");
  //   setHasPreviousChapter(videoPosition > 0);
  //   setHasNextChapter(videoPosition < (courseChapters.length - 1));
  //   // console.log("videoPosition updated to: ", videoPosition);
  //   // console.log("hasPreviousChapter is: ", videoPosition > 0);
  // }, [videoPosition, courseChapters]);


  useEffect(() => {
    // This will run whenever chapterPosition changes -- used for cases with 1 multi-chapter video
    const seconds = timeToSeconds(courseChapters[chapterPositionFromCard]?.chapterStartsAt || "0:00");
    // setSectionTitle(courseChapters[chapterPositionFromCard]?.chapterName || "");
    setHasPreviousChapter(chapterPositionFromCard > 0);
    setHasNextChapter(chapterPositionFromCard < (courseChapters.length - 1));
    // setChapterPosition(chapterPositionFromCard);
    setUpdatedStartTime(seconds); // deprecated dec 29 and brought back same day
    setSelectedChapterIndexInChaptersClickable(chapterPositionFromCard);
    // console.log("chapterPosition updated to: ", chapterPositionFromButton);
    // console.log("hasPreviousChapter is: ", chapterPositionFromButton > 0);
    // console.log("seconds is: ", seconds);
    // console.log("updatedStartTime is: ", updatedStartTime);
  }, [chapterPositionFromCard, courseChapters]);


  useEffect(() => {
    setHasPreviousChapter(chapterPositionFromVimeo > 0);
    setHasNextChapter(chapterPositionFromVimeo < (courseChapters.length - 1));
    setChapterPosition(chapterPositionFromVimeo);
    setSelectedChapterIndexInChaptersClickable(chapterPositionFromVimeo);
  }, [chapterPositionFromVimeo, courseChapters]);

  // useEffect(() => {
  //   setUpdatedStartTime(secondsFromVimeo); 
  // }, [secondsFromVimeo, courseChapters]);


  const courseWithMultipleChapterVideos = (hasMultipleVideos === true && hasMultipleChapters === true);

  const goToPreviousChapter = () => {
    if (hasMultipleVideos === true && hasMultipleChapters === true) {
      if (videoPosition > 0) {
        setVideoPosition(prevVideoPosition => prevVideoPosition - 1);
      }
    }
    else if (hasMultipleVideos === false && hasMultipleChapters === true) {
      if (chapterPosition > 0) {
        // setChapterPosition(prevVideoPosition => prevVideoPosition - 1);
        setChapterPositionFromCard(chapterPosition - 1);
        // setSelectedChapter(courseChapters[chapterPosition - 1].chapterName);
      }
    }
    // done (seems to be working now) oct 11: action for 1 multi-chapter  video
  };

  // done oct 11: add chapters inside PLaybutton as well and make em work as buttons

  const goToNextChapter = () => {
    if (hasMultipleVideos === true && hasMultipleChapters === true) {
      if (videoPosition < (courseChapters.length - 1)) {
        setVideoPosition(prevVideoPosition => prevVideoPosition + 1);
      }
    }
    else if (hasMultipleVideos === false && hasMultipleChapters === true) {
      if (chapterPosition < (courseChapters.length - 1)) {
        // setChapterPosition((prevVideoPosition => prevVideoPosition + 1));
        setChapterPositionFromCard(chapterPosition + 1);
        // setSelectedChapter(courseChapters[chapterPosition + 1].chapterName);
      }
    }
  };

  const [notesVisible, setNotesVisible] = useState(false);

  // Function to close the notes component
  const closeNotes = () => {
    setNotesVisible(false);
  };

  const handleButtonClick = () => {
    // Toggle the visibility when the button is clicked
    setNotesVisible((prevState) => !prevState);
  };
  
  return (
    <main className="md:container  text-white mx-auto py-4">
      <div className='md:flex'>
        <div className='md:w-2/3'>
          <div className="">
            {/* <CourseContentVideo embedCode={""} /> */}
            {courseIsLive === true ? (
              // LiveVideoPlayer playing live content
              <LiveVideoPlayer
                videoId={liveVideoId}
              />
            ) : (
              // VideoPlayer playing main content
              <VideoPlayer
                videoIds={vimeoIds}
                courseId={courseID}
                accessedCourseId={accessedCourseDBId}
                userDataId={userDataDBId}
                userId={userId}
                isSignedIn={isSignedIn}
                startAtChapter={startChapter}
                hasAccessedCourse={isPartOfAccessedCourses}
                hasCompletedCourse={hasCompletedCourse}
                hasMultipleChapterVideos={courseWithMultipleChapterVideos}
                startTime={updatedStartTime} // Pass the start time as a prop
                courseChapters={courseChapters} // Pass the start time as a prop
                updateSectionTitle={updateSectionTitle} // Pass the section title callback function
                updateVideoPosition={updateVideoPosition} // Pass the video position callback function
                updateChapterPosition={updateChapterPosition} // Pass the chapter position callback function
                updateStartAtTime={updateStartAtTime} // Pass the start at position callback function
                updateChapterPositionFromCard={updateChapterPositionFromVimeo}
                updateSecondsFromVimeo={updateSecondsFromVimeo}
                videoPosition={videoPosition}
                triggerParentExitFlow={triggerParentExitFlow}
              />

            )}
          </div>
          <div className="space-under-category-titles" />
          <div className='flex items-center w-full p-4 md:px-0'>


            <div onClick={handleButtonClick}>



              <Button variant={'secondary'} className='bg-white text-themeColor'>{notesVisible ? "Collapse Notes" : "Take Notes"}</Button>



            </div>
            <div className='flex flex-grow justify-end'>
              {hasPreviousChapter ? (
                <div className='px-2'>
               
                  <button
                      onClick={goToPreviousChapter} > 
                         <Button variant={'secondary'}
                    
                    className='border-white bg-white text-themeColor' >
Back

                    </Button>
            
</button>

                    {/* if there are multiple videos, this should change video id
                      if there is only 1 video, this should change the start time */}
                 
                </div>
              ) : (
                  <div className='px-2'>
                    <Button className='bg-themecolor-50 bg-opacity-40  text-themecolor-50 border-themecolor-50'>
                      Back
                      {/* <button
                    className="bg-themecolor-50 bg-opacity-40 rounded-full w-[45px] h-[45px] flex items-center justify-center"
                    onClick={goToPreviousChapter} > */}



                      {/* if there are multiple videos, this should change video id
                      if there is only 1 video, this should change the start time */}
                    </Button>


                  {/* <button
                    className="bg-themecolor-50 text-gray-500 bg-opacity-40 rounded-full w-[45px] h-[45px] flex items-center justify-center"
                    disabled
                  >
                    <ChevronLeft />


                  </button> */}
                </div>
              )}
              <div className="flex ">
                {hasNextChapter && !isExitFlowVisible ? (
                  <div className='px-2'>
                    <button
                     
                      onClick={goToNextChapter}
                    >

                      {/* if there are multiple videos, this should change video id
                      if there is only 1 video, this should change the start time */}
                      <Button variant={'secondary'}

                        className='border-white bg-white text-themeColor' >
                        Next

                      </Button>
                    </button>
                  </div>
                ) : (
                  // to trigger this on course completion
                  <ParentExitFlow
                      upcomingCourses={upcomingCourses}
                      courseName={courseTitle}
                      educatorHandles={educatorHandles}
                      image={courseCardImage}
                      customeremail={customeremail}
                      certificateimage={certificateimage}
                      themeColor={themeColor}
                      coursesFromTheSameEducator={coursesFromTheSameEducator}
                      relatedCourses={relatedCourses}
                      isExitFlowVisible={isExitFlowVisible}
                      hasPreviouslyPostedTestimonial={hasPreviouslyPostedTestimonial}
                      isSignedIn={isSignedIn}
                      courseId={courseID}
                      accessedCourseId={accessedCourseDBId}
                      educatorIds={educatorIds}
                      userId={userId}
                      // firstname={firstname} 
                      // lastname={lastname} 
                      fullname={fullname}
                      updateExitFlowVisible={updateExitFlowVisible}
                      userDataId={userDataDBId.toString()} />
                )}
              </div>
            </div>


          </div>
          <div className=' '>
            {notesVisible &&
              <div className='mx-auto container md:px-0 py-4'>
              
              <NotePad
                handleNoteUpdate={onNoteUpdate}
                rawNoteLocal={noteData.note}
                lastSavedOnLocal={noteData.lastSavedOn}
                rawNote={note}
                lastSavedOn={lastSavedOn}
                accessedCourseId={accessedCourseDBId}
                courseId={courseID}
                userDataId={userDataDBId.toString()}
              />
              </div>
            }

          </div>




          <div className='container md:px-0'>
            <div className='items-center'>
              <div className='py-2'>
                <SH1Text text={courseTitle} className='text-white' />
              </div>

            </div>
            <div >
              {courseEducators && courseEducators.length > 0 && (
                <div >
                  {courseEducators && courseEducators.length > 0 && (
                    <div className='' >
                      {courseEducators.map((educator, index) => (
                        <div className='' key={index}>
                          <Link onClick={() => userClickedEducator(educator?.title || "", educator?.educatorMetaData?.instahandle || "")} href={`/educator/${educator.slug}`}>
                            <CardHandle text={educator.educatorMetaData?.instahandle || ''} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="space-under-category-titles" />
            {/* <div className='py-2'>
                <InputTextBold text='Current Chapter' color='white' />
              </div> */}

            {/* <CardTitle text={sectionTitle} /> */}
          </div>



        </div>
        <div className='md:w-1/3 container mx-auto md:px-0 md:pl-8'>
          {hasMultipleChapters ? (
            <ChaptersClickable
              courseChapters={courseChapters}
              vimeoIds={vimeoIds}
              selectedChapterIndex={selectedChapterIndexInChaptersClickable}
              updateSectionTitle={updateSectionTitle}
              updateVideoPosition={updateVideoPosition}
              updateChapterPosition={updateChapterPosition}
              updateChapterPositionFromCard={updateChapterPositionFromCard}
              updateStartAtTime={updateStartAtTime}
              updateSelectedChapter={updateSelectedChapter}
            />
          ) : 
            <div>
              <div className='border-[1px] border-white rounded-xl w-full'>
                <div className="container py-4 flex flex-col items-start">
                  <div className="flex items-center justify-between" onClick={toggleExpansion}>
                    <div className='items-center'>
                      <H5Text text='Chapters' className='text-white' />
                    </div>
                    <div className="items-center justify-end"> {/* Use justify-end to move icons to the end */}
                   
                    </div>
                  </div>


              
                    <div >
                      No chapters for this course
                    </div>
                
                </div>

              </div>
            </div>}

        </div>
      </div>




      <div className='space-between-categories' />



    
    

      <div className='container md:px-0'>

     
          {courseFormulas.length > 0 && (
            <CourseFormulas courseFormulas={courseFormulas} userDataBaseId={userDataDBId.toString()} courseId={courseID}/>
          )}

        {usedProducts.length > 0 && (
          <div>
            <H4Text text='Products Used' className='text-white ' />
            <ProductsUsed productsUsed={usedProducts} productTitleTextColor='white' userDataId={userDataDBId.toString()} courseId={courseID} />

          </div>
        

          )}

          {downloadables && (downloadables.length > 0) && (

            <div className="downloadables pb-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className=" items-center">
                  <H3Text text='Course Resources' className='text-white' />
                  <div className="space-under-category-titles" /> 


                  <div className="flex overflow-x-auto">


                    {downloadableCards}
                  </div>
                  
                  <div className='space-between-categories' />

                  {/* <button onClick={toggleExpansion}>
                      {isExpanded ? (
                        <Minus color='white' size={30} />
                      ) : (
                          <Plus color='white' size={30} />
                      )}
                    </button> */}
                  </div>
                </div>
                {/* {isExpanded ? (
                                       <div className="flex overflow-x-auto">


                    {downloadableCards}
                  </div>
                ) : null} */}
              </div>
    
            </div>
          )}
          <div>


          </div>
    

      </div>


    </main>
  );
}

export default VideoCard;

