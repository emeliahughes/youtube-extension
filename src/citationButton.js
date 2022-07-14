import React, { useState, useEffect } from 'react';

function CitationButton(props) {
    let citation = props.citation;
    let setClick = props.setClick;
    let isActive = props.isActive;
    let title = citation.title;
    let titleLength = title.length;
    let classes;

    if(titleLength > 15) {
        title = title.substring(0, 12);
        title += "...";
    }

    if(isActive){
        classes = "mt-2 mb-2 btn btn-dark w-100 rounded-pill";
    } else {
        classes = "mt-2 mb-2 btn btn-light w-100 rounded-pill";
    }

    return (
        <div className='row-3 w-100'>
            <button onClick={setClick} className={classes}>
                <h2 className="citation-button-title">{title}</h2>
            </button>
        </div>
    )
}

export default CitationButton;