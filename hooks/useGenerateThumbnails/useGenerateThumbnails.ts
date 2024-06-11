import { useCallback, useEffect, useState } from "react";

const useGenerateThumbnails = (videoId: number) => {
	const [imageUrl, setImageUrl] = useState<string>("");

	const fetchData = useCallback(async (url: string) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			if (data.thumbnail_url) {
				const fetchedImage = data.thumbnail_url.replace("200x150", "800x1500");
				setImageUrl(fetchedImage);
			}
		} catch (error) {
			return error;
		}
	}, []);
	useEffect(() => {
		const url = `https://noembed.com/embed?url=https://player.vimeo.com/video/${videoId}`;
		fetchData(url);
	}, [videoId, fetchData]);

	return {
		imageUrl,
	};
};

export { useGenerateThumbnails };
