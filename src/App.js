'use strict';
import React, { useState } from 'react';
import AddCitationViewer from './AddCitationViewer';
import AddNewCitation from './newcitation';
import ViewCitations from './viewCitation';

function App(props){

    console.log("in the app thing");
    //const maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;
    let videoCitations = props.videoCitations;
    let videoID = props.videoID;
    let mainColClasses = "main-col add-citation-inactive";
    let addColClasses = "add-col add-citation-inactive";

    const [showAddCitations, setShowAddCitations] = useState(true);

    const handleAddCitations = (event) => {
        setShowAddCitations(!showAddCitations);
    }
    
    if(showAddCitations) {
        mainColClasses = "main-col add-citation-active";
        addColClasses = "add-col add-citation-active";
    } else {
        mainColClasses = "main-col add-citation-inactive";
        addColClasses = "add-col add-citation-inactive";
    }
    

    return (
        <div className="citation-box">
            <div className="header">
                <h1>Citations</h1>
                <AddCitationViewer
                    color={showAddCitations ? "red" : "green"}
                    text={showAddCitations ? "Cancel" : "Add New Citation"}
                    onClick={handleAddCitations}
                />
            </div>
            <div className="main-view-box">
                <div className={mainColClasses}>
                    <ViewCitations videoCitations={videoCitations}/>
                </div>
                <div className={addColClasses}>
                    <AddNewCitation videoCitations={videoCitations} videoID={videoID}/>
                </div>
            </div>
        </div>
    )
}

export default App;