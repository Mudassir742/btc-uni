"use client"
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import ButtonText from '@/components/text/ButtonText'
import HeaderSearch from './HeaderSearch'
import Hamburger from './Hamburger'
import { Course, Educator, UserData, UserSession } from '@/interfaces';
import { IUserProfile } from '@/features/wp/user';
import Link from 'next/link'
import { User } from 'lucide-react'
import { cn } from '@/utils/shadcn'



interface IProps extends HTMLAttributes<HTMLDivElement> {
    currentUserData: UserData
    userAdditionalData: IUserProfile | null,
    educators: Educator[],
    courses: Course[]
    user: UserSession | null;
    userIsCurrentlySubscribed: boolean;
    themecolor: string;
}

const MainHeaderClient: FC<IProps> = React.memo(({ className,
    courses, currentUserData, educators, user, userAdditionalData,
    userIsCurrentlySubscribed, themecolor,
    ...props }) => {
    const [isSticky, setIsSticky] = useState(false);
    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (prevScrollY.current > currentScrollY && currentScrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }

            prevScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cn(["bg-white  flex items-center", className], {
            "fixed top-0 py-4 left-0 h-[4.5rem] w-full": isSticky,
        })} {...props}>
            <div className={cn('flex justify-between items-center w-full ', {
                'wrapper mx-auto ': isSticky
            })}>

                <div className='flex gap-x-4 items-center'>
                    <Hamburger
                        currentUserData={currentUserData}
                        userAdditionalData={userAdditionalData}
                        courses={courses} educators={educators}
                        loggedIn={user?.isLoggedIn || false}
                        userEmail={user?.userData?.email || ""}
                        themeColor={themecolor}
                    />
                    <Link href={"/"} className='w-auto max-w-[20rem] pr-3'>
                        <Image src={'/logo.png'} className='sm:shrink-0 relative cursor-pointer' width={350} height={150} alt='btcuniversity' />
                    </Link>

                </div>

                <div className='flex flex-grow justify-end ml-auto md:hidden '>


                    {
                        user?.isLoggedIn ?
                            <div className='flex flex-grow justify-end'>
                                {userIsCurrentlySubscribed && (<div className='flex flex-grow justify-end'>
                                    <Link href={"/profile"} className=''>
                                        {
                                            // userAdditionalData?.user.avatarUrl ?
                                            //   <img width={30} height={30} loading='lazy' src={userAdditionalData?.user.avatarUrl} className='rounded-full  border-[1px] w-10 h-10 border-border object-cover object-top' /> :

                                            <div className="rounded-full  border-[1px] border-border">
                                                <div className="">
                                                    <User
                                                        color={themecolor} />
                                                </div>
                                            </div>
                                        }

                                    </Link>

                                </div>)}
                                {!userIsCurrentlySubscribed && (
                                    <div className=''>
                                        <Link href={'/subscribe'}>  <Button className='upgrade-button-click-header'  >  Upgrade</Button>    </Link>
                                    </div>)}

                            </div>
                            : <div className=''>
                                <Link href={'/subscribe'}>  <Button className='subscribe-button-click-header'  >  Subscribe</Button>    </Link>

                            </div>
                    }

                </div>

                <div className='hidden md:flex gap-x-5 w-full justify-end items-center '>

                    <HeaderSearch

                        coursesSearch={courses}
                        educatorsSearch={educators}
                        userIsCurrentlySubscribed={userIsCurrentlySubscribed}
                        className='h-12 w-72' />




                    <div className={cn('flex gap-x-10 justify-end items-center', {
                        'gap-x-5': user?.isLoggedIn

                    })}>
                        {!user?.isLoggedIn ?
                            <Link href={"/log-in"} className=''>
                                <ButtonText text="Log In" />
                            </Link>
                            :


                            <Link href={"/profile"} className='shrink-0'>
                                {
                                    <div className="rounded-full  border-[1px] border-border">
                                        <div className="">
                                            {userAdditionalData?.user.avatarUrl
                                                ?
                                                <Image className='block mx-auto rounded-full  border-[1px] border-themeColor h-12 w-12 object-cover object-top' loading='lazy' src={`${userAdditionalData?.user.avatarUrl}`} height={100} width={100} alt='avatar' />
                                                :
                                                <User />
                                            }
                                        </div>
                                    </div>
                                }

                            </Link>
                        }



                        {
                            user?.isLoggedIn ?
                                <div>
                                    {userIsCurrentlySubscribed && (<div></div>)}
                                    {!userIsCurrentlySubscribed && (
                                        <div className=''>
                                            <Link href={'/subscribe'}>  <Button className='upgrade-button-click-header'  >  Upgrade</Button>    </Link>
                                        </div>)}

                                </div>
                                : <div className=''>
                                    <Link href={'/subscribe'}>  <Button className='subscribe-button-click-header'  >  Subscribe</Button>    </Link>
                                </div>
                        }




                    </div>
                </div>

                {/* /Hamzah Code after merge 11/01/24 */}
                {/* <div className='hidden md:flex gap-x-5 w-full justify-end items-center '>

                    <HeaderSearch

                        coursesSearch={courses}
                        educatorsSearch={educators}
                        className='h-12 w-72' userIsCurrentlySubscribed={userIsCurrentlySubscribed} />




                    <div className={cn('flex gap-x-10 justify-end items-center', {
                        'gap-x-5': user?.isLoggedIn

                    })}>
                        {!user?.isLoggedIn ?
                            <Link href={"/log-in"} className=''>
                                <ButtonText text="Log In" />
                            </Link>
                            :


                            <Link href={"/profile"} className=''>
                                {
                              

                                    <div className="rounded-full  border-[1px] border-border">
                                        <div className="">
                                            <User />
                                        </div>
                                    </div>
                                }

                            </Link>
                        }



                        {
                            user?.isLoggedIn ?
                                <div>
                                    {userIsCurrentlySubscribed && (<div></div>)}
                                    {!userIsCurrentlySubscribed && (
                                        <div>
                                            <Link href={'/subscribe'}>  <Button className=''  >  Upgrade</Button>    </Link>
                                        </div>)}

                                </div>
                                : <div>
                                    <Link href={'/subscribe'}>  <Button className=''  >  Subscribe</Button>    </Link>
                                </div>
                        }




                    </div>
                </div> */}
                {/* <Link href={'/subscribe'}>
          <Button className=''  >
            {
              user?.isLoggedIn ? 'Upgrade' : 'Subscribe'
            }
          </Button>
        </Link> */}
            </div>
        </div>
    )
})


MainHeaderClient.displayName = 'MainHeaderClient';

export default MainHeaderClient;