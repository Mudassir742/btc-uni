import React from 'react';
import { extractEducatorAll, getAllDownloadables, getAllTips, getCurrentUserDataPurchasedSubscriptions, getEducatorAll, today } from '../helper';
import TipParent from '@/components/TipParent';
import { Downloadable, Tip, UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';
import SH1Text from '@/components/text/SH1Text';
import DownloadableCard from '@/components/DownloadableCard';
import { Section, createActionCards } from '@/app/helper';

interface BrandSlugDownloads {
    params: { slug: string }; // Educator
}

const EducatorSlugDownloads: React.FC<BrandSlugDownloads> = async ({ params }) => {

    // get all downloadables
    const allDownloadablesProm = getAllDownloadables();
    // const allDownloadables = await allDownloadablesProm;
    // fetch tips and downloadables in parellel
    const [allDownloadables] = await Promise.all([allDownloadablesProm]);
    const checkedDownloadables = allDownloadables ? allDownloadables : [];

    // console.log("allDownloadablesProm is: ", allDownloadables)

    // filter only downloadables of this educator by educator slug

    const filteredDownloadables: Downloadable[] = checkedDownloadables
    .filter((downloadable: Downloadable) => {
        // Check if any educator in the tipEducator array has a slug that matches params.slug
        // console.log(downloadable.downloadablemetadata.downloadableBrands[0].slug)
        return downloadable.downloadablemetadata.downloadableBrands?.some(brand => brand?.slug === params.slug);
      })

      const downloadableCards = createActionCards(filteredDownloadables);

    return (
        <div>
            {downloadableCards.length > 0 && (
                <div>
   
                    <div className="container md:px-0">
                        <p className='text-themeColor text-[32px] font-semibold '>Downloadable Resources</p>
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