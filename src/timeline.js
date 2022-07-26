import React, { useState } from "react";
import Citation from './citationBlock';
import convertTimeToSeconds from './timeToSeconds';

function Timeline(props) {
    let videoCitations = props.videoCitations;
    let citations = [];
    let circles = [];
    let buttonPlacements = [];
    let video = document.querySelector("video");
    let overallIndex = 0;
    let timelineBox = document.querySelector('.timeline-visual');
    let timelineWidth = timelineBox.offsetWidth;
    let circleDimension = 16;
    let circleClasses = "";
    let circleFill = "black";
    let videoLength = video.duration;
    let activeLineWidth = '0';

    const[currentCircle, setCircle] = useState(0);

    const[currentButton, setButton] = useState(0);

    function getCurrentTimeStamp(video) {
        return Math.floor(video.currentTime);
    }

    //convert each yite into an html citation card and add its placement along the timeline
    videoCitations.forEach((yiteList) => {
        for (let i = 0; i < yiteList.length; i++) {
            let yite = yiteList[i];
            citations.push(<Citation citation={yite} key={"citation " + (overallIndex - 1)}/>);

            let startPoint = (convertTimeToSeconds(citations[i].startTime) / video.duration) * timelineWidth + circleDimension / 2;
            if(i > 0) {
                if (buttonPlacements[i - 1] + circleDimension + 5 >= startPoint) {
                    startPoint += circleDimension;
                }
            }
            if(startPoint >= timelineWidth - (circleDimension/2)) {
                startPoint = startPoint - (circleDimension/2);
            }

            if(startPoint <= circleDimension/2) {
                startPoint += circleDimension/2;
            }

            buttonPlacements.push(startPoint);

            const temp = overallIndex;
            const setClick = () => {
                setCircle(temp)
            }
            
            // TODO: active/disabled circles/buttons classes 
            if(currentCircle == overallIndex){
                circleClasses = "";
                circleFill = "white";
            } else {
                circleClasses = "";
                circleFill = "black";
            }

            let circle = <circle cx={startPoint} cy='15' r={circleDimension/2} className={circleClasses} onClick={setClick} fill={circleFill} stroke="black"/>;
            circles.push(circle);
            overallIndex++;
        }
    });

    //sort citations by time
    citations.sort((a, b) => {return a.props.citation.startTime - b.props.citation.startTime});

    // When time updates, update citation
    video.ontimeupdate = () => {
        for (let i = 0; i < citations.length; i++) {
            let startTime = citations[i].props.citation.startTime;
            startTime = convertTimeToSeconds(startTime);

            if (startTime == getCurrentTimeStamp(video)) {
                setButton(i);
            }

            // TODO: add switching case for when citations are close together
        }

        activeLineWidth = Math.floor(getCurrentTimeStamp(video)/videoLength) * timelineWidth;
        // TODO: update active line length to reflect proportion of time through video
    };

    //TODO: switch line and circle stroke with background colors
    return(
        <div className="timeline-view row">
            <div className="timeline-visual row" id="timeline-row">
                <svg height="30" width={timelineWidth}>
                    <line x1="0" y1="15" x2={timelineWidth} y2="15" stroke="black"/>
                    <line x1='0' y1="15" x2={activeLineWidth} y2="15" stroke="red"/>
                    {circles}
                </svg>
            </div>
            <div className="timeline-card row">
                {citations[currentCircle]}
            </div>
        </div>
    );
}

export default Timeline;