"use client"
import { FC, HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import Search from '@/components/layout/Search'
import { Course, Educator } from '@/interfaces'
// Components
import Image from 'next/image'
import EducatorsSearchCards from './EducatorsSearchCards'
import CourseSearchCards from './CourseSearchCards'
import { useFilter } from './hooks/useFilter'

interface IProps extends HTMLAttributes<HTMLDivElement> {
    coursesSearch: Course[],
    userIsCurrentlySubscribed: boolean,
    educatorsSearch: Educator[]
    
}

const HeaderSearch: FC<IProps> = ({ className, coursesSearch, userIsCurrentlySubscribed, educatorsSearch, ...props }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        if (isOpen || searchTerm.trim() !== '') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    // Event handler to hide div
    const handleClickOutside = (event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            document.body.style.overflow = 'unset';
        }
    };

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // update search term based on the user input
    const handleSearch = (value: string) => {
        if (value) {
            if (!isOpen) {
                setIsOpen(true);
            }
        } else {
            if (isOpen) {
                setIsOpen(false);
            }
        }
        const normalizedSearchTerm = normalizeText(value);
        setSearchTerm(normalizedSearchTerm);
    };

    const { filteredCourses, filteredEducators, normalizeText } = useFilter(coursesSearch, educatorsSearch, searchTerm);
    return (
        <div ref={divRef} className={cn("relative", className)} {...props}>
            <Search
                val={searchTerm}

                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // setSearchTerm(e.target.value);
                    handleSearch(e.target.value);

                }}
                className='h-12' />

            {
                isOpen && (filteredEducators.length || filteredCourses.length) ? (
                    <div className={cn(['absolute rounded-2xl px-8 py-5 flex flex-col mt-4 bg-white  shadow  h-fit '], {
                        "!right-0": userIsCurrentlySubscribed
                    })}>
                        <div className='max-h-[36rem] flex flex-col gap-y-4 overflow-auto pr-2 '>

                            {
                                filteredEducators.length ? (
                                    <EducatorsSearchCards filteredEducators={filteredEducators} onClick={() => setIsOpen(false)} />
                                ) : null
                            }

                            {
                                filteredCourses.length ? (
                                    <CourseSearchCards className='mt-5' filteredCourses={filteredCourses} onClick={() => setIsOpen(false)} />
                                ) : null
                            }

                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default HeaderSearch