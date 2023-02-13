import React, {useState } from 'react';
import Yite from './Yite';
import Button from 'react-bootstrap/Button';
import timeToSeconds from './timeToSeconds';
import { start } from '@popperjs/core';
import { setCommentRange } from 'typescript';

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

    let flag = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-3 bi bi-flag-fill" viewBox="0 0 16 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                </svg>);

    let iCircle = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-3 bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>);

    let book = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-3 bi bi-book" viewBox="0 0 16 16">
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>);

    /* auto fill time with where the video is currently at */
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

    /* initialize input fields */

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

    const [inputComment, setComment] = useState('')

    const handleComment = (event) => {
        let newValue = event.target.value;
        setComment(newValue);
    }

    //submit event handler 

    let submitBtnClass = (
        <button type="submit" className="btn btn-secondary text-white rounded-lg p-15" id="submit-button"><h3 className='m-2'><strong aria-label="save entry">Add</strong></h3></button>
    );
    let successBtnClass = (
        <button type="submit" className="btn btn-success disabled rounded-lg p-15" id="submit-button"><h3 className='m-2'><strong aria-label="save entry">Citation Added!</strong></h3></button>
    );

    const [addButton, setAddButton] = useState(submitBtnClass);

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
                                            result.image,
                                            result.description, 
                                            inputLinkValue, 
                                            inputCiteTypeValue,
                                            inputComment
                                        );
                
                    pushData(newYite);
                    let newStart = newYite.start;
                    if(!videoCitations.has(newStart)) {
                        videoCitations.set(newStart, []);
                    }
                    videoCitations.get(newStart).push(newYite);
                    props.setVideoYites(videoCitations);
                });

                // Success confirmation
                setAddButton(successBtnClass);
                await sleep(2000);
                //reset box values (I think this should also close the box when we get here)
                setLinkValue("");
                setAddButton(submitBtnClass);        
                //setStartTimeValue("");
                //setEndTimeValue("");

                exitAddView();
            } else {
                setTimeout(resetValidity, 3500);
            }
        } else {
            alert("Please enter your userID");
        }

        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms)); 
        }
        async function sleep(ms) {
            await timeout(ms);
            return;
        }
    }

    return (
        <span className="new-citation row-12 w-100">
            <form onSubmit={handleSubmit}>
                <div className="form-around">
                    <div className="title-row row d-flex justify-content-center">
                        <h2 className="m-2 p-2">Add a New Citation</h2>
                    </div>
                    <div className="form-row row m-0">
                        <div className="form-col-1 col-4">
                            <div className="form-link-input form-group px-4">
                                <div className="row mx-0">
                                    <label htmlFor="link_field"><h3 className='pt-3'>Link:</h3></label>
                                </div>
                                <div className="row mx-0">
                                    <input type="text" 
                                        onChange={handleLink} 
                                        value={inputLinkValue} 
                                        className="p-2 w-100" 
                                        id="link_field" 
                                        name="link" 
                                        required/>
                                </div>
                            </div>
                            <div className="form-time-input form-group">
                                <div className="row mx-0">
                                    <label htmlFor="time_input" className="main-labels col"><h3 className='pt-3'>Time span:</h3></label>
                                </div>
                                <div className="row form-group mx-0 w-100" id="time_input">
                                    <div className="col-5">
                                        <input type="text" 
                                            onChange={handleStartTime} 
                                            value={inputStartTimeValue} 
                                            className="p-2 text-center w-100" 
                                            id="start_time_field" 
                                            name="start_time" 
                                            required/>
                                    </div>
                                    <div className="col-2 d-flex justify-content-center">
                                        <h4 className="font-italic w-100 mb-0 d-flex justify-content-center align-items-center">to</h4>
                                    </div>
                                    <div className="col-5">
                                        <input type="text" 
                                            onChange={handleEndTime} 
                                            value={inputEndTimeValue} 
                                            className="p-2 text-center w-100"
                                            id="end_time_field"
                                            name="end_time"
                                            required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-col-2 col-4">
                            <div className="form-type-input form-group">
                                <div className="row mx-0">
                                    <label htmlFor="type_field" className="p-2"><h3>Citation Type:</h3></label>
                                </div>
                                <div id="type_field">
                                    <div className="row form-check mx-0">
                                        <input type="checkbox" 
                                            id="affirm" 
                                            name="citeType" 
                                            value="flag" 
                                            onChange={handleCiteType}/>

                                        <label htmlFor="affirm" className='p-2 mb-0'>
                                            <h4 className='p-0 m-0'>{book} Supports the claim</h4>
                                        </label>
                                    </div>
                                    <div className="row form-check mx-0">
                                        <input type="checkbox" 
                                            id="refute" 
                                            name="citeType" 
                                            value="info" 
                                            onChange={handleCiteType}/>
                                        
                                        <label htmlFor="refute" className='p-2 mb-0'>
                                            <h4 className='p-0 m-0'>{flag} Refutes the claim</h4>
                                        </label>
                                    </div>
                                    <div className="row form-check mx-0">
                                        <input type="checkbox" 
                                            id="other" 
                                            name="citeType" 
                                            value="source" 
                                            onChange={handleCiteType}/>
                                        
                                        <label htmlFor="other" className='p-2 mb-0'>
                                            <h4 className='p-0 m-0'>{iCircle} Other</h4>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-col-3 col-4">
                            <div className="form-comment-input form-group">
                                <div className="row mx-0">
                                    <label htmlFor="form_comments" className='p-2'><h3>Comments:</h3></label>
                                </div>
                                <div className="row mx-0">
                                    <textarea className="form-control p-2" 
                                        id="form_comments" 
                                        rows="5"
                                        onChange={handleComment}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="submit-row row d-flex justify-content-center">{addButton}</div>
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