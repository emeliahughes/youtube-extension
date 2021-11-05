'use strict';
import React from 'react';
import AddNewCitation from './newcitation';

const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const postUrl = baseUrl + "createCitation";
const getUrl = baseUrl + "getCitations?videoID=";

function App(){
    // Each YouTube video has a unique ID, videoID.
    const videoID = document.querySelector("#watch7-content > meta:nth-child(6)").content;

    // If the video doesn't exist in the database, we make a new map.
    // videoCitations is organized by start time, such that key: starttime(int) -> value: citations(array of citations)
    /*if (responseData.length > 0) {
        videoCitations = JSON.parse(responseData);
        console.log(videoCitations);
    }*/

    return (
        <div className="citation-box">
            <div className="header">
                <h1>"Citations"</h1>
            </div>
            <div className="citation-viewer">
                {/* add slider here and citation viewer */}
                <AddNewCitation />
            </div>
        </div>
    )
}

export default App;