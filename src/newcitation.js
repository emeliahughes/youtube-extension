import React, {useState } from 'react';
import Yite from './Yite';
import Button from 'react-bootstrap/Button';
import timeToSeconds from './timeToSeconds';
import { start } from '@popperjs/core';

const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const postUrl = baseUrl + "createCitation";

function AddNewCitation (props) {
    let videoCitations = props.videoCitations;
    let videoID = props.videoID;
    let exitAddView = props.exitAddView;
    let video = document.querySelector("#movie_player > div.html5-video-container > video");
    let currentTime = Math.floor(video.currentTime);
    const videoLength = Math.floor(video.duration);
    let endTime = Math.floor(video.currentTime + 10);

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = currentTime % 60;

    if(currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }

    let endMinutes = Math.floor(endTime / 60);
    let endSeconds = endTime % 60;

    if(endSeconds < 10) {
        endSeconds = "0" + endSeconds;
    }

    currentTime = currentMinutes + ":" + currentSeconds;
    endTime = endMinutes + ":" + endSeconds;

    if (videoLength - 10 <= currentTime) {
        endTime = videoLength;
    }

    const [inputLinkValue, setLinkValue] = useState('');

    const handleLink = (event) => {
        let newValue = event.target.value
        setLinkValue(newValue);
    }

    const [inputStartTimeValue, setStartTimeValue] = useState(currentTime);

    const handleStartTime = (event) => {
        let newValue = event.target.value
        setStartTimeValue(newValue);
    }

    const [inputEndTimeValue, setEndTimeValue] = useState(endTime);

    const handleEndTime = (event) => {
        let newValue = event.target.value
        setEndTimeValue(newValue);
    }

    const [inputCiteTypeValue, setCiteTypeValue] = useState('');

    const handleCiteType = (event) => {
        let newValue = event.target.value
        setCiteTypeValue(newValue);
    }

    //submit event handler 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (await validateUserID()) {
            if (validateTimeFormat(inputStartTimeValue, inputEndTimeValue) && validateTimes(inputStartTimeValue, inputEndTimeValue, videoLength)) {
                let urlData = getPageMetadata(inputLinkValue).then((result) => {
                    console.log(result);
                    let newYite = new Yite(videoID, inputStartTimeValue, inputEndTimeValue, result.title, result.siteName, result.siteType, result.description, inputLinkValue, inputCiteTypeValue);
                
                    pushData(newYite);
                    let newStart = newYite.start;
                    if(!videoCitations.has(newStart)) {
                        videoCitations.set(newStart, []);
                    }
                    videoCitations.get(newStart).push(newYite);
                });

                //reset box values (I think this should also close the box when we get here)
                setLinkValue("");
                //setStartTimeValue("");
                //setEndTimeValue("");
                exitAddView();
            } else {
                setTimeout(resetValidity, 3500);
            }
        } else {
            alert("Please enter your userID");
        }
    }

    return (
        <span className="new-citation">
            <form onSubmit={handleSubmit}>
                <div className="form-around">
                    <h2 className='row justify-content-center w-100'>Add a New Citation</h2>
                    <div className='row'>
                        <div className='row w-100'>
                            <label htmlFor="link_field" className="main-labels col-3"><h4>Link:</h4></label>
                            <input type="text" 
                                onChange={handleLink} 
                                value={inputLinkValue} 
                                className="form-control col" id="link_field" name="link" required/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="row w-100">
                            <div className='col-6'>
                                <div className='row'>
                                    <label htmlFor="start_time_field" className="main-labels col-3"><h4>From: </h4></label>
                                    <input type="text" 
                                        onChange={handleStartTime} 
                                        value={inputStartTimeValue} 
                                        className="form-control col" id="start_time_field" name="start_time" required/>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    <label htmlFor="end_time_field" className="main-labels col-3"><h4> To: </h4></label>
                                    <input type="text" 
                                        onChange={handleEndTime} 
                                        value={inputEndTimeValue} 
                                        className="form-control col" id="end_time_field" name="end_time" required/>
                                </div>
                            </div>
                        </div>
                        <div className='form-group row w-100 p-3'>
                            <label htmlFor="type_field" className="main-labels col-4 col-form-label p-2"><h4>Citation Type:</h4></label>
                            <div className='col'>
                                <input type="radio" id="neither" name="citeType" value="neither" onChange={handleCiteType}/>
                                <label htmlFor="neither" className='p-2 justify-content-center col-form-label'>Neither</label>
                            </div>
                            <div className='col'>
                                <input type="radio" id="affirm" name="citeType" value="affirm" onChange={handleCiteType}/>
                                <label htmlFor="affirm" className='p-2 justify-content-center col-form-label'>Affirm</label>
                            </div>
                            <div className='col'>
                                <input type="radio" id="refute" name="citeType" value="refute" onChange={handleCiteType}/>
                                <label htmlFor="refute" className='p-2 justify-content-center col-form-label'>Refute</label>
                            </div>
                        </div>
                        <div className="flex-container justify-content-center row w-100">
                            <button type="submit" className="btn btn-secondary text-white rounded-lg mt-2 mb-2 p-15" id="submit-button"><em aria-label="save entry"><strong>Add</strong></em></button>
                        </div>
                    </div>
                </div>
            </form>
        </span>
    )
}

