import React from 'react';
import { getEducatorAll, extractEducatorAll } from '../helper';
import EducatorHeadShot from '@/components/EducatorHeadShot';
import AboutTheEducatorLongBio from '@/components/AboutTheEducatorLongBio';

interface EducatorSlugLongBioProps {
    params: { slug: string };
    themeColor: string;
}

const EducatorSlugLongBio: React.FC<EducatorSlugLongBioProps> = async ({ params, themeColor }) => {

    const educatorAllProm = getEducatorAll(params);
    const educatorAll = await educatorAllProm;
    const { educatorSlug, educatorContent } = extractEducatorAll(educatorAll)

    return (
        <AboutTheEducatorLongBio
            // key={educatorSlug}
            educatorContent={educatorContent} themeColor={themeColor} />
    );
}

export default EducatorSlugLongBio;