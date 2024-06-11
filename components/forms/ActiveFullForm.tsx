import React, { ReactNode } from "react";

interface ActiveFullFormProps {
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	fill?: string;
	icon?: ReactNode;
}

const ActiveFullForm: React.FC<ActiveFullFormProps> = ({
	placeholder,
	value,
	onChange,
	fill,
	icon,
}) => {
	return (
		<form
			className="bg-white border border-border rounded-xl flex items-center px-10 py-2"
			id="active-full-form"
			style={{
				boxSizing: "border-box",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				padding: "10px",
				// position: 'absolute',
				width: "396px",
				height: "64px",
				left: "20px",
				top: "20px",
				background: "#FFFFFF",
				border: "1px solid #000000",
				fill,
			}}
		>
			{icon && <div className="mr-1">{icon}</div>}
			<input
				className="w-full bg-transparent focus:outline-none"
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</form>
	);
};

export default ActiveFullForm;
