import React from 'react';

interface FormProgressBarProps {
  section: number;
  steps: string[];
  filledSteps: number[];
}

const FormProgressBarWithoutDescriptions: React.FC<FormProgressBarProps> = ({ section, steps, filledSteps }) => {
  return (
    <div className="flex justify-center mt-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center ${
            filledSteps.includes(index + 1) ? 'text-themecolor-500' : 'text-gray-300'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full ${
              filledSteps.includes(index + 1) ? 'bg-themecolor-500' : 'bg-gray-300'
            }`}
          />
          {index !== steps.length - 1 && (
            <div
              className={`h-0.5 ${
                section > index + 1 ? 'bg-themecolor-500' : 'bg-gray-300'
              }`}
              style={{ width: '2rem' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormProgressBarWithoutDescriptions;
