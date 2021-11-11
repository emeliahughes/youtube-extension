'use strict';
import React, { useState } from 'react';
import AddNewCitation from './newcitation';
import ViewCitations from './viewCitation';
import Yite from './Yite';

function App(props){
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
                <ViewCitations videoCitations={videoCitations}/>
                {<AddNewCitation videoCitations={videoCitations} videoID={videoID}/>}
                {/* <Citation citation={testCitation}/> */}
            </div>
        </div>
    )
}

export default App;