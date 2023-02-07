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
                    let newYite = new Yite(
                                            videoID,
                                            formatTime(inputStartTimeValue), 
                                            formatTime(inputEndTimeValue), 
                                            result.title, 
                                            result.siteName, 
                                            result.siteType, 
                                            result.description, 
                                            inputLinkValue, 
                                            inputCiteTypeValue
                                        );
                
                    pushData(newYite);
                    let newStart = newYite.start;
                    if(!videoCitations.has(newStart)) {
                        videoCitations.set(newStart, []);
                    }
                    videoCitations.get(newStart).push(newYite);
                    props.setVideoYites(videoCitations);
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
        <span className="new-citation row-12 w-100">
            <form onSubmit={handleSubmit}>
                <div className="form-around">
                    <h2 className='row justify-content-center w-100 m-3'>Add a New Citation</h2>
                    <div className='row form-group form-group-lg d-flex align-items-center"'>
                        <div className='col-1'></div>
                        
                        <label htmlFor="link_field" className="main-labels col-1"><h3 className='pt-3'>Link:</h3></label>
                        <input type="text" 
                            onChange={handleLink} 
                            value={inputLinkValue} 
                            className="col-6 p-2" id="link_field" name="link" required/>

                        <label htmlFor="start_time_field" className="main-labels col"><h3 className='pt-3'>From: </h3></label>
                        <input type="text" 
                            onChange={handleStartTime} 
                            value={inputStartTimeValue} 
                            className="col p-2" id="start_time_field" name="start_time" required/>

                        <label htmlFor="end_time_field" className="main-labels col"><h3 className='pt-3'> To: </h3></label>
                        <input type="text" 
                            onChange={handleEndTime} 
                            value={inputEndTimeValue} 
                            className="col p-2" id="end_time_field" name="end_time" required/>

                        <div className='col-1'></div>
                    </div>
                    <div className='form-group row w-100 p-3 pb-0'>
                        <div className='col-1'></div>
                        <label htmlFor="type_field" className="main-labels col-2 col-form-label p-2"><h3>Citation Type:</h3></label>
                        <div className='col'>
                            <div className='row mb-n2 p-0'>
                                <input type="checkbox" id="flag" name="citeType" value="flag" onChange={handleCiteType}/>
                                <label htmlFor="neither" className='p-2 justify-content-center col-form-label'>
                                    <h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-3 bi bi-flag-fill" viewBox="0 0 16 16">
                                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                                        </svg>
                                        This source disproves the information in the video.
                                    </h3>
                                </label>
                            </div>
                            <div className='row mb-n2 p-0'>
                                <input type="checkbox" id="info" name="citeType" value="info" onChange={handleCiteType}/>
                                <label htmlFor="affirm" className='p-2 justify-content-center col-form-label'>
                                    <h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-3 bi bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                        This source gives further information on the information in the video.
                                    </h3>
                                </label>
                            </div>
                            <div className='row mb-n2 p-0'>
                                <input type="checkbox" id="source" name="citeType" value="source" onChange={handleCiteType}/>
                                <label htmlFor="refute" className='p-2 justify-content-center col-form-label'>
                                    <h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-3 bi bi-book" viewBox="0 0 16 16">
                                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                        </svg>
                                        This source cites the information in the video.
                                    </h3>
                                </label>
                            </div>
                        </div>
                    <div className='col-1'></div>
                    </div>
                    <div className="flex-container justify-content-center row w-100 my-0">
                        <button type="submit" className="btn btn-secondary text-white rounded-lg p-15" id="submit-button"><h3 className='m-2'><strong aria-label="save entry">Add</strong></h3></button>
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
 * Formats time to follow a standard format (removes leading 0s) E.g:
 * 00:02:32 -> 2:32
 * 
 * @param {*} time 
 * @returns 
 */
function formatTime(time) {
    // Trims unnecessary hour time format away
    if (time.length == 8) {
        if (time.startsWith("00:")) {
            time = time.substring(3);
        } else if (time.startsWith("0")) {
            time = time.substring(1);
        }
    }

    // Trims unnecessary leading 0 for single digit minute
    if (time.startsWith("0")) {
        time = time.substring(1);
    }

    return time;
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