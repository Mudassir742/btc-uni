"use client";

import { Tip } from "@/interfaces";

import { X } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

import { TipsList } from "../TipsList";

import {
	CarouselDialog,
	CarouselDialogContent,
	CarouselDialogHeader,
} from "../ui/CarouselDialog";

interface MultiVideoCarousel {
	open: boolean;
	onValueChange: Dispatch<SetStateAction<boolean>>;
	data: Array<Tip>;
	initialIndex: number;
	setInitialIndex: Dispatch<SetStateAction<number>>;
}

const MultiVideoCarousel: React.FC<MultiVideoCarousel> = ({
	onValueChange,
	open,
	data,
	initialIndex,
	setInitialIndex,
}) => {
	return (
		<CarouselDialog open={open} onOpenChange={onValueChange}>
			<CarouselDialogContent className="min-w-screen bg-blackV2 overflow-y-auto max-w-screen p-0 pt-2">
				<TipsList
					data={data}
					initialIndex={initialIndex}
					setInitialIndex={setInitialIndex}
				/>
			</CarouselDialogContent>
		</CarouselDialog>
	);
};

export { MultiVideoCarousel };
