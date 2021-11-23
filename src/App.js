'use strict';
import React, { useState } from 'react';
import AddNewCitation from './newcitation';
import ViewCitations from './viewCitation';
import CitationViewer from './CitationViewer';

function App(props){

    const [showAddCitations, setShowAddCitations] = useState(false);

    //const maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;
    let videoCitations = props.videoCitations;
    let videoID = props.videoID;
    
    return (
        <div className="citation-box">
            <div className="header">
                <h1>Citations</h1>
            </div>
            <div className="main-view-box">
                {/* add slider here and citation viewer */}
                <CitationViewer
                    color={showAddCitations ? "red" : "green"}
                    text={showAddCitations ? "Cancel" : "Add New Citation"}
                    onClick={() => {setShowAddCitations(!showAddCitations);}}
                />
                <ViewCitations videoCitations={videoCitations}/>
                {showAddCitations ? <AddNewCitation videoCitations={videoCitations} videoID={videoID}/> : ""}
                {/* <Citation citation={testCitation}/> */}
            </div>
        </div>
    )
}

export default App;