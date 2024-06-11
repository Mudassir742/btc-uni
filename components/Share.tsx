"use client";
import React, { useState, useRef, useEffect } from "react";
import { Share } from "lucide-react";
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookMessengerIcon,
	FacebookMessengerShareButton,
	FacebookShareButton,
	HatenaShareButton,
	InstapaperShareButton,
	LineShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	LivejournalShareButton,
	MailruShareButton,
	OKShareButton,
	PinterestIcon,
	PinterestShareButton,
	PocketShareButton,
	RedditShareButton,
	TelegramShareButton,
	TumblrShareButton,
	XIcon,
	TwitterShareButton,
	ViberShareButton,
	VKShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	WorkplaceShareButton,
} from "react-share";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/Dialog";

import { usePathname } from "next/navigation";
import { DialogCloseButton } from "./DialogCloseButton";
// import { Dialog, DialogContent, Input } from '@mui/material';
// import { DialogTrigger } from '@radix-ui/react-dialog';
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/Button";
// import { DialogClose, DialogFooter } from './ui/Dialog';
import { Copy } from "lucide-react";
import { Input } from "./ui/Input";

interface ShareButtonProps {
	shareText: string;
	shareImg: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareText, shareImg }) => {
	const [showPopup, setShowPopup] = useState(false);
	const popupRef = useRef<HTMLDivElement | null>(null);

	const sharingImg = String(shareImg);

	const togglePopup = () => {
		setShowPopup(!showPopup);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	const pathname = usePathname() || "";
	const fullPageLink = "https://www.btcuniversity.com" + pathname;

	useEffect(() => {
		// Close the popup when the user clicks outside of it
		function handleClickOutside(event: MouseEvent) {
			if (
				popupRef.current &&
				!popupRef.current.contains(event.target as Node)
			) {
				closePopup();
			}
		}

		// Add event listener when the popup is open
		if (showPopup) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			// Remove event listener when the popup is closed
			document.removeEventListener("mousedown", handleClickOutside);
		}

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showPopup]);

	const shareLink = (linkShare: string) => {
		navigator.share({ url: linkShare });
	};
	return (
		<div className="">
			{/* Mobile */}
			<div className="md:hidden">
				<button onClick={() => shareLink(fullPageLink)}>
					<div className="flex justify-center items-center  cursor-pointer">
						<div className="flex justify-center items-center ">
							{/* <Share color='#523D34' /> */}
							<svg
								width="24"
								height="24"
								viewBox="0 0 33 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_1878_131476)">
									<path
										d="M9.78564 15.5996V19.7596L9.94564 19.9996L10.1056 19.6796L11.7056 16.9597L14.1056 14.9596L16.3456 14.0796L19.7056 13.0396L22.9056 13.4396V18.0796L31.4656 9.43965L22.9056 0.639648V5.83965H21.2256L17.1456 6.71965L13.7056 8.79965L11.3056 11.9996L9.78564 15.5996Z"
										fill="#523D34"
									/>
									<path
										d="M28.9995 32.0002H4.33297C2.31029 32.0002 0.666504 30.3562 0.666504 28.3338V9.00045C0.666504 6.97777 2.31029 5.33398 4.33297 5.33398H8.99967C9.55167 5.33398 9.99966 5.78198 9.99966 6.33397C9.99966 6.88597 9.55167 7.33396 8.99967 7.33396H4.33297C3.41428 7.33396 2.66648 8.08176 2.66648 9.00045V28.3338C2.66648 29.2522 3.41428 30.0002 4.33297 30.0002H28.9995C29.9182 30.0002 30.6662 29.2522 30.6662 28.3338V17.0004C30.6662 16.4484 31.1142 16.0004 31.6662 16.0004C32.2182 16.0004 32.6662 16.4484 32.6662 17.0004V28.3338C32.6662 30.3562 31.0222 32.0002 28.9995 32.0002Z"
										fill="#523D34"
									/>
									<path
										d="M9.66503 21.3162C9.59179 21.3162 9.5183 21.3081 9.44506 21.2893C8.99316 21.1841 8.6665 20.7974 8.6665 20.3335V18.3336C8.6665 11.1657 14.4985 5.33369 21.6664 5.33369H21.9996V1.00024C21.9996 0.592281 22.2477 0.225585 22.6263 0.0722666C23.0035 -0.0795874 23.4369 0.0122085 23.7196 0.306883L32.3862 9.3068C32.7595 9.69351 32.7595 10.3068 32.3862 10.6935L23.7196 19.6934C23.4369 19.9881 23.0008 20.0789 22.6263 19.928C22.2477 19.7747 21.9996 19.408 21.9996 19.0001V14.6668H20.4157C16.2211 14.6668 12.4516 16.9974 10.5771 20.7481C10.405 21.0948 10.0437 21.3162 9.66503 21.3162ZM21.6664 7.33367C16.0663 7.33367 11.4292 11.5402 10.7505 16.96C13.1743 14.2562 16.6503 12.6669 20.4157 12.6669H22.9996C23.5516 12.6669 23.9996 13.1149 23.9996 13.6669V16.5201L30.2781 10.0001L23.9996 3.48019V6.33368C23.9996 6.88568 23.5516 7.33367 22.9996 7.33367H21.6664Z"
										fill="#523D34"
									/>
								</g>
								<defs>
									<clipPath id="clip0_1878_131476">
										<rect
											width="32"
											height="32"
											fill="white"
											transform="translate(0.666504)"
										/>
									</clipPath>
								</defs>
							</svg>
						</div>

						{/* <div className='flex justify-center py-1'>
                  {isPinned ? 'Saved' : "Save"} 
                  </div> */}
					</div>
				</button>
			</div>

			<Dialog>
				<DialogTrigger asChild>
					{/* Desktop */}
					<div className="hidden md:block relative">
						<button onClick={togglePopup} className="relative">
							<div className="flex justify-center items-center  cursor-pointer">
								<div className="flex justify-center items-center ">
									{/* <Share color='#523D34' /> */}
									<svg
										width="24"
										height="24"
										viewBox="0 0 33 32"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clip-path="url(#clip0_1878_131476)">
											<path
												d="M9.78564 15.5996V19.7596L9.94564 19.9996L10.1056 19.6796L11.7056 16.9597L14.1056 14.9596L16.3456 14.0796L19.7056 13.0396L22.9056 13.4396V18.0796L31.4656 9.43965L22.9056 0.639648V5.83965H21.2256L17.1456 6.71965L13.7056 8.79965L11.3056 11.9996L9.78564 15.5996Z"
												fill="#523D34"
											/>
											<path
												d="M28.9995 32.0002H4.33297C2.31029 32.0002 0.666504 30.3562 0.666504 28.3338V9.00045C0.666504 6.97777 2.31029 5.33398 4.33297 5.33398H8.99967C9.55167 5.33398 9.99966 5.78198 9.99966 6.33397C9.99966 6.88597 9.55167 7.33396 8.99967 7.33396H4.33297C3.41428 7.33396 2.66648 8.08176 2.66648 9.00045V28.3338C2.66648 29.2522 3.41428 30.0002 4.33297 30.0002H28.9995C29.9182 30.0002 30.6662 29.2522 30.6662 28.3338V17.0004C30.6662 16.4484 31.1142 16.0004 31.6662 16.0004C32.2182 16.0004 32.6662 16.4484 32.6662 17.0004V28.3338C32.6662 30.3562 31.0222 32.0002 28.9995 32.0002Z"
												fill="#523D34"
											/>
											<path
												d="M9.66503 21.3162C9.59179 21.3162 9.5183 21.3081 9.44506 21.2893C8.99316 21.1841 8.6665 20.7974 8.6665 20.3335V18.3336C8.6665 11.1657 14.4985 5.33369 21.6664 5.33369H21.9996V1.00024C21.9996 0.592281 22.2477 0.225585 22.6263 0.0722666C23.0035 -0.0795874 23.4369 0.0122085 23.7196 0.306883L32.3862 9.3068C32.7595 9.69351 32.7595 10.3068 32.3862 10.6935L23.7196 19.6934C23.4369 19.9881 23.0008 20.0789 22.6263 19.928C22.2477 19.7747 21.9996 19.408 21.9996 19.0001V14.6668H20.4157C16.2211 14.6668 12.4516 16.9974 10.5771 20.7481C10.405 21.0948 10.0437 21.3162 9.66503 21.3162ZM21.6664 7.33367C16.0663 7.33367 11.4292 11.5402 10.7505 16.96C13.1743 14.2562 16.6503 12.6669 20.4157 12.6669H22.9996C23.5516 12.6669 23.9996 13.1149 23.9996 13.6669V16.5201L30.2781 10.0001L23.9996 3.48019V6.33368C23.9996 6.88568 23.5516 7.33367 22.9996 7.33367H21.6664Z"
												fill="#523D34"
											/>
										</g>
										<defs>
											<clipPath id="clip0_1878_131476">
												<rect
													width="32"
													height="32"
													fill="white"
													transform="translate(0.666504)"
												/>
											</clipPath>
										</defs>
									</svg>
								</div>

								{/* <div className='flex justify-center py-1'>
                  {isPinned ? 'Saved' : "Save"} 
                  </div> */}
							</div>
						</button>
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-max ">
					<DialogHeader>
						<DialogTitle>Share</DialogTitle>
					</DialogHeader>
					<div className="bg-slate-200 h-[1px] w-full absolute top-14" />
					<div className="flex items-center gap-x-5 mt-5">
						<FacebookShareButton
							className="flex flex-col items-center gap-y-2"
							url={fullPageLink}
							title={shareText}
						>
							<div className=" border-[1px] rounded-full p-2">
								<FacebookIcon size={22} className="rounded-full" />
							</div>
							<p className="text-12">Facebook</p>
						</FacebookShareButton>

						<LinkedinShareButton
							className="flex flex-col items-center gap-y-2"
							url={fullPageLink}
						>
							<div className=" border-[1px] rounded-full p-2 ">
								<LinkedinIcon size={22} className="rounded-full" />
							</div>
							<p className="text-12">LinkedIn</p>
						</LinkedinShareButton>

						<WhatsappShareButton
							className="flex flex-col items-center gap-y-2"
							url={fullPageLink}
						>
							<div className=" border-[1px] rounded-full p-2 ">
								<WhatsappIcon size={22} className="rounded-full" />
							</div>
							<p className="text-12">WhatsApp</p>
						</WhatsappShareButton>

						<EmailShareButton
							className="flex flex-col items-center gap-y-2"
							url={fullPageLink}
						>
							<div className=" border-[1px] rounded-full p-2 ">
								<EmailIcon size={22} className="rounded-full" />
							</div>
							<p className="text-12">Email</p>
						</EmailShareButton>

						<TwitterShareButton
							className="flex flex-col items-center gap-y-2"
							url={fullPageLink}
							title={shareText}
						>
							<div className=" border-[1px] rounded-full p-2 ">
								<XIcon size={22} className="rounded-full" />
							</div>
							<p className="text-12">X</p>
						</TwitterShareButton>

						<PinterestShareButton
							className="flex flex-col items-center gap-y-2"
							url={fullPageLink}
							media={sharingImg}
						>
							<div className=" border-[1px] rounded-full p-2 ">
								<PinterestIcon size={22} className="rounded-full" />
							</div>
							<p className="text-12">Pinterest</p>
						</PinterestShareButton>
					</div>
				</DialogContent>
			</Dialog>
		</div>
		//             {
		//     showPopup && (
		//         <div className="fixed inset-0 flex items-center justify-center z-50">
		//             <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
		//             <div className="relative z-50 bg-white p-4 rounded-xl shadow-lg" ref={popupRef}>
		//                 <button className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700" onClick={closePopup}>
		//                     <XCircle />

		//                 </button>
		//                 <div className="space-under-category-titles" />
		//                 <SH2Text text='Share' />
		//                 <div className='mt-2 grid grid-cols-3 md:grid-cols-6 gap-x-2 gap-y-5'>
		//                     <FacebookShareButton className='flex flex-col' url={fullPageLink} quote={shareText}>
		//                         <FacebookIcon />
		//                         Facebook
		//                     </FacebookShareButton>

		//                     <LinkedinShareButton className='flex flex-col' url={fullPageLink} >
		//                         <LinkedinIcon />
		//                         LinkedIn
		//                     </LinkedinShareButton>

		//                     <WhatsappShareButton className='flex flex-col' url={fullPageLink} >
		//                         <WhatsappIcon />
		//                         WhatsApp
		//                     </WhatsappShareButton>

		//                     <EmailShareButton className='flex flex-col' url={fullPageLink} >
		//                         <EmailIcon />
		//                         Email
		//                     </EmailShareButton>

		//                     <TwitterShareButton className='flex flex-col' url={fullPageLink} title={shareText}>
		//                         <TwitterIcon /> Twitter
		//                     </TwitterShareButton>

		//                     <PinterestShareButton className='flex flex-col' url={fullPageLink} media={sharingImg}>
		//                         <PinterestIcon />
		//                         Pinterest
		//                     </PinterestShareButton>

		//                 </div>
		//             </div>
		//         </div>
		//     )
		// } * /}
		// </div >
	);
};

export default ShareButton;
