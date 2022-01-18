import React, {useState } from 'react';
import Yite from './Yite';

const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const postUrl = baseUrl + "createCitation";

function AddNewCitation (props) {
    let videoCitations = props.videoCitations;
    let videoID = props.videoID;
    let currentTime = 0;

    React.useEffect(() => {
        let video = document.querySelector("#movie_player > div.html5-video-container > video");
        const videoLength = Math.floor(video.duration);
        video.addEventListener('timeupdate', function() {
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

    //submit event handler 

    const handleSubmit = (event) => {
        event.preventDefault();
        let newYite = new Yite(videoID, inputStartTimeValue, inputEndTimeValue, inputTitleValue, inputSourceValue, inputAuthorValue, inputLinkValue);
        
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
        setStartTimeValue("");
        setEndTimeValue("");

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
                                <label htmlFor="end_time_field" className="main-labels"><h3 className="small"> To: </h3></label>
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