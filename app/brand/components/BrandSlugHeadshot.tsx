import React from 'react';
import { getEducatorAll, extractEducatorAll } from '../helper';
import EducatorHeadShot from '@/components/EducatorHeadShot';

interface EducatorSlugHeadshotProps {
    params: { slug: string };
}

const EducatorSlugHeadshot: React.FC<EducatorSlugHeadshotProps> = async ({ params }) => {

    const educatorAllProm = getEducatorAll(params);
    const educatorAll = await educatorAllProm;
    const { educatorPictureUrl } = extractEducatorAll(educatorAll)

    return (
        <div className='rounded-xl' >
            <EducatorHeadShot
                imageUrl={educatorPictureUrl}
               
            />
        </div>
    );
}

export default EducatorSlugHeadshot;