import React, { useState, useEffect } from 'react';

function CitationButton(props) {
    let citation = props.citation;
    let setClick = props.setClick;
    let isActive = props.isActive;
    let title = citation.title;
    let titleLength = title.length;
    let classes;

    if(titleLength > 20) {
        title = title.substring(0, 17);
        title += "...";
    }

    if(isActive){
        classes = "mt-2 mb-2 btn btn-dark text-light w-100 rounded-lg text-center d-flex align-items-center";
    } else {
        classes = "mt-2 mb-2 btn btn-secondary text-body w-100 rounded-lg text-center d-flex align-items-center";
    }

    return (
        <div className='row-3 w-100'>
            <button onClick={setClick} className={classes}>
                <h3 className="citation-button-title w-100 mb-0 py-2">{title}</h3>
            </button>
        </div>
    )
}

export default CitationButton;