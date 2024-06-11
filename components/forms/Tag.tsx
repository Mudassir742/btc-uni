import React from 'react';

type TagProps = {
    text: string;
    active: boolean;
    onClick: () => void;
};

const Tag: React.FC<TagProps> = ({ text, active, onClick }) => {

    // const handleClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();  // Add this line
    //     onClick();
    // };
    return (
        <button
            type="button" 
            onClick={onClick}
            style={{
                margin: '5px',
                padding: '10px',
                border: '2px solid grey',
                borderRadius: '10px',
                backgroundColor: active ? 'grey' : 'white',
                color: active ? 'white' : 'grey',
            }}
        >
            {text}
        </button>
    );
};

export default Tag;
