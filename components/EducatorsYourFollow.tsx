import React from 'react';
import EducatorTeamCard from './EducatorTeamCard';
import { Educator } from '@/interfaces';

interface EducatorsYouFollowProps {
  educatorsYouFollow: Educator[]
}

const EducatorsYouFollow: React.FC<EducatorsYouFollowProps> = ({ educatorsYouFollow }) => {

    return (
        <div className='space-y-4 overflow-y-auto max-h-[300px] max-w-1/2' >
            {educatorsYouFollow?.map((educator: Educator, index) => (
                <EducatorTeamCard
                    key={index} educator={educator} numberOfCourses={(educator.educatorMetaData?.courses || []).length}
                />
            ))}
        </div>
    );
};

export default EducatorsYouFollow;
