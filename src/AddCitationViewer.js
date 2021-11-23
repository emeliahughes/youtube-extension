import React from 'react'

export const AddCitationViewer = ({ color, text, onClick}) => {
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}
            className='btn'
            >
                {text}
        </button>
    )
}

export default AddCitationViewer;