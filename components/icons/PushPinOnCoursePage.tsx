"use client"
import { ADD_ONE_LIKED_COURSE_TO_USERDATA, REMOVE_ONE_LIKED_COURSE_FROM_USERDATA } from '@/graphql/mutations';
import React, { useEffect, useState, useTransition } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
// Components
import Loader from "@/components/ui/Loader"
import toast from 'react-hot-toast';
import { Bookmark, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { useMutation as useMutationRQ, useQueryClient } from '@tanstack/react-query';
import { getLikedCourses } from '@/app/courses/helper';
import { Course, UserData } from '@/interfaces';


interface PushPinOnCoursePageProps {
  // fill: string;
  // pinnedCoursesIds: number[];
  // isPinned: boolean;
  // userDataId: number;
  courseId: number;
  isSignedIn: boolean;
  userDataAll: UserData;
  userDataId?: number;
  userToken?: string;
}

const PushPinOnCoursePage: React.FC<PushPinOnCoursePageProps> = ({ courseId, isSignedIn, userDataAll, userDataId, userToken }) => {

  // const [addLikedCourseToUserData] = useMutation(ADD_ONE_LIKED_COURSE_TO_USERDATA);
  // const [removeLikedCourseFromUserData] = useMutation(REMOVE_ONE_LIKED_COURSE_FROM_USERDATA);
  const queryClient = useQueryClient()
  // const [pending, startTransition] = useTransition();
  // const [loading, setLoading] = useState(false);
  const token = userToken

  // const userDataId = userDataAll?.databaseId;

  const likedCourses = getLikedCourses(userDataAll!);

  // whether or not the course is pinned
  const isPinned = likedCourses.some((course) => {
    const courseIdLocal = course.databaseId;
    return courseIdLocal === courseId;
  });

  const { mutate: mutateRemoveLike } = useMutationRQ({
    mutationFn: async (params: { userDataId: number, courseId: number }) => {
      const { courseId, userDataId } = params
      const url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      const res = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin',
          authorization: `Bearer ${token}`,
          // authorization: token ? `Bearer ${token}` : "",
        },
        credentials: 'include',
        body: JSON.stringify({
          query: REMOVE_ONE_LIKED_COURSE_FROM_USERDATA.loc?.source.body,
          variables: { userdataId: userDataId, courseId: courseId },
        })
      })
      return await res.json()
    },
    onMutate: async (newUserDataAll) => {
      await queryClient.cancelQueries({ queryKey: ['userDataAll'] })
      const previousPin = queryClient.getQueryData(['userDataAll'])
      queryClient.setQueriesData<UserData>({ queryKey: ['userDataAll'] }, (old) => {
        const index = old?.userDataMetadata.likedCourses.findIndex(course => course.databaseId === newUserDataAll.courseId) as number;
        if (index !== -1) old?.userDataMetadata.likedCourses.splice(index, 1)
        // const data = old?.userDataMetadata.likedCourses.filter(course => course.databaseId !== newUserDataAll.courseId);
        return old
      })
      // console.log(previousPin)
      // queryClient.setQueryData<UserData>(['userDataAll'], (old) => {
      //   return {
      //     ...old, newUserDataAll
      //   }
      // })
      return { previousPin }
    },
    onSuccess: () => {
    },
    onError: (err) => {
      toast.error('Something went wrong, please try again')
    },
  })

  const { mutate: mutateAddLike } = useMutationRQ({
    mutationFn: async (params: { userDataId: number, courseId: number }) => {
      const { courseId, userDataId } = params
      const url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      const res = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin',
          authorization: `Bearer ${token}`,
          // authorization: token ? `Bearer ${token}` : "",
        },
        credentials: 'include',
        body: JSON.stringify({
          query: ADD_ONE_LIKED_COURSE_TO_USERDATA.loc?.source.body,
          variables: { userdataId: userDataId, courseId: courseId },
        })
      })
      // console.log(await res.json())
      return await res.json()
    },
    onMutate: async (newUserDataAll) => {
      await queryClient.cancelQueries({ queryKey: ['userDataAll'] })
      const previousPin = queryClient.getQueryData(['userDataAll'])
      queryClient.setQueryData<UserData>(['userDataAll'], (old) => {
        const newData = { ...old } as UserData
        if (!newData.userDataMetadata.likedCourses) {
          newData.userDataMetadata.likedCourses = []
        }
        newData.userDataMetadata.likedCourses.push({ databaseId: newUserDataAll.courseId } as Course)
        // newData.userDataMetadata.likedCourses.push(newUserDataAll.userDataId);
        // [...old?.userDataMetadata.likedCourses]
        // const oldLikes = old?.userDataMetadata.likedCourses
        return newData
      })
      return { previousPin }
    },
    onSuccess: () => {
    },
    onError: (err) => {
      toast.error('Something went wrong, please try again')
    },
  })


  const handleClick = async () => {
    try {

      (window as any).dataLayer.push({
          event: "clickedSaveButton",
  
          onPageOfCourse: courseId.toString(),
          userDataId: userDataId ? userDataId.toString() : "",
  
          wasAllowedToSave: true,
          savedCourse: (isPinned === true) ? false : true,
          removedCourse: (isPinned === true) ? true : false,
  
          timestamp: new Date().toISOString(),
      });
     
      // setLoading(true)

      if (courseId && userDataId) {
        if (isPinned === true) {
          await mutateRemoveLike({ userDataId, courseId })
        } else {
          await mutateAddLike({ userDataId, courseId })
        };
      }
    } catch (err) {
      // console.log("Error in the pin request", err)
      toast.error('Something went wrong, please try again')
    } finally {
      // setLoading(false)
    }
  };

  const handleClickAnonymous = async () => {
    // setShowToast(true);
      (window as any).dataLayer.push({
        event: "clickedSaveButton",

        onPageOfCourse: courseId.toString(),
        userDataId: userDataId ? userDataId.toString() : "",

        wasAllowedToSave: false,
        savedCourse: null,
        removedCourse: null,

        timestamp: new Date().toISOString(),
    });

    // toast.success( 
    //   "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
    // );
    toast((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          }   bg-white w-full justify-center items-center m-auto  rounded-xl pointer-events-auto   `}
      >

        <div className=''>
          <div className="flex px-4">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute top-2 right-2 flex  text-themeColor"

            >
              <XCircle />
            </button>
          </div>

          <div className="">


            <div className="p-2">
              <div className="flex justify-center">
                <div className="">

                  <p className="mt-1 text-[22px] text-themeColor uppercase bold flex justify-center">
                    <b>Log In to Save </b>
                  </p>

                </div>
              </div>
            </div>




          </div>



          <div className='flex justify-center pb-4'>
            <Link href={'/log-in'}>

              <Button>
                LOG IN
              </Button>
            </Link>
          </div>
        </div>




      </div>
    ));
  };

  return (
    <>
      {/* {showToast && (
      <SignInToast
        message="Please register to access the full video."
        onOkClick={handleCustomAlertOk}
        onCancelClick={handleCustomAlertCancel}
      />
    )} */}
      {/* above deprecated, using react-hot-toast instead */}
      {

        // loading || pending ? <Loader className='h-7 w-7 !ml-2.5 text-gray-300' /> :


        // <svg
        //   width="19"
        //   height="19"
        //   viewBox="0 0 17 17"
        //   fill={isPinned ? '#C4A18D' : 'grey'}
        //   xmlns="http://www.w3.org/2000/svg"
        //   onClick={isSignedIn ? handleClick : handleClickAnonymous}
        //   style={{ cursor: 'pointer' }}
        // >
        //   <path
        //     d="M11.729 0.294792C11.542 0.10679 11.288 0.000754119 11.0228 4.00685e-06C10.7577 -0.000746105 10.5031 0.103851 10.315 0.290792C10.2158 0.391926 10.1391 0.51291 10.09 0.645792C9.258 2.38179 8.342 3.36079 7.186 3.93879C5.889 4.57879 4.4 5.02379 2 5.02379C1.80258 5.02472 1.6098 5.08372 1.44568 5.19344C1.28155 5.30315 1.15334 5.45873 1.077 5.64079C1.00143 5.82359 0.981709 6.02468 1.02033 6.21867C1.05895 6.41267 1.15418 6.59087 1.294 6.73079L4.537 9.97379L0 16.0238L6.05 11.4868L9.292 14.7288C9.38487 14.8224 9.49578 14.8963 9.618 14.9458C9.74 14.9968 9.87 15.0238 10 15.0238C10.13 15.0238 10.26 14.9968 10.382 14.9458C10.5649 14.8708 10.7213 14.743 10.8313 14.5789C10.9414 14.4147 11.0001 14.2215 11 14.0238C11 11.6238 11.444 10.1348 12.083 8.85779C12.66 7.70179 13.639 6.78579 15.376 5.95379C15.5088 5.90514 15.6296 5.82839 15.73 5.72879C15.9169 5.54073 16.0215 5.28613 16.0208 5.02096C16.02 4.7558 15.914 4.50179 15.726 4.31479L11.729 0.294792Z"
        //   />
        //   {/* <path d="M16.8198 2.86133H7.17982C5.04982 2.86133 3.31982 4.60133 3.31982 6.72133V20.8113C3.31982 22.6113 4.60982 23.3713 6.18982 22.5013L11.0698 19.7913C11.5898 19.5013 12.4298 19.5013 12.9398 19.7913L17.8198 22.5013C19.3998 23.3813 20.6898 22.6213 20.6898 20.8113V6.72133C20.6798 4.60133 18.9498 2.86133 16.8198 2.86133Z"/> */}

        // </svg>

        <div className="px-2">
          <div id={isSignedIn ? "Save-Course-Button-LoggedIn" : "Save-Course-Button-Anonymous"} onClick={isSignedIn ? handleClick : handleClickAnonymous}>
            <div className='flex justify-center items-center  first-line:py-1 cursor-pointer h-[12px] w-[14px] md:h-[16px] md:w-[18px]'>

              <div className='flex justify-center items-center '>
                <Bookmark color='#523D34'  fill={isPinned ? '#523D34' : "transparent"} />
              </div>

              {/* <div className='flex justify-center py-1'>

                  {isPinned ? 'Saved' : "Save"} 
                  </div> */}

            </div>
          </div>
        </div>

      }
    </>
  );
};

export default PushPinOnCoursePage;
