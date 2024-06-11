import React from "react";
import Image from "next/image";

interface EducatorHeadShotProps {
	imageUrl: string;
}

const EducatorHeadShot: React.FC<EducatorHeadShotProps> = ({ imageUrl }) => {
	return (
		<div
			className="overflow-hidden"
			style={{
				width: "100%",
				paddingBottom: "100%", // Maintain a square aspect ratio (1:1)
				position: "relative",
			}}
		>
			<div
				className="rounded-none "
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					overflow: "hidden",
				}}
			>
				<Image
					src={imageUrl}
					alt="Educator Image"
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</div>
	);
};

export default EducatorHeadShot;

// <div className='' style={{ minWidth: '100px', minHeight: '100px', flexShrink: 0 }}>
// <div className="overflow-hidden">
//   <Image
//     src={imageUrl}
//     alt="Educator Headshot"
//     width={imageWidth}
//     height={imageHeight}
//     className="relative z-1"
//   />
// </div>
// </div>

// <div
//   className="w-full h-full rounded-full overflow-hidden"
//   style={{ aspectRatio: '1 / 1', position: 'relative' }}
// >
//   <div
//     style={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       overflow: 'hidden',
//     }}
//   >
//     <Image
//       src={imageUrl}
//       alt="Educator Headshot"
//       layout="fill"
//       objectFit="cover"
//     />
//   </div>
// </div>
