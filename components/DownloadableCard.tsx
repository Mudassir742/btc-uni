"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ButtonText from "./text/ButtonText";
import { cn } from "@/utils/shadcn";
import CourseAccessToast from "./CourseAccessToast";
import toast from "react-hot-toast";
import Image from "next/image";
import { Download, XCircle } from "lucide-react";
import CourseTitle from "./text/CourseTitle";
import ParagraphSmall from "./text/ParagraphSmall";
import { Button } from "./ui/Button";

type DownloadableCardProps = {
	text: string;
	backgroundColor?: string;
	link: string;
	// canDownload: boolean; deprecated jan 11 as we are checking individual downloadable access level
	//   isPurchasableALaCarte: boolean;
	//   isPurchasableOnlyALaCarte: boolean;
	downloadImage: string;
	themecolor: string;
	description: string;
	slug: string;
	accessLevel?: string;
	variant?: "primary" | "secondary";
	//   downloadableAccessLevel: string;
	//   userDownloadableAccessLevel: string;
};

const DownloadableCard = ({
	text,
	downloadImage,
	backgroundColor = "transparent",
	variant = "primary",
	link,
	// canDownload,
	//   isPurchasableALaCarte,
	//   isPurchasableOnlyALaCarte,
	themecolor,
	description,
	slug,
	accessLevel,
}: //   downloadableAccessLevel,
//   userDownloadableAccessLevel,

DownloadableCardProps) => {
	const [showCustomAlert, setShowCustomAlert] = useState(false);
	let imageWidth = 200; // Default for mobile
	let screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
	if (screenWidth < 700) {
		imageWidth = 160;
	} else {
		imageWidth = 270;
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			screenWidth = window.innerWidth;
		}

		const handleResize = () => {
			screenWidth = window.innerWidth;
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	console.log(accessLevel);

	return (
		<>
			<main className="pb-4">
				<div
					id="action-button-pdfs"
					className={cn(
						[
							` h-auto bg-white w-fit my-3  border-[1px] border-border bg-${backgroundColor} rounded-xl`,
						],
						{
							"w-full p-5": variant === "secondary",
						}
					)}
				>
					<div
						className=""
						style={{ minWidth: "100px", minHeight: "100px", flexShrink: 0 }}
					>
						<Link href={`/resources/${slug}`}>
							<div className="relative">
								{accessLevel === "free" && (
									<div className="flex justify-center absolute -top-4 left-0 right-0 z-10">
										<div className="bg-white text-12 lg:text-16 text-black py-1 px-4 border border-black rounded-lg">
											Free Download
										</div>
									</div>
								)}

								{downloadImage && (
									<div
										className={`w-${imageWidth} relative pb-[130%] rounded-xl border border-border shadow-lg`}
									>
										<Image
											src={downloadImage}
											alt="download course resources for btc university"
											layout="fill"
											objectFit="cover"
											className="absolute top-0 left-0 w-full h-full rounded-t-xl"
										/>
									</div>
								)}

								<div className="w-[160px] md:w-[270px] bg-white rounded-b-xl p-2 flex flex-col items-start text-left">
									<CourseTitle text={text} />

									{/* <div className="absolute inset-0 top-[72px] md:top-[78px] flex justify-center items-center">
                    <div className="bg-themeColor px-4 md:px-12 text-white rounded-full p-[4px]">
                      <ButtonText text="Learn More" color="white" />
                    </div>
                  </div> */}
								</div>
							</div>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
};

export default DownloadableCard;
