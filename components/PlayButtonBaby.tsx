"use client";
import React, { useState } from 'react';
import { Course, CourseChapter, Downloadable, Educator, UsedProduct } from '@/interfaces';
import { Button } from './ui/Button';
import Link from 'next/link';
import WatchForFREEButton from './buttons/WatchForFREEButton';
import SaveMySpotButton from './buttons/SaveMySpotButton';
import '@/styles/globals.css';
import dynamic from 'next/dynamic';
import SubscribePopup from './SubscribePopup';


interface PlayButtonBabyProps {
    courseID: number;
    userDataDatabaseId: number;
    slug?: string;
    userId: number;
    accessedCourseDBId: number;
    startChapter: number;
    isPartOfAccessedCourses: boolean;
    hasCompletedCourse: boolean; // Whether user has an AccessedCourse object with isCompleted === true for this course
    startTime: number;
    canWatchMainContent: boolean;
    upcomingCourses: Course[];
    themeColor: string;
    educatorHandles: string[];
    pinned: boolean;
    userCanViewMainContent: boolean;
    isCourseFree: boolean;
    isSignedIn: boolean;
    level: string;
    canDownload: boolean;
    isPurchasableALaCarte: boolean;
    isPurchasableOnlyALaCarte: boolean;
    live: boolean;
    theCourseTitle: string;
    price: string;
    courseDetailPicture: string;
    liveVideoId: string;
    courseThumbnailPicture: string;
    shareText: string;
    videoTrailerId: string;
    vimeoIdStrings: string[];
    theCourseEducators: Educator[];
    usedProducts: UsedProduct[];
    downloadables: Downloadable[];
    theCourseChapters: CourseChapter[];
    theCourseFormulas: string;
    upcoming: boolean;
    courseLink: string;
    formattedLaunchDate: string;
    formattedLaunchTime: string;
    isCourseAvailableToBePurchasedALaCarte: boolean;
    courseCardImage: string;
    certificateimage: string;
    customeremail: string;
    coursesFromTheSameEducator: Course[]; // make sure current course is removed
    relatedCourses: Course[]; // this should already have current course removed
    hasPreviouslyPostedTestimonial: boolean;
    fullname: string;
    isPartOfSubscription: boolean;
    note: string;
    lastSavedOn: string;
    userDownloadableAccessLevel: string;
    courseDescription: string;

}

interface NoteData {
    note: string;
    lastSavedOn: string;
}

interface PlayButtonProps {
    noteData: NoteData;
    onNoteUpdate: (newNote: string, newLastSavedOn: string) => void;
}


const PlayButton = dynamic(() => import('./buttons/PlayButton'), {
    ssr: false,
})

