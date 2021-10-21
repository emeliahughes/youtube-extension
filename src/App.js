'use strict';
import React from 'react';
import AddNewCitation from './newcitation';

const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const postUrl = baseUrl + "insertVideoData";
const getUrl = baseUrl + "getTimeStamps?id=";

function App(){
    let maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;

    // Each YouTube video has a unique ID, videoID.
    const videoID = document.querySelector("#watch7-content > meta:nth-child(6)").content;

//    console.log(videoID);

    // We make a GET call to the getUrl to get the citation data for this particular video.
    let responseDataPromise = getData(videoID, getUrl)
    .then(resp => {
        let responseData = JSON.parse(resp);
        /*if (responseData.length > 0) {
            console.log(responseData);
        }*/
        console.log(responseData);
    })

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

/**
 * Makes a GET request to get the data for a particular video.
 * @param {string} videoID unique ID of the video
 * @returns a Promise for all video data
 */
function getData(videoID) {
    let requestUrl = getUrl + videoID;
    return fetch(requestUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {return response.json();})
    .catch(err => console.log(err));
}

export default App;