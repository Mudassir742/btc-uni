import React from 'react';
import { extractEducatorAll, getAllDownloadables, getAllTips, getCurrentUserDataPurchasedSubscriptions, getEducatorAll, today } from '../helper';
import TipParent from '@/components/TipParent';
import { Downloadable, Tip, UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';
import SH1Text from '@/components/text/SH1Text';
import DownloadableCard from '@/components/DownloadableCard';
import { Section, createActionCards } from '@/app/helper';

interface EducatorSlugDownloadsProps {
    params: { slug: string }; // Educator
}

const EducatorSlugDownloads: React.FC<EducatorSlugDownloadsProps> = async ({ params }) => {

    // get educator first name
    const educatorAllProm = getEducatorAll(params);
    
    // get all downloadables
    const allDownloadablesProm = getAllDownloadables();
    // const allDownloadables = await allDownloadablesProm;
    // fetch tips and downloadables in parellel
    const [educatorAll, allDownloadables] = await Promise.all([educatorAllProm, allDownloadablesProm]);
    const checkedDownloadables = allDownloadables ? allDownloadables : [];
    const { educatorFirstName } = extractEducatorAll(educatorAll)

    // console.log("allDownloadablesProm is: ", allDownloadables)

    // filter only downloadables of this educator by educator slug

    const filteredDownloadables: Downloadable[] = checkedDownloadables
    .filter((downloadable: Downloadable) => {
        // Check if any educator in the tipEducator array has a slug that matches params.slug
        return downloadable?.downloadablemetadata?.downloadableEducators?.some(educator => educator?.slug === params.slug);
      })

    const downloadableCards = createActionCards(filteredDownloadables);

    return (
        <div>
            {downloadableCards.length > 0 && (
                <div>
   
                    <div className="container md:px-0">
                        <SH1Text text={`${educatorFirstName}'s Downloadable Resources`} className="text-themeColor" />
                    </div>
                    <div className="space-under-category-titles" /> 

                        <div className="md:-ml-20">
                        <Section title={``} cards={downloadableCards} />
                        </div>
        
                    {/* <div className='space-between-categories' /> */}
                    
                </div>
            )}


        </div>
    );
}

export default EducatorSlugDownloads;