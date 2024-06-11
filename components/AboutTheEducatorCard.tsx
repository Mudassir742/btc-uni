"use client";
import React from "react";
import SH4Text from "./text/SH4Text";
import B1Text from "./text/B1Text";
import Image from "next/image";
import Link from "next/link";
import T1Text from "./text/T1Text";

interface EducatorCardProps {
	educatorImageSrc: string;
	educatorFirstName: string;
	educatorLastName: string;
	educatorBio: string;
	educatorHandle: string;
	educatorSlug: string;
}

const maxLines = 3;
const AboutTheEducatorCard: React.FC<EducatorCardProps> = ({
	educatorImageSrc,
	educatorFirstName,
	educatorLastName,
	educatorBio,
	educatorHandle,
	educatorSlug,
}) => {
	return (
		<main>
			<Link href={`/${educatorSlug}`}>
				<div className="md:hidden">
					<div className="flex items-center max-w-[444px] h-[125px] ">
						<div className="relative w-[72px] h-[72px] mr-4 ">
							<div className="min-w-[72px] rounded-full overflow-hidden truncate">
								<Image
									src={educatorImageSrc}
									alt={educatorHandle}
									width={98}
									height={98}
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
						<div className="flex justify-center items-center ">
							<div className="pr-2 pl-2 ">
								<div className="flex">
									<SH4Text text={educatorFirstName} />
									<SH4Text text={educatorLastName} />
								</div>
								<div className="flex items-center ">
									<p className="truncate">
										<T1Text text={educatorHandle} />
									</p>
								</div>
								<p className="line-clamp-3  ">
									<B1Text text={educatorBio} />
								</p>
							</div>
						</div>
						{/* <B1Text text='Read More' /> */}
					</div>
				</div>

				{/* Desktop */}
				<div className="hidden md:flex ">
					<div className="flex w-[664px] h-[255px]">
						<div className="p-1 justify-center">
							<div className="justify-center w-[192px]">
								<div className="flex justify-center">
									<div className="flex justify-center h-[160px] w-[160px] rounded-full overflow-hidden">
										<Image
											src={educatorImageSrc}
											alt={educatorHandle}
											width={200}
											height={200}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="items-center w-[376px]">
							{" "}
							{/* Flex container for the right side content */}
							<div className="flex items-center ">
								<SH4Text text={educatorFirstName} />

								<SH4Text text={educatorLastName} />
							</div>
							<div className="truncate">
								<T1Text text={educatorHandle} />
							</div>
							<div className="justify-center">
								{" "}
								{/* Added 'justify-center' here */}
								<p className="line-clamp-3">
									<B1Text text={educatorBio} />
								</p>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</main>
	);
};

export default AboutTheEducatorCard;
