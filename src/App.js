'use strict';
import React, { useState } from 'react';
import AddNewCitation from './newcitation';
import ViewCitations from './viewCitation';
import './my_bootstrap.scss';
import './content.css';

function App(props){

    console.log("in the app thing");
    //const maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;
    let videoCitations = props.videoCitations;
    let videoID = props.videoID;
    let viewColClasses = "view-col";
    let addColClasses = "add-col add-citation-inactive";
    let timelineColClasses = "timeline-col";
    let buttonClasses = "btn";
    let buttonText = "Add New Citation";

    const [currentView, setCurrentView] = useState(<ViewCitations videoCitations={videoCitations}/>);
    const [addViewClasses, setAddViewClasses] = useState("nav-link");
    const [timelineViewClasses, setTimelineViewClasses] = useState("nav-link");
    const [listViewClasses, setListViewClasses] = useState("nav-link active");

    const handleListView = (event) => {
        setAddViewClasses("nav-link");
        setTimelineViewClasses("nav-link");
        setListViewClasses("nav-link active");
        setCurrentView(<ViewCitations videoCitations={videoCitations}/>);
    }

    const handleTimelineView = (event) => {
        setAddViewClasses("nav-link");
        setTimelineViewClasses("nav-link active");
        setListViewClasses("nav-link");
        setCurrentView("");
    }

    const handleAddView = (event) => {
        setAddViewClasses("nav-link active");
        setTimelineViewClasses("nav-link");
        setListViewClasses("nav-link");
        setCurrentView(<AddNewCitation videoCitations={videoCitations} videoID={videoID}/>);

    }

    return (
        <div className="citation-box container bootstrap-inside m-5 p-3">
            <div className="header row px-3 pt-3 pb-0">
                <div className="col">
                    <h1>Citations</h1>
                </div>
                <div className='col mb-0 pb-0  d-flex align-items-end  justify-content-end'>
                    <ul className="nav nav-tabs border-0">
                        <li className='nav-item' onClick={handleTimelineView}>
                            <button className={timelineViewClasses}>Timeline View</button>
                        </li>
                        <li className='nav-item' onClick={handleListView}>
                            <button className={listViewClasses}>List View</button>
                        </li>
                        <li className='nav-item' onClick={handleAddView}>
                            <button className={addViewClasses}>Add New Citation</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-view-box row p-3">
                <div className='ml-4 mr-4'>
                    {currentView}
                </div>
            </div>
        </div>
    )
}

export default App;