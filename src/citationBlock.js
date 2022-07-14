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
        <div className="citation-block">
            <h2 className="citation-title">{title}</h2>
            <a href={link} className="citation-source">{source}</a>
            <br></br>
            <button onClick={jumpTime.bind(this, startTime)}>
                <p>Jump to {citation.startTime}</p>
            </button>
        </div>
    )
}

function jumpTime(time) {
    let video = document.getElementsByTagName("video")[0];
    video.currentTime = time;
}

export default Citation;