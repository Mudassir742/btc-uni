import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { GET_TOP_CLASSES } from '@/graphql/queries'
import { Course } from '@/interfaces'
import { generateWpPageError } from '@/utils/wpErrorHandling'
import { transformDataForWpUrl, transformWpUrl } from '@/utils/url'
// Components
import CourseCard from '../CourseCard'
import Image from "next/image"

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const TopClassesCards: FC<IProps> = async ({ className, ...props }) => {
    const data = await getTopClasses("top-classes")
    return (
        <div className={cn("flex overflow-x-auto", className)} {...props}>
            {data.map((item) => {
                return (
                    <div key={item.id}>
                        <CourseCard course={item} />
                    </div>
                )
            })}
        </div>
    )
}

export default TopClassesCards

export async function getTopClasses(categorySlug: string): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // cache: "force-cache",
        body: JSON.stringify({
            query: GET_TOP_CLASSES.loc?.source.body,
            variables: {
                slug: `${categorySlug}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courseData = data as { courses: { nodes: Course[] } };

    return transformDataForWpUrl(courseData.courses.nodes);
}