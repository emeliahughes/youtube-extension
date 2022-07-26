'use strict';
import React, { useState } from 'react';
import AddNewCitation from './newcitation';
import ViewCitations from './viewCitation';
import Timeline from './Timeline';
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
    const [addViewClasses, setAddViewClasses] = useState("nav-link bg-secondary text-white font-weight-bolder");
    const [timelineViewClasses, setTimelineViewClasses] = useState("nav-link bg-secondary text-white font-weight-bolder");
    const [listViewClasses, setListViewClasses] = useState("nav-link active font-weight-bolder bg-light");

    const handleListView = (event) => {
        setAddViewClasses("nav-link bg-secondary text-white font-weight-bolder");
        setTimelineViewClasses("nav-link bg-secondary text-white font-weight-bolder");
        setListViewClasses("nav-link active bg-light font-weight-bolder");
        setCurrentView(<ViewCitations videoCitations={videoCitations}/>);
    }

    const handleTimelineView = (event) => {
        setAddViewClasses("nav-link bg-secondary text-white font-weight-bolder");
        setTimelineViewClasses("nav-link active bg-light font-weight-bolder");
        setListViewClasses("nav-link bg-secondary text-white font-weight-bolder");
        setCurrentView(<Timeline videoCitations={videoCitations}/>);
    }

    const handleAddView = (event) => {
        setAddViewClasses("nav-link active bg-light font-weight-bolder");
        setTimelineViewClasses("nav-link bg-secondary text-white font-weight-bolder");
        setListViewClasses("nav-link bg-secondary text-white font-weight-bolder");
        setCurrentView(<AddNewCitation videoCitations={videoCitations} videoID={videoID}/>);

    }

    return (
        <div className="citation-box container bootstrap-inside m-5 p-3">
            <div className="header row px-3 pt-3 pb-0 border border-secondary bg-dark text-white">
                <div className="col">
                    <h1>Citations</h1>
                </div>
                <div className='col mb-0 pb-0  d-flex align-items-end  justify-content-end'>
                    <ul className="nav nav-tabs border border-dark border-bottom-0">
                        <li className='nav-item' onClick={handleTimelineView}>
                            <button className={timelineViewClasses}><h3>Timeline View</h3></button>
                        </li>
                        <li className='nav-item' onClick={handleListView}>
                            <button className={listViewClasses}><h3>List View</h3></button>
                        </li>
                        <li className='nav-item' onClick={handleAddView}>
                            <button className={addViewClasses}><h3>Add New Citation</h3></button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-view-box row p-3 border border-top-0 border-dark bg-light text-dark">
                <div className='ml-4 mr-4'>
                    {currentView}
                </div>
            </div>
        </div>
    )
}

export default App;