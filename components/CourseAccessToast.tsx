import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CourseAccessToastProps {
  message: string;
  onOkClick: () => void;
  onCancelClick: () => void;
}

const CourseAccessToast: React.FC<CourseAccessToastProps> = ({ message, onOkClick, onCancelClick }) => {
  return (
    <div>
      <div>{message}</div>
      <button onClick={onOkClick}>OK</button>
      <button onClick={onCancelClick}>Cancel</button>
    </div>
  );
};

export const showCourseAccessToast = (message: string, onOkClick: () => void, onCancelClick: () => void) => {
  toast(<CourseAccessToast message={message} onOkClick={onOkClick} onCancelClick={onCancelClick} />, {
    position: 'top-right',
    autoClose: false, // Don't auto-close, allow the user to click the buttons
    hideProgressBar: true,
  });
};

export default CourseAccessToast;
