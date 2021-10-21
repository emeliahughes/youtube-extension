import React, {useState } from 'react';
import Yite from './Yite';

//TODO: error handling for times out of bounds, update to add citation to database
const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const postUrl = baseUrl + "insertVideoData";
const getUrl = baseUrl + "getTimeStamps?id=";

const videoID = document.querySelector("#watch7-content > meta:nth-child(6)").content;
let responseData = getData(videoID, getUrl);
let videoCitations = new Map();
if (responseData.length > 0) {
    videoCitations = JSON.parse(responseData);
}

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

    const [inputStartTimeValue, setStartTimeValue] = useState('0:00');

    const handleStartTime = (event) => {
        let newValue = event.target.value
        setStartTimeValue(newValue);
    }

    const [inputEndTimeValue, setEndTimeValue] = useState('0:00');

    const handleEndTime = (event) => {
        let newValue = event.target.value
        setEndTimeValue(newValue);
    }

    //submit event handler 

    const handleSubmit = (event) => {
        event.preventDefault();

        let newYite = new Yite(inputStartTimeValue, inputEndTimeValue, inputTitleValue, inputSourceValue, "author", "link");
        if(!videoCitations.has(inputStartTimeValue,)) {
            videoCitations.set(inputStartTimeValue, []);
        }
        videoCitations.get(inputStartTimeValue,).push(newYite);
        pushData(videoCitations, videoID);
        
        //ADD NEW CITATION TO DATABASE HERE
        //this is how I did it in firebase, it should be pretty similar
        //firebase.database().ref('users').child(props.currentUserID).push(newEntryObj);

        //reset box values (I think this should also close the box when we get here)
        setTitleValue("");
        setSourceValue("");
        setLinkValue("");
        setStartTimeValue('0:00');
        setEndTimeValue('0:00');

    }

    return (
        <div className="new-citation">
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
    let insertCitation = {"id": videoID, "citations": JSON.stringify(Object.fromEntries(citations))};
    console.log(insertCitation);
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