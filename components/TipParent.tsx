"use client";
import React, { useState } from "react";
import Image from "next/image";
import SH1Text from "./text/SH1Text";
import RecommendedEducatorIconCard from "./RecommendedEducatorIconCard";
import SH2Text from "./text/SH2Text";
import ParagraphText from "./text/Paragraph";
import TipCard from "./TipCard";
import CardHandle from "./text/CardHandle";
import { Tip } from "@/interfaces";
import H3Text from "./text/H3Text";
import { MultiVideoCarousel } from "./MultiVideoCarousel";
import toast from "react-hot-toast";
import { SubscribeToast } from "./SubscribeToast";
import SubscribePopup from "./SubscribePopup";

interface TipParentProps {
	heroTitle: string;
	tipVideos: Tip[];
	isSubscribed: boolean;
	userDataId: string;
	iseducatorspage?: boolean;
	className?: string;
}

const TipParent: React.FC<TipParentProps> = ({
	heroTitle,
	tipVideos,
	isSubscribed,
	userDataId,
	iseducatorspage,
	className,
}) => {
	const [lightboxOpen, setLightboxOpen] = useState(false);

	const [initialIndex, setInitialIndex] = useState(0);
	const openLightbox = (index: number) => {
		if (!isSubscribed) return toast.custom((t) => <SubscribePopup defaultOpen={true} />);
		setInitialIndex(index);
		setLightboxOpen(true);
	};
	const closeLightbox = () => {
		setLightboxOpen(false);
	};

	return (
		<div>
			{iseducatorspage ? (
				<div>
					<div className="container md:px-0">
						<SH1Text
							text={`${heroTitle} Quick Tips`}
							className={`text-themeColor ${className}`}
						/>
					</div>

					<div className="space-under-category-titles" />

					<div className="slider-container md:pl-0 flex space-x-4 overflow-x-auto">
						{tipVideos?.map((tipVideo: Tip, index) => (
							<TipCard
								key={index}
								tipTitle={tipVideo?.title || ""}
								iseducatorspage={iseducatorspage}
								videoId={+(tipVideo?.tipmetadata?.video || 0)}
								educatorLink={
									"https://www.btcuniversity.com/educator/" +
									(tipVideo?.tipmetadata?.tipEducator[0]?.slug || "")
								}
								educatorHandle={
									tipVideo?.tipmetadata?.tipEducator[0]?.educatorMetaData
										?.instahandle || ""
								}
								openLightbox={() => openLightbox(index)}
								isSponsored={tipVideo.tipmetadata.isTipSponsoredByTheBrand}
								brandName={`${tipVideo.tipmetadata.tipBrands?.map(brand => brand.title)}`}
							/>
						))}
					</div>
				</div>
			) : (
				<div>
					<div className="container">
						<SH1Text text={`${heroTitle}`} className="text-themeColor" />
						{/* <ParagraphText text={` ${heroTitle} tips in less than 60 seconds`} className="text-border" /> */}
					</div>
					<div className="space-under-category-titles" />

					<div className="slider-container flex space-x-4 overflow-x-auto">
						{tipVideos?.map((tipVideo: Tip, index) => (
							<TipCard
								key={index}
								iseducatorspage={iseducatorspage}
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
								openLightbox={() => openLightbox(index)}
								isSponsored={tipVideo.tipmetadata.isTipSponsoredByTheBrand}
								brandName={`${tipVideo.tipmetadata.tipBrands?.map(brand => brand.title)}`}
							/>
						))}
					</div>
				</div>
			)}

			<div className="space-between-categories" />
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

export default TipParent;
