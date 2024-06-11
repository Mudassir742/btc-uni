


import React from 'react';
import { extractCourseAll, getCourseAll, getCourseFormulas } from '../helper';
import CourseFormulas from '@/components/CourseFormulas';
import { UserSession } from '@/interfaces';

interface CourseSlugYouFormulasProps {
    params: { slug: string };
    user: UserSession | null;
}

const CourseSlugYouFormulas: React.FC<CourseSlugYouFormulasProps> = async ({ params, user }) => {


    // const courseBeforeAndAfterProm = getCourseBeforeAndAfter(params);
    // const courseBeforeAndAfter = await courseBeforeAndAfterProm;
    // const { beforeandafter } = extractCourseBeforeAndAfter(courseBeforeAndAfter);

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { theCourseFormulas, courseID } = extractCourseAll(courseAll)


    return (
        <div >
            {theCourseFormulas.length > 0 && (
                <div>
                    <CourseFormulas courseFormulas={theCourseFormulas} userDataBaseId={(user?.userDataId || 0).toString()} courseId={courseID} />


                </div>
            )
            }
        </div>
    );
}

export default CourseSlugYouFormulas;

