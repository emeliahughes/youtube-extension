import React, { useState } from 'react';

function ViewCitations(props) {
   let videoCitations = props.videoCitations;

    return (
        <div class="citation-view">
            <SelectCitation videoCitations={videoCitations} />
        </div>
    )
}


function SelectCitation(props) {
    let videoCitations = props.videoCitations;
    let citations = [];
    let citationButtons = [];
    // videoCitations.forEach((key) => {
    //         for (let i = 0; i < props.videoCitations[key].length; i++) {
    //         let yite = props.videoCitation[key][i];
    //         citations.push(<Citation citation={yite} />);
    //         citationButtons.push(<CitationButton citation={yite} />)
    //     }});
    for (let i = 0; i < videoCitations.length; i++) {
        let yite = videoCitations[i];
        citations.push(<Citation citation={yite} />);
        citationButtons.push(<CitationButton citation={yite} />)
    };
    
    let listViewContents = (
        <div class="list-view-block">
            <ul>
                {citations}
            </ul>
        </div>
    );

    let currentView = citations[0];

    const[listView, setListView] = useState(false);

    const handleListView = (event) => {
        event.preventDefault();
        setListView(!listView);

        if(listView){
            for (button in citationButtons) {
                button.setClick(false);
                currentView = listViewContents;
            }
        }

    }

    let listViewButton = (
        <div class="list-view-button">
            <button onClick={handleListView}>
                <h2 class="list-view-button-text">List View</h2>
            </button>
        </div>);

    

    for (button in citationButtons) {

    }

    return (
        <div>
            <div class="view-buttons">
                {/* {listViewButton}
                {citationButtons} */}
            </div>
            <div class="citation-viewer">
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
    let startTime = citation.startTime;
    let endTime = citation.endTime;

    return(
        <div class="citation-block">
            <h2 class="citation-title">{title}</h2>
            <a href={link} class="citation-source">{source}</a>
            <p class="citation-time-text">from {startTime} to {endTime} </p>
        </div>
    )
}

function CitationButton(props) {
    let citation = props.citation;
    let title = citation.title;
    let titleLength = title.length;

     if(titleLength > 15) {
        title = title.substring(0, 15);
        title += "...";
    }

    const[clicked, setClick] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        setClick(!clicked);
    }

    return (
        <div class="citation-button">
            <button onClick={handleClick}>
                <h2 class="citation-title">{title}</h2>
            </button>
        </div>
    )
}

export default ViewCitations;