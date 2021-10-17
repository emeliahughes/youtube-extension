import React, {useState } from 'react';

//TODO: error handling for times out of bounds, update to add citation to database

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

        let newCitation = {
            title: inputTitleValue,
            source: inputSourceValue,
            startTime: inputStartTimeValue,
            endTime: inputEndTimeValue,
        }
        
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
                        <label for="title_field" className="main-labels"><h3 className="small">Source Title:</h3></label>
                        <input type="text" 
                            onChange={handleTitle} 
                            value={inputTitleValue} 
                            className="form-control" id="title_field" name="title" required/>
                    </div>
                    <div>
                        <label for="source_field" className="main-labels"><h3 className="small">Source:</h3></label>
                        <input type="text" 
                            onChange={handleSource} 
                            value={inputSourceValue} 
                            className="form-control" id="source_field" name="source" required/>
                    </div>
                    <div>
                        <label for="link_field" className="main-labels"><h3 className="small">Link:</h3></label>
                        <input type="text" 
                            onChange={handleLink} 
                            value={inputLinkValue} 
                            className="form-control" id="link_field" name="link" required/>
                    </div>
                    <div className="row">
                        <div>
                            <div>
                                <label for="start_time_field" className="main-labels"><h3 className="small">From: </h3></label>
                                <input type="time" 
                                    onChange={handleStartTime} 
                                    value={inputStartTimeValue} 
                                    className="form-control" id="start_time_field" name="start_time" required/>
                            </div>
                            <div>
                                <label for="end_time_field" className="main-labels"><h3 className="small"> to </h3></label>
                                <input type="time" 
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

export default AddNewCitation;