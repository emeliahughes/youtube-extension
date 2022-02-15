'use strict';
import React, { useState } from 'react';
import AddNewCitation from './newcitation';
import ViewCitations from './viewCitation';
import AddCitationViewer from './AddCitationViewer';
import { Timeline } from './Timeline';

function App(props){

    const [showAddCitations, setShowAddCitations] = useState(false);

    //const maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;
    let videoCitations = props.videoCitations;
    let videoID = props.videoID;

    // Sort each citation by start time
    videoCitations = new Map([...videoCitations.entries()].sort((a, b) => {
        return convertTimeToSeconds(a[0]) - convertTimeToSeconds(b[0])
    }))

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
    
    return (
        <div className="citation-box">
            <div className="header">
                <h1>Citations</h1>
                <AddCitationViewer
                    color={showAddCitations ? "red" : "green"}
                    text={showAddCitations ? "Cancel" : "Add New Citation"}
                    onClick={() => {setShowAddCitations(!showAddCitations);}}
                />
            </div>
            <div className="main-view-box">
                <ViewCitations videoCitations={videoCitations}/>
                {showAddCitations ? <AddNewCitation videoCitations={videoCitations} videoID={videoID}/> : ""}
            </div>
        </div>
    )
}

export default App;