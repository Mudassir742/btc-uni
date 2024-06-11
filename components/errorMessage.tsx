import React from 'react';

interface ErrorMessageProps {
    message: string;
    onClick: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClick }) => {
    return (
        <div
            className="fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-75"
            onClick={onClick}
        >
            { message}

        </div>
    );
};

export default ErrorMessage;
