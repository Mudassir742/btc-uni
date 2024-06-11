import { Button } from "@mui/material";
import { XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast, { Toast } from "react-hot-toast";

const SubscribeToast: React.FC<Toast> = ({ visible, id }) => {
	return (
		<div
			className={`${
				visible ? "animate-enter" : "animate-leave"
			}   bg-white w-full  border-[1px]  border-border shadow-lg justify-center items-center m-auto  rounded-xl pointer-events-auto   `}
		>
			<div className="flex px-4">
				<button
					onClick={() => toast.dismiss(id)}
					className="absolute top-2 right-2 flex  text-themeColor"
				>
					<XCircle />
				</button>
			</div>
			<div className=" ">
				<div className="p-4">
					<div className="flex justify-center">
						<div>
							<p className="mt-1 uppercase text-[22px] text-themeColor bold flex justify-center">
								<b>Subscribe to unlock </b>
							</p>
							<p className="mt-1 text-[18px] uppercase text-themeColor flex justify-center">
								6-Month or Annual All-Access Plan Required
							</p>
						</div>
					</div>
				</div>
				<div className="flex justify-center pb-4">
					<div className="flex  border-border">
						<Link href={"/subscribe"}>
							<Button className="subscribe-button-click-tip">
								SUBSCRIBE TO UNLOCK
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SubscribeToast };
