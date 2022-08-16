import React, { useState } from "react";
import Citation from './citationBlock';
import convertTimeToSeconds from './timeToSeconds';

function Timeline(props) {
    let videoCitations = props.videoCitations;
    let citations = [];
    let circles = [];
    let video = document.querySelector("video");
    let overallIndex = 0;
    let circleDimension = 16;
    let circleClasses = "";
    let videoLength = video.duration;

    const[currentCircle, setCircle] = useState(0);

    const[currentLineLength, setLineLength] = useState(Math.floor(video.currentTime));

    const[currentFill, setFill] = useState("Black");

    const[currentStroke, setStroke] = useState("Black");
    
    const[currentView, setCurrentView] = useState((
        <div className="citation-block card rounded-lg m-2 justify-content-center">
            <h3 className="citation-title card-title text-center m-20">No citations currently active</h3>
        </div>
    ));

    function getCurrentTimeStamp(video) {
        return Math.floor(video.currentTime);
    }

    //convert each yite into an html citation card and add its placement along the timeline
    videoCitations.forEach((yiteList) => {
        for (let i = 0; i < yiteList.length; i++) {
            let yite = yiteList[i];
            citations.push(<Citation citation={yite} key={"citation " + (overallIndex - 1)}/>);

            let startPoint = (convertTimeToSeconds(yite.startTime) / video.duration);

            if((startPoint*100) >= 95) {
                startPoint = ((startPoint - 5)/100);
            }

            if((startPoint*100) <= 5) {
                startPoint = ((startPoint + 5)/100);
            }

            const temp = overallIndex;
            const setClick = () => {
                setCircle(temp)
            }
            
            let circle = <circle cx={`${startPoint*100}%`} cy='15' r={circleDimension/2} className={circleClasses} onClick={setClick} fill={currentFill} stroke={currentStroke} strokeWidth="5px"/>;
            circles.push(circle);
            overallIndex++;
        }
    });

    //sort citations by time
    citations.sort((a, b) => {return a.props.citation.startTime - b.props.citation.startTime});

    // When time updates, update citation
    video.ontimeupdate = () => {
        let currentCitations = [];
        let currentTime = getCurrentTimeStamp(video)

        for (let i = 0; i < citations.length; i++) {
            let startTime = citations[i].props.citation.startTime;
            startTime = convertTimeToSeconds(startTime);

            let endTime = citations[i].props.citation.endTime;
            endTime = convertTimeToSeconds(endTime);

            if((endTime - startTime) <= 5) {
                endTime = startTime + 5;
            }

            if ((startTime <= currentTime) && (currentTime <= endTime)) {
                currentCitations.push(citations[i]);
                setFill("White");
                setStroke("Red");
            } else if (currentTime >= endTime){
                setFill("Black");
                setStroke("Red");

            } else {
                setFill("Black");
                setStroke("Black");
            }
        }
        if(currentCitations.length == 0) {
            setCurrentView(
            <div className="citation-block card rounded-lg m-2 justify-content-center">
                <h3 className="citation-title card-title text-center m-20">No citations currently active</h3>
            </div>);
        } else {
            setCurrentView(currentCitations);
        }
        setLineLength(currentTime/videoLength);
    };

    //TODO: switch line and circle stroke with background colors
    return(
        <div className="timeline-view row h-100 justify-content-center">
            <div className="row w-100 justify-content-center">
                <div className="timeline-visual col" id="timeline-row">
                    <svg height="30">
                        <line x1="0" y1="15" x2="100%" y2="15" stroke="black" stroke-width="5px"/>
                        <line x1='0' y1="15" x2={`${currentLineLength*100}%`} y2="15" stroke="red" stroke-width="5px"/>
                        {circles}
                    </svg>
                </div>
            </div>
            <div className="row w-100 justify-content-center overflow-auto">
                <div className="timeline-card col m-2 w-100">
                    {currentView}
                </div>
            </div>
        </div>
    );
}

export default Timeline;