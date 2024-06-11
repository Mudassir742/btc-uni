import React from 'react';
import { getEducatorAll, extractEducatorAll } from '../helper';
import EducatorHeadShot from '@/components/EducatorHeadShot';
import H3Text from '@/components/text/H3Text';

interface EducatorcSlugNameProps {
    params: { slug: string };
}

const EducatorSlugName: React.FC<EducatorcSlugNameProps> = async ({ params }) => {

    const educatorAllProm = getEducatorAll(params);
    const educatorAll = await educatorAllProm;
    const { educatorFirstName, educatorLastName } = extractEducatorAll(educatorAll)

    return (
        <div>
            <H3Text text={`${educatorFirstName} ${educatorLastName}`} />
            
        </div>
    );
}

export default EducatorSlugName;