import React, { useState } from "react";
import Citation from './citationBlock';
import convertTimeToSeconds from './timeToSeconds';
import trackUserClick from "./trackUserClick";
import { USER_CLICK } from "./constants/clicks";

function Timeline(props) {
    let videoCitations = props.videoCitations;
    let citations = [];
    let circles = [];
    let video = document.querySelector("video");
    let overallIndex = 0;
    let circleDimension = 16;
    let circleClasses = "";
    let videoLength = video.duration;
    let fill = "black";
    let stroke = "black";

    let noCitations = (<div className="citation-block card rounded-lg m-2 p-3 justify-content-center border-0">
                            <div className='card-body row w-100'>
                                <div className='col m-2 mr-4 ml-4 w-100'>
                                    <h3 className="citation-title card-title text-center">No citations currently active</h3>
                                </div>
                            </div>
                        </div>)

    const[currentLineLength, setLineLength] = useState(video.currentTime/videoLength);

    const[currentTime, setCurrentTime] = useState(video.currentTime);
    
    const[currentView, setCurrentView] = useState(noCitations);

    const[priorityCitationID, setPriorityCitationID] = useState(null);

    //convert each yite into an html citation card and add its placement along the timeline
    videoCitations.forEach((yiteList) => {
        for (let i = 0; i < yiteList.length; i++) {
            let yite = yiteList[i];
            citations.push(<Citation citation={yite} key={"citation " + (overallIndex - 1)}/>);

            let startTime = convertTimeToSeconds(yite.startTime);
            let endTime = convertTimeToSeconds(yite.endTime);
            let startPoint = (startTime / video.duration);

            if((startPoint*100) >= 95) {
                startPoint = ((startPoint - 5)/100);
            }

            if((startPoint*100) <= 5) {
                startPoint = ((startPoint + 5)/100);
            }

            const setClick = () => {
                trackUserClick(USER_CLICK.TIMELINE_VIEW_CITATION);
                video.currentTime = startTime;
                
                setPriorityCitationID(yite.id);
                setCurrentTime(video.currentTime);
            }

            if ((startTime <= currentTime) && (currentTime < endTime)) {
                fill = "White";
                stroke = "Red";
            } else if (currentTime >= endTime){
                fill = "Black";
                stroke = "Red";

            } else {
                fill = "Black";
                stroke = "Black";
            }
            
            let circle = <circle key={"circle " + (overallIndex - 1)} cx={`${startPoint*100}%`} cy='15' r={circleDimension/2} className={circleClasses} onClick={setClick} fill={fill} stroke={stroke} strokeWidth="5px"/>;
            circles.push(circle);
            overallIndex++;
        }
    });

    // When time updates, update citation
    video.ontimeupdate = () => {
        setCurrentTime(video.currentTime);
        let currentCitations = [];
        let priorityCitation = null;

        for (let i = 0; i < citations.length; i++) {
            let startTime = citations[i].props.citation.startTime;
            startTime = convertTimeToSeconds(startTime);

            let endTime = citations[i].props.citation.endTime;
            endTime = convertTimeToSeconds(endTime);

            if((endTime - startTime) <= 5) {
                endTime = startTime + 5;
            }

            if ((startTime <= currentTime) && (currentTime <= endTime)) {
                if (citations[i].props.citation.id == priorityCitationID) {
                    priorityCitation = citations[i];
                } else {
                    currentCitations.push(citations[i]);
                }
            }
        }

        if (priorityCitation != null
                && convertTimeToSeconds(priorityCitation.props.citation.startTime) <= currentTime
                && currentTime <= convertTimeToSeconds(priorityCitation.props.citation.endTime)) {
            currentCitations.unshift(priorityCitation);
        } else {
            setPriorityCitationID(null);
        }

        if(currentCitations.length == 0) {
            setCurrentView(noCitations);
        } else {
            setCurrentView(currentCitations);
        }
        setLineLength(currentTime/videoLength);
    };

    //TODO: switch line and circle stroke with background colors
    return(
        <div className="timeline-view row-12 w-100 h-100">
            <div className="col-12 w-100  d-flex justify-content-center flex-column">
                <div className="row w-100 d-flex justify-content-end">
                    <div className="timeline-visual col d-flex justify-content-center" id="timeline-row">
                        <svg height="30" className="d-flex justify-content-center">
                            <line x1="0" y1="15" x2="100%" y2="15" stroke="black" strokeWidth="5px"/>
                            <line x1='0' y1="15" x2={`${currentLineLength*100}%`} y2="15" stroke="red" strokeWidth="5px"/>
                            {circles}
                        </svg>
                    </div>
                </div>
                <div className="row w-100 d-flex justify-content-center">
                    <div className="timeline-card col m-2 w-100">
                        {currentView}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timeline;