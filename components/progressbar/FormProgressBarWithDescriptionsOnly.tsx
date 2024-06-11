import React from "react";

interface FormProgressBarProps {
	stepDescriptions: string[];
}

const FormProgressBarWithDescriptionsOnly: React.FC<FormProgressBarProps> = ({
	stepDescriptions,
}) => {
	return (
		<div className="flex justify-center mt-6">
			{stepDescriptions.map((description, index) => (
				<div key={index} className="flex flex-col items-center">
					<div className="text-xs mt-1">{description}</div>
				</div>
			))}
		</div>
	);
};

export default FormProgressBarWithDescriptionsOnly;
