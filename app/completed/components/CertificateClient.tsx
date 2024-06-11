"use client";
import { FC, HTMLAttributes, useState, useTransition } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { AccessedCourse } from '../helper'
import dynamic from 'next/dynamic'
import { formatDateToDisplay } from '@/utils/formatDate'
import { IUserProfile } from '@/features/wp/user'
import { Button } from '@/components/ui/Button'
import CourseTitle from '@/components/text/CourseTitle';
import ParagraphText from '@/components/text/Paragraph';
import Image from 'next/image';


const PDFView = dynamic(() => import('@/app/certificate/PDFView'), {
    ssr: false
})

interface IProps extends HTMLAttributes<HTMLDivElement> {
    sortedCertificateData: AccessedCourse[]
    userAdditionalData: IUserProfile | null
    image?: string;
}

// Mihai: hardcoded all the draft courses so if accessedCourse.accessedcoursemetadata.course ID is part of those, then it will get the corresponding course title, educator id, educator pic, educator insta handle, educaotr first name and educator last name

const CertificateClient: FC<IProps> = ({ className, userAdditionalData, image, sortedCertificateData, ...props }) => {
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(0);
    const paginatedData = sortedCertificateData.slice(0, (currentPage + 1) * itemsPerPage);
    const [penidng, startTransition] = useTransition()
    const loadMore = () => {
        startTransition(() => {
            setCurrentPage(prev => prev + 1);
        })
    }
    const hasMoreItems = sortedCertificateData.length > paginatedData.length;

    const temporarilyUnavailableTailwindClass = "italic";
    return (
        <div className='mb-16 mt-6'>
            <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full text-themeColor gap-y-4 gap-x-4", className)}>
                {paginatedData?.map((data, index) => (
                    <div key={index} className="col-span-1 border rounded-xl mx-auto p-5 border-border w-full">
                        {/* {image && ( */}
                        <div className='pb-[20px]'>
                            {data.accessedcoursemetadata.belongstocourse.courseMetadata.courseDetailPicture?.mediaItemUrl ? (
                                <Image
                                    alt="certificate"
                                    src={data.accessedcoursemetadata.belongstocourse.courseMetadata.courseDetailPicture?.mediaItemUrl}
                                    width={300}
                                    height={169}
                                    className="md:mx-auto rounded-lg"
                                />) : (
                                <Image
                                    unoptimized
                                    src={`https://vumbnail.com/${data.accessedcoursemetadata.belongstocourse.courseMetadata?.vimeoid?.[0]?.chapter}.jpg`}
                                    alt='placeholder'
                                    width={300}
                                    height={169}
                                    className='max-h-40 object-cover'
                                />
                            )}
                        </div>
                        {/* )} */}
                        <div className='flex'>


                            <div>





                                <h2 className={`font-medium line-clamp-1 ${((data?.accessedcoursemetadata?.belongstocourse?.title || "Temporarily Unavailable") === "Temporarily Unavailable") ? temporarilyUnavailableTailwindClass : ""}`}>
                                    {data?.accessedcoursemetadata?.belongstocourse?.title || "Temporarily Unavailable"}
                                </h2>

                                <ParagraphText
                                    text={`Completion Date: ${formatDateToDisplay(data?.accessedcoursemetadata?.completiondate)}`}
                                />

                            </div>


                            <div className="flex flex-grow justify-end">
                                <button className="text-14  duration-300 hover:bg-themecolor-500 hover:text-white">
                                    <PDFView info={{
                                        courseName: data?.accessedcoursemetadata?.belongstocourse?.title || "Temporarily Unavailable",
                                        CLO: data?.accessedcoursemetadata?.belongstocourse?.courseMetadata?.youwilllearn || "",
                                        description: data.accessedcoursemetadata.belongstocourse?.content || "",
                                        Instructors: data?.accessedcoursemetadata?.belongstocourse?.courseMetadata?.educators?.map((instructor) => ({
                                            id: instructor?.databaseId,
                                            img: instructor?.educatorMetaData?.educatorpicture.mediaItemUrl,
                                            handle: instructor?.educatorMetaData?.instahandle,
                                            name: (instructor?.educatorMetaData?.firstname || "Educator Information Temporarily Unavailable") + " " + (instructor?.educatorMetaData?.lastname || "")
                                        })).slice(0, 3) || [],
                                        brand: data.accessedcoursemetadata.belongstocourse.courseMetadata.courseBrands,
                                        std: {
                                            firstName: userAdditionalData?.user?.firstName || "",
                                            lastName: userAdditionalData?.user?.lastName ?? "",
                                            DateOfCompletion: formatDateToDisplay(data.accessedcoursemetadata.completiondate),
                                        }


                                    }} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {hasMoreItems && (
                <div className="flex w-full justify-center">
                    <Button disabled={penidng} onClick={loadMore} className="mx-auto mt-8 max-w-sm">
                        Load More
                    </Button>
                </div>
            )}
        </div>
    )
}

export default CertificateClient