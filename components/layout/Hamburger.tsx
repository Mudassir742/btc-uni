"use client"
import { AlignLeft, User, X } from 'lucide-react'
import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Course, Educator, UserData } from '@/interfaces'
import { IUserProfile } from '@/features/wp/user'
import search from '@/public/search.svg'
// Components
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import HeaderSearch from './Search'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { SidebarAccordion } from './SidebarAccordion'
import { cn } from '@/utils/shadcn'
import { set } from 'date-fns'
import { useFilter } from './hooks/useFilter'
import EducatorsSearchCards from './EducatorsSearchCards'
import CourseSearchCards from './CourseSearchCards'
import Link from 'next/link'
import Loader from '../ui/Loader'
import LogoutButton from '@/app/profile/components/Logout'
import { Input } from '../ui/Input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'


interface IProps extends HTMLAttributes<HTMLDivElement> {
    currentUserData: UserData
    userAdditionalData: IUserProfile | null,
    educators: Educator[],
    courses: Course[]
    loggedIn: boolean;
    userEmail: string;
    themeColor: string;
}
const Hamburger: FC<IProps> = ({ className, educators, themeColor, courses, currentUserData, userAdditionalData, loggedIn, userEmail }) => {
    const [query, setQuery] = useState<string>("")
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    // console.log(userAdditionalData.user.avatarUrl)

    useEffect(() => {

        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }

    }, [isMenuOpen]);

    const { filteredCourses, filteredEducators } = useFilter(courses, educators, query);


    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const showSearchInput = () => {
        setIsSearchVisible(true);
    }

    const hideSearchInput = () => {
        setIsSearchVisible(false);
    }

    // const loggedIn = (currentUserData?.databaseId || 0) > 0;

    return (
        <div className='mt-2'>

            {/* {isMenuOpen && (
                // Dark overlay for the content
                <div
                    className="fixed inset-0 mt-[50px] bg-black opacity-50 z-2147483647"
                    onClick={() => setIsMenuOpen(false)} // Set the onClick handler to close the menu
                ></div>
            )} */}

            <Sheet

                onOpenChange={(e) => {
                    setIsMenuOpen(e)
                }}
                open={isMenuOpen}
                modal={false}

            >

                <SheetTrigger className=' '>

                    {isMenuOpen ? (
                        <X
                            size={30}
                            color={themeColor}
                        />


                    ) : (
                        <AlignLeft
                            className='shrink-0'
                            color={themeColor}
                            size={30}
                        />
                    )}




                </SheetTrigger>







                <SheetContent
                    onClick={() => {
                        document.body.style.overflow = 'hidden';
                    }}
                    onOpenAutoFocus={(e) => {
                        e.preventDefault()
                    }}
                    className={cn(['w-[calc(100%-30px)] md:w-full mt-[4.5rem] h-full  overflow-y-auto'], {
                        'h-screen overflow-hidden': query.trim(),
                    })} side={'left'}>
                    {
                        query &&
                        <div className='w-full h-screen bg-white z-10 absolute left-0  top-[4.7rem]  px-6  overflow-y-auto pt-5 md:hidden'>
                            {
                                filteredCourses.length || filteredEducators.length ?
                                    <div className=''>
                                        {
                                            filteredEducators.length ? (
                                                <EducatorsSearchCards
                                                    variant='sidebar'
                                                    className=
                                                    {'min-w-full'}
                                                    filteredEducators={filteredEducators}
                                                    onClick={closeMenu} />
                                            ) : null
                                        }

                                        {
                                            filteredCourses.length ? (
                                                <CourseSearchCards
                                                    variant='sidebar'
                                                    className='mt-5 min-w-full'
                                                    filteredCourses={filteredCourses}
                                                    onClick={closeMenu} />
                                            ) : null
                                        }
                                    </div> :
                                    <div>No Result Found</div>
                            }
                        </div>
                    }





                    <div className='pr-3' >
                        {/* Mobile search */}
                        <div className='md:hidden'>
                            <HeaderSearch
                                val={query}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setQuery(e.target.value)
                                }} className='h-[2.9rem]' />
                        </div>





                        <div className="pb-6">
                            {loggedIn ? (
                                <div className='pt-3'>

                                    <div className="flex  border-[1px] border-border rounded-xl container bg-themecolor-50 text-center">


                                        <div className="items-center justify-center mx-auto py-3">
                                            <Link href={'/profile'} onClick={closeMenu} className=''>


                                                <div className="w-full flex flex-col items-center justify-center mx-auto pb-2 text-themeColor">
                                                    You are logged in as:
                                                </div>





                                                {/* <label
                                                htmlFor="avatar"
                                                className="flex justify-center items-center flex-col w-fit mx-auto cursor-pointer"
                                            >

                                                <input
                                                    name="avatar"
                                                    type="file"
                                                    id="avatar"
                                                    hidden
                                                    accept="image/png, image/jpeg, image/jpg"
                                                    onChange={handleImageChange}
                                                />
                                                <div className="rounded-full w-10 h-10 flex relative justify-center items-center bg-pressedGrey">

                                                    {
                                                        pending || isLoading ?

                                                            <Loader className="h-5 w-5 ml-3" /> :
                                                            userAdditionalData?.user?.avatarUrl ?
                                                                <div className='rounded-full  border-[1px] border-border'>
                                                                    <User />
                                                                </div>

                                                                :
                                                                <User />
                                                    }
                                                </div>

                                            </label>   */}

                                                <div className=''>
                                                    {
                                                        userAdditionalData?.user.avatarUrl ?
                                                            <div>
                                                                <Image className='block mx-auto my-4 rounded-full  border-[1px] border-themeColor h-24 w-24 object-cover object-top' loading='lazy' src={`${userAdditionalData?.user.avatarUrl}`} height={100} width={100} alt='avatar' />
                                                            </div>
                                                            :
                                                            <div className='bg-pressedGrey h-24 w-24 rounded-full  border-[1px] mx-auto shrink-0 flex items-center justify-center '>
                                                                <User className='h-16 w-16'
                                                                    color={themeColor} />
                                                            </div>
                                                    }
                                                </div>

                                                <div className="pt-2 flex flex-col items-center justify-center mx-auto text-themeColor">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                {`${userEmail.length > 30 ?
                                                                    userEmail.slice(0, 30) + '...' :
                                                                    userEmail
                                                                    }`}
                                                            </TooltipTrigger>
                                                            { userEmail.length > 30 && (
                                                            <TooltipContent>
                                                                    {userEmail}
                                                            </TooltipContent>
                                                            )}
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                </div>

                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='py-6'>

                                    <Link href="/log-in" className='' onClick={closeMenu}>
                                        <Button>Log In</Button>
                                    </Link>
                                </div>
                            )}
                        </div>



                        {/* {(!loggedIn &&

                        <Link href='/log-in '  onClick={closeMenu}>
                            
                            <Button variant={'primary'} className='mt-6 md:mt-0 mb-6' >Log In</Button>
                            </Link>
    )} */}

                        <div className=''>
                            <SidebarAccordion onClick={closeMenu} />
                        </div>
                        <div className='flex justify-center gap-x-5 mt-5'>
                            {/* <Link href={''}>
                                <Button className='px-2 py-5 font-light w-3/4 whitespace-pre' variant={'outline'}
                                >Why BTCU?
                                </Button>
                            </Link> */}

                        </div>
                        {/* <div className='mt-5 flex justify-center gap-x-5 pb-10'>
                        </div> */}
                        {(loggedIn &&
                            <div onClick={closeMenu}>

                                <LogoutButton />

                            </div>
                        )}


                    </div>
                    <div className='space-between-categories' />
                    <div className='space-between-categories' />
                    <div className='space-between-categories' />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Hamburger