import React from 'react';
import { getEducatorAll, extractEducatorAll } from '../helper';
import EducatorHeadShot from '@/components/EducatorHeadShot';
import SH2Text from '@/components/text/SH2Text';

interface EducatorSlugInstaHandleProps {
    params: { slug: string };
}

const EducatorSlugInstaHandle: React.FC<EducatorSlugInstaHandleProps> = async ({ params }) => {

    const educatorAllProm = getEducatorAll(params);
    const educatorAll = await educatorAllProm;
    const { educatorInstaHandle } = extractEducatorAll(educatorAll)

    return (
        <SH2Text
            text={educatorInstaHandle}
            className="text-themeColor" />
    );
}

export default EducatorSlugInstaHandle;