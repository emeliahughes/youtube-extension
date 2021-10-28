import React, {useState } from 'react';
import Yite from './Yite';

const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const postUrl = baseUrl + "insertVideoData";
const getUrl = baseUrl + "getTimeStamps?id=";

const videoID = document.querySelector("#watch7-content > meta:nth-child(6)").content;
const maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;
let videoCitations;
let displayCitations;

let responseDataPromise = getData(videoID)
    .then(resp => {
        console.log(resp);
        if (resp.length > 0) {
            let responseData = JSON.parse(resp);
            videoCitations = JSON.parse(responseData['citations']);
            console.log(videoCitations);
            displayCitations = "";
            for (let i = 0 ; i < videoCitations.length; i++) {
                displayCitations += "source number " + (i + 1);
                displayCitations += "title: " + videoCitations[i]['title'] + "\n";
                displayCitations += "start: " + videoCitations[i]['startTime'] + "\n";
                displayCitations += "end: " + videoCitations[i]['endTime'] + "\n";
                displayCitations += "\n";
            }
        } else {
            videoCitations = new Map();
        }
    })
    .catch(err => console.log(err));

function AddNewCitation (props) {

    const [inputTitleValue, setTitleValue] = useState('');

    const handleTitle = (event) => {
        let newValue = event.target.value
        setTitleValue(newValue);
    }

    const [inputSourceValue, setSourceValue] = useState('');

    const handleSource = (event) => {
        let newValue = event.target.value
        setSourceValue(newValue);
    }

    const [inputLinkValue, setLinkValue] = useState('');

    const handleLink = (event) => {
        let newValue = event.target.value
        setLinkValue(newValue);
    }

    const [inputAuthorValue, setAuthorValue] = useState('');

    const handleAuthor = (event) => {
        let newValue = event.target.value
        setAuthorValue(newValue);
    }

    const [inputStartTimeValue, setStartTimeValue] = useState('');

    const handleStartTime = (event) => {
        let newValue = event.target.value
        setStartTimeValue(newValue);
    }

    const [inputEndTimeValue, setEndTimeValue] = useState('');

    const handleEndTime = (event) => {
        let newValue = event.target.value
        setEndTimeValue(newValue);
    }

    //submit event handler 

    const handleSubmit = (event) => {
        event.preventDefault();
        let newYite = new Yite(inputStartTimeValue, inputEndTimeValue, inputTitleValue, inputSourceValue, inputAuthorValue, inputLinkValue);
        let startKey = newYite.startTime;
        if(!videoCitations.hasOwnProperty(startKey)) {
            videoCitations[startKey] = [];
        }
        videoCitations[startKey].push(newYite);
        pushData(videoCitations, videoID);
        
        //ADD NEW CITATION TO DATABASE HERE
        //this is how I did it in firebase, it should be pretty similar
        //firebase.database().ref('users').child(props.currentUserID).push(newEntryObj);

        //reset box values (I think this should also close the box when we get here)
        setTitleValue("");
        setSourceValue("");
        setLinkValue("");
        setStartTimeValue("");
        setEndTimeValue("");

    }
    return (
        <div className="new-citation">
            <div>
                {displayCitations}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-around">
                    <h2>Add a new citation:</h2>
                    <div>
                        <label htmlFor="title_field" className="main-labels"><h3 className="small">Source Title:</h3></label>
                        <input type="text" 
                            onChange={handleTitle} 
                            value={inputTitleValue} 
                            className="form-control" id="title_field" name="title" required/>
                    </div>
                    <div>
                        <label htmlFor="source_field" className="main-labels"><h3 className="small">Source:</h3></label>
                        <input type="text" 
                            onChange={handleSource} 
                            value={inputSourceValue} 
                            className="form-control" id="source_field" name="source" required/>
                    </div>
                    <div>
                        <label htmlFor="link_field" className="main-labels"><h3 className="small">Link:</h3></label>
                        <input type="text" 
                            onChange={handleLink} 
                            value={inputLinkValue} 
                            className="form-control" id="link_field" name="link" required/>
                    </div>
                    <div>
                        <label htmlFor="author_field" className="main-labels"><h3 className="small">Author:</h3></label>
                        <input type="text" 
                            onChange={handleAuthor} 
                            value={inputAuthorValue} 
                            className="form-control" id="author_field" name="author" required/>
                    </div>
                    <div className="row">
                        <div>
                            <div>
                                <label htmlFor="start_time_field" className="main-labels"><h3 className="small">From: </h3></label>
                                <input type="text" 
                                    onChange={handleStartTime} 
                                    value={inputStartTimeValue} 
                                    className="form-control" id="start_time_field" name="start_time" required/>
                            </div>
                            <div>
                                <label htmlFor="end_time_field" className="main-labels"><h3 className="small"> to </h3></label>
                                <input type="text" 
                                    onChange={handleEndTime} 
                                    value={inputEndTimeValue} 
                                    className="form-control" id="end_time_field" name="end_time" required/>
                            </div>
                        </div>
                        <div className="flex-container holdcenter">
                            <button type="submit" className="button" id="submit-button"><em aria-label="save entry"><strong>Add</strong></em></button>
                        </div>
                    </div>
                </div>
            </form>
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

/**
 * Makes a POST request to update data for a particular video.
 * @param {*} citations citations to be inserted
 * @param {*} videoID unique ID of the video
 */
function pushData(citations, videoID) {
    let insertCitation = {"id": videoID, "citations": JSON.stringify(citations)};
    console.log(JSON.stringify(insertCitation));
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

export default AddNewCitation;