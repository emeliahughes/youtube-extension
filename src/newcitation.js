import React, {useState } from 'react';
import Yite from './Yite';
import Button from 'react-bootstrap/Button';

const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const postUrl = baseUrl + "createCitation";

function AddNewCitation (props) {
    let videoCitations = props.videoCitations;
    let videoID = props.videoID;
    let currentTime = 0;

    React.useEffect(() => {
        let video = document.querySelector("#movie_player > div.html5-video-container > video");
        const videoLength = Math.floor(video.duration);
        video.addEventListener('onloadedmetadata', function() {
            if (isNan(video.duration)) {
                // Duration is NaN before metadata is loaded.
                return;
            }
            currentTime = Math.floor(video.currentTime);
            if (videoLength - 10 >= currentTime) {
                setStartTimeValue(currentTime);
                setEndTimeValue(currentTime + 10);
            } else if (videoLength >= currentTime) {
                setStartTimeValue(currentTime);
                setEndTimeValue(videoLength);
            } else {
                setStartTimeValue(videoLength);
                setEndTimeValue(videoLength);
            }
        }), []
        // TODO: unhook?
    });

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

    const [inputStartTimeValue, setStartTimeValue] = useState(currentTime);

    const handleStartTime = (event) => {
        let newValue = event.target.value
        setStartTimeValue(newValue);
    }

    const [inputEndTimeValue, setEndTimeValue] = useState('');

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
        let newYite = new Yite(videoID, inputStartTimeValue, inputEndTimeValue, inputTitleValue, inputSourceValue, inputAuthorValue, inputLinkValue, inputCiteTypeValue);
        
        pushData(newYite);
        let newStart = newYite.start;
        if(!videoCitations.has(newStart)) {
            videoCitations.set(newStart, []);
        }
        videoCitations.get(newStart).push(newYite);

        //reset box values (I think this should also close the box when we get here)
        setTitleValue("");
        setSourceValue("");
        setLinkValue("");
        //setStartTimeValue("");
        //setEndTimeValue("");

    }
    return (
        <span className="new-citation">
            <form onSubmit={handleSubmit}>
                <div className="form-around">
                    <h2 className='justify-content-center'>Add a New Citation</h2>
                    <div className='row'>
                        <label htmlFor="title_field" className="main-labels col-3"><h4>Source Title:</h4></label>
                        <input type="text" 
                            onChange={handleTitle} 
                            value={inputTitleValue} 
                            className="form-control col" id="title_field" name="title" required/>
                    </div>
                    <div className='row'>
                        <label htmlFor="source_field" className="main-labels col-3"><h4>Source:</h4></label>
                        <input type="text" 
                            onChange={handleSource} 
                            value={inputSourceValue} 
                            className="form-control col" id="source_field" name="source" required/>
                    </div>
                    <div className='row'>
                        <label htmlFor="link_field" className="main-labels col-3"><h4>Link:</h4></label>
                        <input type="text" 
                            onChange={handleLink} 
                            value={inputLinkValue} 
                            className="form-control col" id="link_field" name="link" required/>
                    </div>
                    <div className='row'>
                        <label htmlFor="author_field" className="main-labels col-3"><h4>Author:</h4></label>
                        <input type="text" 
                            onChange={handleAuthor} 
                            value={inputAuthorValue} 
                            className="form-control col" id="author_field" name="author" required/>
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

export default AddNewCitation;