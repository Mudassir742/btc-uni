import React from 'react';
import { getRandomDownloadables, shuffleArray, themeColor } from '../helper';
import { Downloadable } from '@/interfaces';
import DownloadableCard from '@/components/DownloadableCard';

interface SuggestedDownloadsInnerProps {
    relatedDownloadables: Downloadable[];
  }

const SuggestedDownloadsInner: React.FC<SuggestedDownloadsInnerProps> = async ({relatedDownloadables}) => {

  let displayedRelatedDownloadables: Downloadable[] = relatedDownloadables;
  const randomDowloadablesProm = getRandomDownloadables();

  if (relatedDownloadables.length < 1) {
    // fetch random downloadables
    const fetchedDownloadables = await randomDowloadablesProm;

    // exclude the current downloadable from the fetchedDownloadables
    // Create a Set of unique course database IDs
    const uniqueDownloadableIds = new Set(fetchedDownloadables.map(downloadable => downloadable.databaseId));

    // Filter the fetched courses to exclude duplicates
    const uniqueDownloadables= fetchedDownloadables.filter(downloadable => !uniqueDownloadableIds.has(downloadable.databaseId));

    // Randomize array
    const randomizedFetchedDownloadables: Downloadable[] = shuffleArray<Downloadable>(uniqueDownloadables);

    // Filter the combined array to exclude the current course
    displayedRelatedDownloadables = randomizedFetchedDownloadables;

  }

  const createDownloadableCards = (downloadables: Downloadable[]) => downloadables
    .map((downloadable: Downloadable) => (
      <DownloadableCard
            key={downloadable.databaseId}
            slug={downloadable.slug}
            text={downloadable?.title || ""}
            link={downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
            description={downloadable?.content || ""}
            // canDownload={userIsCurrentlySubscribed}
            downloadImage={downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""}
            themecolor={themeColor}
        />
  ));

  const downloadableCards = createDownloadableCards(displayedRelatedDownloadables);

  return (
    <div className='downloadcards-on-resources-page'>
      <div className="flex overflow-x-auto gap-x-4 gap-y-0 ">
        
          {downloadableCards}
        </div>
            
        </div>
    );
}

export default SuggestedDownloadsInner;