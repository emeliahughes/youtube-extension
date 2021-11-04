'use strict';
import React from 'react';
//import AddNewCitation from './newcitation';
//import ViewCitations from './viewCitation';
import Yite from './Yite';

//const baseUrl = "https://youtubeextdata.azurewebsites.net/";
//const postUrl = baseUrl + "insertVideoData";
//const getUrl = baseUrl + "getTimeStamps?id=";

function App(){
    // Each YouTube video has a unique ID, videoID.
    // const baseUrl = "https://youtubeextdata.azurewebsites.net/";
    // const postUrl = baseUrl + "insertVideoData";
    // const getUrl = baseUrl + "getTimeStamps?id=";

    const videoID = document.querySelector("#watch7-content > meta:nth-child(6)").content;
    const maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;
    // let videoCitations;
    // let displayCitations;

    // let responseDataPromise = getData(videoID)
    //     .then(resp => {
    //         console.log(resp);
    //         if (resp.length > 0) {
    //             let responseData = JSON.parse(resp);
    //             videoCitations = JSON.parse(responseData['citations']);
    //             console.log(videoCitations);
    //             displayCitations = "";
    //             for (let i = 0 ; i < videoCitations.length; i++) {
    //                 displayCitations += "source number " + (i + 1);
    //                 displayCitations += "title: " + videoCitations[i]['title'] + "\n";
    //                 displayCitations += "start: " + videoCitations[i]['startTime'] + "\n";
    //                 displayCitations += "end: " + videoCitations[i]['endTime'] + "\n";
    //                 displayCitations += "\n";
    //             }
    //         } else {
    //             videoCitations = new Map();
    //         }
    //     })
    //     .catch(err => console.log(err));


    // If the video doesn't exist in the database, we make a new map.
    // videoCitations is organized by start time, such that key: starttime(int) -> value: citations(array of citations)
    /*if (responseData.length > 0) {
        videoCitations = JSON.parse(responseData);
        console.log(videoCitations);
    }*/
    let testCitation = new Yite(15, 25, "test title", "test source", "test author", "www.google.com")

    return (
        <div className="citation-box">
            <div className="header">
                <h1>Citations</h1>
            </div>
            <div className="citation-viewer">
                {/* add slider here and citation viewer */}
                {/* <ViewCitations videoCitations={videoCitations}/>
                <AddNewCitation videoCitations={videoCitations}/> */}
                <Citation citation={testCitation}/>
            </div>
        </div>
    )
}

function Citation(props) {
    let citation = props.citation;
    let title = citation.title;
    let source = citation.source;
    let link = citation.link;
    let author = citation.author;
    let startTime = citation.startTime;
    let endTime = citation.endTime;

    return(
        <div className="citation-block">
            <h2 className="citation-title">{title}</h2>
            <a href={link} className="citation-source">{source}</a>
            <h3 className="citation-author">{author}</h3>
            <p className="citation-time-text">from {startTime} to {endTime} </p>
        </div>
    )
}

/**
 * Makes a GET request to get the data for a particular video.
 * @param {string} videoID unique ID of the video
 * @returns a Promise for all video data
 */
// function getData(videoID) {
//     let requestUrl = getUrl + videoID;
//     return fetch(requestUrl, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {return response.json();})
//     .catch(err => console.log(err));
// }

export default App;