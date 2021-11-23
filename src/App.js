'use strict';
import React, { useState } from 'react';
import AddNewCitation from './newcitation';
import ViewCitations from './viewCitation';
import AddCitationViewer from './AddCitationViewer';

function App(props){

    const [showAddCitations, setShowAddCitations] = useState(false);

    //const maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;
    let videoCitations = props.videoCitations;
    let videoID = props.videoID;
    
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