"use client";
import React, { useState } from "react";

import TipCard from "./TipCard";

import { Tip } from "@/interfaces";

import { MultiVideoCarousel } from "./MultiVideoCarousel";
import { SubscribeToast } from "./SubscribeToast";
import toast from "react-hot-toast";
import SubscribePopup from "./SubscribePopup";

interface TipParentHomeUnsubscribedProps {
	heroTitle: string;
	tipVideos: Tip[];
	isSubscribed: boolean;
	userDataId: string;
}

const TipParentHomeUnsubscribed: React.FC<TipParentHomeUnsubscribedProps> = ({
	tipVideos,
	isSubscribed,
}) => {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [initialIndex, setInitialIndex] = useState(0);
	const openLightbox = (index: number) => {
		if (!isSubscribed) return toast.custom((t) => <SubscribePopup defaultOpen={true} />);
		setInitialIndex(index);
		setLightboxOpen(true);
	};

	return (
		<div className="slider-container">
			<div className="flex space-x-4 overflow-x-auto">
				{tipVideos?.map((tipVideo: Tip, index) => (
					<TipCard
						openLightbox={() => openLightbox(index)}
						key={index}
						tipTitle={tipVideo?.title || ""}
						videoId={+(tipVideo?.tipmetadata?.video || 0)}
						educatorLink={
							"https://www.btcuniversity.com/educator/" +
							(tipVideo?.tipmetadata?.tipEducator[0]?.slug || "")
						}
						educatorHandle={
							tipVideo?.tipmetadata?.tipEducator[0]?.educatorMetaData
								?.instahandle || ""
						}
						isSponsored={tipVideo.tipmetadata.isTipSponsoredByTheBrand}
						brandName={`${tipVideo.tipmetadata.tipBrands?.map(brand => brand.title)}`}
					/>
				))}
			</div>

			<MultiVideoCarousel
				setInitialIndex={setInitialIndex}
				initialIndex={initialIndex}
				data={tipVideos}
				open={lightboxOpen}
				onValueChange={setLightboxOpen}
			/>
		</div>
	);
};

export default TipParentHomeUnsubscribed;