/**
 * Verifies the time values are within bounds
 * 
 * @param {*} startTime new citation start time (HH:MM:SS) or (MM:SS) or (M:SS)
 * @param {*} endTime new citation end time (HH:MM:SS) or (MM:SS) or (M:SS)
 * @param {*} videoDuration the length of the video in seconds
 * @returns true if times are within bounds, false if not
 */
function validateTimes(startTime, endTime, videoDuration) {
    const startInput = document.getElementById("start_time_field");
    const endInput = document.getElementById("end_time_field");

    let valid = true;
    startTime = timeToSeconds(startTime);
    endTime = timeToSeconds(endTime);
    startTime <= endTime && endTime <= videoDuration;
    
    if (startTime < 0) {
        startInput.setCustomValidity("Start time cannot be less than 0:00!");
        valid = false;
    } else if (endTime > videoDuration) {
        endInput.setCustomValidity("End time cannot be after the video!");
        valid = false;
    } else if (startTime > endTime) {
        startInput.setCustomValidity("Start time cannot be after the end time!");
        endInput.setCustomValidity("End time cannot be before the start time");
        valid = false;
    }

    startInput.reportValidity();
    endInput.reportValidity();

    return valid;
}

/**
 * Returns whether or not the user input a userID
 * 
 * @returns true iff user input a userID
 */
async function validateUserID() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get('userID', result => {
                if (! (result && result['userID'] && result['userID'] !== "") ) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        } catch (ex) {
            reject(ex);
        }
    })
}

/**
 * Verifies the user input valid time values
 * 
 * @param {*} startTime new citation start time (HH:MM:SS) or (MM:SS) or (M:SS)
 * @param {*} endTime new citation end time (HH:MM:SS) or (MM:SS) or (M:SS)
 * @returns true if time are valid, false if not
 */
function validateTimeFormat(startTime, endTime) {
    // regex for matching start and end time
    // supports video lengths 0:00 - 19:59:59
    // valid inputs:
    //      00:02:30
    //      09:59
    //      2:23
    const regex = /^(?:(?:[0-1])?[0-9]:)?((?:[0-5])?[0-9]:)([0-5][0-9])$/;
    const startInput = document.getElementById("start_time_field");
    const endInput = document.getElementById("end_time_field");
    let valid = true;

    if (!regex.test(startTime)) {
        startInput.setCustomValidity("Invalid start time");
        valid = false;
    }

    if (!regex.test(endTime)) {
        endInput.setCustomValidity("Invalid end time");
        valid = false;
    }

    startInput.reportValidity();
    endInput.reportValidity();

    return valid;
}

function resetValidity() {
    const startInput = document.getElementById("start_time_field");
    const endInput = document.getElementById("end_time_field");
    startInput.setCustomValidity("");
    endInput.setCustomValidity("");
    startInput.reportValidity();
    endInput.reportValidity();
}

/**
 * Makes a POST request to update data for a particular video.
 * @param {*} citations citations to be inserted
 */
function pushData(citation) {
    let insertCitation = JSON.stringify(citation);
    console.log(insertCitation);
    let promise = fetch(postUrl, {
        method: "POST",
        body: insertCitation,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    promise
    .then(
        resp => {
            let p = resp.text()
            p.then(res => {citation.id = res;})
        }
    )
    .catch(err => console.log(err));
}

async function getPageMetadata(url) {
    const param = encodeURIComponent(url);
    const res = await fetch("https://youtubeextdata.azurewebsites.net/getSrcInfo?url=" + param);
    const data = await res.json();
    return data;
}

    

export default AddNewCitation;