import React from 'react';
import { getEducatorAll, extractEducatorAll  } from '../helper';
import ShareButton from '@/components/Share';

interface EducatorSlugShareButtonProps {
    params: { slug: string };
}

const EducatorSlugShareButton: React.FC<EducatorSlugShareButtonProps> = async ({ params }) => {

    const shareText = 'Check out this BTCU Educator!';

    const educatorAllProm = getEducatorAll(params);
    const educatorAll = await educatorAllProm;
    const { educatorContent, educatorPictureUrl } = extractEducatorAll(educatorAll)
    // to do: decide if we include the shareText above or the entire educator content/description

    return (
        <ShareButton shareText={shareText} shareImg={educatorPictureUrl} />
    );
}

export default EducatorSlugShareButton;