import React, { useState, useEffect } from 'react';
import CitationButton from './citationButton';
import Citation from './citationBlock';
import convertTimeToSeconds from './timeToSeconds';

function ViewCitations(props) {
    let videoCitations = props.videoCitations;
    let citations = [];
    let citationButtons = [];
    let currentView;
    let listClasses;
    let video = document.querySelector("video");
    let overallIndex = 1;

    const[currentButton, setButton] = useState(0);

    // activeButton is the highlighted/active button shown
    // this is determined by either the user pressing a button or the current 
    // timestamp matches the start timestamp of a citation
    function getCurrentTimeStamp(video) {
        return Math.floor(video.currentTime);
    }

    //convert each yite into an html citation and create the citation button
    videoCitations.forEach((yiteList) => {
            for (let i = 0; i < yiteList.length; i++) {
                let yite = yiteList[i];
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

    // When time updates, update citation
    video.ontimeupdate = () => {
        if(currentButton != 0) {
            for (let i = 0; i < citations.length; i++) {
                let startTime = citations[i].props.citation.startTime;
                startTime = convertTimeToSeconds(startTime);

                if (startTime == getCurrentTimeStamp(video)) {

                    // i + 1 bc line 98 is currentButton - 1
                    setButton(i + 1);
                }
            }
        }
    };

    //if the current button is the list view button, set as active
    if(currentButton == 0) {
        listClasses = "mt-2 mb-2 w-100 btn btn-dark rounded-pill"
    } else {
        listClasses = "mt-2 mb-2 w-100 btn btn-light rounded-pill"
    }

    let listViewButton = (
        <button onClick={() => setButton(0)} className= {listClasses}>
            <h2 className="list-view-button-text">List View</h2>
        </button>);

    let listViewContents = (
        <div className="list-view-block overflow-auto w-100 h-250">
            <ul>
                {citations}
            </ul>
        </div>
    );

    //update the current view depending on if the list view or a single citation is selected 
    if (currentButton == 0) {
        currentView = listViewContents;
    } else {
        currentView = citations[currentButton - 1];
    }

    return (
        <div className="citation-view row">
            <div className="view-buttons col-3 m-2">
                <div className='row'>
                    {listViewButton}
                </div>
                <div className='citation-button-block row'>
                    {citationButtons}
                </div>
            </div>
            <div className="citation-viewer col w-100 h-100 m-2">
                {currentView}
            </div>
        </div>
    );

}

export default ViewCitations;