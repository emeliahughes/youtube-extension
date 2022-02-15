import { start } from '@popperjs/core';
import React, { useState, useEffect } from 'react';
// import ReactPlayer from "react-player";

function ViewCitations(props) {
    let videoCitations = props.videoCitations;
    let citations = [];
    let citationButtons = [];
    let currentView;

    //     // Sort each citation by start time
    // videoCitations = new Map([...videoCitations.entries()].sort((a, b) => {
    //     return convertTimeToSeconds(a[0]) - convertTimeToSeconds(b[0])
    // }))

    const[currentButton, setButton] = useState(0);

    // activeButton is the highlighted/active button shown
    // this is determined by either the user pressing a button or the current 
    // timestamp matches the start timestamp of a citation
    function getCurrentTimeStamp(video) {
        return Math.floor(video.currentTime);
    }

    let video = document.querySelector("video");

    const allYites = [];

    let overallIndex = 1;
    videoCitations.forEach((yiteList) => {
            for (let i = 0; i < yiteList.length; i++) {
                let yite = yiteList[i];
                allYites.push(yite);
                citations.push(<Citation citation={yite} key={"citation " + (overallIndex - 1)}/>);

                const foo = overallIndex;
                const setClick = () => {
                    setButton(foo)
                };

                let isActive = (currentButton == overallIndex);
                citationButtons.push(<CitationButton citation={yite} setClick={setClick} isActive={isActive} key={"citation button " + (overallIndex - 1)}/>);
                overallIndex++;
            }
    });

    // Sorts citations by time, need to do the same for citation buttons
    // citationButtons.sort((a, b) => {return a.props.citation.startTime - b.props.citation.startTime});
    // citations.sort((a, b) => {return a.props.citation.startTime - b.props.citation.startTime});
    
    
    // Can optimize by sorting citations list -> O(n) -> O(1)
    // When time updates, update citation
    video.ontimeupdate = () => {
        for (let i = 0; i < citations.length; i++) {
            let startTime = citations[i].props.citation.startTime;
            startTime = convertTimeToSeconds(startTime);

            if (startTime == getCurrentTimeStamp(video)) {

                // i + 1 bc line 98 is currentButton - 1
                setButton(i + 1);
            }
        }
    };
    

    // for (let i = 0; i < citations.length; i++) {
    //     let yite = videoCitations[i];
    //     citations.push(<Citation citation={yite} />);
    //     citationButtons.push(<CitationButton citation={yite} setClick={handleClick(i + 1)}/>);
    // }

    // console.log(citations[0].props.citation.startTime);

    let listClasses;

    if(currentButton == 0) {
        listClasses = "button list-view-button active-button"
    } else {
        listClasses = "button list-view-button"
    }

    let listViewButton = (
        <button onClick={() => setButton(0)} className= {listClasses}>
            <h2 className="list-view-button-text">List View</h2>
        </button>);

    let listViewContents = (
        <div className="list-view-block">
            <ul>
                {citations.filter((_, i) => currentButton == 0 || i == currentButton - 1)}
            </ul>
        </div>
    );

    if (currentButton == 0) {
        currentView = listViewContents;
    } else {
        // why currentButton - 1 here?
        currentView = citations[currentButton - 1];
    }

    return (
        <div className="citation-view">
            <div className="view-buttons">
                {listViewButton}
                {citationButtons}
            </div>
            <div className="citation-viewer">
                {currentView}
            </div>
        </div>
    );

}

// CONVERT TIME TO SECONDS
function convertTimeToSeconds(time) {
    let hourMinuteSecond = time.split(":").reverse();
    let timeInSeconds = 0;

    if (hourMinuteSecond.length == 3) {
        timeInSeconds += parseInt(hourMinuteSecond[2]) * 3600;
    }
    
    if (hourMinuteSecond.length >= 2) {
        timeInSeconds += parseInt(hourMinuteSecond[1]) * 60;
    }

    let seconds = parseInt(hourMinuteSecond[0]);

    if (isNaN(seconds)) {
        return 0;
    }
    timeInSeconds += seconds;

    return timeInSeconds;
}

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

    // Line 124, figure out how to go to a certain time without reloading the page
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
        classes = "citation-button button active-button";
    } else {
        classes = "citation-button button";
    }

    return (
        <button onClick={setClick} className={classes}>
            <h2 className="citation-button-title">{title}</h2>
        </button>
    )
}

export default ViewCitations;