import React from "react";

import ParagraphText from "./Paragraph";

const FreeTextWords: React.FC = () => {
	return (
		<div
			style={{
				zIndex: "2",
				// position: "absolute",
				top: "50%",
				borderColor: "white",
				backgroundColor: "#A79A95",
				opacity: "0.75",
				padding: "4px 4px",
				color: "#A79A95", // Replace with your desired color value
				// borderRadius: "4px",
				fontStyle: "normal",
				fontWeight: "400",
				fontSize: "14px",
				lineHeight: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<ParagraphText text="FREE CLASS" />

			{/* <FreeText price="FREE CLASS" /> */}
		</div>
	);
};

export default FreeTextWords;