const PlayButtonBaby: React.FC<PlayButtonBabyProps> = ({
    courseID,
    customeremail,
    slug,
    userDataDatabaseId,
    userId,
    certificateimage,
    accessedCourseDBId,
    startChapter,
    isPartOfAccessedCourses,
    hasCompletedCourse,
    startTime,
    canWatchMainContent,
    themeColor,
    upcomingCourses,
    educatorHandles,
    userCanViewMainContent,
    isCourseFree,
    isSignedIn,
    canDownload,
    isPurchasableALaCarte,
    isPurchasableOnlyALaCarte,
    live,
    theCourseTitle,
    price,
    liveVideoId,
    courseThumbnailPicture,
    shareText,
    vimeoIdStrings,
    theCourseEducators,
    usedProducts,
    downloadables,
    theCourseChapters,
    theCourseFormulas,
    upcoming,
    courseLink,
    formattedLaunchDate,
    formattedLaunchTime,
    courseCardImage,
    isCourseAvailableToBePurchasedALaCarte,
    coursesFromTheSameEducator,
    relatedCourses,
    hasPreviouslyPostedTestimonial,
    fullname,
    isPartOfSubscription,
    note,
    lastSavedOn,
    userDownloadableAccessLevel,
}) => {



    const [noteData, setNoteData] = useState<NoteData>({ note: "", lastSavedOn: "" });

    const handleNoteUpdate = (newNote: string, newLastSavedOn: string) => {
        setNoteData({ note: newNote, lastSavedOn: newLastSavedOn });
    };

    const onUserClickSubscribe = () => {
        (window as any).dataLayer.push({
            event: "clickedSubscribe",

            onPageOfCourse: theCourseTitle,
            userDataId: userDataDatabaseId.toString(),

            hadOptionToBuy: isCourseAvailableToBePurchasedALaCarte && !isPurchasableOnlyALaCarte,
            courseALaCarteValue: Number(price),

            timestamp: new Date().toISOString(),
        });
    }

    const onUserClickBuy = () => {
        (window as any).dataLayer.push({
            event: "clickedBuy",

            onPageOfCourse: theCourseTitle,
            userDataId: userDataDatabaseId.toString(),

            hadOptionToSubscribe: isPartOfSubscription,
            courseALaCarteValue: Number(price),

            timestamp: new Date().toISOString(),
        });
    }

    const onUserClickWatchForFree = () => {
        (window as any).dataLayer.push({
            event: "clickedWatchForFree",

            onPageOfCourse: theCourseTitle,
            userDataId: userDataDatabaseId.toString(),

            courseALaCarteValue: Number(price),

            timestamp: new Date().toISOString(),
        });
    }
    console.log("mihai PlayButtonBaby formattedLaunchDate is: ", formattedLaunchDate);
    console.log("mihai PlayButtonBaby formattedTime is: ", formattedLaunchTime);

    return (

        <div className={`${isCourseFree && !isSignedIn ? ' ' : ''} flex`}>
            {upcoming ? (
                <div className='relative right-[6px]'>
                    <SaveMySpotButton
                        theCourseTitle={theCourseTitle}
                        courseLink={courseLink}
                        formattedLaunchDate={formattedLaunchDate}
                        formattedTime={formattedLaunchTime}
                        userDataBaseId={userDataDatabaseId.toString()}
                    />
                </div>
            ) : (
                <div className=" ">

                    {userCanViewMainContent ? (
                        <PlayButton
                            noteData={noteData}
                            onNoteUpdate={handleNoteUpdate}
                            vimeoIds={vimeoIdStrings}
                            liveVideoId={liveVideoId}
                            courseID={courseID}
                            accessedCourseDBId={accessedCourseDBId}
                            userDataDBId={userDataDatabaseId}
                            userId={userId}
                            startChapter={startChapter}
                            isPartOfAccessedCourses={isPartOfAccessedCourses}
                            hasCompletedCourse={hasCompletedCourse}
                            startTime={startTime}
                            canWatchMainContent={canWatchMainContent}
                            courseIsLive={live}
                            courseChapters={theCourseChapters}
                            courseFormulas={theCourseFormulas}
                            courseTitle={theCourseTitle}
                            courseEducators={theCourseEducators}
                            shareText={shareText}
                            // coursePinned={pinned}
                            downloadables={downloadables}
                            usedProducts={usedProducts}
                            mediaItemUrl={courseThumbnailPicture}
                            upcomingCourses={upcomingCourses}
                            educatorHandles={educatorHandles}
                            isSignedIn={isSignedIn}
                            canDownload={canDownload}
                            isPurchasableALaCarte={isPurchasableALaCarte}
                            isPurchasableOnlyALaCarte={isPurchasableOnlyALaCarte}
                            courseCardImage={courseCardImage}
                            customeremail={customeremail}
                            certificateimage={certificateimage}
                            themeColor={themeColor}
                            // coursesFromTheSameSeries={coursesFromTheSameSeries}
                            coursesFromTheSameEducator={coursesFromTheSameEducator}
                            relatedCourses={relatedCourses}
                            hasPreviouslyPostedTestimonial={hasPreviouslyPostedTestimonial}
                            // firstname={firstname}
                            // lastname={lastname}
                            fullname={fullname}
                            note={note}
                            lastSavedOn={lastSavedOn}
                            userDownloadableAccessLevel={userDownloadableAccessLevel} />
                    ) : (<div> {!userCanViewMainContent && !isCourseAvailableToBePurchasedALaCarte ? (
                        <div className=''>
                            {isPartOfSubscription && (
                                // <SubscribePopup>
                                //     <Link id="Sub-Button-Course-Page-No-Alt" href={{
                                //         pathname: '/subscribe',
                                //         query: { courseSlug: slug },
                                //     }} onClick={onUserClickSubscribe}>  <Button size={'sm'} className='px-10'>  See Plans</Button>    </Link>
                                // </SubscribePopup>
                                <SubscribePopup slug={slug} onUserClickSubscribe={onUserClickSubscribe}>
                                    <Button className='subscribe-button-course-page'>Subscribe</Button>
                                </SubscribePopup>
                            )}
                        </div>

                    ) : (<div></div>)}


                        {!userCanViewMainContent && isCourseAvailableToBePurchasedALaCarte && !isPurchasableOnlyALaCarte && isPartOfSubscription && (
                            <div className='pr-3'>
                                {price !== "0" && price !== "" &&
                                    <SubscribePopup slug={slug} onUserClickSubscribe={onUserClickSubscribe}>
                                        <Button className='subscribe-button-course-page'>Subscribe</Button>
                                    </SubscribePopup>
                                }
                            </div>
                        )}

                        {!userCanViewMainContent && isCourseAvailableToBePurchasedALaCarte && isPurchasableOnlyALaCarte && (
                            <div className="">
                                <Link id="Buy-Course-Button-No-Alt" href={
                                    !userDataDatabaseId ? `/signup?pid=${courseID}&type=course` : `/checkout?pid=${courseID}&type=course`} onClick={onUserClickBuy}>
                                    {price !== "0" && price !== "" && <Button variant={'secondary'}>Buy Course ${price}
                                    </Button>}
                                </Link>
                            </div>
                        )}
                    </div>)}



                </div>
            )}



            <div className='flex'>
                {!userCanViewMainContent && isCourseAvailableToBePurchasedALaCarte && !isPurchasableOnlyALaCarte && isPartOfSubscription && (
                    <div className="">
                        <Link id="Buy-Course-Button-With-Alt" href={
                            !userDataDatabaseId ? `/signup?pid=${courseID}&type=course` : `/checkout?pid=${courseID}&type=course`}
                            onClick={onUserClickBuy}
                        >
                            {price !== "0" && price !== "" &&
                                <Button variant={'secondary'}>Or Buy Course ${price}
                                </Button>}
                        </Link>
                    </div>


                )}
                {!userCanViewMainContent && isCourseAvailableToBePurchasedALaCarte && !isPurchasableOnlyALaCarte && !isPartOfSubscription && (




                    <Link id="Buy-Course-Button-No-Alt2" href={
                        !userDataDatabaseId ? `/signup?pid=${courseID}&type=course` : `/checkout?pid=${courseID}&type=course`} onClick={onUserClickBuy}>
                        {price !== "0" && price !== "" && <Button variant={'secondary'}>
                            Buy Course ${price}
                        </Button>}
                    </Link>



                )}
                {!userCanViewMainContent && !isCourseAvailableToBePurchasedALaCarte ? (
                    <>
                        {isCourseFree === true && (
                            <div className='pl-4'>
                                {!userCanViewMainContent && !isCourseAvailableToBePurchasedALaCarte && !isSignedIn && (
                                    <Link id="Watch-For-Free-Button" 
                                        href={{
                                            href: "/signup",
                                            pathname: "/signup",
                                            query: {
                                                "courseSlug": slug,
                                                "subscription": "free",
                                            }
                                        }}
                                        onClick={onUserClickWatchForFree}>
                                        <Button size={'lg'} variant={'secondary'}>
                                            Watch for FREE
                                        </Button>
                                    </Link>

                                )}

                                {!userCanViewMainContent && !isCourseAvailableToBePurchasedALaCarte && isSignedIn && (
                                   
                                    <WatchForFREEButton
                                        noteData={noteData}
                                        onNoteUpdate={handleNoteUpdate}
                                        vimeoIds={vimeoIdStrings}
                                        liveVideoId={liveVideoId}
                                        courseID={courseID}
                                        accessedCourseDBId={accessedCourseDBId}
                                        userDataDBId={userDataDatabaseId}
                                        userId={userId}
                                        startChapter={startChapter}
                                        isPartOfAccessedCourses={isPartOfAccessedCourses}
                                        hasCompletedCourse={hasCompletedCourse}
                                        startTime={startTime}
                                        canWatchMainContent={canWatchMainContent}
                                        courseIsLive={live}
                                        courseChapters={theCourseChapters}
                                        courseFormulas={theCourseFormulas}
                                        courseTitle={theCourseTitle}
                                        courseEducators={theCourseEducators}
                                        shareText={shareText}
                                        // coursePinned={pinned}
                                        downloadables={downloadables}
                                        usedProducts={usedProducts}
                                        mediaItemUrl={courseThumbnailPicture}
                                        upcomingCourses={upcomingCourses}
                                        educatorHandles={educatorHandles}
                                        isSignedIn={isSignedIn}
                                        //         canDownload={canDownload}
                                        //         isPurchasableALaCarte={isPurchasableALaCarte}
                                        // isPurchasableOnlyALaCarte={isPurchasableOnlyALaCarte}
                                        courseCardImage={courseCardImage}
                                        certificateimage={certificateimage}
                                        customeremail={customeremail}
                                        themeColor={themeColor}
                                        // coursesFromTheSameSeries={coursesFromTheSameSeries}
                                        coursesFromTheSameEducator={coursesFromTheSameEducator}
                                        relatedCourses={relatedCourses}
                                        hasPreviouslyPostedTestimonial={hasPreviouslyPostedTestimonial}
                                        // firstname={firstname}
                                        // lastname={lastname}
                                        fullname={fullname}
                                        note={note}
                                        lastSavedOn={lastSavedOn}
                                        userDownloadableAccessLevel={userDownloadableAccessLevel} />
                                )}

                            </div>

                        )}
                    </>
                ) : (<div></div>)}
            </div>



        </div>

    );
}

export default PlayButtonBaby;