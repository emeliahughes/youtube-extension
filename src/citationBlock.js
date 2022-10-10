import React, { useState, useEffect } from 'react';
import convertTimeToSeconds from './timeToSeconds';

function Citation(props) {
    let citation = props.citation;
    let title = citation.title;
    let source = citation.source;
    let sourceType = citation.sourceType;
    let startTime = convertTimeToSeconds(citation.startTime);
    let endTime = convertTimeToSeconds(citation.endTime);
    let description = citation.description;
    let link = citation.link;
    let citeType = citation.citeType;
    let headerClasses = "citation-header card-title text-body p-4 mb-n2 pl-5 ";

    if (link.substring(0, 4) !== 'http') {
        link = 'http://' + link;
    }

    if (citeType == "affirm") {
        headerClasses += "bg-success";
    } else if (citeType == "refute") {
        headerClasses += "bg-danger";
    } else {
        headerClasses += "bg-secondary";
    }

    return(
        <div className="citation-block card rounded-lg m-2">
            <h3 className={headerClasses}>{title}</h3>
            <div className='card-body row ml-1 text-body'>
                <div className='col p-2 mr-auto ml-4'>
                    <h4 className="citation-source card-title font-weight-bold pb-1">{source}</h4>
                    <h4 className="card-text pb-1">{description}</h4>
                    <a href={link} className="citation-source card-link pb-1" target="_blank"><h4>Visit {sourceType}</h4></a>
                </div>
                <div className='col-auto m-2 mr-auto'>
                    <div className='row justify-content-end m-3'>
                        <button onClick={jumpTime.bind(this, startTime)} className='btn btn-secondary rounded-lg card-link align-items-center p-2 mx-2 mr-0 ml-2'>
                            <h4 className='mb-0 p-1'>{citation.startTime}</h4>
                        </button>
                        <h4 className='card-text text-italic align-self-center mb-0 m-2'>to</h4>
                        <button onClick={jumpTime.bind(this, endTime)} className='btn btn-secondary rounded-lg card-link align-items-center p-2 mx-2 my-0  mx-2 mr-0 ml-2'>
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