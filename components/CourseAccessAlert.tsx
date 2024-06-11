import React from 'react';
import { useRouter } from 'next/navigation';

interface CourseAccessAlertProps {
  message: string;
}

const CourseAccessAlert: React.FC<CourseAccessAlertProps> = ({ message }) => {
  const router = useRouter();

  const handleOKClick = () => {
    // Redirect the user to the /subscribe page when OK is clicked
    router.push('/subscribep');
  };

  const handleCloseClick = () => {
    // Close the alert when Cancel is clicked
    // You can implement this as needed, e.g., by setting a state to hide the alert
  };

  return (
    <div className="custom-alert">
      <p>{message}</p>
      <button onClick={handleOKClick}>OK</button>
      <button onClick={handleCloseClick}>Cancel</button>
    </div>
  );
};

export default CourseAccessAlert;
