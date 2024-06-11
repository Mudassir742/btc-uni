import React from "react";
import {
	extractDownloadableAll,
	getDownloadableAll,
	getDownloadablesByTag,
	themeColor,
} from "../helper";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import ParagraphText from "@/components/text/Paragraph";
import { Downloadable } from "@/interfaces";
import DownloadableCard from "@/components/DownloadableCard";
import H3Text from "@/components/text/H3Text";

interface MoreFromSameSetProps {
	params: { slug: string };
}

const MoreFromSameSet: React.FC<MoreFromSameSetProps> = async ({ params }) => {
	const downloadableAllProm = getDownloadableAll(params);

	const downloadableData = await downloadableAllProm;

	// get tag [0]
	const { tags } = extractDownloadableAll(downloadableData);
	const downloadableTagName = tags[0]?.name || "";
	const downloadableTagSlug = tags[0]?.slug || "";

	// get downloadables with same tag
	const sameSetDownloadablesProm = getDownloadablesByTag(downloadableTagSlug);
	const sameSetDownloadables = await sameSetDownloadablesProm;
	const safeSameSetDownloadables = sameSetDownloadables
		? sameSetDownloadables
		: [];

	// exclude current downloadable from set so it doesnt look redundant
	const displayedSameSetDownloadables = safeSameSetDownloadables.filter(
		(downloadable: Downloadable) => downloadable.slug !== params.slug
	);

	const createDownloadableCards = (downloadables: Downloadable[]) =>
		downloadables.map((downloadable: Downloadable) => (
			<DownloadableCard
				key={downloadable.databaseId}
				slug={downloadable.slug}
				text={downloadable?.title || ""}
				link={
					downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl ||
					""
				}
				description={downloadable?.content || ""}
				// canDownload={userIsCurrentlySubscribed}
				downloadImage={
					downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl ||
					""
				}
				themecolor={themeColor}
			/>
		));

	const sameSetDownloadableCards = createDownloadableCards(
		displayedSameSetDownloadables
	);

	return (
		<div>
			{displayedSameSetDownloadables.length > 0 && (
				<div className="slider-container md:pl-0 ">
					<H3Text text={`More ${downloadableTagName}`} />
					<div className="space-under-category-titles" />
					<div className="downloadcards-on-resources-page">
						<div className="flex overflow-x-auto gap-x-4 gap-y-0 ">
							{sameSetDownloadableCards}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MoreFromSameSet;
