import React, {useState } from 'react';
import Yite from './Yite';
import Button from 'react-bootstrap/Button';

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

    const handleSubmit = (event) => {
        event.preventDefault();

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