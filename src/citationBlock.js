import React, { useState, useEffect } from 'react';
import convertTimeToSeconds from './timeToSeconds';

function Citation(props) {
    let citation = props.citation;
    let title = citation.title;
    let source = citation.source;
    let link = citation.link;
    if (link.substring(0, 4) !== 'http') {
        link = 'http://' + link;
    }
    
    let startTime = convertTimeToSeconds(citation.startTime);
    let endTime = convertTimeToSeconds(citation.endTime);

    return(
        <div className="citation-block card rounded-pill m-2">
            <div className='card-body row'>
                <div className='col-auto align-items-center m-2 mr-auto ml-4'>
                    <h3 className="citation-title card-title">{title}</h3>
                    <h4 href={link} className="citation-source card-subtitle card-link text-muted">{source}</h4>
                </div>
                <div className='col m-2 mr-auto'>
                    <div className='row justify-content-end m-3'>
                        <button onClick={jumpTime.bind(this, startTime)} className='btn btn-secondary rounded-pill card-link align-items-center p-2 mx-2 mr-0 ml-2'>
                            <h4 className='mb-0 p-1'>{citation.startTime}</h4>
                        </button>
                        <h4 className='card-text text-italic align-self-center mb-0 m-2'>to</h4>
                        <button onClick={jumpTime.bind(this, endTime)} className='btn btn-secondary rounded-pill card-link align-items-center p-2 mx-2 my-0  mx-2 mr-0 ml-2'>
                            <h4 className='mb-0 p-1'>{citation.endTime}</h4>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function jumpTime(time) {
    let video = document.getElementsByTagName("video")[0];
    video.currentTime = time;
}

export default Citation;