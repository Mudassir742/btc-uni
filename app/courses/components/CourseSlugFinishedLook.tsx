import React from 'react';
import { extractCourseAll, extractCourseBeforeAndAfter, getCourseAll, getCourseBeforeAndAfter } from '../helper';
import FinishedLook from '@/components/FinishedLook';
import { UserSession } from '@/interfaces';

interface CourseSlugFinishedLooksProps {
    params: { slug: string };
    user: UserSession | null;
}

const CourseSlugFinishedLooks: React.FC<CourseSlugFinishedLooksProps> = async ({ params, user }) => {

    
    // const courseBeforeAndAfterProm = getCourseBeforeAndAfter(params);
    // const courseBeforeAndAfter = await courseBeforeAndAfterProm;
    // const { beforeandafter } = extractCourseBeforeAndAfter(courseBeforeAndAfter);

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { beforeandafter, courseID } = extractCourseAll(courseAll)
    

    return (
        <div >
            {beforeandafter.length > 0 && (
                    <div>
                        <FinishedLook finishedLooks={beforeandafter} userDataId={(user?.userDataId || 0).toString()} courseId={courseID}/>
                      

                        </div>
                )
            }
        </div>
    );
}

export default CourseSlugFinishedLooks;