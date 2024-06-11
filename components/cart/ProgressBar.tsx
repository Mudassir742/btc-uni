"use client"
// components/ProgressBar.js
import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(50);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => (prev < 100 ? prev + 10 : prev));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative pt-1 mt-10">
      <div className="flex flex-col">
        <div className="flex w-full justify-center items-center">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-[#523D34] text-xs leading-none py-1 text-center rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && progress < 100 && ' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
