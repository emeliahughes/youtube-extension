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
    videoCitations = new Map([...videoCitations.entries()].sort());
    let videoID = props.videoID;
    let chevronUp = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>);

    let chevronDown = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>);
    
    const [isShowing, setShowing] = useState(false);
    const [showingButton, setShowingButton] = useState(chevronUp);
    const [mainViewClasses, setMainViewClasses] = useState("main-view-box mx-0 row w-100 p-3 border border-top-0 rounded-bottom border-dark bg-light text-body")

    const [currentView, setCurrentView] = useState(<Timeline videoCitations={videoCitations}/>);
    const [addViewClasses, setAddViewClasses] = useState("nav-link border-0 text-white bg-dark rounded-circle font-weight-bolder");
    const [timelineViewClasses, setTimelineViewClasses] = useState("nav-link active font-weight-bolder");
    const [listViewClasses, setListViewClasses] = useState("nav-link text-white bg-dark font-weight-bolder");
    
    const handleShowing = (event) => {
        setShowing(!isShowing)

        if(!isShowing){
            setAddViewClasses("d-none");
            setTimelineViewClasses("d-none");
            setListViewClasses("d-none");
            setMainViewClasses("d-none");
            setShowingButton(chevronDown);
        } else {
            setMainViewClasses("main-view-box mx-0 row w-100 p-3 border border-top-0 rounded-bottom border-dark bg-light text-body");
            setAddViewClasses("nav-link border-0 text-white bg-dark rounded-circle font-weight-bolder");
            setTimelineViewClasses("nav-link active font-weight-bolder");
            setListViewClasses("nav-link text-white bg-dark font-weight-bolder");
            setCurrentView(<Timeline videoCitations={videoCitations}/>);
            setShowingButton(chevronUp);
        }
    }

    const handleListView = (event) => {
        setAddViewClasses("nav-link border-0 text-white bg-dark rounded-circle font-weight-bolder");
        setTimelineViewClasses("nav-link text-white bg-dark font-weight-bolder");
        setListViewClasses("nav-link active font-weight-bolder");
        setCurrentView(<ViewCitations videoCitations={videoCitations}/>);
    }

    const handleTimelineView = (event) => {
        setAddViewClasses("nav-link border-0 text-white bg-dark rounded-circle font-weight-bolder");
        setTimelineViewClasses("nav-link active font-weight-bolder");
        setListViewClasses("nav-link text-white bg-dark font-weight-bolder");
        setCurrentView(<Timeline videoCitations={videoCitations}/>);
    }

    const handleAddView = (event) => {
        if(currentView == (<AddNewCitation videoCitations={videoCitations} videoID={videoID} exitAddView={handleTimelineView}/>)) {
            handleListView;
        } else {
            setAddViewClasses("nav-link active bg-light text-dark border-0 rounded-circle font-weight-bolder");
            setTimelineViewClasses("nav-link text-white bg-dark font-weight-bolder");
            setListViewClasses("nav-link text-white bg-dark font-weight-bolder");
            setCurrentView(<AddNewCitation videoCitations={videoCitations} videoID={videoID} exitAddView={handleTimelineView}/>);
        }
    }

    return (
        <div className="citation-box container bootstrap-inside m-5 p-3 mt-5 mr-5 w-100 rounded-lg justify-content-center">
            <div className="header w-100 row mx-0 px-3 pt-3 pb-0 border border-secondary rounded-top bg-secondary">
                <div className="col-6">
                    <div className="row d-flex align-items-center mb-2">
                        <h1 className='text-light'>Citations</h1>
                        <ul className="nav nav-pills rounded-circle ml-2">
                            <li className='nav-item m-1' onClick={handleAddView}>
                                <button className={addViewClasses}><h2 className="p-0 m-0">+</h2></button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col mb-0 pb-0  d-flex align-items-end  justify-content-end'>
                    <ul className="nav nav-tabs border border-dark border-bottom-0">
                        <li className='nav-item' onClick={handleTimelineView}>
                            <button className={timelineViewClasses}><h3>Timeline View</h3></button>
                        </li>
                        <li className='nav-item' onClick={handleListView}>
                            <button className={listViewClasses}><h3>List View</h3></button>
                        </li>
                    </ul>
                </div>
                <div className='col-auto pl-2 pr-2 mb-2 d-flex align-items-center justify-content-end'>
                    <button className="btn btn-light rounded-circle p-2" onClick={handleShowing}><h2 className="p-0 m-0 d-flex align-items-center">{showingButton}</h2></button>
                </div>
            </div>
            <div className={mainViewClasses}>
                <div className='ml-4 mr-4 w-100 h-100'>
                    {currentView}
                </div>
            </div>
        </div>
    )
}

export default App;