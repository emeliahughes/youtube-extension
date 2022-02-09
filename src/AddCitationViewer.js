import React from 'react';

export const AddCitationViewer = ({ color, text, onClick}) => {
    return (
        <button
            onClick={onClick}
            background-color= {color}
            className='btn'
            >
                {text}
        </button>
    )
}

export default AddCitationViewer;