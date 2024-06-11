"use client";
import React from "react";

import { Play } from "lucide-react";
import CourseTitle from "./text/CourseTitle";

import ParagraphText from "./text/Paragraph";

import Image from "next/image";
import { useGenerateThumbnails } from "@/hooks/useGenerateThumbnails";

interface TipCardProps {
	tipTitle: string;
	videoId: number;
	educatorLink: string;
	educatorHandle: string;
	iseducatorspage?: boolean;
	isSponsored?: true | null;
	brandName?: string;
	openLightbox: () => void;
}

let imageWidth = 160;

const now = new Date().toISOString();

const TipCard: React.FC<TipCardProps> = ({
	iseducatorspage,
	tipTitle,
	educatorLink,
	educatorHandle,
	videoId,
	openLightbox,
	isSponsored,
	brandName
}) => {
	const { imageUrl } = useGenerateThumbnails(videoId);

	return (
		<div className="tipcard ">
			<div className=" border-[1px] border-border rounded-xl shadow-lg overflow-hidden ">
				<div className="h-full object-cover relative">
					<div id="tipcard" className="bg-themecolor-500 w-[160px] lg:w-[270px]">
						<div className="bg-white rounded-b-xl">
							<div
								onClick={openLightbox}
								className="relative top-0 h-full w-full"
							>
								<div className="!w-full relative pb-[177.78%] h-0 overflow-hidden ">
									{imageUrl && (
										<>
											<Image priority alt={tipTitle} fill src={imageUrl} />
											<div className="absolute flex top-0 h-full items-center justify-center w-full ">
												<div className="w-14 h-14 relative cursor-pointer">
													<div className="w-14 h-14 left-0 top-0 absolute flex items-center justify-center bg-white/opacity-10 rounded-full shadow border border-white backdrop-blur-[23.33px]">
														<Play fill="white" size={16} color="#fff" />
													</div>
												</div>
											</div>
										</>
									)}
								</div>
							</div>

							<div className="w-[160px] lg:w-[270px] ">
								<div className="p-2 h-full items-center ">
									<div>
										<CourseTitle text={tipTitle} />
									</div>

									{!iseducatorspage && (
										<div>
											{educatorLink && (
												<div style={{ width: `${imageWidth}px` }}>
													<ParagraphText
														text={educatorHandle}
														className="text-secondarythemecolor pr-2"
													/>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
						{/* <CourseTitle text={tipTitle} /> */}
						{isSponsored && (
							<div className="bg-themecolor-500 py-2 rounded-b-xl shadow-lg">
								<p className="text-white text-12 text-center">Sponsor By {brandName}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TipCard;
