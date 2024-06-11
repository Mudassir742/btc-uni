import React from 'react';

interface FormProgressBarProps {
  section: number;
  steps: string[];
  filledSteps: number[];
  stepDescriptions: string[];
}

const FormProgressBar: React.FC<FormProgressBarProps> = ({ section, steps, filledSteps, stepDescriptions }) => {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex justify-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              filledSteps.includes(index + 1) ? 'text-themeColor' : 'text-themeColor'
            }`}
            style={{ padding: '0.5rem' }}
          >
            <div
              className={`w-4 h-4 rounded-full  border-[1px] ${
                filledSteps.includes(index + 1) ? 'bg-border border-border' : 'border-border'
              }`}
            />
            <div className="text-xs mt-1" style={{ fontFamily: 'Roboto', fontSize: '10px', fontWeight: 400 }}>
              {stepDescriptions[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormProgressBar;
