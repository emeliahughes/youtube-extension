'use strict';
import React from 'react';
import AddNewCitation from './newcitation';
import Yite from './Yite';

const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const postUrl = baseUrl + "insertVideoData";
const getUrl = baseUrl + "getTimeStamps?id=";

function App(){
    let maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;

    // Each YouTube video has a unique ID, videoID.
    const videoID = document.querySelector("#watch7-content > meta:nth-child(6)").content;

    console.log(videoID);

    // We make a GET call to the getUrl to get the citation data for this particular video.
    let responseData = getData(videoID, getUrl);

    // If the video doesn't exist in the database, we make a new map.
    // videoCitations is organized by start time, such that key: starttime(int) -> value: citations(array of citations)
    let videoCitations = new Map();
    if (responseData.length > 0) {
        videoCitations = JSON.parse(responseData);
    }

    // ********* Creating a new citation ******************
    let newTestCitation = new Yite("0:05", "0:15", "hello", "world", "harry potter", "www.youtube.com");
    if(!videoCitations.has(newTestCitation.startTime)) {
        videoCitations.set(newTestCitation.startTime, []);
    }
    videoCitations.get(newTestCitation.startTime).push(newTestCitation)
    // Push updates to database.
    // TODO: Once there is a more well-defined insertion process, we can change this so it pushes every couple (maybe 5?) citations.
    pushData(videoCitations, videoID);
    // ******************************************************

    return (
        <div className="citation-box">
            <div class="header">
                <h1>"Citations"</h1>
            </div>
            <div class="citation-viewer">
                {/* add slider here and citation viewer */}
                <AddNewCitation />
            </div>
        </div>
    )
}

/**
 * Makes a GET request to get the data for a particular video.
 * @param {string} videoID unique ID of the video
 * @returns all data for a video
 */
function getData(videoID) {
    let data = [];
    let requestUrl = getUrl + videoID;
    let promise = fetch(requestUrl);
    promise
    .then((resp) => (resp.json()))
    .then(result => {data = result;})
    .catch(err => console.log(err));
    return data;
}

/**
 * Makes a POST request to update data for a particular video.
 * @param {*} citations citations to be inserted
 * @param {*} videoID unique ID of the video
 */
function pushData(citations, videoID) {
    let insertCitation = {"id": videoID, "citations": citations};
    let promise = fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(insertCitation),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    promise
    .catch(err => console.log(err));
}

export default App;