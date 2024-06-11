"use client"
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import VimeoPlayer from '@vimeo/player';
import { CourseChapter, UserData } from "../interfaces";
import { client } from "../lib/apolloClient";
import { CREATE_ACCESSED_COURSE_MUTATION, UPDATE_ACCESSED_COURSE_MUTATION, UPDATE_ACCESSED_COURSE, ADD_ONE_ACCESED_COURSE_TO_USER_DATA, UPDATE_ACCESED_COURSE_COMPLETION_END, UPDATE_ACCESED_COURSE_COMPLETION_END_CHAPTER, UPDATE_ACCESED_COURSE_COMPLETION_END_TIME } from "@/graphql/mutations";
import { useMutation } from '@apollo/client';
import { formaToWptDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

interface VideoPlayerProps {
  courseId: number;
  userDataId: number;
  userId: number;
  isSignedIn: boolean;
  accessedCourseId: number;
  videoIds: string[];
  startTime: number; // Start time in seconds
  startAtChapter: number; // Start chapter in case chapters are invidual videos
  hasAccessedCourse: boolean; // Whether user has an AccessedCourse object for this course
  hasCompletedCourse: boolean; // Whether user has an AccessedCourse object with isCompleted === true for this course
  hasMultipleChapterVideos: boolean;
  videoPosition: number; // the position of the video within the videoIds
  courseChapters: CourseChapter[];
  updateSectionTitle: (newChapter: string) => void; // Callback function to update section title
  updateVideoPosition: (newChapter: number) => void; // Callback function to update video position
  updateChapterPosition: (newChapter: number) => void; // Callback function to update video position
  updateStartAtTime: (newTime: number) => void; // Callback function to update video position
  updateChapterPositionFromCard: (newValue: number) => void; // Callback function to update video position
  triggerParentExitFlow: (newValue: boolean) => void; // Callback function to trigger parent exit flow
  updateSecondsFromVimeo: (newValue: number) => void; // Callback function to update video position
}

// IMPORTANT: this is the player for the full video (useful to segregate in case we want separate logic)
const VideoPlayer: React.FC<VideoPlayerProps> = memo(function VideoPlayer({
  courseId,
  userDataId,
  userId,
  isSignedIn,
  accessedCourseId,
  videoIds,
  startTime,
  startAtChapter,
  hasAccessedCourse,
  hasCompletedCourse,
  hasMultipleChapterVideos,
  videoPosition,
  courseChapters,
  updateSectionTitle,
  updateVideoPosition,
  updateChapterPosition,
  updateStartAtTime,
  updateChapterPositionFromCard,
  updateSecondsFromVimeo,
  triggerParentExitFlow
}) {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // const iframeRef = useRef(null);
  // const [userData, setUserData] = useState<UserData | null>(null);
  // const [createAccessedCourse] = useMutation(CREATE_ACCESSED_COURSE_MUTATION);
  // const [updateAccessedCourse] = useMutation(UPDATE_ACCESSED_COURSE_MUTATION);
  const [updateAccessedCourse] = useMutation(UPDATE_ACCESSED_COURSE);
  const [addAccessedCourseToUserData] = useMutation(ADD_ONE_ACCESED_COURSE_TO_USER_DATA);
  const [updateCompletionAndEndTime] = useMutation(UPDATE_ACCESED_COURSE_COMPLETION_END);
  const [updateEndedAtChapter] = useMutation(UPDATE_ACCESED_COURSE_COMPLETION_END_CHAPTER);
  const [updateEndTime] = useMutation(UPDATE_ACCESED_COURSE_COMPLETION_END_TIME);
  const [userConfirmedClose, setUserConfirmedClose] = useState(false);
  const [hasCreatedAccessedCourse, setHasCreatedAccessedCourse] = useState(false);
  const [hasUpdatedAccessedCourse, setHasUpdatedAccessedCourse] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string>(videoIds[0] || "");

  const isCompleteOnStart = false;

  // today's date for timestamping
  const today = new Date();

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

  const formattedDate = formatDate(today);

  const router = useRouter();

  // end time for close browser scenario
  let closeBrowserEndTime = 0;

  // video width based on the container it goes into (Videocard.tsx)
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const toggleExitFlow = () => {
    triggerParentExitFlow(true);
  };

  // Function to handle chapter change from Vimeo Player
  const handleChapterChange = useCallback((event: VimeoPlayer.VimeoChapter) => {
    // Send to GA
    (window as any).dataLayer.push({
      event: "wentToChapter",

      onPageOfCourse: courseId.toString(),
      userDataId: userDataId.toString(),
      // videoTime: stoppedTime,
      videoChapter: event.title,

      timestamp: new Date().toISOString(),
    });
    const chapterPosition = event.index - 1; 
    updateChapterPositionFromCard(chapterPosition);
    console.log("chapter changed to: ",event.title);
  }, [updateChapterPositionFromCard])

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Set the initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => {
  //   // Update currentVideoId based on videoPosition
  //   if (videoIds && videoIds.length > videoPosition) {
  //     setCurrentVideoId(videoIds[videoPosition]);
  //   }
  // }, [videoPosition, videoIds, currentVideoId]);



  // const fetchUserDataAndHandleVideoPlay = async () => {

  //   try {
  //     // const userData = await getUserDataByUserId(dynamicUserId);
  //     // setUserData(userData);

  //     // Video player logic
  //     if (iframeRef.current) {
  //       const player = new VimeoPlayer(iframeRef.current);
  //       const currentTime = await player.getCurrentTime();

  //       const onChapterChange = async (event: VimeoPlayer.VimeoChapter) => {
  //         // Your existing chapter change logic
  //         console.log('Chapter changed:', event.title);
  //         const chapterName = event.title;  // we set the chapter name as the title of the event, which should match
  //         const chapterPosition = event.index - 1; // we set the index/position of our chapter, -1 because vimeo doesn't have position 0
  //         const newStartTime = event.startTime; // we set the new Start time based on the click on the video bar?
  //         const stoppedTime = await player.getCurrentTime();
  //         console.log('chapterName is: ', chapterName);
  //         // updateSectionTitle(chapterName);
  //         // updateStartAtTime(newStartTime);
  //         // updateStartAtTime(stoppedTime);
  //         // updateSecondsFromVimeo(stoppedTime);
  //         // updateChapterPosition(chapterPosition);
  //         updateChapterPositionFromCard(chapterPosition);
  //       };

  //       // reinitialize the Vimeo player when the startTime changes -- to change chapters in a multi-chapter video
  //       player.loadVideo(currentVideoId).then(() => {
  //         if (currentTime !== startTime) {
  //           return player.setCurrentTime(startTime);
  //         }
  //       }).then(() => {
  //       }).catch(error => {
  //         console.error("Error setting time to:", startTime, "Error message:", error.message);
  //       });

  //       player.on('ready', () => {
  //       });

  //       player.on('ended', async () => {
  //         await player.pause();
  //         const endTime = await player.getCurrentTime();
  //         toggleExitFlow();
  //       });

  //       // player.on('chapterchange', async (event) => {
  //       //   try {
  //       //     const chapterName = event.title;  // we set the chapter name as the title of the event, which should match
  //       //     const chapterPosition = event.index - 1; // we set the index/position of our chapter, -1 because vimeo doesn't have position 0
  //       //     const newStartTime = event.startTime; // we set the new Start time based on the click on the video bar?
  //       //     const stoppedTime = await player.getCurrentTime();
  //       //     console.log('chapterName is: ', chapterName);
  //       //     // updateSectionTitle(chapterName);
  //       //     // updateStartAtTime(newStartTime);
  //       //     // updateStartAtTime(stoppedTime);
  //       //     // updateSecondsFromVimeo(stoppedTime);
  //       //     // updateChapterPosition(chapterPosition);
  //       //     updateChapterPositionFromCard(chapterPosition);
  //       //   } catch (error) {
  //       //     console.log("error is:", error);
  //       //   }
  //       // });

  //       player.on('chapterchange', onChapterChange);
        
  //       // Cleanup function to remove the event listener
  //       return () => {
  //         player.off('chapterchange', onChapterChange);
  //       };
        

  //       // Set the initial playback time when the player is ready
  //       // player.setCurrentTime(startTime).then(() => {
  //       // }).catch(error => {
  //       //   console.error("Error setting time to:", startTime, "Error message:", error.message);
  //       // });

  //       // update end time for when user closes browser/tab
  //       // closeBrowserEndTime = await player.getCurrentTime();

  //       // Ask user to confirm they wanna close page by attaching the 'beforeunload' event listener 
  //       // const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //       //   // Check if the video is currently playing
  //       //   if (!player.getPaused().then((paused) => paused)) {
  //       //     e.preventDefault();
  //       //     e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';

  //       //     // Perform the action when the user confirms leaving
  //       //     window.addEventListener('beforeunload', () => {
  //       //       setUserConfirmedClose(true);
  //       //     });
  //       //   }
  //       // };

  //       // window.addEventListener('beforeunload', handleBeforeUnload);

  //     }

  //   } catch (error) {
  //     console.error('Error fetching user data or creating an object:', error);
  //   }
  // };

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new VimeoPlayer(iframeRef.current, {
      id: parseInt(videoIds[0], 10),
      autoplay: false
    });

    player.on('play', async () => {
      const playTime = await player.getCurrentTime();
      const playChapter = await player.getCurrentChapter();
      // Send to GA
      (window as any).dataLayer.push({
        event: "clickedPlayVideo",
  
        onPageOfCourse: courseId.toString(),
        userDataId: userDataId.toString(),
        videoTime: playTime,
        videoChapter: playChapter,
  
        timestamp: new Date().toISOString(),
      });
    });

    player.on('pause', async () => {
      const pausedTime = await player.getCurrentTime();
      const pausedChapter = await player.getCurrentChapter();
      // Send to GA
      (window as any).dataLayer.push({
        event: "clickedPauseVideo",
  
        onPageOfCourse: courseId.toString(),
        userDataId: userDataId.toString(),
        videoTime: pausedTime,
        videoChapter: pausedChapter,
  
        timestamp: new Date().toISOString(),
      });
    });

    player.on('seeked', async () => {
      const seekedTime = await player.getCurrentTime();
      const seeekedChapter = await player.getCurrentChapter();
      // Send to GA
      (window as any).dataLayer.push({
        event: "clickedOnTimeline",
  
        onPageOfCourse: courseId.toString(),
        userDataId: userDataId.toString(),
        videoTime: seekedTime,
        videoChapter: seeekedChapter,
  
        timestamp: new Date().toISOString(),
      });
    });

    player.on('chapterchange', handleChapterChange);


  // Handle video end
  // const onVideoEnd = () => {
  //   // await player.pause();
  //   // const endTime = await player.getCurrentTime();
  //   toggleExitFlow(); // Trigger the exit flow when the video ends
  // };
  // const onVideoEnd = async () => {
  //   await player.pause();

  //   // Delay the exit flow to allow the player's state to settle
  //   setTimeout(() => {
  //     toggleExitFlow();
  //   }, 500); // 100ms delay, adjust as needed
  // };

    player.on('ended', async () => { 
      const endTime = await player.getCurrentTime();
      const endChapter = await player.getCurrentChapter();
      // Send to GA
      (window as any).dataLayer.push({
        event: "finishedCourse",
  
        onPageOfCourse: courseId.toString(),
        userDataId: userDataId.toString(),
        videoTime: endTime,
        videoChapter: endChapter,
  
        timestamp: new Date().toISOString(),
      });
      toggleExitFlow() 
    });

    player.setCurrentTime(startTime).catch(error => {
      console.error("Error setting time:", error);
    });

    // Cleanup function
    return () => {
      player.off('chapterchange', handleChapterChange);
      // player.off('ended', onVideoEnd); // Remove the 'ended' event listener
    };
  }, [videoIds, startTime]);

  // useEffect(() => {
  //   const handleCloseBrowser = async () => {
  //     if (userConfirmedClose === true) {
  //       if (hasAccessedCourse) {
  //         console.log('userConfirmedClose became true');
  //         // Mutation that updates the AccessedCourse object - accessedcoursemetadata.endTime
  //         updateEndTime({
  //           variables: {
  //             input: {
  //               id: accessedCourseId,
  //               // TO DO: replace with AccessedCourse wp id instead of AccessedCourse wp databaseId and databaseId with id in mutation if not working
  //               accessedcoursemetadata: {
  //                 endTime: closeBrowserEndTime,
  //               }
  //             }
  //           }
  //         });
  //       }
  //     }
  //   };

  //   handleCloseBrowser();
  // }, [userConfirmedClose]);
  // above DEPRECATED dec 29, to do after launch

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   fetchUserDataAndHandleVideoPlay();
  // }, [startTime]);

  const handleIframeLoad = () => {

    if (iframeRef.current) {
      const playerOptions = {
        id: parseInt(currentVideoId, 10), // Convert string to number
        autoplay: false
      };

      const player = new VimeoPlayer(iframeRef.current, playerOptions);

      player.ready().then(() => {
      }).catch(error => {
        console.error("Error with player ready:", error);
      });

      player.on('play', async () => {
        // to decide if we'll add any logic triggered by play
        const playTime = await player.getCurrentTime();
        const playChapter = await player.getCurrentChapter();
        // Send to GA
        (window as any).dataLayer.push({
          event: "clickedPlayVideo",
    
          onPageOfCourse: courseId.toString(),
          userDataId: userDataId.toString(),
          videoTime: playTime,
          videoChapter: playChapter,
    
          timestamp: new Date().toISOString(),
        });
      });

      player.on('pause', async () => {
        const pausedTime = await player.getCurrentTime();
        const pausedChapter = await player.getCurrentChapter();
        // Send to GA
        (window as any).dataLayer.push({
          event: "clickedPauseVideo",
    
          onPageOfCourse: courseId.toString(),
          userDataId: userDataId.toString(),
          videoTime: pausedTime,
          videoChapter: pausedChapter,
    
          timestamp: new Date().toISOString(),
        });
        // Mutation that updates the AccessedCourse object - accessedcoursemetadata.endTime
        // if (hasAccessedCourse) {
        //   updateEndTime({
        //     variables: {
        //       input: {
        //         id: accessedCourseId,
        //         // TO DO: replace with AccessedCourse wp id instead of AccessedCourse wp databaseId and databaseId with id in mutation if not working
        //         accessedcoursemetadata: {
        //           endTime: pausedTime, // replace with your new value
        //         }
        //       }
        //     }
        //   });
        // }
        // above deprecated dec 28 as it runs to many times and we would record end time when user closes tab/browser window anyway
      });

      player.on('seeked', async () => {
        const seekedTime = await player.getCurrentTime();
        const seeekedChapter = await player.getCurrentChapter();
        // Send to GA
        (window as any).dataLayer.push({
          event: "clickedOnTimeline",
    
          onPageOfCourse: courseId.toString(),
          userDataId: userDataId.toString(),
          videoTime: seekedTime,
          videoChapter: seeekedChapter,
    
          timestamp: new Date().toISOString(),
        });
        // updateStartAtTime(stoppedTime);
        // Mutation that updates the AccessedCourse object - accessedcoursemetadata.endTime
        // if (hasAccessedCourse) {
        //   updateEndTime({
        //     variables: {
        //       input: {
        //         id: accessedCourseId,
        //         // TO DO: replace with AccessedCourse wp id instead of AccessedCourse wp databaseId and databaseId with id in mutation if not working
        //         accessedcoursemetadata: {
        //           endTime: stoppedTime,
        //         }
        //       }
        //     }
        //   });
        // }
        // above deprecated dec 28 as it runs to many times and we would record end time when user closes tab/browser window anyway
      });


      player.on('ended', async () => {
        const endTime = await player.getCurrentTime();
        const endChapter = await player.getCurrentChapter();
        // Send to GA
        (window as any).dataLayer.push({
          event: "finishedCourse",
    
          onPageOfCourse: courseId.toString(),
          userDataId: userDataId.toString(),
          videoTime: endTime,
          videoChapter: endChapter,
    
          timestamp: new Date().toISOString(),
        });
        toggleExitFlow(); // Call the function when the video ends
        // done oct 11: in case there are multiple video-chapters and there are remaining ones, move to next chapter
        if (hasMultipleChapterVideos === true) {
          // Dec 24 update: below case deprecated for now, all courses have a singular vimeo id
          // // updateVideoPosition(chapterPosition);
          // if (videoPosition < (courseChapters.length - 1)) {
          //   console.log("trying to updateVideoPosition from VideoPlayer")
          //   updateVideoPosition(videoPosition + 1);
          //   // player.play();
          //   setTimeout(() => {
          //     player.play();
          //   }, 1000); // You can adjust the delay time as needed
          // }
        }

        // if there are more than 1 chapters
        if (videoIds.length > startAtChapter) {
          // Dec 24 update: below case deprecated for now, all courses have a singular vimeo id
          // If there are remaining chapters
          // videoId = videoIds[startAtChapter]

          // TO DO: something in case player doesn't automatically update with new vimeo ID
          // Update the AccessedCourse object - accessedcoursemetadata.endedAtChapter, becoming startAtChapter+1
          // updateEndedAtChapter({
          //   variables: {
          //     input: {
          //       id: accessedCourseId,
          //       // TO DO: replace with AccessedCourse wp id instead of AccessedCourse wp databaseId and databaseId with id in mutation if not working
          //       accessedcoursemetadata: {
          //         endedAtChapter: startAtChapter + 1,
          //       }
          //     }
          //   }
          // });
        } else {
          // If this was the last chapter, we perform 2 mutations: 
          // 1. we update the AccessedCourse object - accessedcoursemetadata.completiondate
          // 2. we update the AccessedCourse object - accessedcoursemetadata.endTime (maybe reset it to 0)

          // Briana to redirect users to the exit flow page (and inject props in it???) or
          // or have a state variable that becomes true and that will trigger the component to show up
          // you need to inject data (such as courseID and userDataId) in the compontent which will then be used to perform a mutation from inside the component
          // Briana adds action here
          // updateCompletionAndEndTime({
          //   variables: {
          //     input: {
          //       id: accessedCourseId,
          //       // TO DO: replace with AccessedCourse wp id instead of AccessedCourse wp databaseId and databaseId with id in mutation if not working
          //       accessedcoursemetadata: {
          //         completiondate: formattedDate,
          //         endTime: endTime,
          //       }
          //     }
          //   }
          // });
          // if (!hasCompletedCourse && !hasUpdatedAccessedCourse && hasAccessedCourse && isSignedIn) {
          //   handleUpdateAccessedCourse(accessedCourseId, true, formattedDate); // update the iscompleted and end time in AccessedCourse
          //   setHasUpdatedAccessedCourse(true); // Set flag to prevent future executions
          // }
          // issue mihai to do: this is only running on ending and not when clicking button/ submitting feedback

        };
      });

      player.on('chapterchange', async (event) => {
        // console.log('Cuepoint event:', event);
        const stoppedTime = await player.getCurrentTime();
        // Send to GA
        (window as any).dataLayer.push({
          event: "wentToChapter",
    
          onPageOfCourse: courseId.toString(),
          userDataId: userDataId.toString(),
          videoTime: stoppedTime,
          videoChapter: event.title,
    
          timestamp: new Date().toISOString(),
        });
        // The event will contain details about the chapter such as startTime, title and index
        const chapterName = event.title;  // we set the chapter name as the title of the event, which should match
        const chapterPosition = event.index - 1; // we set the index/position of our chapter, -1 because vimeo doesn't have position 0
        const newStartTime = event.startTime; // we set the new Start time based on the click on the video bar?
        console.log('chapterName is: ', chapterName);
        console.log('chapterPosition is: ', chapterPosition);
        updateSectionTitle(chapterName);
        // updateStartAtTime(newStartTime);
        // updateStartAtTime(stoppedTime);
        updateSecondsFromVimeo(stoppedTime);
        // updateChapterPosition(chapterPosition);
        updateChapterPositionFromCard(chapterPosition)
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full relative">


      {/* <iframe
    ref={iframeRef}
    src={`https://player.vimeo.com/video/${currentVideoId}`}
    onLoad={handleIframeLoad}
    width="100%"    
    allowFullScreen
  /> */}

      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${currentVideoId}`}
        // onLoad={handleIframeLoad}  // <-- Add this
        width={(containerWidth).toString()}
        height={((containerWidth * 9) / 16).toString()}
        style={{ position: 'relative' }}
        frameBorder="0"
        allowFullScreen
      ></iframe>

    </div>

    
  );
});

export default VideoPlayer;
