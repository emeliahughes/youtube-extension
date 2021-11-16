import React, { useState } from 'react';

function ViewCitations(props) {
    let videoCitations = props.videoCitations;
    let citations = [];
    let citationButtons = [];
    let currentView;

    const[currentButton, setButton] = useState(0);

    // const allYites = [];
    let overallIndex = 1;
    videoCitations.forEach((yiteList) => {
            for (let i = 0; i < yiteList.length; i++) {
                let yite = yiteList[i];
                // allYites.push(yite);
                citations.push(<Citation citation={yite} key={"citation " + (overallIndex - 1)}/>);

                const foo = overallIndex;
                const setClick = () => {
                    setButton(foo)
                };

                let isActive = (currentButton == overallIndex);
                citationButtons.push(<CitationButton citation={yite} setClick={setClick} isActive={isActive} key={"citation button " + (overallIndex - 1)}/>);
                overallIndex++;
            }
        });

    // for (let i = 0; i < citations.length; i++) {
    //     let yite = videoCitations[i];
    //     citations.push(<Citation citation={yite} />);
    //     citationButtons.push(<CitationButton citation={yite} setClick={handleClick(i + 1)}/>);
    // }

    let listClasses;

    if(currentButton == 0) {
        listClasses = "button list-view-button active-button"
    } else {
        listClasses = "button list-view-button"
    }

    let listViewButton = (
        <div className= {listClasses}>
            <button onClick={() => setButton(0)}>
                <h2 className="list-view-button-text">List View</h2>
            </button>
        </div>);

    let listViewContents = (
        <div className="list-view-block">
            <ul>
                {citations.filter((_, i) => currentButton == 0 || i == currentButton - 1)}
            </ul>
        </div>
    );

    // if (currentButton == 0) {
        currentView = listViewContents;
    // } else {
    //     currentView = citations[currentButton - 1];
    // }

    return (
        <div className="citation-view">
            <div className="view-buttons">
                {listViewButton}
                {citationButtons}
            </div>
            <div className="citation-viewer">
                {currentView}
            </div>
        </div>
    );

}

function Citation(props) {
    let citation = props.citation;
    let title = citation.title;
    let source = citation.source;
    let link = citation.link;
    if (link.substring(0, 5) !== 'http') {
        link = 'http://' + link;
    }
    
    console.log(link);
    let startTime = citation.startTime;
    let endTime = citation.endTime;

    return(
        <div className="citation-block">
            <h2 className="citation-title">{title}</h2>
            <a href={link} className="citation-source">{source}</a>
            <p className="citation-time-text">from {startTime} to {endTime} </p>
        </div>
    )
}

function CitationButton(props) {
    let citation = props.citation;
    let setClick = props.setClick;
    let isActive = props.isActive;
    let title = citation.title;
    let titleLength = title.length;
    let classes;

    if(titleLength > 15) {
        title = title.substring(0, 12);
        title += "...";
    }

    if(isActive){
        classes = "citation-button button active-button";
    } else {
        classes = "citation-button button";
    }

    return (
        <div className={classes}>
            <button onClick={setClick}>
                <h2 className="citation-button-title">{title}</h2>
            </button>
        </div>
    )
}

export default ViewCitations;