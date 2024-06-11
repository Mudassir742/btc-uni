"use client"
import { ADD_ONE_LIKED_COURSE_TO_USERDATA, ADD_ONE_LIKED_EDUCATOR_TO_USERDATA, REMOVE_ONE_LIKED_COURSE_FROM_USERDATA, REMOVE_ONE_LIKED_EDUCATOR_FROM_USERDATA } from '@/graphql/mutations';
import React, { useEffect, useState, useTransition } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
// Components
import Loader from "@/components/ui/Loader"
import toast from 'react-hot-toast';
import { Bookmark, XCircle, UserMinus, UserPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';

interface PushPinOnEducatorPageProps {
    // fill: string;
    // pinnedCoursesIds: number[];
    isPinned: boolean;
    userDataId: number;
    educatorId: number;
    isSignedIn: boolean;
}

const PushPinOnEducatorPage: React.FC<PushPinOnEducatorPageProps> = ({ isPinned, userDataId, educatorId, isSignedIn }) => {

    const [addLikedEducatorToUserData] = useMutation(ADD_ONE_LIKED_EDUCATOR_TO_USERDATA);
    const [removeLikedEducatorFromUserData] = useMutation(REMOVE_ONE_LIKED_EDUCATOR_FROM_USERDATA);
    const [pending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleClick = async () => {
        try {
            setLoading(true)
            if (educatorId && userDataId) {
                if (isPinned === true) {
                    const res = await removeLikedEducatorFromUserData({
                        variables: {
                            userdataId: userDataId,
                            educatorId: educatorId,
                        },
                    });
                } else {
                    const res = await addLikedEducatorToUserData({
                        variables: {
                            userdataId: userDataId,
                            educatorId: educatorId,
                        },
                    });
                };
                startTransition(() => {
                    // this router function refreshes and reloads the data without reloading the page
                    router.refresh();
                })
            }
        } catch (err) {
            console.log("Error in the pin request", err)
        } finally {
            setLoading(false)
        }
    };

    const handleClickAnonymous = async () => {
        // setShowToast(true);

        // toast.success(
        //   "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."
        // );
        toast((t) => (


            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    }   bg-white w-full  justify-center items-center m-auto  rounded-xl pointer-events-auto   `}
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
            {
                loading || pending ? <Loader className=' text-gray-300' /> :


                    <div className="">

                                    
                            <button onClick={isSignedIn ? handleClick : handleClickAnonymous} className="relative">
                                <div className='flex justify-center items-center '>
                                        {isPinned
                                    ? <Bookmark color='#523D34' fill='#523D34' />
                                    : <Bookmark color='#523D34' />
                                        }
                                    </div>
                                    {/* <div className='flex justify-center py-1'>
                                        {isPinned ? "Unfollow" : "Follow"}
                                    </div> */}
                            

                            </button>
                    

                    </div>
            }

        </>
    );
};

export default PushPinOnEducatorPage;
