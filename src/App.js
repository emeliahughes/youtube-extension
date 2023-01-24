'use strict';
import React, { useState } from 'react';
import AddNewCitation from './newcitation';
import ViewCitations from './viewCitation';
import Timeline from './Timeline';
import './my_bootstrap.scss';
import './content.css';

function App(props){
    if (props.videoCitations === null) return <p>Loading...</p>;

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
    
    let mainClasses = "main-view-box mx-0 row w-100 p-3 mb-1 bg-light text-body";

    const [isShowing, setShowing] = useState(false);
    const [showingButton, setShowingButton] = useState(chevronUp);
    const [mainViewClasses, setMainViewClasses] = useState(mainClasses)

    const [currentView, setCurrentView] = useState('timeline');
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
            setMainViewClasses(mainClasses);
            setAddViewClasses("nav-link border-0 text-white bg-dark rounded-circle font-weight-bolder");
            setTimelineViewClasses("nav-link active font-weight-bolder");
            setListViewClasses("nav-link text-white bg-dark font-weight-bolder");
            setCurrentView('timeline');
            setShowingButton(chevronUp);
        }
    }

    const handleListView = (event) => {
        setAddViewClasses("nav-link border-0 text-white bg-dark rounded-circle font-weight-bolder");
        setTimelineViewClasses("nav-link text-white bg-dark font-weight-bolder");
        setListViewClasses("nav-link active font-weight-bolder");
        setCurrentView('list');
    }

    const handleTimelineView = (event) => {
        setAddViewClasses("nav-link border-0 text-white bg-dark rounded-circle font-weight-bolder");
        setTimelineViewClasses("nav-link active font-weight-bolder");
        setListViewClasses("nav-link text-white bg-dark font-weight-bolder");
        setCurrentView('timeline');
    }

    const handleAddView = (event) => {
        if(currentView == 'add') {
            handleListView;
        } else {
            setAddViewClasses("nav-link active bg-light text-dark border-0 rounded-circle font-weight-bolder");
            setTimelineViewClasses("nav-link text-white bg-dark font-weight-bolder");
            setListViewClasses("nav-link text-white bg-dark font-weight-bolder");
            setCurrentView('add');
        }
    }

    return (
        <div className="citation-box bootstrap-inside">
            <div className='justify-content-center mt-3 mx-0 citation-box-inner'>
                <div className="header w-100 row mx-0 pt-3 pb-0 px-3 bg-secondary">
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
                        <ul className="nav nav-tabs border-0">
                            <li className='nav-item border-0 mb-0 pb-0' onClick={handleTimelineView}>
                                <button className={timelineViewClasses}><h3>Timeline View</h3></button>
                            </li>
                            <li className='nav-item border-0 mb-0 pb-0' onClick={handleListView}>
                                <button className={listViewClasses}><h3>List View</h3></button>
                            </li>
                        </ul>
                    </div>
                    <div className='col-auto pl-2 pr-2 mb-2 d-flex align-items-center justify-content-end'>
                        <button className="btn btn-light rounded-circle p-2" onClick={handleShowing}><h2 className="p-0 m-0 d-flex align-items-center">{showingButton}</h2></button>
                    </div>
                </div>
                <div className={mainViewClasses}>
                    <div className='w-100 h-100'>
                        {currentView === 'timeline' && <Timeline videoCitations={videoCitations} />}
                        {currentView === 'list' && <ViewCitations videoCitations={videoCitations} />}
                        {currentView === 'add' && <AddNewCitation videoCitations={videoCitations} videoID={videoID} exitAddView={handleTimelineView} setVideoYites={props.setVideoYites} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;