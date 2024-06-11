import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { Course } from '@/interfaces'
// Images
import Image from 'next/image'
// Components
import Link from 'next/link'


interface IProps extends HTMLAttributes<HTMLDivElement> {
    filteredCourses: Course[]
    variant?: "popup" | "sidebar"
    onClick?: () => void;
}

const CourseSearchCards: FC<IProps> = ({ className, variant = "popup", onClick, filteredCourses, ...props }) => {
    return (
        <div className={cn("min-w-[30rem] ", className)} {...props}>
            <h2 className='text-24 mt-2 mb-5 text-themeColor font-semibold'>
                Courses
            </h2>
            <div className='flex flex-col gap-y-4'>

                {
                    filteredCourses.map((item) => {
                        const edu = item.courseMetadata?.educators?.map((educator) => educator.educatorMetaData.instahandle).join(', ')
                        return (
                            <Link key={item.id} href={`/courses/${item.slug}`} onClick={onClick} className={cn([], {
                                '!overflow-hidden flex flex-col': variant === "sidebar"

                            })}>
                                <div key={item.id}
                                    className='bg-themecolor-50 py-4 px-4 flex items-center gap-x-4'>
                                    <Image src={item.courseMetadata?.courseThumbnailPicture?.mediaItemUrl || "/placeholder.png"} alt={item.title}
                                        width={65}
                                        height={65}
                                        className='h-20 w-20 object-cover object-top rounded-xl shrink-0'
                                    />
                                    <div>
                                        <h2 className='text-20 font-medium leading-150 line-clamp-2 text-themeColor'>{item.title}</h2>
                                        <h3 className='line-clamp-2 text-themeColor'>{edu}</h3>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CourseSearchCards